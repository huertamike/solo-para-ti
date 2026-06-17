/* ==========================================
   LÓGICA DE LA APLICACIÓN - REGALO MUSICAL 🎸🌌
   ========================================== */

let player = null;
let currentSongIndex = 0;
let isPlayerReady = false;

// Variables de control para el scroll de letras (estilo Apple Music)
let isUserScrolling = false;
let userScrollTimeout = null;
let isAutoScrolling = false;

let previewAudio = null;
let previewTimeout = null;

// Variables para música de fondo (WOS - Alma Dinamita)
let bgAudio = null;
let bgMusicStarted = false;

// Control de la pantalla detallada para efectos de fondo
let isPlayerActive = false;

// Estado del minijuego (9 fragmentos del corazón recolectados)
let collectedPieces = [false, false, false, false, false, false, false, false, false];

// Lógica de reproducción de Apple Music
let isShuffle = false;
let isRepeat = false;
let progressInterval = null;
let isDraggingScrubber = false;


// Inicialización de la aplicación cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  // Cargar estado de fragmentos desde localStorage
  const savedPieces = localStorage.getItem("collected_pieces");
  if (savedPieces) {
    try {
      collectedPieces = JSON.parse(savedPieces);
      // Si la playlist ya se completó por completo (9/9), se reinicia al refrescar la pestaña
      const count = collectedPieces.filter(p => p).length;
      if (count === 9) {
        collectedPieces = [false, false, false, false, false, false, false, false, false];
        localStorage.removeItem("collected_pieces");
      }
    } catch (e) {
      console.error("Error al parsear fragmentos guardados:", e);
    }
  }

  // 1. Generar Noche Estrellada
  generateStars();
  startShootingStars();

  // Actualizar UI del acumulador de corazones al iniciar
  updateHeartProgressUI();

  // 2. Control de la pantalla de bienvenida (Sobre interactivo)
  const envelopeWrapper = document.getElementById("envelope-wrapper");
  const welcomeScreen = document.getElementById("welcome-screen");
  const playlistScreen = document.getElementById("playlist-screen");
  const playerScreen = document.getElementById("player-screen");
  const btnToPlaylist = document.getElementById("btn-to-playlist");
  const instructionText = document.getElementById("instruction-text");

  // Abrir sobre al hacer clic
  envelopeWrapper.addEventListener("click", function(e) {
    if (!this.classList.contains("open")) {
      this.classList.add("open");
      instructionText.style.opacity = "0"; // Esconder instrucción
      playBackgroundMusic(); // Reproducir música de fondo (WOS - Alma Dinamita)
      e.stopPropagation();
    }
  });

  // Ir a la playlist
  btnToPlaylist.addEventListener("click", (e) => {
    e.stopPropagation();
    // Pausar la música de fondo al salir del primer panel (carta)
    pauseBackgroundMusic();
    fadeOutScreen(welcomeScreen, () => {
      fadeInScreen(playlistScreen);
      // Mostrar acumulador flotante global
      const globalHeart = document.getElementById("global-heart-progress");
      if (globalHeart) {
        globalHeart.classList.remove("hidden");
      }
    });
  });

  // 3. Renderizar Playlist
  renderPlaylist();

  // 4. Controles del Reproductor
  const btnBackToPlaylist = document.getElementById("btn-back-to-playlist");
  const btnPlayPause = document.getElementById("btn-play-pause");
  const btnPrev = document.getElementById("btn-prev-song");
  const btnNext = document.getElementById("btn-next-song");
  const btnShuffle = document.getElementById("btn-shuffle");
  const btnRepeat = document.getElementById("btn-repeat");
  const scrubber = document.getElementById("player-scrubber");
  const volumeSlider = document.getElementById("player-volume");

  btnBackToPlaylist.addEventListener("click", () => {
    // Pausar video al regresar
    if (player && typeof player.pauseVideo === "function") {
      player.pauseVideo();
    }
    isPlayerActive = false; // El reproductor ya no está activo
    clearAmbientGlow(); // Apagar iluminación ambiental al regresar
    stopProgressSync(); // Detener sincronización de progreso
    clearVideoErrorOverlay(); // Limpiar overlay de error si lo hubiera
    fadeOutScreen(playerScreen, () => {
      fadeInScreen(playlistScreen);
      // Asegurar que el acumulador flotante esté visible en playlist
      const globalHeart = document.getElementById("global-heart-progress");
      if (globalHeart) {
        globalHeart.classList.remove("hidden");
      }
    });
  });

  btnPlayPause.addEventListener("click", togglePlayPause);
  btnPrev.addEventListener("click", playPreviousSong);
  btnNext.addEventListener("click", playNextSong);

  // Botón de reproducción aleatoria (Shuffle)
  if (btnShuffle) {
    btnShuffle.addEventListener("click", () => {
      isShuffle = !isShuffle;
      if (isShuffle) {
        btnShuffle.classList.add("active");
      } else {
        btnShuffle.classList.remove("active");
      }
    });
  }

  // Botón de repetición (Repeat)
  if (btnRepeat) {
    btnRepeat.addEventListener("click", () => {
      isRepeat = !isRepeat;
      if (isRepeat) {
        btnRepeat.classList.add("active");
      } else {
        btnRepeat.classList.remove("active");
      }
    });
  }

  // Barra de desplazamiento / Scrubber interactiva
  if (scrubber) {
    scrubber.addEventListener("input", () => {
      isDraggingScrubber = true;
      const curTimeDisplay = document.getElementById("player-current-time");
      if (curTimeDisplay) {
        curTimeDisplay.textContent = formatTime(scrubber.value);
      }
    });

    scrubber.addEventListener("change", () => {
      isDraggingScrubber = false;
      if (player && isPlayerReady) {
        player.seekTo(parseFloat(scrubber.value), true);
      }
    });
  }

  // Control de Volumen interactivo
  if (volumeSlider) {
    volumeSlider.addEventListener("input", () => {
      if (player && isPlayerReady) {
        player.setVolume(parseInt(volumeSlider.value));
      }
    });
  }

  // 5. Controles y eventos del minijuego Corazón de Telaraña
  const collHeartWrapper = document.getElementById("collectible-heart-wrapper");
  if (collHeartWrapper) {
    collHeartWrapper.addEventListener("click", () => {
      if (!collectedPieces[currentSongIndex]) {
        triggerFlyAnimation(currentSongIndex);
      }
    });
  }

  // Clic en el sobre de propuesta final para abrirlo
  const proposalEnvelopeWrapper = document.getElementById("proposal-envelope-wrapper");
  if (proposalEnvelopeWrapper) {
    proposalEnvelopeWrapper.addEventListener("click", function(e) {
      if (!this.classList.contains("open")) {
        this.classList.add("open");
        e.stopPropagation();
      }
    });
  }

  // Clic en el botón de desbloqueo en la playlist para ir a propuesta final
  const btnUnlockProposal = document.getElementById("btn-unlock-proposal");
  const proposalScreen = document.getElementById("proposal-screen");
  if (btnUnlockProposal) {
    btnUnlockProposal.addEventListener("click", () => {
      if (!btnUnlockProposal.classList.contains("locked")) {
        fadeOutScreen(playlistScreen, () => {
          // Ocultar acumulador flotante en pantalla final
          const globalHeart = document.getElementById("global-heart-progress");
          if (globalHeart) {
            globalHeart.classList.add("hidden");
          }
          fadeInScreen(proposalScreen);
        });
      }
    });
  }

  // Lógica evasiva del botón NO
  const btnNo = document.getElementById("btn-proposal-no");
  if (btnNo) {
    const evade = () => {
      const padding = 20;
      const btnRect = btnNo.getBoundingClientRect();
      const maxX = window.innerWidth - btnRect.width - padding * 2;
      const maxY = window.innerHeight - btnRect.height - padding * 2;
      
      const randomX = Math.max(padding, Math.random() * maxX);
      const randomY = Math.max(padding, Math.random() * maxY);
      
      btnNo.style.position = "fixed";
      btnNo.style.left = `${randomX}px`;
      btnNo.style.top = `${randomY}px`;
      btnNo.style.zIndex = "10005";
    };
    btnNo.addEventListener("mouseenter", evade);
    btnNo.addEventListener("touchstart", (e) => {
      e.preventDefault();
      evade();
    });
    btnNo.addEventListener("focus", () => {
      btnNo.blur();
    });
  }

  // Lógica de aceptación del botón SÍ
  const btnYes = document.getElementById("btn-proposal-yes");
  const successCard = document.getElementById("success-card");
  if (btnYes && successCard) {
    btnYes.addEventListener("click", () => {
      // Ocultar el sobre de propuesta suavemente
      if (proposalEnvelopeWrapper) {
        proposalEnvelopeWrapper.style.opacity = "0";
        proposalEnvelopeWrapper.style.transform = "scale(0.85) translateY(50px)";
        proposalEnvelopeWrapper.style.pointerEvents = "none";
        proposalEnvelopeWrapper.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        
        setTimeout(() => {
          proposalEnvelopeWrapper.classList.add("hidden-screen");
        }, 600);
      }
      
      // Mostrar tarjeta de éxito
      setTimeout(() => {
        successCard.classList.remove("hidden");
        void successCard.offsetWidth; // forzar reflow
        successCard.classList.add("active");
      }, 500);
      
      // Detener cualquier preview activa
      stopPreview();
      
      // Iniciar lluvia de corazones romántica
      startHeartCelebration();
    });
  }

  // Inicializar listener de scroll para las letras
  initLyricsScrollListener();
});

