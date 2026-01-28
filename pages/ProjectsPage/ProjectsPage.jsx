// src/pages/ProjetPage/ProjetPage.jsx
import React, { useEffect, useState } from "react";
import "./ProjectsPage.css";

export const ProjectsPage = () => {
  const linkedinUrl = "https://www.linkedin.com/company/apia-it";
  const [streams, setStreams] = useState([]);

  useEffect(() => {
    // Création de 60 colonnes de "code" avec des paramètres aléatoires
    const newStreams = Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      duration: `${Math.random() * 8 + 4}s`,
      delay: `${Math.random() * -20}s`,
      fontSize: `${Math.random() * 1.5 + 0.5}rem`,
      opacity: Math.random() * 0.5 + 0.1,
      // Mélange de caractères pour l'effet Matrix
      content: "0101APIA-ITｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ"
        .split("")
        .sort(() => 0.5 - Math.random())
        .join(""),
    }));
    setStreams(newStreams);
  }, []);

  return (
    <div className="cyber-violet-page">
      {/* Background Matrix Violet */}
      <div className="matrix-rain-container">
        {streams.map((stream) => (
          <div
            key={stream.id}
            className="matrix-stream"
            style={{
              left: stream.left,
              animationDuration: stream.duration,
              animationDelay: stream.delay,
              fontSize: stream.fontSize,
              opacity: stream.opacity,
            }}
          >
            {stream.content}
          </div>
        ))}
      </div>

      <div className="vignette-overlay" />

      <main className="immersive-container">
        <div className="terminal-border-top" />

        <section className="text-content">
          <h2 className="glitch-title" data-text="MISSION_2125">
            MISSION_2125
          </h2>

          <div className="content-box">
            <p className="typing-effect">
              Dans cette partie nous allons vous expliquez notre projet. A
              commencer par nos objectifs, en effet dans cet escape game
              revisité nous allons nous mettre dans la peau d'un scientifique
              des années 2125...
            </p>

            <p className="description-text">
              Dans cet escape game à l'ambiance futuriste et dystopique, un
              scientifique venu de demain nous adresse un avertissement : les
              décisions que nous prendrons dans ce jeu reflètent celles que nous
              faisons aujourd'hui dans le monde réel.
            </p>
          </div>
        </section>

        <div className="action-row">
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="neon-violet-button"
          >
            LANCER L'EXPÉRIENCE
            <span className="btn-glow" />
          </a>
        </div>

        <footer className="footer-info">
          <div className="pulse-dot" />
          <span>D'AUTRES PROJETS SONT EN COURS DE CHARGEMENT...</span>
        </footer>
      </main>
    </div>
  );
};
