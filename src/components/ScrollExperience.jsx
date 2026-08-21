import { useEffect, useState } from "react";

function ScrollExperience({ enabled }) {
  const [progress, setProgress] = useState(0);
  const [showTopButton, setShowTopButton] = useState(false);

  useEffect(() => {
    if (!enabled) {
      setProgress(0);
      setShowTopButton(false);
      return undefined;
    }

    let animationFrame = null;

    function updateScrollExperience() {
      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
      }

      animationFrame = window.requestAnimationFrame(() => {
        const documentHeight =
          document.documentElement.scrollHeight -
          window.innerHeight;

        const currentProgress =
          documentHeight > 0
            ? (window.scrollY / documentHeight) * 100
            : 0;

        setProgress(
          Math.min(100, Math.max(0, currentProgress))
        );

        setShowTopButton(window.scrollY > 650);
      });
    }

    updateScrollExperience();

    window.addEventListener(
      "scroll",
      updateScrollExperience,
      { passive: true }
    );

    window.addEventListener(
      "resize",
      updateScrollExperience
    );

    return () => {
      window.removeEventListener(
        "scroll",
        updateScrollExperience
      );

      window.removeEventListener(
        "resize",
        updateScrollExperience
      );

      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, [enabled]);

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <>
      <div
        className={`scroll-progress ${
          enabled ? "is-enabled" : ""
        }`}
        aria-hidden="true"
      >
        <span style={{ width: `${progress}%` }}></span>
      </div>

      <div
        className={`ambient-animation ${
          enabled ? "is-visible" : ""
        }`}
        aria-hidden="true"
      >
        <span className="ambient-particle particle-1"></span>
        <span className="ambient-particle particle-2"></span>
        <span className="ambient-particle particle-3"></span>
        <span className="ambient-particle particle-4"></span>
        <span className="ambient-particle particle-5"></span>
        <span className="ambient-particle particle-6"></span>
        <span className="ambient-leaf ambient-leaf-1">
          <i className="bi bi-flower1"></i>
        </span>
        <span className="ambient-leaf ambient-leaf-2">
          <i className="bi bi-flower2"></i>
        </span>
      </div>

      <button
        type="button"
        className={`scroll-top-button ${
          showTopButton ? "is-visible" : ""
        }`}
        onClick={scrollToTop}
        aria-label="Regresar al inicio"
        title="Regresar al inicio"
      >
        <i className="bi bi-chevron-up"></i>
      </button>
    </>
  );
}

export default ScrollExperience;