/* ==========================================
   1. SISTEMA DE CIELO ESTRELLADO 🌌
   ========================================== */
function generateStars() {
  const sky = document.getElementById("starry-sky");
  const starCount = 120;
  
  for (let i = 0; i < starCount; i++) {
    const star = document.createElement("div");
    star.classList.add("star");
    
    // Posición aleatoria
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    star.style.left = `${x}%`;
    star.style.top = `${y}%`;
    
    // Tamaño aleatorio (0.5px a 2.5px)
    const size = Math.random() * 2 + 0.5;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    
    // Color y brillo aleatorio
    const colorChance = Math.random();
    if (colorChance < 0.15) {
      star.classList.add("gold");
    } else if (colorChance < 0.3) {
      star.classList.add("lavender");
    }
    
    // Velocidad de parpadeo y retardo aleatorio
    const speedChance = Math.random();
    if (speedChance < 0.33) {
      star.classList.add("twinkle-fast");
    } else if (speedChance < 0.66) {
      star.classList.add("twinkle-medium");
    } else {
      star.classList.add("twinkle-slow");
    }
    
    star.style.animationDelay = `${Math.random() * 5}s`;
    
    sky.appendChild(star);
  }
}

function startShootingStars() {
  const container = document.getElementById("shooting-stars");
  
  // Función para crear una estrella fugaz
  function createShootingStar() {
    const star = document.createElement("div");
    star.classList.add("shooting-star");
    
    // Posición inicial aleatoria en la parte superior derecha
    const startX = Math.random() * 50 + 50; // 50% a 100% de ancho
    const startY = Math.random() * 30; // 0% a 30% de alto
    
    star.style.left = `${startX}%`;
    star.style.top = `${startY}%`;
    
    // Duración y retraso aleatorios
    const duration = Math.random() * 2 + 2; // 2s a 4s
    star.style.animationDuration = `${duration}s`;
    
    container.appendChild(star);
    
    // Remover después de terminar la animación
    setTimeout(() => {
      star.remove();
    }, duration * 1000);
  }
  
  // Lanzar estrella fugaz periódicamente
  setInterval(() => {
    if (Math.random() > 0.3) {
      createShootingStar();
    }
  }, 7000);
}

