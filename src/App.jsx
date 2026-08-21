import { useEffect, useRef, useState } from "react";
import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  Nav,
  Navbar,
  Row,
} from "react-bootstrap";
import AOS from "aos";
import EnvelopeIntro from "./components/EnvelopeIntro";
import ScrollExperience from "./components/ScrollExperience";
import weddingData from "./data/weddingData";
import { useCountdown } from "./hooks/useCountdown";
import {
  downloadCalendarEvent,
  openWhatsApp,
  shareInvitation,
} from "./utils/invitationActions";

function App() {
  const countdown = useCountdown(weddingData.event.dateISO);
  const [notification, setNotification] = useState("");
  const [invitationOpened, setInvitationOpened] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    AOS.init({
      duration: 850,
      once: true,
      offset: 70,
      easing: "ease-out-cubic",
    });
  }, []);

  async function handleOpenInvitation() {
    setInvitationOpened(true);

    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    audio.volume = 0.55;

    try {
      await audio.play();
      setMusicPlaying(true);
    } catch {
      setMusicPlaying(false);
    }
  }

  async function toggleMusic() {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    try {
      if (audio.paused) {
        await audio.play();
        setMusicPlaying(true);
      } else {
        audio.pause();
        setMusicPlaying(false);
      }
    } catch {
      setNotification("La canción aún no está disponible");

      window.setTimeout(() => {
        setNotification("");
      }, 2500);
    }
  }

  async function handleShare() {
    const result = await shareInvitation(weddingData);

    if (!result) {
      return;
    }

    setNotification(result);

    window.setTimeout(() => {
      setNotification("");
    }, 2500);
  }

  return (
    <div
        className={`invitation-app ${
          invitationOpened
            ? "invitation-revealed"
            : "invitation-waiting"
        }`}
      >
        <EnvelopeIntro onOpen={handleOpenInvitation} />
        <ScrollExperience enabled={invitationOpened} />

        <audio
          ref={audioRef}
          src={weddingData.media.music}
          loop
          preload="metadata"
        />
      <Navbar
        expand="lg"
        fixed="top"
        className="wedding-navbar"
      >
        <Container>
          <Navbar.Brand
            href="#inicio"
            className="brand-logo notranslate"
            translate="no"
            aria-label="Melinda y Mynor"
          >
            <span aria-hidden="true">M</span>
            <i
              className="bi bi-heart-fill"
              aria-hidden="true"
            ></i>
            <span aria-hidden="true">M</span>
          </Navbar.Brand>

          <Navbar.Toggle
            aria-controls="wedding-navigation"
            className="border-0 shadow-none"
          >
            <i className="bi bi-list"></i>
          </Navbar.Toggle>

          <Navbar.Collapse id="wedding-navigation">
            <Nav className="ms-auto align-items-lg-center">
              <Nav.Link href="#inicio">Inicio</Nav.Link>
              <Nav.Link href="#conteo">Conteo</Nav.Link>
              <Nav.Link href="#detalles">Detalles</Nav.Link>
              <Nav.Link href="#regalos">Regalos</Nav.Link>
              <Nav.Link href="#confirmar">Confirmar</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <main>
        <section className="hero-section" id="inicio">
          <div className="hero-decoration hero-decoration-one"></div>
          <div className="hero-decoration hero-decoration-two"></div>

          <Container className="position-relative">
            <Row className="justify-content-center">
              <Col xl={9} lg={10}>
                <div className="hero-content" data-aos="fade-up">
                  <p className="hero-kicker">
                    Con la bendición de Dios
                  </p>

                  <div className="hero-symbol">
                    <i className="bi bi-heart-fill"></i>
                  </div>

                  <h1>
                    <span>{weddingData.couple.bride}</span>
                    <small>&</small>
                    <span>{weddingData.couple.groom}</span>
                  </h1>

                  <p className="hero-message">
                    {weddingData.messages.opening}
                  </p>

                  <div className="date-frame">
                    <span>{weddingData.event.dayLabel}</span>
                    <strong>{weddingData.event.shortDate}</strong>
                    <span>{weddingData.event.timeLabel}</span>
                  </div>

                  <div className="hero-actions">
                    <Button
                      href="#detalles"
                      className="button-gold"
                    >
                      <i className="bi bi-envelope-heart me-2"></i>
                      Ver invitación
                    </Button>

                    <Button
                      variant="outline-light"
                      onClick={handleShare}
                    >
                      <i className="bi bi-share me-2"></i>
                      Compartir
                    </Button>
                  </div>

                  <blockquote className="verse-box">
                    <p>“{weddingData.verse.text}”</p>
                    <cite>{weddingData.verse.reference}</cite>
                  </blockquote>
                </div>
              </Col>
            </Row>
          </Container>

          <a
            href="#conteo"
            className="scroll-indicator"
            aria-label="Continuar a la cuenta regresiva"
          >
            <span>Desliza</span>
            <i className="bi bi-chevron-double-down"></i>
          </a>
        </section>

        <section className="section countdown-section" id="conteo">
          <Container>
            <div className="section-heading" data-aos="fade-up">
              <span className="section-icon">
                <i className="bi bi-hourglass-split"></i>
              </span>

              <p>Falta muy poco</p>
              <h2>Cuenta regresiva</h2>

              <div className="title-decoration">
                <span></span>
                <i className="bi bi-heart-fill"></i>
                <span></span>
              </div>

              <p className="section-description">
                {weddingData.messages.countdown}
              </p>
            </div>

            <Row className="countdown-grid g-3 g-md-4">
              {[
                ["days", "Días"],
                ["hours", "Horas"],
                ["minutes", "Minutos"],
                ["seconds", "Segundos"],
              ].map(([key, label], index) => (
                <Col xs={6} lg={3} key={key}>
                  <Card
                    className="countdown-card"
                    data-aos="zoom-in"
                    data-aos-delay={index * 90}
                  >
                    <Card.Body>
                      <strong>
                        {String(countdown[key]).padStart(2, "0")}
                      </strong>
                      <span>{label}</span>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>

            <div
              className="calendar-action"
              data-aos="fade-up"
            >
              <Button
                className="button-outline-gold"
                onClick={() =>
                  downloadCalendarEvent(weddingData)
                }
              >
                <i className="bi bi-calendar2-plus me-2"></i>
                Agregar al calendario
              </Button>
            </div>
          </Container>
        </section>

        <section className="section details-section" id="detalles">
          <Container>
            <div className="section-heading" data-aos="fade-up">
              <span className="section-icon">
                <i className="bi bi-stars"></i>
              </span>

              <p>Nuestro gran día</p>
              <h2>Detalles de la boda</h2>

              <div className="title-decoration">
                <span></span>
                <i className="bi bi-heart-fill"></i>
                <span></span>
              </div>

              <p className="section-description">
                {weddingData.messages.invitation}
              </p>
            </div>

            <Row className="g-4 justify-content-center">
              <Col md={6} lg={4}>
                <Card
                  className="detail-card h-100"
                  data-aos="fade-up"
                >
                  <Card.Body>
                    <div className="detail-icon">
                      <i className="bi bi-calendar-heart"></i>
                    </div>

                    <Badge className="detail-badge">
                      Fecha
                    </Badge>

                    <h3>{weddingData.event.dayLabel}</h3>
                    <p>{weddingData.event.dateLabel}</p>
                    <strong>{weddingData.event.timeLabel}</strong>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={6} lg={4}>
                <Card
                  className="detail-card h-100"
                  data-aos="fade-up"
                  data-aos-delay="100"
                >
                  <Card.Body>
                    <div className="detail-icon">
                      <i className="bi bi-geo-alt"></i>
                    </div>

                    <Badge className="detail-badge">
                      Ceremonia
                    </Badge>

                    <h3>{weddingData.ceremony.name}</h3>
                    <p>{weddingData.ceremony.city}</p>

                    <div className="location-buttons">
                      <Button
                        as="a"
                        href={weddingData.location.googleMaps}
                        target="_blank"
                        rel="noreferrer"
                        className="map-button google-button"
                      >
                        <i className="bi bi-google me-2"></i>
                        Google Maps
                      </Button>

                      <Button
                        as="a"
                        href={weddingData.location.waze}
                        target="_blank"
                        rel="noreferrer"
                        className="map-button waze-button"
                      >
                        <i className="bi bi-sign-turn-right me-2"></i>
                        Waze
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={6} lg={4}>
                <Card
                  className="detail-card h-100"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  <Card.Body>
                    <div className="detail-icon">
                      <i className="bi bi-person-hearts"></i>
                    </div>

                    <Badge className="detail-badge">
                      Vestimenta
                    </Badge>

                    <h3>{weddingData.dressCode.type}</h3>
                    <p>
                      {weddingData.dressCode.description}
                    </p>

                    <strong>Celebración elegante</strong>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>

        <section className="section gifts-section" id="regalos">
          <Container>
            <Row className="align-items-center g-4 g-lg-5">
              <Col lg={6} data-aos="fade-right">
                <div className="gift-illustration">
                  <div className="gift-circle">
                    <i className="bi bi-gift"></i>
                  </div>

                  <span className="floating-leaf leaf-one">
                    <i className="bi bi-flower1"></i>
                  </span>

                  <span className="floating-leaf leaf-two">
                    <i className="bi bi-flower2"></i>
                  </span>
                </div>
              </Col>

              <Col lg={6} data-aos="fade-left">
                <div className="gift-content">
                  <p className="section-mini-title">
                    Un detalle con amor
                  </p>

                  <h2>{weddingData.gifts.title}</h2>

                  <div className="small-divider"></div>

                  <p>{weddingData.gifts.description}</p>

                  <div className="gift-note">
                    <i className="bi bi-envelope-paper-heart"></i>

                    <span>
                      Lo más importante para nosotros es contar
                      con tu presencia.
                    </span>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        <section
          className="section confirmation-section"
          id="confirmar"
        >
          <Container>
            <Row className="justify-content-center">
              <Col lg={8} xl={7}>
                <div
                  className="confirmation-card"
                  data-aos="zoom-in"
                >
                  <div className="confirmation-icon">
                    <i className="bi bi-chat-heart"></i>
                  </div>

                  <p className="section-mini-title">
                    Confirma tu asistencia
                  </p>

                  <h2>Esperamos contar contigo</h2>

                  <p>
                    {weddingData.messages.confirmation}
                    Confirma antes del{" "}
                    <strong>
                      {weddingData.rsvp.deadline}
                    </strong>
                    .
                  </p>

                  <Button
                    className="whatsapp-button"
                    onClick={() => openWhatsApp(weddingData)}
                  >
                    <i className="bi bi-whatsapp me-2"></i>
                    Confirmar por WhatsApp
                  </Button>

                  <small>
                    Se abrirá WhatsApp con el mensaje de
                    confirmación preparado.
                  </small>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </main>

      <footer className="wedding-footer">
        <Container>
          <div
            className="footer-monogram notranslate"
            translate="no"
            aria-label="Monograma de Melinda y Mynor"
          >
            <span>
              {weddingData.couple.bride.charAt(0)}
            </span>

            <i
              className="bi bi-heart-fill"
              aria-hidden="true"
            ></i>

            <span>
              {weddingData.couple.groom.charAt(0)}
            </span>
          </div>

          <p>Con cariño</p>
          <h2>{weddingData.couple.displayName}</h2>
          <span>{weddingData.event.shortDate}</span>

          <div className="footer-heart">
            <i className="bi bi-heart-fill"></i>
          </div>
        </Container>
      </footer>

      <button
        type="button"
        className={`floating-music-button ${
          invitationOpened ? "is-visible" : ""
        }`}
        onClick={toggleMusic}
        aria-label={
          musicPlaying
            ? "Pausar música"
            : "Reproducir música"
        }
        title={
          musicPlaying
            ? "Pausar música"
            : "Reproducir música"
        }
      >
        <i
          className={`bi ${
            musicPlaying
              ? "bi-volume-up-fill"
              : "bi-volume-mute-fill"
          }`}
        ></i>

        <span className="music-wave" aria-hidden="true">
          <b></b>
          <b></b>
          <b></b>
        </span>
      </button>

      <div className="mobile-action-bar">
        <a
          href={weddingData.location.googleMaps}
          target="_blank"
          rel="noreferrer"
          aria-label="Abrir ubicación"
        >
          <i className="bi bi-geo-alt-fill"></i>
          <span>Ubicación</span>
        </a>

        <button
          type="button"
          onClick={() =>
            downloadCalendarEvent(weddingData)
          }
        >
          <i className="bi bi-calendar2-plus-fill"></i>
          <span>Guardar</span>
        </button>

        <button
          type="button"
          onClick={() => openWhatsApp(weddingData)}
        >
          <i className="bi bi-whatsapp"></i>
          <span>Confirmar</span>
        </button>
      </div>

      {notification && (
        <div className="smart-notification" role="status">
          <i className="bi bi-check-circle-fill"></i>
          {notification}
        </div>
      )}
    </div>
  );
}

export default App;




