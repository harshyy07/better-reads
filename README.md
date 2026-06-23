# BetterReads (Version 1) 📚✨

BetterReads is a beautiful, cozy, and highly interactive Single Page Application (SPA) designed as a modern, aesthetic alternative to Goodreads. It leverages a custom vanilla design system inspired by cottagecore and lofi aesthetics, offering a seamless and gamified reading tracker experience.

## 🛠️ Technology Stack
- **Frontend**: Vanilla HTML5, CSS3, JavaScript (ES6+). No heavy frameworks.
- **Backend & Auth**: Supabase (PostgreSQL, Google OAuth, Magic Links) & `localStorage` cache.
- **Data Source**: [OpenLibrary API](https://openlibrary.org/dev/docs/api/search) (Real-time, rate-limit-friendly book fetching).
- **Architecture**: Custom Hash-based SPA Router (`#home`, `#library`, `#discover`, `#stats`, etc.).

## ✨ Core Features

### 1. 🏡 Gamified Library Room
- An interactive, 2D "room" interface with absolute-positioned, clickable hotspots over a sketched background.
- Clicking a specific shelf in the drawing instantly opens up the user's `TBR` (To Be Read), `Currently Reading`, or `Completed` shelves.
- Dynamically renders books saved in `localStorage` into a clean CSS grid.

### 2. 🌌 Infinite Discover & Search
- **Live Search**: Debounced search bar that queries the OpenLibrary API to fetch real book data instantly.
- **Mood & Genre Filters**: Quick-filter pill buttons to narrow down books by traditional genres (Fantasy, Sci-Fi) or aesthetic moods (Cozy, Dark Academia, Heartbreaking).
- **Infinite Scrolling**: Automatically loads more books as you scroll down the page.
- **One-Click Add**: "+ TBR" buttons on every discovered book that immediately injects the book into your local library.

### 3. 💬 Interactive Discourse & Book Clubs
- **Community Threads**: A fully localized forum where users can create new discussion threads, select spoiler tags, and read preview snippets.
- **Interactive Upvotes**: Clicking the ❤️ icon on any thread animates and increments the like counter in the local database.
- **Book Clubs**: A dedicated tab where users can browse, join, and create custom book clubs, with dynamic member counts tracking join status.

### 4. ⭐ Fractional Rating System Component
- A highly polished, custom-built fractional star rating widget.
- Supports hovering over the left half or right half of a star to register half-star ratings (e.g., 4.5 stars).
- Includes an animated breakdown bar chart simulating community rating distributions.

### 5. 🎧 Cozy Spotify/Lofi Player
- An embedded, interactive mini-player widget designed to play ambient reading music.
- Features a simulated tracklist, progress bar, and play/pause toggles to complete the cozy reading nook vibe.

### 6. 📊 Reading Stats (Wrapped)
- A highly shareable, Spotify Wrapped-inspired aesthetic page (`#stats`).
- Automatically calculates and dynamically updates "Books Devoured," "Pages Turned," and "Top Vibe (Genre)" based on the books inside your Completed shelf.

## 🎨 Design System & Palette
The app uses a carefully curated, pastel-heavy color palette defined in `style.css` via CSS Variables to evoke a warm, welcoming feeling:
- `--cream`: `#FFF8F0`
- `--blush`: `#FADADD`
- `--sage`: `#C8DFC8`
- `--lavender`: `#DDD5F3`
- `--peach`: `#FECBA1`
- `--dusty-rose`: `#E8A598`
- `--ink`: `#3B2F2F`

## 📈 Recent Updates & Changelog
- **Security Audit & XSS Patch**: Sanitized and escaped API/user-generated interpolations to prevent Cross-Site Scripting.
- **Spotify Wrapped Aesthetic**: Built a dynamic, gorgeous Reading Stats page calculating metrics directly from the user's completed shelf.
- **Google OAuth & Supabase Auth**: Fully integrated a scalable authentication flow using Supabase. Replaced the dummy auth wizard with robust Magic Links and Google Login, seamlessly handling new profile creations.
- **Mood Filters**: Added aesthetic mood filters (Cozy, Dark Academia, Ethereal) alongside the standard genre filters on the Discover page.
- **Simulated Spotify Player**: Restored footer styling and added a cozy integrated lofi player.
- **Aesthetic Overhaul**: Implemented a pastel pink/purple palette along with hand-drawn library buttons for a more aesthetic experience.

## 🚀 Future Roadmap (v2 Ideas)
- Migrate the core `localStorage` book library to a cloud database (Supabase PostgreSQL) for seamless cross-device syncing.
- Add user-to-user replying and nested comment threads in the Discourse tab.
- Integrate the Spotify Web Playback SDK for real, authenticated audio streaming instead of simulated ambient tracks.
