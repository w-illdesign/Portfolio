
  // Tes données (tableau d'objets)
  const galleryItems = [
  {
      src: "visuels/p12.png",
      alt: "Création 2 — visuel graphique",
      title: "Création 2",
      desc: "Description rapide de la création 2."
    },
    
    {
      src: "visuels/_2.png",
      alt: "Création 2 — visuel graphique",
      title: "Création 2",
      desc: "Description rapide de la création 2."
    },
    {
      src: "visuels/_3.png",
      alt: "Création 3 — visuel graphique",
      title: "Création 3",
      desc: "Description rapide de la création 3."
    },
    
    {
      src: "visuels/_5.png",
      alt: "Création 5 — visuel graphique",
      title: "Création 5",
      desc: "Description rapide de la création 5."
    },
    {
      src: "visuels/_1.png",
      alt: "Création 1 — visuel graphique",
      title: "Création 1",
      desc: "Description rapide de la création 1."
    },
    
    {
      src: "visuels/_8.png",
      alt: "Création 8 — visuel graphique",
      title: "Création 8",
      desc: "Description rapide de la création 8."
    },
    {
      src: "visuels/_9.png",
      alt: "Création 9 — visuel graphique",
      title: "Création 9",
      desc: "Description rapide de la création 9."
    },
    {
      src: "visuels/_10.png",
      alt: "Création 10 — visuel graphique",
      title: "Création 10",
      desc: "Description rapide de la création 10."
    }
  ];

  // Injection dynamique
  const galleryGrid = document.getElementById("galleryGrid");

  galleryItems.forEach((item, index) => {
    const article = document.createElement("article");
    article.className = "card gallery-card";

    article.innerHTML = `
      <div class="project-meta">
        <button class="thumb gallery-thumb" data-index="${index}" aria-label="Ouvrir ${item.title}">
          <img src="${item.src}" alt="${item.alt}">
        </button>
        <div class="content">
          <h3>${item.title}</h3>
          <p class="muted">${item.desc}</p>
        </div>
      </div>
    `;

    galleryGrid.appendChild(article);
  });
