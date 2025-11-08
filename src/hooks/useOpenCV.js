import { useState, useEffect } from "react";

export const useOpenCV = () => {
  const [isOpenCVReady, setIsOpenCVReady] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkOpenCV = () => {
      if (window.cv) {
        setIsOpenCVReady(true);
        setLoadingProgress(100);
        return;
      }

      let attempts = 0;
      const maxAttempts = 100;

      const interval = setInterval(() => {
        attempts++;
        setLoadingProgress(attempts);

        if (window.cv) {
          setIsOpenCVReady(true);
          setLoadingProgress(100);
          clearInterval(interval);
        } else if (attempts >= maxAttempts) {
          setError(
            "Не вдалося завантажити OpenCV.js. Перевірте підключення до інтернету."
          );
          clearInterval(interval);
        }
      }, 100);

      return () => clearInterval(interval);
    };

    checkOpenCV();
  }, []);

  return { isOpenCVReady, loadingProgress, error };
};
