// src/pages/HomePage/HomePage.jsx
import { MissionCard } from "../../components/MissionCard/MissionCard";
import { MISSIONS } from "../../utils/constants";
import backgroundCyber from "../../assets/images/Fonds/Image_de_base_apia.png";
import { useState, useEffect } from "react";
import ordinateur from "../../assets/images/elements/Ordi_face.png";
import "./HomePage.css";

export const HomePage = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculer l'opacité et la position en fonction du scroll
  const laptopOpacity = Math.min(scrollY / 300, 1);
  const laptopTranslateY = Math.max(50 - scrollY / 10, 0);

  return (
    <div className="homepage">
      {/* Image de fond plein écran */}
      <div className="homepage__background">
        <img
          className="homepage__background-image"
          alt="Fond cyberpunk"
          src={backgroundCyber}
        />
        <div className="homepage__background-overlay" />
      </div>

      <div className="homepage__content">
        {/* Section principale avec logo central et texte */}
        <div className="homepage__hero">
          {/* Logo central avec effet néon */}

          {/* Texte de présentation */}
          <section className="homepage__about animate-fade-in-up delay-200">
            <p className="homepage__about-text">
              APIA-IT est une association engagée dans la sensibilisation à
              l'information, au numérique et à l'intelligence artificielle.
              <br />
              <br />
              À une époque où le numérique et l'IA occupent une place centrale
              dans nos vies, notre objectif est d'aider chacun à comprendre,
              analyser et agir de manière éclairée.
              <br />
              <br />
              Nous concevons et animons des ateliers pédagogiques, des jeux
              interactifs et des escape games éducatifs, accessibles à tous les
              publics.
              <br />
              <br />
              Nous intervenons directement dans les écoles, collèges, lycées,
              établissements d'enseignement supérieur, mais aussi auprès des
              associations, collectivités, structures jeunesse et organisations
              professionnelles.
              <br />
              <br />
              Notre approche ludique et participative permet d'aborder des
              sujets complexes de façon concrète et engageante.
              <br />
              <br />
              Parce qu'un citoyen informé est un citoyen plus libre, APIA-IT
              œuvre pour un numérique plus responsable, éthique et inclusif.
            </p>
          </section>
        </div>

        {/* Section Ordinateur qui apparaît au scroll */}
        <section
          className="homepage__laptop-section"
          style={{
            opacity: laptopOpacity,
            transform: `translateY(${laptopTranslateY}px)`,
          }}
        >
          <div className="homepage__laptop-container">
            <img
              src={ordinateur}
              alt="Ordinateur APIA-IT"
              className="homepage__laptop-image"
            />
            <div className="homepage__laptop-overlay">
              <h2 className="homepage__laptop-title">APIA-IT</h2>
              <p className="homepage__laptop-subtitle">Association en</p>
              <p className="homepage__laptop-subtitle-large">
                Intelligence Artificielle
              </p>
            </div>
          </div>
        </section>

        {/* Section missions en bas */}
        <section className="homepage__missions">
          <h2 className="sr-only">Nos missions</h2>

          <div className="homepage__missions-grid">
            {MISSIONS.map((card, index) => (
              <div
                key={card.id}
                className={`homepage__mission-item animate-fade-in-up delay-${
                  (index + 1) * 100
                }`}
              >
                <MissionCard
                  title={card.title}
                  description={card.description}
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