/* ==========================================
   2. TRANSICIONES DE PANTALLA
   ========================================== */
function fadeOutScreen(screen, callback) {
  screen.style.opacity = "0";
  screen.style.transform = "scale(0.97)";
  screen.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  
  setTimeout(() => {
    screen.classList.remove("active-screen");
    screen.classList.add("hidden-screen");
    if (callback) callback();
  }, 500);
}

function fadeInScreen(screen) {
  screen.classList.remove("hidden-screen");
  screen.classList.add("active-screen");
  
  // Forzar reflujo
  void screen.offsetWidth;
  
  screen.style.opacity = "1";
  screen.style.transform = "scale(1)";
  screen.style.transition = "opacity 0.6s ease, transform 0.6s ease";
}

/* ==========================================
   3. RENDERIZADO DE LA PLAYLIST
   ========================================== */
function renderPlaylist() {
  const grid = document.getElementById("playlist-grid");
  grid.innerHTML = "";
  
  songsData.forEach((song, index) => {
    const card = document.createElement("div");
    card.classList.add("song-card");
    card.dataset.index = index;
    
    card.innerHTML = `
      <div class="card-cover-wrapper">
        <img src="${song.cover}" alt="Portada de ${song.title}" class="song-card-cover" onerror="this.src='https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=500&q=80'">
      </div>
      <div class="song-card-details">
        <h2 class="song-card-title">${song.title} <span class="song-card-artist">by ${song.artist}</span></h2>
        <p class="song-card-comment">"${song.comment}"</p>
      </div>
    `;
    
    card.addEventListener("click", () => {
      stopPreview();
      selectSong(index);
    });
    
    // Reproducir preview de audio al colocar el cursor
    card.addEventListener("mouseenter", () => {
      playPreview(song.preview);
      setAmbientGlow(song.cover);
    });
    
    // Detener preview al retirar el cursor
    card.addEventListener("mouseleave", () => {
      stopPreview();
      clearAmbientGlow();
    });
    
    grid.appendChild(card);
  });
}

/* ==========================================
   SISTEMA DE PREVIEWS DE AUDIO EN HOVER 🎵
   ========================================== */
function playPreview(previewUrl) {
  if (previewAudio) {
    previewAudio.pause();
    previewAudio = null;
  }
  if (previewTimeout) {
    clearTimeout(previewTimeout);
    previewTimeout = null;
  }
  
  if (!previewUrl) return;
  
  previewAudio = new Audio(previewUrl);
  previewAudio.volume = 0;
  
  previewAudio.play()
    .then(() => {
      // Fade-in gradual de 0 a 0.4 de volumen
      let fadeInterval = setInterval(() => {
        if (previewAudio && previewAudio.volume < 0.4) {
          previewAudio.volume = Math.min(0.4, previewAudio.volume + 0.05);
        } else {
          clearInterval(fadeInterval);
        }
      }, 50);
    })
    .catch((err) => {
      console.log("El navegador bloqueó la reproducción automática o se interrumpió:", err);
    });
    
  // Limitar el preview a exactamente 10 segundos
  previewTimeout = setTimeout(() => {
    stopPreview();
  }, 10000);
}

