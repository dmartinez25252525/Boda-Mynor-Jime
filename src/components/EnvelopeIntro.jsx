import { useState } from "react";
import weddingData from "../data/weddingData";

function EnvelopeIntro({ onOpen }) {
  const [isOpening, setIsOpening] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
function handleOpen() {
    if (isOpening) {
      return;
    }

    setIsOpening(true);
    onOpen?.();

    window.setTimeout(() => {
      setIsVisible(false);
    }, 1900);
  }

  if (!isVisible) {
    return null;
  }

  return (
    <section
      className={`envelope-intro ${isOpening ? "is-opening" : ""}`}
      aria-label="Abrir invitación de boda"
    >
      <div className="intro-light intro-light-one"></div>
      <div className="intro-light intro-light-two"></div>

      <div className="intro-content">
        <p className="intro-eyebrow">
          Una invitación especial para ti
        </p>

        <h1>
          Melinda
          <span>&</span>
          Mynor
        </h1>

        <p className="intro-message">
          Con mucha alegría queremos compartir contigo
          el comienzo de nuestra nueva historia.
        </p>

        <div className="envelope-stage">
          <div className="envelope-ground-shadow"></div>

          <div className="wedding-envelope">
            <div className="envelope-back"></div>

            <div className="invitation-letter">
              <div className="letter-border">
                <div className="letter-monogram">
                  {weddingData.couple.initials}
                </div>

                <small>Nos casamos</small>

                <strong>
                  {weddingData.event.shortDate}
                </strong>

                <span>
                  Toca el sello para descubrir la invitación
                </span>
              </div>
            </div>

            <div className="envelope-pocket">
              <div className="pocket-left"></div>
              <div className="pocket-right"></div>
              <div className="pocket-center"></div>
            </div>

            <div className="envelope-flap"></div>

            <button
              type="button"
              className="wax-seal"
              onClick={handleOpen}
              aria-label="Abrir la invitación"
            >
              <span>M</span>

              <i
                className="bi bi-heart-fill"
                aria-hidden="true"
              ></i>

              <span>M</span>
            </button>
          </div>
        </div>

        <button
          type="button"
          className="open-invitation-button"
          onClick={handleOpen}
        >
          <i className="bi bi-envelope-open-heart"></i>
          Toca para abrir
        </button>

        <p className="sound-notice">
          <i className="bi bi-music-note-beamed"></i>
          La música comenzará al abrir la carta
        </p>
      </div>
    </section>
  );
}

export default EnvelopeIntro;

