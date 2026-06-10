const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const fs = require("fs/promises");
const path = require("path");

dotenv.config();

const app = express();
const PORT = process.env.API_PORT || 3333;

const CACHE_DIR = path.join(__dirname, "cache");
const CACHE_FILE = path.join(CACHE_DIR, "google-reviews-cache.json");

// 7 dias em milissegundos
const CACHE_TTL_MS = 7 * 24 * 60 * 60 * 1000;

app.use(cors());

async function ensureCacheDir() {
  await fs.mkdir(CACHE_DIR, { recursive: true });
}

async function readCache() {
  try {
    const raw = await fs.readFile(CACHE_FILE, "utf-8");
    const cache = JSON.parse(raw);

    if (!cache.updatedAt || !cache.data) {
      return null;
    }

    return cache;
  } catch {
    return null;
  }
}

async function writeCache(data) {
  await ensureCacheDir();

  const payload = {
    updatedAt: new Date().toISOString(),
    data,
  };

  await fs.writeFile(CACHE_FILE, JSON.stringify(payload, null, 2), "utf-8");

  return payload;
}

function isCacheFresh(cache) {
  if (!cache?.updatedAt) return false;

  const updatedAt = new Date(cache.updatedAt).getTime();
  const now = Date.now();

  return now - updatedAt < CACHE_TTL_MS;
}

function fallbackData() {
  return {
    name: "Carambolo Studio",
    rating: 4.8,
    totalReviews: 135,
    googleUrl:
      "https://www.google.com/maps/place/Carambolo+Studio/@-5.0864855,-42.763607,17z/data=!4m8!3m7!1s0x78e3a73aaea23b1:0x18c642955d4498c9!8m2!3d-5.0864855!4d-42.763607!9m1!1b1!16s%2Fg%2F11c2ly5xqv",
    reviews: [
      {
        authorName: "Cliente Carambolo Studio",
        rating: 5,
        text: "Atendimento técnico, ambiente profissional e orientação durante todo o processo de gravação.",
        relativeTime: "Depoimento real",
      },
      {
        authorName: "Artista independente",
        rating: 5,
        text: "Estrutura completa para transformar uma ideia em uma gravação com qualidade.",
        relativeTime: "Projeto musical",
      },
      {
        authorName: "Banda atendida",
        rating: 5,
        text: "Espaço organizado, acompanhamento técnico e boa estrutura para ensaio e gravação.",
        relativeTime: "Sessão no estúdio",
      },
    ],
  };
}

async function fetchGoogleReviews() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey) {
    throw new Error("GOOGLE_PLACES_API_KEY não configurada no .env");
  }

  if (!placeId) {
    throw new Error("GOOGLE_PLACE_ID não configurado no .env");
  }

  const url = new URL("https://maps.googleapis.com/maps/api/place/details/json");

  url.searchParams.set("place_id", placeId);
  url.searchParams.set("fields", "name,rating,user_ratings_total,reviews,url");
  url.searchParams.set("language", "pt-BR");
  url.searchParams.set("key", apiKey);

  const response = await fetch(url);
  const data = await response.json();

  if (data.status !== "OK") {
    throw new Error(
      `Erro Google Places API: ${data.status}${
        data.error_message ? ` - ${data.error_message}` : ""
      }`,
    );
  }

  const place = data.result;

  return {
    name: place.name,
    rating: place.rating,
    totalReviews: place.user_ratings_total,
    googleUrl: place.url,
    reviews:
      place.reviews?.map((review) => ({
        authorName: review.author_name,
        rating: review.rating,
        text: review.text,
        relativeTime: review.relative_time_description,
        profilePhotoUrl: review.profile_photo_url,
      })) || [],
  };
}

app.get("/api/google-reviews", async (req, res) => {
  try {
    const cache = await readCache();

    if (isCacheFresh(cache)) {
      return res.json({
        ...cache.data,
        cache: {
          status: "fresh",
          updatedAt: cache.updatedAt,
          nextUpdateAt: new Date(
            new Date(cache.updatedAt).getTime() + CACHE_TTL_MS,
          ).toISOString(),
        },
      });
    }

    try {
      const googleData = await fetchGoogleReviews();
      const newCache = await writeCache(googleData);

      return res.json({
        ...newCache.data,
        cache: {
          status: "updated",
          updatedAt: newCache.updatedAt,
          nextUpdateAt: new Date(
            new Date(newCache.updatedAt).getTime() + CACHE_TTL_MS,
          ).toISOString(),
        },
      });
    } catch (googleError) {
      console.error("Erro ao atualizar Google Reviews:", googleError);

      if (cache?.data) {
        return res.json({
          ...cache.data,
          cache: {
            status: "stale",
            updatedAt: cache.updatedAt,
            warning:
              "Google Places API falhou. Retornando último cache disponível.",
          },
        });
      }

      return res.json({
        ...fallbackData(),
        cache: {
          status: "fallback",
          warning:
            "Sem cache disponível e Google Places API falhou. Retornando fallback manual.",
        },
      });
    }
  } catch (error) {
    console.error("Erro interno no endpoint /api/google-reviews:", error);

    return res.status(500).json({
      error: "Erro interno ao buscar avaliações",
      message: error instanceof Error ? error.message : String(error),
    });
  }
});

app.listen(PORT, () => {
  console.log(`Google Reviews API rodando em http://localhost:${PORT}`);
  console.log(`Cache semanal ativo em: ${CACHE_FILE}`);
});