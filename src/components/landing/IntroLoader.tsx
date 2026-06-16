import { useEffect, useState } from "react";

import logoAvif from "@/assets/optimized/carambolo-logo-320.avif";
import logoPng from "@/assets/optimized/carambolo-logo-320.png";
import logoWebp from "@/assets/optimized/carambolo-logo-320.webp";

type IntroLoaderProps = {
  onFinish: () => void;
};

export function IntroLoader({ onFinish }: IntroLoaderProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const progressInterval = window.setInterval(() => {
      setProgress((current) => {
        if (current >= 100) {
          window.clearInterval(progressInterval);
          return 100;
        }

        return current + 4;
      });
    }, 80);

    const finishTimer = window.setTimeout(() => {
      onFinish();
    }, 2600);

    return () => {
      window.clearInterval(progressInterval);
      window.clearTimeout(finishTimer);
    };
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-[9999] flex min-h-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-8 px-6">
        <div className="relative flex h-40 w-40 items-center justify-center md:h-52 md:w-52">
          <div className="absolute inset-0 rounded-full bg-primary/20 blur-2xl animate-music-pulse" />

          <picture className="contents">
            <source type="image/avif" srcSet={logoAvif} />
            <source type="image/webp" srcSet={logoWebp} />
            <img
              src={logoPng}
              alt="Carambolo Studio"
              className="relative z-10 h-full w-full object-contain animate-music-logo"
              width={320}
              height={215}
              loading="eager"
              decoding="async"
            />
          </picture>
        </div>

        <div className="w-64 md:w-80">
          <div className="mb-3 flex items-center justify-between text-xs uppercase tracking-[0.25em] text-muted-foreground">
            <span>Carregando</span>
            <span>{progress}%</span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all duration-150 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
