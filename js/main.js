/* ============================================================
   BetterReads — main.js
   SPA Navigation · Mobile Hamburger · Spotify Widget · Shelf Tabs
   Star Rating · Spoilers · Scroll Reveal · Animated Counters
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  let isLoggedIn = false;

  /* ──────────────────────────────────────────────────────────
     AUTH MODAL LOGIC
     ────────────────────────────────────────────────────────── */
  const authModal = document.getElementById('auth-modal');
  const authCloseBtn = document.getElementById('auth-close-btn');
  const navAvatar = document.getElementById('nav-avatar');
  const navGetStarted = document.getElementById('nav-get-started');
  const authFormStep1 = document.getElementById('auth-form-step1');
  const authFormStep2 = document.getElementById('auth-form-step2');
  const authStep1 = document.getElementById('auth-step-1');
  const authStep2 = document.getElementById('auth-step-2');
  const btnGoogleAuth = document.getElementById('btn-google-auth');
  const btnBackStep1 = document.getElementById('btn-back-step1');
  const authEmailInput = document.getElementById('auth-email');
  const authCodeMessage = document.getElementById('auth-code-message');
  const avatarOptions = document.querySelectorAll('.avatar-option');
  let selectedAvatar = '🍵';
  
  function showAuthModal() {
    if (authModal) authModal.classList.add('active');
    // Reset to step 1
    if (authStep1) authStep1.style.display = 'block';
    if (authStep2) authStep2.style.display = 'none';
  }
  
  function closeAuthModal() {
    if (authModal) authModal.classList.remove('active');
  }
  
  function completeLogin(avatarOrText) {
    isLoggedIn = true;
    closeAuthModal();
    
    // Update UI to reflect logged-in state
    if (navAvatar) {
      navAvatar.style.background = 'var(--sage)';
      navAvatar.title = 'Profile';
      navAvatar.textContent = avatarOrText;
    }
    if (navGetStarted) {
      navGetStarted.style.display = 'none';
    }
  }

  if (authCloseBtn) {
    authCloseBtn.addEventListener('click', closeAuthModal);
  }
  
  if (authModal) {
    authModal.addEventListener('click', (e) => {
      if (e.target === authModal) closeAuthModal();
    });
  }

  if (navAvatar) {
    navAvatar.addEventListener('click', (e) => {
      if (!isLoggedIn) {
        e.preventDefault();
        showAuthModal();
      }
    });
  }

  if (navGetStarted) {
    navGetStarted.addEventListener('click', (e) => {
      if (!isLoggedIn) {
        e.preventDefault();
        showAuthModal();
      }
    });
  }

  // Google Auth Button
  if (btnGoogleAuth) {
    btnGoogleAuth.addEventListener('click', () => {
      completeLogin('G');
      console.log('Logged in with Google');
    });
  }

  // Step 1 Submit: Send Email Code
  if (authFormStep1) {
    authFormStep1.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = authEmailInput ? authEmailInput.value : 'your email';
      
      // Transition to Step 2
      if (authStep1) authStep1.style.display = 'none';
      if (authStep2) authStep2.style.display = 'block';
      if (authCodeMessage) authCodeMessage.textContent = `We sent a code to ${email}.`;
    });
  }

  // Back Button in Step 2
  if (btnBackStep1) {
    btnBackStep1.addEventListener('click', () => {
      if (authStep2) authStep2.style.display = 'none';
      if (authStep1) authStep1.style.display = 'block';
    });
  }

  // Avatar Selection
  avatarOptions.forEach(option => {
    option.addEventListener('click', () => {
      avatarOptions.forEach(opt => opt.classList.remove('active'));
      option.classList.add('active');
      selectedAvatar = option.dataset.avatar;
    });
  });

  // Step 2 Submit: Finalize Login
  if (authFormStep2) {
    authFormStep2.addEventListener('submit', (e) => {
      e.preventDefault();
      completeLogin(selectedAvatar);
      console.log('User logged in with email flow!');
    });
  }

  /* ──────────────────────────────────────────────────────────
     1. SPA PAGE SYSTEM & NAVIGATION
     ────────────────────────────────────────────────────────── */
  const navbar = document.getElementById('navbar');
  
  const pages = {
    '': 'page-home',
    '#': 'page-home',
    '#hero': 'page-home',
    '#discover': 'page-discover',
    '#library': 'page-library',
    '#rating': 'page-rating',
    '#discourse': 'page-discourse',
    '#authors': 'page-authors',
    '#cta': 'page-home'
  };

  const navLinksMap = {
    'page-home': '',
    'page-discover': 'nav-discover',
    'page-library': 'nav-library',
    'page-discourse': 'nav-discourse',
    'page-authors': 'nav-authors'
  };

  function showPage(hash, scrollTargetId = null) {
    const targetPageId = pages[hash] || 'page-home';
    
    // Hide mobile menu if open
    navbar.classList.remove('nav-open');
    
    // Deactivate all page sections
    document.querySelectorAll('.page-section').forEach(section => {
      section.classList.remove('active');
    });
    
    // Activate target page section
    const targetPage = document.getElementById(targetPageId);
    if (targetPage) {
      targetPage.classList.add('active');
      targetPage.scrollTop = 0;
      
      // Update scrolled navbar class on page activation
      navbar.classList.toggle('scrolled', targetPage.scrollTop > 40);
    }
    
    // Update active state on navbar links
    document.querySelectorAll('.nav-links a').forEach(a => {
      a.classList.remove('nav-active');
    });
    const activeNavLinkId = navLinksMap[targetPageId];
    if (activeNavLinkId) {
      const activeNavLink = document.getElementById(activeNavLinkId);
      if (activeNavLink) activeNavLink.classList.add('nav-active');
    }
    
    // Handle scrolling to inner targets (like #cta)
    if (scrollTargetId) {
      const scrollTarget = document.getElementById(scrollTargetId);
      if (scrollTarget) {
        setTimeout(() => {
          scrollTarget.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    } else if (hash === '#cta') {
      const ctaTarget = document.getElementById('cta');
      if (ctaTarget) {
        setTimeout(() => {
          ctaTarget.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }

  // Intercept all clicks on links starting with #
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      e.preventDefault();
      
      if (href === '#') {
        showPage('#');
        window.location.hash = '#';
      } else if (href === '#cta') {
        showPage('#cta');
        window.location.hash = '#cta';
      } else {
        showPage(href);
        window.location.hash = href;
      }
    });
  });

  // Handle browser back/forward navigation
  window.addEventListener('hashchange', () => {
    showPage(window.location.hash || '#');
  });

  // Initial page load
  showPage(window.location.hash || '#');


  /* ──────────────────────────────────────────────────────────
     2. MOBILE NAVBAR HAMBURGER TOGGLE
     ────────────────────────────────────────────────────────── */
  const hamburger = document.getElementById('nav-hamburger');
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      navbar.classList.toggle('nav-open');
    });
  }


  /* ──────────────────────────────────────────────────────────
     3. NAVBAR SCROLL SHADOW (Bound to active page scrolling)
     ────────────────────────────────────────────────────────── */
  const onPageScroll = (e) => {
    navbar.classList.toggle('scrolled', e.target.scrollTop > 40);
  };

  document.querySelectorAll('.page-section').forEach(section => {
    section.addEventListener('scroll', onPageScroll, { passive: true });
  });


  /* ──────────────────────────────────────────────────────────
     4. SHELF TABS & HOTSPOTS
     ────────────────────────────────────────────────────────── */
  const shelfTabs = document.querySelectorAll('.shelf-tab');
  const bookshelves = document.querySelectorAll('.book-shelf');
  const roomHotspots = document.querySelectorAll('.room-hotspot');

  function activateShelf(shelfId) {
    // Update tabs
    shelfTabs.forEach(t => { 
      t.classList.remove('active'); 
      t.setAttribute('aria-selected', 'false'); 
    });
    const targetTab = document.querySelector(`.shelf-tab[data-shelf="${shelfId}"]`);
    if (targetTab) {
      targetTab.classList.add('active');
      targetTab.setAttribute('aria-selected', 'true');
    }

    // Update shelves
    bookshelves.forEach(s => s.classList.remove('active'));
    const targetShelf = document.getElementById(`shelf-${shelfId}`);
    if (targetShelf) {
      targetShelf.classList.add('active');
      
      // Stagger book cards in
      const cards = targetShelf.querySelectorAll('.book-card');
      cards.forEach((card, i) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(12px)';
        setTimeout(() => {
          card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, i * 60);
      });
    }
  }

  shelfTabs.forEach(tab => {
    tab.addEventListener('click', () => activateShelf(tab.dataset.shelf));
  });

  roomHotspots.forEach(hotspot => {
    hotspot.addEventListener('click', () => {
      activateShelf(hotspot.dataset.shelf);
      // Scroll to the shelf info so mobile users see the change
      const libraryInfo = document.querySelector('.library-info');
      if (libraryInfo && window.innerWidth < 992) {
        libraryInfo.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });


  /* ──────────────────────────────────────────────────────────
     5. STAR RATING WIDGET (half-star support)
     ────────────────────────────────────────────────────────── */
  const stars = document.querySelectorAll('#star-widget .star');
  const ratingDisplay = document.getElementById('rating-value-display');
  let lockedRating = 0;
  let isLocked = false;

  const labels = {
    0.5: '0.5 — Did Not Like It 😬',
    1:   '1.0 — Did Not Like It 😞',
    1.5: '1.5 — It Was OK 🙁',
    2:   '2.0 — It Was OK 😐',
    2.5: '2.5 — Liked It 🙂',
    3:   '3.0 — Liked It 😊',
    3.5: '3.5 — Really Liked It 😄',
    4:   '4.0 — Really Liked It 😍',
    4.5: '4.5 — Loved It 🤩',
    5:   '5.0 — It Was Amazing ✨',
  };

  function renderStars(value) {
    stars.forEach((star, i) => {
      const full = i + 1;
      const half = i + 0.5;
      if (value >= full) {
        star.textContent = '★';
        star.style.color = 'var(--amber)';
      } else if (value >= half) {
        star.textContent = '★';
        star.style.background = `linear-gradient(90deg, var(--amber) 50%, #ddd 50%)`;
        star.style.webkitBackgroundClip = 'text';
        star.style.webkitTextFillColor = 'transparent';
        star.style.backgroundClip = 'text';
      } else {
        star.textContent = '★';
        star.style.color = '#ddd';
        star.style.background = 'none';
        star.style.webkitBackgroundClip = 'unset';
        star.style.webkitTextFillColor = 'unset';
        star.style.backgroundClip = 'unset';
      }
    });
  }

  function getRatingFromEvent(e, star) {
    const rect = star.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const half = x < rect.width / 2;
    const val = parseFloat(star.dataset.value);
    return half ? val - 0.5 : val;
  }

  stars.forEach(star => {
    star.addEventListener('mousemove', e => {
      if (isLocked) return;
      const rating = getRatingFromEvent(e, star);
      renderStars(rating);
      ratingDisplay.textContent = labels[rating] || `${rating} stars`;
    });
    star.addEventListener('click', e => {
      if (!isLoggedIn) {
        showAuthModal();
        return;
      }
      const rating = getRatingFromEvent(e, star);
      lockedRating = rating;
      isLocked = true;
      renderStars(rating);
      ratingDisplay.textContent = `You rated: ${rating} ★ — ${labels[rating]?.split('—')[1]?.trim() || ''}`;
      ratingDisplay.style.color = 'var(--dusty-rose)';
      ratingDisplay.style.fontWeight = '600';
      // bounce animation
      star.style.transform = 'scale(1.4)';
      setTimeout(() => { star.style.transform = ''; }, 300);
    });
  });

  const starWidget = document.getElementById('star-widget');
  if (starWidget) {
    starWidget.addEventListener('mouseleave', () => {
      if (!isLocked) {
        renderStars(0);
        ratingDisplay.textContent = 'Hover to rate ✦';
        ratingDisplay.style.color = '';
        ratingDisplay.style.fontWeight = '';
      }
    });
  }


  /* ──────────────────────────────────────────────────────────
     6. SPOILER REVEAL
     ────────────────────────────────────────────────────────── */
  document.querySelectorAll('.spoiler-text').forEach(el => {
    el.addEventListener('click', () => {
      el.classList.toggle('revealed');
      el.title = el.classList.contains('revealed') ? 'Click to hide spoiler' : 'Click to reveal spoiler';
    });
  });


  /* ──────────────────────────────────────────────────────────
     7. GENRE PILLS (Discover)
     ────────────────────────────────────────────────────────── */
  let activeDiscoverGenre = '';
  let discoverSearchQuery = '';

  document.querySelectorAll('.genre-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.genre-pill').forEach(p => p.classList.remove('active'));
      
      // Toggle logic
      if (activeDiscoverGenre === pill.dataset.genre) {
        activeDiscoverGenre = ''; // Deselect
      } else {
        pill.classList.add('active');
        activeDiscoverGenre = pill.dataset.genre;
      }
      
      renderDiscoverBooks();
    });
  });


  /* ──────────────────────────────────────────────────────────
     8. SHELF BUTTON (+TBR) interaction
     ────────────────────────────────────────────────────────── */
  function attachShelfBtnListeners() {
    document.querySelectorAll('.dbc-shelf-btn').forEach(btn => {
      // Remove old listeners by cloning
      const newBtn = btn.cloneNode(true);
      btn.parentNode.replaceChild(newBtn, btn);
      
      newBtn.addEventListener('click', e => {
        e.stopPropagation();
        
        if (!isLoggedIn) {
          showAuthModal();
          return;
        }

        const bookId = newBtn.dataset.bookId;
        
        if (newBtn.textContent.includes('+')) {
          newBtn.textContent = '✓ Added!';
          newBtn.style.background = 'var(--sage)';
          newBtn.style.color = '#2d5a2d';
          
          // Add to DB TBR shelf
          if (bookId) {
            const db = getDB();
            if (!db.shelves.tbr.includes(bookId)) {
              db.shelves.tbr.push(bookId);
              saveDB(db);
              renderLibraryBooks(); // Update the library room view!
            }
          }

          setTimeout(() => {
            newBtn.textContent = 'In TBR';
          }, 1800);
        }
      });
    });
  }


  /* ──────────────────────────────────────────────────────────
     9. SPOTIFY WIDGET (Interactive Playback Controls & Real Audio)
     ────────────────────────────────────────────────────────── */
  const playBtn = document.getElementById('sp-play');
  const trackItems = document.querySelectorAll('.sp-track-item');
  const trackNameEl = document.getElementById('sp-track');
  const artistNameEl = document.getElementById('sp-artist');
  const timeCurEl = document.getElementById('sp-time-cur');
  const timeDurEl = document.getElementById('sp-time-dur');
  const progressFill = document.getElementById('sp-bar-fill');
  const albumArt = document.querySelector('.spotify-album-art');

  // Real royalty-free ambient/classical tracks hosted publicly
  const playlistTracks = [
    { name: 'Luminous Rain', artist: 'Kevin MacLeod', src: 'https://upload.wikimedia.org/wikipedia/commons/2/23/Kevin_MacLeod_-_Luminous_Rain.ogg' },
    { name: 'Gymnopédie No. 1', artist: 'Kevin MacLeod', src: 'https://upload.wikimedia.org/wikipedia/commons/4/41/Gymnop%C3%A9die_No._1_%28Kevin_MacLeod%29.ogg' },
    { name: 'Canon in D Major', artist: 'Johann Pachelbel', src: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Pachelbel_-_Canon_in_D_Major.ogg' },
    { name: 'Moonlight Sonata', artist: 'Ludwig van Beethoven', src: 'https://upload.wikimedia.org/wikipedia/commons/a/af/Beethoven_Moonlight_Sonata.ogg' }
  ];

  let currentTrackIdx = 0;
  let isPlaying = false;
  
  // Create the actual hidden HTML5 audio player
  const bgAudio = new Audio();
  bgAudio.src = playlistTracks[currentTrackIdx].src;
  
  function updateSpotifyUI() {
    const track = playlistTracks[currentTrackIdx];
    if (trackNameEl) trackNameEl.textContent = track.name;
    if (artistNameEl) artistNameEl.textContent = track.artist;

    // Update active highlight in track list
    trackItems.forEach((item, idx) => {
      item.classList.toggle('sp-active', idx === currentTrackIdx);
    });

    // Animate album art
    if (albumArt) {
      if (isPlaying) {
        albumArt.style.animation = 'musicPulse 1.5s infinite ease-in-out';
      } else {
        albumArt.style.animation = 'none';
      }
    }
  }

  function formatSecs(secs) {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  }

  function playSpotifyTrack() {
    isPlaying = true;
    if (playBtn) playBtn.textContent = '⏸';
    updateSpotifyUI();
    
    clearInterval(spotifyInterval);
    spotifyInterval = setInterval(() => {
      if (currentElapsedSecs < playlistTracks[currentTrackIdx].durationSec) {
        currentElapsedSecs++;
        if (timeCurEl) timeCurEl.textContent = formatSecs(currentElapsedSecs);
        if (progressFill) {
          progressFill.style.width = `${(currentElapsedSecs / playlistTracks[currentTrackIdx].durationSec) * 100}%`;
        }
      } else {
        nextSpotifyTrack();
      }
    }, 1000);
  }

  function pauseSpotifyTrack() {
    isPlaying = false;
    if (playBtn) playBtn.textContent = '▶️';
    clearInterval(spotifyInterval);
    updateSpotifyUI();
  }

  function nextSpotifyTrack() {
    currentTrackIdx = (currentTrackIdx + 1) % playlistTracks.length;
    currentElapsedSecs = 0;
    if (isPlaying) {
      playSpotifyTrack();
    } else {
      updateSpotifyUI();
    }
  }

  function prevSpotifyTrack() {
    currentTrackIdx = (currentTrackIdx - 1 + playlistTracks.length) % playlistTracks.length;
    currentElapsedSecs = 0;
    if (isPlaying) {
      playSpotifyTrack();
    } else {
      updateSpotifyUI();
    }
  }

  if (playBtn) {
    playBtn.addEventListener('click', () => {
      if (isPlaying) {
        pauseSpotifyTrack();
      } else {
        playSpotifyTrack();
      }
    });
  }

  const spNext = document.getElementById('sp-next');
  if (spNext) spNext.addEventListener('click', nextSpotifyTrack);

  const spPrev = document.getElementById('sp-prev');
  if (spPrev) spPrev.addEventListener('click', prevSpotifyTrack);

  // Click on items inside the playlist
  trackItems.forEach((item, idx) => {
    item.addEventListener('click', () => {
      currentTrackIdx = idx;
      currentElapsedSecs = 0;
      playSpotifyTrack();
    });
  });

  // Scrubbing on progress track
  const progressTrack = document.getElementById('sp-progress-track');
  if (progressTrack) {
    progressTrack.addEventListener('click', e => {
      const rect = progressTrack.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const percentage = clickX / rect.width;
      currentElapsedSecs = Math.floor(percentage * playlistTracks[currentTrackIdx].durationSec);
      updateSpotifyUI();
    });
  }

  // Initial update
  updateSpotifyUI();


  /* ──────────────────────────────────────────────────────────
     10. SCROLL REVEAL (IntersectionObserver)
     ────────────────────────────────────────────────────────── */
  const revealEls = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => observer.observe(el));


  /* ──────────────────────────────────────────────────────────
     11. ANIMATED COUNTER (Hero stats)
     ────────────────────────────────────────────────────────── */
  const counters = [
    { el: document.getElementById('stat-books'),   target: 120, suffix: 'k+' },
    { el: document.getElementById('stat-readers'), target: 48,  suffix: 'k+' },
    { el: document.getElementById('stat-reviews'), target: 310, suffix: 'k+' },
  ];

  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const { el, target, suffix } = counters.find(c => c.el === entry.target) || {};
      if (!el) return;
      let current = 0;
      const step = Math.ceil(target / 60);
      const interval = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = `${current}${suffix}`;
        if (current >= target) clearInterval(interval);
      }, 20);
      counterObserver.unobserve(entry.target);
    });
  }, { threshold: 0.5 });

  counters.forEach(c => { if (c.el) counterObserver.observe(c.el); });


  /* ──────────────────────────────────────────────────────────
     12. PARALLAX — hero blobs gentle mouse tracking
     ────────────────────────────────────────────────────────── */
  const blob1 = document.querySelector('.hero-blob-1');
  const blob2 = document.querySelector('.hero-blob-2');
  document.addEventListener('mousemove', e => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    if (blob1) blob1.style.transform = `translate(${x}px, ${y}px)`;
    if (blob2) blob2.style.transform = `translate(${-x * 0.7}px, ${-y * 0.7}px)`;
  });


  /* ──────────────────────────────────────────────────────────
     13. BOOK CARD hover — slight 3D tilt
     ────────────────────────────────────────────────────────── */
  document.querySelectorAll('.discover-book-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 12;
      card.style.transform = `translateY(-8px) rotateX(${-y}deg) rotateY(${x}deg)`;
      card.style.transformStyle = 'preserve-3d';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  /* ──────────────────────────────────────────────────────────
     14. LOCAL DATABASE & GOOGLE BOOKS API
     ────────────────────────────────────────────────────────── */
  const DB_KEY = 'betterreads_db';

  function getDB() {
    const dbData = localStorage.getItem(DB_KEY);
    if (dbData) {
      try {
        return JSON.parse(dbData);
      } catch(e) {
        console.error("Error parsing DB", e);
      }
    }
    return {
      books: {}, // key: book id, value: book object
      shelves: {
        tbr: [],
        reading: [],
        completed: []
      }
    };
  }

  function saveDB(db) {
    localStorage.setItem(DB_KEY, JSON.stringify(db));
  }

  async function fetchAndCacheBooks(queries, startIndex = 0, isSubject = false) {
    const db = getDB();
    let updated = false;
    let newBookIds = [];

    for (const query of queries) {
      try {
        const page = Math.floor(startIndex / 10) + 1;
        const qParam = isSubject ? `subject=${encodeURIComponent(query)}` : `q=${encodeURIComponent(query)}`;
        const response = await fetch(`https://openlibrary.org/search.json?${qParam}&page=${page}&limit=10`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        
        if (data.docs) {
          data.docs.forEach(item => {
            if (!item.cover_i) return; // Skip books without a thumbnail
            
            const id = item.key.replace('/works/', '');
            newBookIds.push(id);
            if (!db.books[id]) {
              db.books[id] = {
                id: id,
                title: item.title || 'Unknown Title',
                authors: item.author_name || ['Unknown Author'],
                description: 'No description available.',
                thumbnail: `https://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg`,
                categories: item.subject || [],
                pageCount: item.number_of_pages_median || 0,
                publishedDate: item.first_publish_year || '',
                averageRating: item.ratings_average ? item.ratings_average.toFixed(1) : (Math.random() * 2 + 3).toFixed(1)
              };
              updated = true;
            }
          });
        }
      } catch (e) {
        console.error(`Failed to fetch books for query: ${query}`, e);
      }
    }

    if (updated) {
      saveDB(db);
    }
    return newBookIds;
  }

  async function initDatabase() {
    let db = getDB();
    
    // Purge any existing books from the local database that don't have a thumbnail
    let purged = false;
    Object.keys(db.books).forEach(id => {
      if (!db.books[id].thumbnail) {
        delete db.books[id];
        // Also remove from any shelves
        ['tbr', 'reading', 'completed'].forEach(shelf => {
          if (db.shelves[shelf]) {
            db.shelves[shelf] = db.shelves[shelf].filter(bid => bid !== id);
          }
        });
        purged = true;
      }
    });
    
    if (purged) {
      saveDB(db);
    }

    // If we have no books at all, let's fetch some from the API to seed the library
    if (Object.keys(db.books).length === 0) {
      console.log('Initializing BetterReads database with API books...');
      
      const tbrIds = await fetchAndCacheBooks(['fantasy'], 0, true);
      const readingIds = await fetchAndCacheBooks(['romance'], 0, true);
      const completedIds = await fetchAndCacheBooks(['science fiction'], 0, true);

      db = getDB();
      db.shelves.tbr = tbrIds.slice(0, 3);
      db.shelves.reading = readingIds.slice(0, 3);
      db.shelves.completed = completedIds.slice(0, 3);
      saveDB(db);
    } else {
      console.log('Database already initialized with', Object.keys(db.books).length, 'books.');
    }
    
    // Once DB is initialized, we can trigger rendering
    renderLibraryBooks();
    document.dispatchEvent(new Event('betterreads-db-ready'));
  }

  function getGradientFromString(str) {
    // Generate a consistent but distinct gradient based on the book title
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const c1 = `hsl(${hash % 360}, 60%, 85%)`;
    const c2 = `hsl(${(hash + 40) % 360}, 50%, 75%)`;
    return `linear-gradient(135deg, ${c1}, ${c2})`;
  }

  function renderLibraryBooks() {
    const db = getDB();
    const shelfMappings = {
      'tbr': db.shelves.tbr || [],
      'reading': db.shelves.reading || [],
      'read': db.shelves.completed || [],
      'dnf': db.shelves.dnf || [] // Ensure this array exists in db schema if used
    };

    Object.keys(shelfMappings).forEach(shelfId => {
      const shelfContainer = document.getElementById(`shelf-${shelfId}`);
      if (!shelfContainer) return;
      
      const grid = shelfContainer.querySelector('.book-grid');
      if (!grid) return;
      
      grid.innerHTML = ''; // Clear existing static cards

      const bookIds = shelfMappings[shelfId];
      if (bookIds.length === 0) {
        grid.innerHTML = `<div style="color:var(--ink-light); padding: 1rem;">No books on this shelf yet.</div>`;
        return;
      }

      bookIds.forEach(id => {
        const book = db.books[id];
        if (!book) return;

        const card = document.createElement('div');
        card.className = 'book-card';
        card.id = `bk-${shelfId}-${id}`;

        let coverStyle = `background: ${getGradientFromString(book.title)}`;
        let coverContent = book.title.charAt(0);
        if (book.thumbnail) {
          coverStyle = `background: url('${book.thumbnail}') center/cover;`;
          coverContent = '';
        }

        let ratingHtml = '';
        if (shelfId === 'reading' || shelfId === 'read') {
          // Mock some rating or progress data for demonstration
          const ratingStr = '★'.repeat(Math.round(book.averageRating || 4)) + '☆'.repeat(5 - Math.round(book.averageRating || 4));
          ratingHtml = `<div class="book-rating">${ratingStr}</div>`;
        }

        card.innerHTML = `
          <div class="book-cover" style="${coverStyle}">${coverContent}</div>
          <div class="book-info">
            <div class="book-title">${book.title}</div>
            <div class="book-author">${book.authors[0] || 'Unknown'}</div>
            ${ratingHtml}
          </div>
        `;
        grid.appendChild(card);
      });
    });
  }

  /* ──────────────────────────────────────────────────────────
     15. DISCOVER SEARCH & RENDERING (Vast Selection)
     ────────────────────────────────────────────────────────── */
  const discoverSearchInput = document.getElementById('discover-search');
  const discoverGrid = document.getElementById('discover-books-grid');
  
  // Create an invisible scroll trigger at the bottom of the grid
  const scrollTrigger = document.createElement('div');
  scrollTrigger.id = 'discover-scroll-trigger';
  scrollTrigger.style.height = '1px';
  scrollTrigger.style.width = '100%';
  scrollTrigger.style.marginTop = '2rem';
  if (discoverGrid && discoverGrid.parentNode) {
    discoverGrid.parentNode.insertBefore(scrollTrigger, discoverGrid.nextSibling);
  }

  let searchTimeout = null;
  let discoverStartIndex = 0;
  let currentDiscoverIds = [];

  async function performDiscoverFetch(isLoadMore = false) {
    if (!discoverGrid) return;
    
    if (!isLoadMore) {
      discoverStartIndex = 0;
      currentDiscoverIds = [];
      discoverGrid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; color: var(--ink-light); padding: 2rem;">Fetching books from the universe... 🌌</div>';
      scrollTrigger.style.display = 'none';
    } else {
      discoverStartIndex += 10;
    }

    let newIds = [];
    if (discoverSearchQuery) {
      newIds = await fetchAndCacheBooks([discoverSearchQuery], discoverStartIndex, false);
    } else if (activeDiscoverGenre) {
      newIds = await fetchAndCacheBooks([activeDiscoverGenre], discoverStartIndex, true);
    } else {
      // Default state: just show some books from DB or fallback
      const db = getDB();
      newIds = Object.keys(db.books).slice(0, 10);
    }

    // Filter out books we already have in the current view to avoid duplicates
    let uniqueNewIds = isLoadMore ? newIds.filter(id => !currentDiscoverIds.includes(id)) : newIds;
    currentDiscoverIds = isLoadMore ? currentDiscoverIds.concat(uniqueNewIds) : uniqueNewIds;
    
    if (currentDiscoverIds.length === 0) {
      discoverGrid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: var(--ink-light); padding: 2rem;">No books found. Try searching for something else!</div>`;
      scrollTrigger.style.display = 'none';
      return;
    }

    if (!isLoadMore) {
      discoverGrid.innerHTML = '';
    }

    const db = getDB();
    // Render only the newly fetched unique books to append them
    uniqueNewIds.forEach(id => {
      const book = db.books[id];
      if (!book) return;

      const card = document.createElement('div');
      card.className = 'discover-book-card';
      
      let coverStyle = `background: ${getGradientFromString(book.title)}`;
      let coverContent = book.title.charAt(0);
      if (book.thumbnail) {
        coverStyle = `background: url('${book.thumbnail}') center/cover;`;
        coverContent = '';
      }

      // Check if already in TBR
      const inTbr = db.shelves.tbr.includes(book.id);
      const btnText = inTbr ? 'In TBR' : '+ TBR';
      const btnStyle = inTbr ? 'background: var(--sage); color: #2d5a2d;' : '';

      // First category badge
      const cat = book.categories && book.categories.length > 0 ? book.categories[0] : (activeDiscoverGenre || 'Fiction');

      card.innerHTML = `
        <div class="dbc-cover" style="${coverStyle}">
          ${coverContent}
          <button class="dbc-shelf-btn" data-book-id="${book.id}" style="${btnStyle}">${btnText}</button>
        </div>
        <div class="dbc-info">
          <div class="dbc-title">${book.title}</div>
          <div class="dbc-author">${book.authors[0] || 'Unknown'}</div>
          <div class="dbc-meta">
            <span class="dbc-rating">★★★★☆ ${book.averageRating}</span>
            <span class="badge badge-lavender dbc-genre-tag" style="text-transform: capitalize;">${cat}</span>
          </div>
        </div>
      `;
      
      // Re-apply 3D tilt
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 12;
        card.style.transform = `translateY(-8px) rotateX(${-y}deg) rotateY(${x}deg)`;
        card.style.transformStyle = 'preserve-3d';
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });

      discoverGrid.appendChild(card);
    });

    attachShelfBtnListeners();
    scrollTrigger.style.display = newIds.length < 10 ? 'none' : 'block';
  }

  // Event Listeners for Discover
  if (discoverSearchInput) {
    discoverSearchInput.addEventListener('input', (e) => {
      const q = e.target.value.trim();
      discoverSearchQuery = q;
      if (q.length > 0) activeDiscoverGenre = ''; // Clear genre if searching
      
      if (searchTimeout) clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        // Deselect genre pills visually
        if (q.length > 0) {
          document.querySelectorAll('.genre-pill').forEach(p => p.classList.remove('active'));
        }
        performDiscoverFetch();
      }, 800);
    });
  }

  document.querySelectorAll('.genre-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      discoverSearchQuery = '';
      if (discoverSearchInput) discoverSearchInput.value = '';

      document.querySelectorAll('.genre-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeDiscoverGenre = pill.dataset.genre;
      
      performDiscoverFetch();
    });
  });

  // Setup infinite scroll observer
  let isLoadingMore = false;
  const discoverObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && scrollTrigger.style.display === 'block' && !isLoadingMore) {
      isLoadingMore = true;
      performDiscoverFetch(true).finally(() => {
        isLoadingMore = false;
      });
    }
  }, { rootMargin: '400px' });

  discoverObserver.observe(scrollTrigger);

  // Render initial set of books
  document.addEventListener('betterreads-db-ready', () => {
    // Initial display will just be local fallbacks
    performDiscoverFetch();
    renderDiscourse();
    renderClubs();
  });

  /* ──────────────────────────────────────────────────────────
     16. INTERACTIVE DISCOURSE & BOOK CLUBS
     ────────────────────────────────────────────────────────── */
  const DISCOURSE_DB_KEY = 'betterreads_discourse';
  const CLUBS_DB_KEY = 'betterreads_clubs';

  const defaultThreads = [
    { id: 't1', user: 'luna.reads', avatar: '🌙', color: 'var(--lavender)', time: '2 hours ago', tag: 'Fantasy', title: 'The ending of Piranesi had me SOBBING — anyone else?', preview: 'Okay so I just finished and the moment he realises who he really is absolutely destroyed me...', likes: 142, replies: 38 },
    { id: 't2', user: 'bookish.flora', avatar: '☀️', color: 'var(--peach)', time: '5 hours ago', tag: 'AMA', title: '📅 June Book Club — Voting is OPEN!', preview: 'The shortlist for June community pick is here! We have Intermezzo, James, and The Women...', likes: 287, replies: 119 },
    { id: 't3', user: 'verified ✦ Olivie Blake', avatar: '🌿', color: 'var(--sage)', time: 'Yesterday', tag: 'Author', title: 'I\'m Olivie Blake — AMA about The Atlas Six', preview: 'Hi everyone! So excited to be here on BetterReads. I\'ll be answering questions for the next 2 hours...', likes: 1205, replies: 243 },
    { id: 't4', user: 'readingwithrose', avatar: '🌸', color: 'var(--blush)', time: '3 days ago', tag: 'Challenge', title: '✅ Challenge complete! DNF\'d a book guilt-free', preview: 'I\'ve been holding onto Moby-Dick for three years out of guilt. This month gave me permission to let it go.', likes: 891, replies: 67 }
  ];

  const defaultClubs = [
    { id: 'c1', name: 'The Midnight Readers', desc: 'A cozy club for fantasy lovers. Currently reading: The Atlas Six.', members: 420 },
    { id: 'c2', name: 'Non-Fiction November', desc: 'We read one non-fiction book every month and discuss our learnings.', members: 156 },
    { id: 'c3', name: 'Romance & Roses', desc: 'Swoon-worthy romance books only! Join us for weekly deep dives.', members: 890 }
  ];

  function initDiscourseDB() {
    if (!localStorage.getItem(DISCOURSE_DB_KEY)) {
      localStorage.setItem(DISCOURSE_DB_KEY, JSON.stringify(defaultThreads));
    }
    if (!localStorage.getItem(CLUBS_DB_KEY)) {
      localStorage.setItem(CLUBS_DB_KEY, JSON.stringify(defaultClubs));
    }
  }

  function getDiscourse() { return JSON.parse(localStorage.getItem(DISCOURSE_DB_KEY)); }
  function saveDiscourse(data) { localStorage.setItem(DISCOURSE_DB_KEY, JSON.stringify(data)); }
  
  function getClubs() { return JSON.parse(localStorage.getItem(CLUBS_DB_KEY)); }
  function saveClubs(data) { localStorage.setItem(CLUBS_DB_KEY, JSON.stringify(data)); }

  initDiscourseDB();

  // Tab switching logic
  const btnTabThreads = document.getElementById('btn-tab-threads');
  const btnTabClubs = document.getElementById('btn-tab-clubs');
  const viewThreads = document.getElementById('view-threads');
  const viewClubs = document.getElementById('view-clubs');

  if (btnTabThreads && btnTabClubs) {
    btnTabThreads.addEventListener('click', () => {
      btnTabThreads.className = 'btn btn-primary';
      btnTabClubs.className = 'btn btn-secondary';
      viewThreads.style.display = 'block';
      viewClubs.style.display = 'none';
    });
    btnTabClubs.addEventListener('click', () => {
      btnTabClubs.className = 'btn btn-primary';
      btnTabThreads.className = 'btn btn-secondary';
      viewClubs.style.display = 'block';
      viewThreads.style.display = 'none';
    });
  }

  // Render Threads
  function renderDiscourse() {
    const grid = document.getElementById('discourse-grid');
    if (!grid) return;
    const threads = getDiscourse();
    grid.innerHTML = '';

    threads.forEach(t => {
      const card = document.createElement('div');
      card.className = 'thread-card';
      card.innerHTML = `
        <div class="thread-header">
          <div class="thread-avatar" style="background:${t.color}">${t.avatar}</div>
          <div class="thread-meta">
            <div class="thread-user">${t.user}</div>
            <div class="thread-time">${t.time}</div>
          </div>
          <div class="badge" style="background: ${t.color}; color: #333; opacity: 0.9;">${t.tag}</div>
        </div>
        <div class="thread-title">${t.title}</div>
        <div class="thread-preview">${t.preview}</div>
        <div class="thread-footer">
          <div class="thread-stats">
            <div class="thread-stat btn-like" data-id="${t.id}" style="cursor:pointer; transition:transform 0.2s;">❤️ <span>${t.likes}</span></div>
            <div class="thread-stat">💬 <span>${t.replies} replies</span></div>
          </div>
        </div>
      `;
      grid.appendChild(card);
    });

    // Attach like listeners
    document.querySelectorAll('.btn-like').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        const db = getDiscourse();
        const thread = db.find(x => x.id === id);
        if (thread) {
          thread.likes += 1;
          saveDiscourse(db);
          e.currentTarget.querySelector('span').textContent = thread.likes;
          e.currentTarget.style.transform = 'scale(1.2)';
          setTimeout(() => e.currentTarget.style.transform = 'scale(1)', 200);
        }
      });
    });
  }

  // Create Thread
  const btnCreateThread = document.getElementById('btn-create-thread');
  if (btnCreateThread) {
    btnCreateThread.addEventListener('click', () => {
      const title = document.getElementById('new-thread-title').value.trim();
      const content = document.getElementById('new-thread-content').value.trim();
      const tag = document.getElementById('new-thread-tag').value;
      
      if (!title || !content) {
        alert('Please fill out both title and content!');
        return;
      }

      const db = getDiscourse();
      db.unshift({
        id: 't' + Date.now(),
        user: 'you.reading',
        avatar: '🌸',
        color: 'var(--blush)',
        time: 'Just now',
        tag: tag,
        title: title,
        preview: content,
        likes: 0,
        replies: 0
      });
      saveDiscourse(db);
      
      document.getElementById('new-thread-title').value = '';
      document.getElementById('new-thread-content').value = '';
      renderDiscourse();
    });
  }

  // Render Clubs
  function renderClubs() {
    const grid = document.getElementById('clubs-grid');
    if (!grid) return;
    const clubs = getClubs();
    grid.innerHTML = '';

    clubs.forEach(c => {
      const joined = localStorage.getItem('joined_club_' + c.id);
      const btnText = joined ? '✓ Joined' : 'Join Club';
      const btnStyle = joined ? 'background: var(--sage); color: #2d5a2d; border: none;' : '';

      const card = document.createElement('div');
      card.className = 'thread-card';
      card.innerHTML = `
        <div class="thread-header">
          <div class="thread-avatar" style="background:var(--peach)">📚</div>
          <div class="thread-meta">
            <div class="thread-user">${c.name}</div>
            <div class="thread-time">${c.members} members</div>
          </div>
        </div>
        <div class="thread-preview">${c.desc}</div>
        <div class="thread-footer" style="justify-content: flex-end;">
          <button class="btn btn-secondary btn-join-club" data-id="${c.id}" style="${btnStyle}">${btnText}</button>
        </div>
      `;
      grid.appendChild(card);
    });

    document.querySelectorAll('.btn-join-club').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        const isJoined = localStorage.getItem('joined_club_' + id);
        if (!isJoined) {
          localStorage.setItem('joined_club_' + id, 'true');
          const db = getClubs();
          const club = db.find(x => x.id === id);
          if (club) { club.members += 1; saveClubs(db); }
          renderClubs();
        } else {
          localStorage.removeItem('joined_club_' + id);
          const db = getClubs();
          const club = db.find(x => x.id === id);
          if (club) { club.members -= 1; saveClubs(db); }
          renderClubs();
        }
      });
    });
  }

  // Create Club
  const btnCreateClub = document.getElementById('btn-create-club');
  if (btnCreateClub) {
    btnCreateClub.addEventListener('click', () => {
      const name = document.getElementById('new-club-name').value.trim();
      const desc = document.getElementById('new-club-desc').value.trim();
      
      if (!name || !desc) {
        alert('Please provide a club name and description.');
        return;
      }

      const db = getClubs();
      const newId = 'c' + Date.now();
      db.unshift({
        id: newId,
        name: name,
        desc: desc,
        members: 1
      });
      saveClubs(db);
      localStorage.setItem('joined_club_' + newId, 'true');
      
      document.getElementById('new-club-name').value = '';
      document.getElementById('new-club-desc').value = '';
      renderClubs();
    });
  }

  // Start initialization
  initDatabase();

});
