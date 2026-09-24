/**
 * HUENING KAI PORTFOLIO - SCRIPT INTERAKTIF & AUDIO PLAYER ENGINE
 * Sesuai dengan spesifikasi PRD Desain Huening Kai & Fitur Pemutar Lagu per Kartu
 */

document.addEventListener('DOMContentLoaded', () => {
  // ====================================================================
  // 1. LOADING SCREEN (1 Detik Fade Out)
  // ====================================================================
  const loadingScreen = document.getElementById('loading-screen');
  if (loadingScreen) {
    setTimeout(() => {
      loadingScreen.classList.add('fade-out');
      setTimeout(() => {
        loadingScreen.style.display = 'none';
      }, 800);
    }, 1000);
  }

  // ====================================================================
  // 2. CUSTOM CURSOR FOLLOWER
  // ====================================================================
  const cursorDot = document.querySelector('.custom-cursor-dot');
  const cursorOutline = document.querySelector('.custom-cursor-outline');

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let outlineX = mouseX;
  let outlineY = mouseY;

  if (cursorDot && cursorOutline) {
    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    });

    const animateCursor = () => {
      outlineX += (mouseX - outlineX) * 0.18;
      outlineY += (mouseY - outlineY) * 0.18;

      cursorOutline.style.left = `${outlineX}px`;
      cursorOutline.style.top = `${outlineY}px`;

      requestAnimationFrame(animateCursor);
    };
    requestAnimationFrame(animateCursor);

    const updateInteractiveElements = () => {
      const interactiveElements = document.querySelectorAll(
        'a, button, .disco-card-container, .discipline-pill, .social-card, .hero-point-item, .player-toggle, .timeline-item, .career-item'
      );
      interactiveElements.forEach((el) => {
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
      });
    };
    updateInteractiveElements();
  }

  // ====================================================================
  // 3. HERO PARALLAX MOUSE EFFECT
  // ====================================================================
  const heroSection = document.getElementById('hero-section');
  const portfolioBgText = document.querySelector('.hero-bg-portfolio-text');
  const heroImage = document.querySelector('.hero-image');

  if (heroSection && portfolioBgText) {
    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      const moveX = -(x * 0.035);
      const moveY = -(y * 0.025);
      portfolioBgText.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px))`;

      if (heroImage) {
        const imgX = x * 0.015;
        const imgY = y * 0.015;
        heroImage.style.transform = `translate(${imgX}px, ${imgY}px)`;
      }
    });

    heroSection.addEventListener('mouseleave', () => {
      portfolioBgText.style.transform = `translate(-50%, -50%)`;
      if (heroImage) {
        heroImage.style.transform = `translate(0px, 0px)`;
      }
    });
  }

  // ====================================================================
  // 4. THE MUSICAL JOURNEY - TIMELINE SCROLL PROGRESS
  // ====================================================================
  const timelineSection = document.getElementById('musical-journey-timeline');
  const timelineProgressFill = document.querySelector('.timeline-progress-fill');
  const timelineDots = document.querySelectorAll('.timeline-dot');

  if (timelineSection && timelineProgressFill) {
    const updateTimelineProgress = () => {
      const rect = timelineSection.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const startTrigger = windowHeight * 0.85;
      const totalDistance = rect.height + windowHeight * 0.4;
      const currentScroll = startTrigger - rect.top;

      let progressRatio = currentScroll / totalDistance;
      progressRatio = Math.max(0, Math.min(1, progressRatio));

      timelineProgressFill.style.height = `${progressRatio * 100}%`;

      timelineDots.forEach((dot, index) => {
        const dotThreshold = (index + 0.5) / timelineDots.length;
        if (progressRatio >= dotThreshold) {
          dot.style.backgroundColor = '#ff2a55';
          dot.style.boxShadow = '0 0 10px rgba(255, 42, 85, 0.8)';
        } else {
          dot.style.backgroundColor = 'transparent';
          dot.style.boxShadow = 'none';
        }
      });
    };

    window.addEventListener('scroll', updateTimelineProgress, { passive: true });
    updateTimelineProgress();
  }

  // ====================================================================
  // 5. TOAST NOTIFICATION SYSTEM
  // ====================================================================
  const toast = document.getElementById('toast-notification');
  const toastMessage = document.getElementById('toast-message');
  let toastTimer = null;

  function showToast(message) {
    if (!toast || !toastMessage) return;

    toastMessage.textContent = message;
    toast.classList.add('show');

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3500);
  }

  // ====================================================================
  // 6. REAL AUDIO MP3 & SYNTH ENGINE
  // Memutar file musik asli dari folder musik/ untuk masing-masing kartu album
  // 1. FREEFALL -> Growing Pain.mp3
  // 2. FREEZE -> 0X1=LOVESONG (I Know I Love You) feat. Seori
  // 3. TOMORROW -> 'Deja Vu' Official MV.mp3
  // 4. YOUNGBLOOD -> HUENINGKAI's Youngblood Live Band Cover
  // ====================================================================

  const trackDatabase = [
    {
      id: 0,
      title: "THE NAME CHAPTER: FREEFALL",
      trackName: "Growing Pain",
      sub: "Track 01: Growing Pain — The Name Chapter: FREEFALL",
      artwork: "FREEFALL // HK",
      genre: "Hard Rock / Indie Grunge",
      audioFiles: [
        "musik/Growing Pain.mp3",
        "./musik/Growing Pain.mp3",
        "musik/Growing%20Pain.mp3"
      ],
      notes: [
        { f: 261.63, d: 0.35, type: 'sawtooth' },
        { f: 311.13, d: 0.35, type: 'sawtooth' },
        { f: 392.00, d: 0.35, type: 'sawtooth' },
        { f: 466.16, d: 0.70, type: 'sawtooth' },
        { f: 392.00, d: 0.35, type: 'sawtooth' },
        { f: 349.23, d: 0.35, type: 'sawtooth' },
        { f: 311.13, d: 0.70, type: 'sine' },
        { f: 261.63, d: 0.80, type: 'sine' }
      ],
      speed: 360,
      filterFreq: 1100
    },
    {
      id: 1,
      title: "THE CHAOS CHAPTER: FREEZE",
      trackName: "0X1=LOVESONG (feat. Seori)",
      sub: "Title Track: 0X1=LOVESONG (feat. Seori) — FREEZE",
      artwork: "FREEZE // HK",
      genre: "Hybrid Pop Rock / Emotive Vocals",
      audioFiles: [
        "musik/TXT (투모로우바이투게더) '0X1=LOVESONG (I Know I Love You) feat. Seori' Official MV.mp3",
        "./musik/TXT (투모로우바이투게더) '0X1=LOVESONG (I Know I Love You) feat. Seori' Official MV.mp3",
        encodeURI("musik/TXT (투모로우바이투게더) '0X1=LOVESONG (I Know I Love You) feat. Seori' Official MV.mp3")
      ],
      notes: [
        { f: 329.63, d: 0.20, type: 'sawtooth' },
        { f: 329.63, d: 0.20, type: 'sawtooth' },
        { f: 493.88, d: 0.30, type: 'sawtooth' },
        { f: 493.88, d: 0.25, type: 'sawtooth' },
        { f: 554.37, d: 0.30, type: 'sawtooth' },
        { f: 440.00, d: 0.40, type: 'sawtooth' },
        { f: 329.63, d: 0.25, type: 'sawtooth' },
        { f: 493.88, d: 0.50, type: 'sawtooth' }
      ],
      speed: 240,
      filterFreq: 2400
    },
    {
      id: 2,
      title: "MINISODE 3: TOMORROW",
      trackName: "Deja Vu",
      sub: "Title Track: Deja Vu — minisode 3: TOMORROW",
      artwork: "TOMORROW // HK",
      genre: "Warm Piano & Nostalgic Acoustic",
      audioFiles: [
        "musik/'Deja Vu' Official MV.mp3",
        "./musik/'Deja Vu' Official MV.mp3",
        encodeURI("musik/'Deja Vu' Official MV.mp3")
      ],
      notes: [
        { f: 369.99, d: 0.45, type: 'sine' },
        { f: 440.00, d: 0.45, type: 'sine' },
        { f: 554.37, d: 0.60, type: 'triangle' },
        { f: 587.33, d: 0.45, type: 'sine' },
        { f: 554.37, d: 0.45, type: 'triangle' },
        { f: 440.00, d: 0.45, type: 'sine' },
        { f: 329.63, d: 0.85, type: 'sine' }
      ],
      speed: 460,
      filterFreq: 1400
    },
    {
      id: 3,
      title: "YOUNGBLOOD (LIVE BAND SET)",
      trackName: "Youngblood (5SOS Cover)",
      sub: "Special Stage: Youngblood — Huening Kai Solo Rock Set",
      artwork: "YOUNGBLOOD // HK",
      genre: "Stadium Rock / Driving Bass",
      audioFiles: [
        "musik/HUENINGKAI's Youngblood (Original Song 5 Seconds of Summer) - TXT (투모로우바이투게더).mp3",
        "./musik/HUENINGKAI's Youngblood (Original Song 5 Seconds of Summer) - TXT (투모로우바이투게더).mp3",
        encodeURI("musik/HUENINGKAI's Youngblood (Original Song 5 Seconds of Summer) - TXT (투모로우바이투게더).mp3")
      ],
      notes: [
        { f: 293.66, d: 0.25, type: 'sawtooth' },
        { f: 293.66, d: 0.25, type: 'sawtooth' },
        { f: 349.23, d: 0.30, type: 'sawtooth' },
        { f: 261.63, d: 0.30, type: 'sawtooth' },
        { f: 392.00, d: 0.45, type: 'sawtooth' },
        { f: 349.23, d: 0.35, type: 'sawtooth' },
        { f: 293.66, d: 0.65, type: 'sawtooth' }
      ],
      speed: 280,
      filterFreq: 2100
    }
  ];

  // Audio Engine Instance Tunggal
  const audioPlayer = new Audio();
  let activeTrackIndex = 0;
  let isPlaying = false;
  let synthLoopTimeout = null;
  let currentNoteIndex = 0;
  let audioCtx = null;
  let masterGain = null;
  let pulseInterval = null;

  // Event listener audio bawaan
  audioPlayer.addEventListener('ended', () => {
    // Putar album berikutnya otomatis
    const nextIndex = (activeTrackIndex + 1) % trackDatabase.length;
    showToast(`Next Track: ${trackDatabase[nextIndex].trackName}`);
    playTrack(nextIndex);
  });

  audioPlayer.addEventListener('pause', () => {
    if (isPlaying) {
      isPlaying = false;
      updateUIPlayerState(false);
    }
  });

  function initAudioContext() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
      masterGain = audioCtx.createGain();
      masterGain.gain.setValueAtTime(0.35, audioCtx.currentTime);
      masterGain.connect(audioCtx.destination);
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function playSynthFallback(track) {
    if (!isPlaying) return;
    initAudioContext();

    const currentNote = track.notes[currentNoteIndex];
    if (currentNote) {
      try {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        const filter = audioCtx.createBiquadFilter();

        osc.type = currentNote.type || 'sawtooth';
        osc.frequency.setValueAtTime(currentNote.f, audioCtx.currentTime);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(track.filterFreq || 1500, audioCtx.currentTime);
        filter.Q.setValueAtTime(3.5, audioCtx.currentTime);

        const now = audioCtx.currentTime;
        const duration = currentNote.d || 0.3;

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.exponentialRampToValueAtTime(0.24, now + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(masterGain);

        osc.start(now);
        osc.stop(now + duration + 0.05);

        pulseEqualizerBars();
      } catch (e) {
        console.warn(e);
      }
    }

    currentNoteIndex = (currentNoteIndex + 1) % track.notes.length;
    synthLoopTimeout = setTimeout(() => playSynthFallback(track), track.speed);
  }

  function tryPlayAudioFile(track, fileIndex = 0) {
    if (!track.audioFiles || fileIndex >= track.audioFiles.length) {
      // Jika file MP3 lokal tidak dapat dimuat, gunakan fallback melodis
      console.log(`File audio MP3 belum dapat diakses untuk ${track.title}. Memutar fallback sintetis.`);
      showToast(`🎵 Playing Audio Preview: ${track.trackName || track.title}`);
      playSynthFallback(track);
      return;
    }

    const filePath = track.audioFiles[fileIndex];
    audioPlayer.src = filePath;
    audioPlayer.load();

    const playPromise = audioPlayer.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        isPlaying = true;
        updateUIPlayerState(true, track);
        showToast(`🎶 Now Playing: ${track.trackName} (${track.title})`);
        setIntervalPulse();
      }).catch((err) => {
        console.warn(`Format/Path audio (${filePath}) tidak tembus, mencoba opsi berikutnya:`, err);
        tryPlayAudioFile(track, fileIndex + 1);
      });
    }
  }

  function setIntervalPulse() {
    if (pulseInterval) clearInterval(pulseInterval);
    pulseInterval = setInterval(() => {
      if (isPlaying) {
        pulseEqualizerBars();
      }
    }, 120);
  }

  function stopAudio() {
    isPlaying = false;
    audioPlayer.pause();
    if (synthLoopTimeout) {
      clearTimeout(synthLoopTimeout);
      synthLoopTimeout = null;
    }
    if (pulseInterval) {
      clearInterval(pulseInterval);
      pulseInterval = null;
    }
    currentNoteIndex = 0;
    updateUIPlayerState(false);
  }

  function playTrack(index) {
    initAudioContext();

    // Toggle pause/resume jika track yang sama diklik
    if (activeTrackIndex === index && audioPlayer.src) {
      if (isPlaying) {
        stopAudio();
        showToast(`Paused: ${trackDatabase[index].trackName || trackDatabase[index].title}`);
        return;
      } else {
        const resumePromise = audioPlayer.play();
        if (resumePromise !== undefined) {
          resumePromise.then(() => {
            isPlaying = true;
            updateUIPlayerState(true, trackDatabase[index]);
            showToast(`Resumed: ${trackDatabase[index].trackName || trackDatabase[index].title}`);
            setIntervalPulse();
          }).catch(() => {
            tryPlayAudioFile(trackDatabase[index], 0);
          });
          return;
        }
      }
    }

    // Hentikan audio sebelumnya
    stopAudio();

    activeTrackIndex = index;
    isPlaying = true;
    currentNoteIndex = 0;

    const track = trackDatabase[activeTrackIndex];
    updateUIPlayerState(true, track);

    // Putar file MP3 dari folder musik
    tryPlayAudioFile(track, 0);
  }

  // ====================================================================
  // 7. UI SYNC & INTERACTIVE PLAYER UPDATES
  // ====================================================================
  const playerToggle = document.getElementById('player-toggle-btn');
  const playerIcon = document.getElementById('player-icon');
  const equalizerContainer = document.getElementById('equalizer-container');
  const playerStatusText = document.getElementById('player-status-text');
  const playerBlinkDot = document.getElementById('player-indicator-dot');
  const playerSongTitle = document.getElementById('player-song-title');
  const playerSongSubtitle = document.getElementById('player-song-subtitle');
  const playerArtworkTag = document.getElementById('player-artwork-tag');

  const discoCards = document.querySelectorAll('.disco-card-container');
  const allBadges = document.querySelectorAll('.track-play-badge');

  function updateUIPlayerState(playing, track = trackDatabase[activeTrackIndex]) {
    // 1. Update Discography Cards Active State
    discoCards.forEach((card) => {
      const cardTrackIdx = parseInt(card.getAttribute('data-track'), 10);
      const badge = document.getElementById(`badge-track-${cardTrackIdx}`);

      if (playing && cardTrackIdx === activeTrackIndex) {
        card.classList.add('is-playing', 'active-card');
        if (badge) {
          badge.classList.remove('hidden-badge');
          badge.classList.add('active-badge');
        }
      } else {
        card.classList.remove('is-playing', 'active-card');
        if (badge) {
          badge.classList.add('hidden-badge');
          badge.classList.remove('active-badge');
        }
      }
    });

    // 2. Update Music Player Card (Right Bottom)
    if (playing) {
      if (equalizerContainer) equalizerContainer.classList.remove('equalizer-paused');
      if (playerStatusText) playerStatusText.textContent = `NOW PLAYING — TRACK 0${track.id + 1}`;
      if (playerBlinkDot) {
        playerBlinkDot.classList.remove('opacity-30', 'bg-rose-500');
        playerBlinkDot.classList.add('bg-emerald-400');
      }
      if (playerIcon) {
        playerIcon.innerHTML = `<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>`; // Pause Icon
      }
      if (playerSongTitle) playerSongTitle.textContent = track.title;
      if (playerSongSubtitle) playerSongSubtitle.textContent = track.sub;
      if (playerArtworkTag) playerArtworkTag.textContent = track.artwork;
    } else {
      if (equalizerContainer) equalizerContainer.classList.add('equalizer-paused');
      if (playerStatusText) playerStatusText.textContent = 'PAUSED';
      if (playerBlinkDot) {
        playerBlinkDot.classList.add('opacity-30');
        playerBlinkDot.classList.remove('bg-emerald-400');
        playerBlinkDot.classList.add('bg-rose-500');
      }
      if (playerIcon) {
        playerIcon.innerHTML = `<path d="M8 5v14l11-7z"/>`; // Play Icon
      }
    }
  }

  function pulseEqualizerBars() {
    const bars = document.querySelectorAll('.equalizer-bar');
    bars.forEach((bar) => {
      const randomScale = 0.3 + Math.random() * 0.7;
      bar.style.transform = `scaleY(${randomScale})`;
    });
  }

  // Click on Discography Cards triggers music track
  discoCards.forEach((card) => {
    card.addEventListener('click', (e) => {
      const trackIndex = parseInt(card.getAttribute('data-track'), 10);
      if (!isNaN(trackIndex)) {
        playTrack(trackIndex);
      }
    });
  });

  // Music Player Card Play/Pause Button
  if (playerToggle) {
    playerToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      if (isPlaying) {
        stopAudio();
        showToast('Playback Paused');
      } else {
        playTrack(activeTrackIndex);
      }
    });
  }

  // Section Milestones Click to play theme
  const careerItems = document.querySelectorAll('.career-item');
  careerItems.forEach((item, idx) => {
    item.addEventListener('click', () => {
      // Map to discography track or theme
      playTrack(idx % trackDatabase.length);
      showToast(`Selected Era Highlight: ${item.querySelector('.career-title')?.textContent.trim() || 'Milestone'}`);
    });
  });

  // Contact / Collaboration Buttons
  const collaborationBtns = document.querySelectorAll('.action-collab-btn');
  collaborationBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      showToast('Opening official contact portal: bighit@hybe.com');
      setTimeout(() => {
        window.location.href = 'mailto:bighit@hybe.com?subject=Huening%20Kai%20Collaboration%20Inquiry';
      }, 800);
    });
  });
});