function stopPreview() {
  if (previewTimeout) {
    clearTimeout(previewTimeout);
    previewTimeout = null;
  }
  
  if (previewAudio) {
    const audioToStop = previewAudio;
    previewAudio = null; // remover referencia para evitar conflictos
    
    // Fade-out gradual del volumen antes de pausar
    let fadeInterval = setInterval(() => {
      if (audioToStop.volume > 0.05) {
        audioToStop.volume = Math.max(0, audioToStop.volume - 0.05);
      } else {
        clearInterval(fadeInterval);
        audioToStop.pause();
      }
    }, 50);
  }
}

/* ==========================================
   4. CONTROL DE REPRODUCCIÓN Y YOUTUBE API
   ========================================== */
function selectSong(index) {
  // Si ya se completó el corazón (9/9) y se hace clic en la primera canción (index 0), se reinicia el juego
  const collectedCount = collectedPieces.filter(p => p).length;
  if (index === 0 && collectedCount === 9) {
    collectedPieces = [false, false, false, false, false, false, false, false, false];
    localStorage.removeItem("collected_pieces");
    updateHeartProgressUI();
  }

  currentSongIndex = index;
  const song = songsData[index];
  const playerScreen = document.getElementById("player-screen");
  const playlistScreen = document.getElementById("playlist-screen");
  
  // Pausar música de fondo mientras se ve el video dedicado
  pauseBackgroundMusic();

  // Activar y mantener la iluminación ambiental con la portada de la canción seleccionada
  isPlayerActive = true; // El reproductor pasa a estar activo
  setAmbientGlow(song.cover);

  // Actualizar UI
  document.getElementById("player-song-title").textContent = song.title;
  document.getElementById("player-song-artist").textContent = `${song.artist} — ${song.album}`;
  
  // Resetear scrubber y tiempos
  const scrubber = document.getElementById("player-scrubber");
  if (scrubber) {
    scrubber.value = 0;
    scrubber.max = 100;
  }
  const curTimeDisplay = document.getElementById("player-current-time");
  if (curTimeDisplay) curTimeDisplay.textContent = "0:00";
  const totalTimeDisplay = document.getElementById("player-total-time");
  if (totalTimeDisplay) totalTimeDisplay.textContent = "-0:00";

  // Portada y brillo
  const coverImg = document.getElementById("player-song-cover");
  coverImg.src = song.cover;
  coverImg.onerror = function() {
    this.src = "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=500&q=80";
  };
  
  const coverGlow = document.getElementById("cover-glow-back");
  if (coverGlow) {
    coverGlow.style.backgroundImage = `url('${song.cover}')`;
  }
  
  // Cargar Letras
  loadLyrics(song.lyrics);
  
  // Resetear botón de play
  const playBtn = document.getElementById("btn-play-pause");
  if (playBtn) {
    playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
  }
  
  // Actualizar el corazón coleccionable del reproductor para esta canción
  updateCollectibleHeartUI(index);
  
  // Transicionar pantalla
  fadeOutScreen(playlistScreen, () => {
    fadeInScreen(playerScreen);
    // Cargar video de YouTube
    loadYoutubeVideo(song.youtubeId);
  });
}

// Variable global para almacenar la letra parseada de la canción actual
let currentParsedLyrics = [];

function parseLRC(lrcText) {
  const lines = lrcText.split("\n");
  const parsed = [];
  const timeRegex = /\[(\d+):(\d+)(?:\.(\d+))?\]/;
  
  lines.forEach(line => {
    const match = timeRegex.exec(line);
    if (match) {
      const mins = parseInt(match[1]);
      const secs = parseInt(match[2]);
      const ms = match[3] ? parseInt(match[3]) : 0;
      const totalSeconds = mins * 60 + secs + ms / 100;
      const text = line.replace(timeRegex, "").trim();
      parsed.push({ time: totalSeconds, text: text });
    }
  });
  
  if (parsed.length === 0) {
    return lines.map((line, idx) => ({ time: idx * 5, text: line.trim() }));
  }
  
  return parsed.sort((a, b) => a.time - b.time);
}

function loadLyrics(lyricsText) {
  const container = document.getElementById("lyrics-content");
  container.innerHTML = "";
  
  // Parsear la letra con marcas de tiempo
  currentParsedLyrics = parseLRC(lyricsText);
  
  currentParsedLyrics.forEach((lyric, idx) => {
    const line = document.createElement("p");
    line.classList.add("apple-lyrics-line");
    line.textContent = lyric.text;
    line.dataset.time = lyric.time;
    line.dataset.index = idx;
    
    // Al hacer clic en una línea de letra, adelantar el video
    line.addEventListener("click", function() {
      if (player && typeof player.seekTo === "function") {
        player.seekTo(lyric.time, true);
        highlightActiveLyric(idx, true);
      }
    });
    
    container.appendChild(line);
  });
  
  // Activar la primera línea por defecto
  highlightActiveLyric(0, false);
}

