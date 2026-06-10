const dotenv = require("dotenv");

dotenv.config();

async function main() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;

  if (!apiKey) {
    throw new Error("GOOGLE_PLACES_API_KEY não configurada no .env");
  }

  const url = new URL("https://maps.googleapis.com/maps/api/place/findplacefromtext/json");

  url.searchParams.set("input", "Carambolo Studio Teresina PI");
  url.searchParams.set("inputtype", "textquery");
  url.searchParams.set("fields", "place_id,name,formatted_address");
  url.searchParams.set("language", "pt-BR");
  url.searchParams.set("key", apiKey);

  const response = await fetch(url);
  const data = await response.json();

  console.log(JSON.stringify(data, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});