function highlightActiveLyric(index, isUserClick = false) {
  const container = document.getElementById("lyrics-content");
  const lines = document.querySelectorAll(".apple-lyrics-line");
  if (lines.length === 0 || index < 0 || index >= lines.length) return;
  
  const activeLine = lines[index];
  
  // Resaltar la línea activa
  lines.forEach(l => l.classList.remove("active"));
  activeLine.classList.add("active");
  
  // Si el usuario se desplazó manualmente, NO auto-scrollear a menos que sea un clic directo (o reanudación por temporizador)
  if (isUserScrolling && !isUserClick) {
    showSyncLyricsButton();
    return;
  }
  
  // Centrar línea en scroll
  const containerHeight = container.clientHeight;
  const lineOffset = activeLine.offsetTop;
  const linePercent = (lineOffset - containerHeight / 2) + (activeLine.clientHeight / 2);
  
  isAutoScrolling = true;
  container.scrollTo({
    top: linePercent,
    behavior: 'smooth'
  });
  
  // Ocultar el botón de sincronización ya que el scroll está al día
  hideSyncLyricsButton();
}

function initLyricsScrollListener() {
  const container = document.getElementById("lyrics-content");
  if (!container) return;
  
  container.addEventListener("scroll", () => {
    if (isAutoScrolling) {
      // Este evento de scroll fue iniciado programáticamente, no cuenta como manual
      return;
    }
    
    // Si llegamos aquí, el usuario scrolleó manualmente
    isUserScrolling = true;
    showSyncLyricsButton();
    
    // Limpiar timeout anterior
    if (userScrollTimeout) clearTimeout(userScrollTimeout);
    
    // Reanudar el auto-scroll automáticamente después de 5 segundos de inactividad
    userScrollTimeout = setTimeout(() => {
      isUserScrolling = false;
      const activeLine = document.querySelector(".apple-lyrics-line.active");
      if (activeLine) {
        const index = parseInt(activeLine.dataset.index);
        highlightActiveLyric(index, true); // Forzar scroll suave
      }
    }, 5000);
  });
}

function showSyncLyricsButton() {
  let btn = document.getElementById("btn-sync-lyrics");
  if (!btn) {
    const lyricContainer = document.getElementById("lyrics-container");
    if (!lyricContainer) return;
    
    btn = document.createElement("button");
    btn.id = "btn-sync-lyrics";
    btn.className = "btn-sync-lyrics-floating";
    btn.innerHTML = `<i class="fa-solid fa-arrows-to-dot"></i> Sincronizar letra`;
    btn.addEventListener("click", () => {
      isUserScrolling = false;
      if (userScrollTimeout) clearTimeout(userScrollTimeout);
      const activeLine = document.querySelector(".apple-lyrics-line.active");
      if (activeLine) {
        const index = parseInt(activeLine.dataset.index);
        highlightActiveLyric(index, true); // Forzar scroll
      }
    });
    lyricContainer.appendChild(btn);
  }
  btn.classList.add("visible");
}

function hideSyncLyricsButton() {
  const btn = document.getElementById("btn-sync-lyrics");
  if (btn) {
    btn.classList.remove("visible");
  }
}

// Cargar/actualizar video de YouTube
function loadYoutubeVideo(youtubeId) {
  clearVideoErrorOverlay();
  if (player && typeof player.loadVideoById === "function") {
    // Si el reproductor ya existe, solo cargamos la nueva ID
    player.loadVideoById({
      videoId: youtubeId,
      suggestedQuality: 'default'
    });
  } else {
    // Si no, inicializamos la API (se requiere window.YT cargado por el script de index.html)
    if (window.YT && window.YT.Player) {
      initPlayer(youtubeId);
    } else {
      // Reintentar si la API tarda en cargar
      setTimeout(() => loadYoutubeVideo(youtubeId), 200);
    }
  }
}

function initPlayer(youtubeId) {
  player = new YT.Player('youtube-player-placeholder', {
    height: '100%',
    width: '100%',
    videoId: youtubeId,
    playerVars: {
      autoplay: 1,
      controls: 1,         // Permitimos controles para adelantar/retroceder si quiere
      modestbranding: 1,   // Quitar logo grande de YouTube
      rel: 0,              // No mostrar videos relacionados ajenos
      showinfo: 0,
      iv_load_policy: 3,
      origin: window.location.origin || '*'
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange,
      'onError': onPlayerError
    }
  });
}

function onPlayerError(event) {
  console.error("Error en el reproductor de YouTube:", event.data);
  let errMsg = "Ocurrió un error al cargar el video.";
  if (event.data === 101 || event.data === 150) {
    errMsg = "Este video tiene restricciones del autor y no se permite reproducir aquí. (Error 150)";
  } else if (event.data === 2) {
    errMsg = "El ID del video no es válido. (Error 2)";
  } else if (event.data === 100) {
    errMsg = "El video no fue encontrado o es privado. (Error 100)";
  }
  showVideoErrorOverlay(errMsg);
}

function showVideoErrorOverlay(message) {
  const existing = document.getElementById("video-error-overlay");
  if (existing) existing.remove();
  
  const placeholder = document.getElementById("youtube-player-placeholder");
  if (!placeholder) return;
  
  const container = placeholder.parentElement;
  if (!container) return;
  
  const overlay = document.createElement("div");
  overlay.id = "video-error-overlay";
  overlay.className = "video-error-overlay";
  overlay.innerHTML = `
    <div class="video-error-content" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(20, 20, 25, 0.95); display: flex; flex-direction: column; justify-content: center; align-items: center; color: #ff3366; padding: 20px; text-align: center; z-index: 100; border-radius: 12px; box-sizing: border-box; backdrop-filter: blur(8px);">
      <i class="fa-solid fa-triangle-exclamation" style="font-size: 2.5rem; margin-bottom: 15px; text-shadow: 0 0 10px rgba(255,51,102,0.4);"></i>
      <p style="font-weight: 600; font-size: 1.1rem; margin-bottom: 8px; font-family: 'Montserrat', sans-serif;">Error de YouTube</p>
      <p style="font-size: 0.9rem; color: #ccc; margin-bottom: 12px; font-family: 'Montserrat', sans-serif; max-width: 280px; line-height: 1.4;">${message}</p>
      <p style="font-size: 0.75rem; color: #888; font-family: 'Montserrat', sans-serif; font-style: italic;">Intenta recargar (Ctrl+F5) o selecciona otra canción.</p>
    </div>
  `;
  container.appendChild(overlay);
}

function clearVideoErrorOverlay() {
  const existing = document.getElementById("video-error-overlay");
  if (existing) existing.remove();
}

function onPlayerReady(event) {
  isPlayerReady = true;
  
  // Sincronizar volumen inicial con el slider
  const volumeSlider = document.getElementById("player-volume");
  if (volumeSlider) {
    event.target.setVolume(parseInt(volumeSlider.value));
  }
  
  event.target.playVideo();
}

function onPlayerStateChange(event) {
  const playBtn = document.getElementById("btn-play-pause");
  
  // YT.PlayerState.PLAYING = 1
  // YT.PlayerState.PAUSED = 2
  // YT.PlayerState.ENDED = 0
  if (event.data === YT.PlayerState.PLAYING) {
    if (playBtn) {
      playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    }
    startProgressSync();
  } else {
    if (playBtn) {
      playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
    }
    stopProgressSync();
    
    // Si el video termina
    if (event.data === YT.PlayerState.ENDED) {
      if (isRepeat) {
        player.seekTo(0);
        player.playVideo();
      } else {
        playNextSong();
      }
    }
  }
}

function togglePlayPause() {
  if (player && isPlayerReady) {
    const state = player.getPlayerState();
    if (state === YT.PlayerState.PLAYING) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
  }
}

function playPreviousSong() {
  if (isShuffle && songsData.length > 1) {
    let prevIndex = currentSongIndex;
    while (prevIndex === currentSongIndex) {
      prevIndex = Math.floor(Math.random() * songsData.length);
    }
    selectSong(prevIndex);
  } else {
    let prevIndex = currentSongIndex - 1;
    if (prevIndex < 0) {
      prevIndex = songsData.length - 1; // Ir al final
    }
    selectSong(prevIndex);
  }
}

function playNextSong() {
  if (isShuffle && songsData.length > 1) {
    let nextIndex = currentSongIndex;
    while (nextIndex === currentSongIndex) {
      nextIndex = Math.floor(Math.random() * songsData.length);
    }
    selectSong(nextIndex);
  } else {
    let nextIndex = currentSongIndex + 1;
    if (nextIndex >= songsData.length) {
      nextIndex = 0; // Regresar al inicio
    }
    selectSong(nextIndex);
  }
}

// ==========================================
// FUNCIONES DE SINCRONIZACIÓN DE PROGRESO (APPLE MUSIC STYLE)
// ==========================================
function startProgressSync() {
  stopProgressSync();
  progressInterval = setInterval(updateProgress, 250);
}

function stopProgressSync() {
  if (progressInterval) {
    clearInterval(progressInterval);
    progressInterval = null;
  }
}

function updateProgress() {
  if (!player || typeof player.getCurrentTime !== "function" || isDraggingScrubber) return;
  
  const currentTime = player.getCurrentTime() || 0;
  const duration = player.getDuration() || 0;
  
  const scrubber = document.getElementById("player-scrubber");
  const curTimeDisplay = document.getElementById("player-current-time");
  const totalTimeDisplay = document.getElementById("player-total-time");
  
  if (scrubber) {
    scrubber.max = duration;
    scrubber.value = currentTime;
  }
  
  if (curTimeDisplay) {
    curTimeDisplay.textContent = formatTime(currentTime);
  }
  
  if (totalTimeDisplay) {
    if (duration > 0) {
      const remainingTime = duration - currentTime;
      totalTimeDisplay.textContent = "-" + formatTime(remainingTime);
    } else {
      totalTimeDisplay.textContent = "-0:00";
    }
  }

  // Sincronizar letra con el tiempo de reproducción actual
  if (currentParsedLyrics && currentParsedLyrics.length > 0) {
    let activeIdx = 0;
    const lyricOffset = 0.0; // Sincronización base directa sin adelanto artificial
    for (let i = 0; i < currentParsedLyrics.length; i++) {
      if (currentTime + lyricOffset >= currentParsedLyrics[i].time) {
        activeIdx = i;
      } else {
        break;
      }
    }
    highlightActiveLyric(activeIdx);
  }
}

function formatTime(seconds) {
  if (isNaN(seconds) || seconds < 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

/* ==========================================
   5. CONTROL DE MÚSICA DE FONDO (WOS) 🎵
   ========================================== */
const bgMusicUrlPreview = "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/40/58/f0/4058f083-e081-04bd-be3f-81d3438d03e8/mzaf_1475839651012827858.plus.aac.p.m4a";

function playBackgroundMusic() {
  if (bgMusicStarted) return;
  bgMusicStarted = true;
  console.log("Iniciando reproducción de música de fondo...");

  bgAudio = new Audio(bgMusicUrlPreview);
  bgAudio.loop = true;
  bgAudio.volume = 0.35; // Volumen de fondo agradable (35%)
  
  bgAudio.play()
    .then(() => {
      console.log("Música de fondo reproducida con éxito.");
    })
    .catch((err) => {
      console.log("El navegador bloqueó la reproducción de la música de fondo o se interrumpió:", err);
    });
}

function pauseBackgroundMusic() {
  if (bgAudio) {
    bgAudio.pause();
  }
}

/* ==========================================
   6. CONTROLES DE ILUMINACIÓN AMBIENTAL (AMBIENT GLOW) 🎨
   ========================================== */
function setAmbientGlow(coverUrl) {
  const glow = document.getElementById("ambient-glow");
  if (glow) {
    glow.style.backgroundImage = `url('${coverUrl}')`;
    glow.classList.add("active");
  }
}

function clearAmbientGlow() {
  if (isPlayerActive) return; // Si el reproductor está activo, ignoramos el borrado
  const glow = document.getElementById("ambient-glow");
  if (glow) {
    glow.classList.remove("active");
  }
}

/* ==========================================
   7. FUNCIONES AUXILIARES DEL MINIJUEGO DEL CORAZÓN ❤️🕸️
   ========================================== */

// Actualizar el acumulador flotante global en la esquina inferior derecha
function updateHeartProgressUI() {
  let count = 0;
  const totalSongs = songsData.length;
  for (let i = 0; i < totalSongs; i++) {
    const seg = document.getElementById(`global-seg-${i}`);
    if (seg) {
      if (collectedPieces[i]) {
        seg.classList.add("collected");
        count++;
      } else {
        seg.classList.remove("collected");
      }
    }
  }
  
  const countEl = document.getElementById("global-collected-count");
  if (countEl) {
    countEl.textContent = count;
  }
  
  // Habilitar / Deshabilitar botón de propuesta en playlist
  const btnUnlock = document.getElementById("btn-unlock-proposal");
  if (btnUnlock) {
    if (count === totalSongs) {
      btnUnlock.classList.remove("locked");
      btnUnlock.classList.add("unlocked");
      btnUnlock.removeAttribute("disabled");
      btnUnlock.innerHTML = `<i class="fa-solid fa-heart-circle-check"></i> <span>¡Mi corazón está completo! Entrar ❤️</span>`;
    } else {
      btnUnlock.classList.add("locked");
      btnUnlock.classList.remove("unlocked");
      btnUnlock.setAttribute("disabled", "true");
      btnUnlock.innerHTML = `<i class="fa-solid fa-lock"></i> <span>Junta los ${totalSongs} fragmentos de mi corazón (${count}/${totalSongs}) ❤️</span>`;
    }
  }
}

// Resaltar o marcar como colectada la sección respectiva del corazón en el reproductor
function updateCollectibleHeartUI(songIndex) {
  // Limpiar todos los segmentos en el reproductor
  const totalSongs = songsData.length;
  for (let i = 0; i < totalSongs; i++) {
    const seg = document.getElementById(`coll-seg-${i}`);
    if (seg) {
      seg.classList.remove("highlighted", "collected");
      if (collectedPieces[i]) {
        seg.classList.add("collected");
      }
    }
  }
  
  // Resaltar el segmento específico de la canción actual
  const activeSeg = document.getElementById(`coll-seg-${songIndex}`);
  const wrapper = document.getElementById("collectible-heart-wrapper");
  if (activeSeg) {
    if (collectedPieces[songIndex]) {
      activeSeg.classList.add("collected");
      if (wrapper) wrapper.setAttribute("title", "¡Ya tienes esta parte de mi corazón! ❤️");
    } else {
      activeSeg.classList.add("highlighted");
      if (wrapper) wrapper.setAttribute("title", "¡Haz clic para recolectar este pedazo de mi corazón! ❤️");
    }
  }
}

// Animación de vuelo físico del fragmento desde el reproductor hasta el acumulador
function triggerFlyAnimation(songIndex) {
  const collHeartWrapper = document.getElementById("collectible-heart-wrapper");
  const globalHeartContainer = document.getElementById("global-heart-progress");
  
  if (!collHeartWrapper || !globalHeartContainer) return;
  
  const sourceSeg = document.getElementById(`coll-seg-${songIndex}`);
  const targetSeg = document.getElementById(`global-seg-${songIndex}`);
  
  if (!sourceSeg || !targetSeg) return;
  
  // Obtener las coordenadas físicas en pantalla de origen y destino
  const srcRect = collHeartWrapper.getBoundingClientRect();
  const destRect = globalHeartContainer.getBoundingClientRect();
  
  // Crear un elemento clonado temporal para la animación
  const flyContainer = document.createElement("div");
  flyContainer.className = "flying-heart-piece";
  
  // Posición inicial en el origen
  flyContainer.style.left = `${srcRect.left + window.scrollX}px`;
  flyContainer.style.top = `${srcRect.top + window.scrollY}px`;
  flyContainer.style.width = `${srcRect.width}px`;
  flyContainer.style.height = `${srcRect.height}px`;
  
  // Crear SVG clonado con el segmento respectivo resaltado
  flyContainer.innerHTML = `
    <svg viewBox="0 0 100 100" style="width: 100%; height: 100%; overflow: visible;">
      <defs>
        <clipPath id="fly-clip">
          <path d="M50 88.5 L44.3 83.3 C23.2 64.2 10 51.5 10 36 C10 23.3 19.9 13.5 32.5 13.5 C39.6 13.5 46.4 16.8 50 22 C53.6 16.8 60.4 13.5 67.5 13.5 C80.1 13.5 90 23.3 90 36 C90 51.5 76.8 64.2 55.7 83.3 Z" />
        </clipPath>
      </defs>
      <g clip-path="url(#fly-clip)">
        <path d="${sourceSeg.getAttribute("d")}" fill="#ff3366" style="filter: drop-shadow(0 0 8px #ff3366);" />
      </g>
    </svg>
  `;
  
  document.body.appendChild(flyContainer);
  
  // Forzar reflujo
  void flyContainer.offsetWidth;
  
  // Posición final en el destino con transformaciones de giro y escala
  flyContainer.style.left = `${destRect.left + window.scrollX}px`;
  flyContainer.style.top = `${destRect.top + window.scrollY}px`;
  flyContainer.style.width = `${destRect.width}px`;
  flyContainer.style.height = `${destRect.height}px`;
  flyContainer.style.transform = "rotate(720deg) scale(0.8)";
  flyContainer.style.opacity = "0.4";
  
  // Al terminar la animación de 1.2 segundos
  setTimeout(() => {
    flyContainer.remove();
    
    // Marcar en estado global y persistir
    collectedPieces[songIndex] = true;
    localStorage.setItem("collected_pieces", JSON.stringify(collectedPieces));
    
    // Actualizar interfaces
    updateHeartProgressUI();
    updateCollectibleHeartUI(songIndex);
    
    // Añadir efecto de brillo y pulso en el acumulador global
    globalHeartContainer.classList.add("pulse-glow");
    setTimeout(() => {
      globalHeartContainer.classList.remove("pulse-glow");
    }, 1000);
    
  }, 1200);
}

// Lluvia romántica de celebración (corazones y rosas flotantes)
function startHeartCelebration() {
  const container = document.getElementById("celebration-container");
  if (!container) return;
  
  container.innerHTML = "";
  
  const duration = 12000; // 12 segundos intensos
  const end = Date.now() + duration;
  
  // Ráfaga inicial
  const interval = setInterval(() => {
    if (Date.now() > end) {
      clearInterval(interval);
      // Mantener flujo continuo más sutil
      setInterval(createSingleHeart, 700);
      return;
    }
    
    for (let i = 0; i < 5; i++) {
      createSingleHeart();
    }
  }, 150);
  
  function createSingleHeart() {
    const heart = document.createElement("div");
    heart.className = "floating-heart";
    
    const heartTypes = ["❤️", "💖", "💕", "🌹", "✨", "💓", "💘", "🌹", "✨"];
    heart.textContent = heartTypes[Math.floor(Math.random() * heartTypes.length)];
    
    const startX = Math.random() * 100;
    heart.style.left = `${startX}vw`;
    
    const drift = (Math.random() * 200 - 100);
    const rotation = (Math.random() * 360 - 180);
    const scale = (Math.random() * 1.4 + 0.6);
    const delay = Math.random() * 0.5;
    const duration = Math.random() * 3 + 2;
    
    heart.style.setProperty("--drift", `${drift}px`);
    heart.style.setProperty("--rotation", `${rotation}deg`);
    heart.style.setProperty("--scale", scale);
    heart.style.animationDelay = `${delay}s`;
    heart.style.animationDuration = `${duration}s`;
    
    heart.style.fontSize = `${1.2 * scale}rem`;
    
    container.appendChild(heart);
    
    setTimeout(() => {
      heart.remove();
    }, (duration + delay) * 1000);
  }
}
