# BetterReads — Project Specification

> A cozy, pastel-hued social reading platform for book lovers and authors.

---

## Vision

BetterReads is a next-generation book-tracking and community platform with a warm, drawing-room aesthetic. Think Goodreads reimagined as a cozy reading nook — bright pastels, soft textures, candlelight, and Spotify playing in the background. It serves two distinct user types — **Readers** and **Authors** — with tailored experiences for each.

---

## Design System

### Palette (Pastel + Warm)
| Token | Hex | Use |
|---|---|---|
| `--cream` | `#FFF8F0` | Page backgrounds |
| `--blush` | `#FADADD` | Cards, panels |
| `--sage` | `#C8DFC8` | Accents, tags |
| `--lavender` | `#DDD5F3` | Highlights, hover |
| `--peach` | `#FECBA1` | CTAs, badges |
| `--dusty-rose` | `#E8A598` | Active states |
| `--ink` | `#3B2F2F` | Body text |
| `--warm-white` | `#FFFDF8` | Modal backgrounds |

### Typography
- **Display / Headings:** `Playfair Display` (serif, literary feel)
- **Body:** `Lato` or `DM Sans` (readable, friendly)
- **UI labels:** `DM Mono` for stats/counts

### Aesthetic Components
- Subtle paper-texture background (SVG noise or CSS grain)
- Rounded corners everywhere (`border-radius: 16–24px`)
- Soft drop shadows (`box-shadow: 0 4px 24px rgba(0,0,0,0.06)`)
- Illustrated empty states (bookshelf, sleeping cat, candle)
- Micro-animations: page-turn transitions, star fill on hover

---

## User Types & Auth

### Shared Auth
- Sign up / Log in via email + password or OAuth (Google)
- Role selection at onboarding: **Reader** or **Author**
- JWT-based sessions; role stored in token claims

### Reader Account
- Profile: display name, avatar, bio, reading stats, favourite genres
- Public profile page showing reading activity and reviews
- Follow other readers; see their updates in feed

### Author Account
- All Reader features, plus:
  - Verified Author badge
  - Author Dashboard (see §Author Features)
  - Claim / create book listings
  - Post author notes and reading guides
  - View aggregate reader stats for their books (ratings distribution, TBR count, DNF rate)

---

## Pages & Navigation

### Global Nav (top bar)
`Home` · `Discover` · `Discourse` · `My Library` · `[Profile avatar]`

---

### 1. Home (`/`)
- Personalised feed: recent activity from followed readers + authors
- "Currently Reading" shelf widget for logged-in user
- Trending books this week (community-wide)
- New releases from followed authors
- "You might like…" recommendation strip (see §Recommendations)
- Seasonal/themed reading challenges banner

---

### 2. Discover (`/discover`)
- Search bar: books, authors, users, lists
- Filter by: genre, mood, publication year, rating, page count
- Browse by genre tiles (illustrated, pastel-coloured cards)
- Curated staff picks
- "Readers also loved" section
- Top lists: Most TBR'd, Highest Rated This Month, Controversial Reads

---

### 3. Book Page (`/book/:id`)
- Cover, title, author(s), synopsis, genres/tags
- **Star rating widget** (see §Rating System)
- Community rating breakdown (bar chart)
- Shelf action buttons: Add to TBR / Currently Reading / Read / DNF
- Reader reviews (paginated, filterable by star rating)
- Author note (if author has posted one)
- "Readers who liked this also liked…" carousel
- Similar books sidebar

---

### 4. Discourse (`/discourse`)
A cozy community forum — think Reddit meets a book club chat.

- **Reading Groups:** Create or join groups around a book/series/genre
- **Threads:** Post discussions, theories, reviews (spoiler tags built-in)
- **Monthly Book Club Pick:** Community votes each month
- **Challenges:** "Read 5 books in July", "DNF a book guilt-free" etc.
- **Author AMAs:** Authors can host scheduled Q&A threads
- Markdown support in posts; image embeds for aesthetic mood-board posts
- Upvote / bookmark threads
- Spoiler blur toggle per-thread

---

### 5. My Library (`/library`) — *The Cozy Room*

The centrepiece of BetterReads. Renders as an illustrated **drawing room** with:
- Warm fireplace animation on the right
- Bookshelves lining the walls, populated with the user's actual book covers
- Armchair, reading lamp, side table with a mug
- Time-of-day lighting shifts (morning light / evening glow based on local time)

#### Shelves (tabs across the top of the room)
| Shelf | Icon | Description |
|---|---|---|
| **TBR** (To Be Read) | 🔖 | Wishlist queue |
| **Currently Reading** | 📖 | Active reads (up to 5 shown prominently) |
| **Read** | ✅ | Completed books |
| **DNF** (Did Not Finish) | 🚫 | Abandoned reads, no shame |

- Drag books between shelves
- Each shelf shows book count and reading stats
- Sort by: date added, title, author, rating, page count

#### Progress Tracker (Currently Reading)
- % progress slider or page number input
- Estimated finish date based on reading pace
- Daily page goal setter

#### Spotify Integration (Music Corner widget)
- OAuth connect with Spotify
- Renders as a vintage **vinyl record player** or a small radio in the room
- Browse and select: playlists, albums, recently played
- Playback controls inline (play/pause/skip/volume)
- "Reading Mode" auto-queue: Spotify playlist suggestions tagged by mood (Lo-fi, Classical, Cottagecore, Jazz)
- Currently playing track shown as a small floating card near the fireplace
- Disconnect / re-auth option in settings

#### Reading Stats Panel (side drawer)
- Books read this year / all time
- Pages read
- Favourite genres (donut chart)
- Reading streak (days in a row with logged progress)
- Average rating given

---

### 6. Profile (`/profile/:username`)
- Avatar, bio, follower/following counts
- Currently reading widget
- Recently rated / reviewed
- Favourite books shelf (pinned, up to 6)
- Reading stats summary
- Lists created by user

---

### 7. Author Dashboard (`/author/dashboard`) — Author only
- Book portfolio management
- Claim existing listings or add new books
- Analytics: ratings over time, shelf distribution (TBR vs Read vs DNF), review sentiment
- Post author notes on book pages
- Schedule AMA threads in Discourse
- Promo tools: request "Featured" placement (editor-reviewed, not paid P2P)

---

## Rating System

- **0.5 – 5 stars** in 0.5 increments (half-star support)
- Star widget: hover fills stars smoothly; click locks rating
- Half-star: hover over left half of a star selects `.5`
- Users can change or remove their rating at any time
- Rating is only available once a book is on the **Read** shelf (or during reading)
- Community rating = weighted average (removes outliers beyond 2σ)
- Rating breakdown shown per book: bar chart of 1–5 star counts

---

## Recommendation Engine

Triggered when a user has rated ≥ 3 books.

**Signals used:**
- Star ratings (explicit preference)
- Shelf additions (TBR = mild interest, Read = confirmed engagement)
- Genre/tag preferences derived from rated books
- Collaborative filtering: "readers like you also loved…"
- DNF signals used as negative weight (not blacklisted — user may DNF for non-taste reasons)
- Author follows

**Output surfaces:**
- "You might like…" strip on Home
- "More like this" on Book pages
- Weekly "Cozy Picks" email digest (opt-in)

---

## Notifications
- Friend started reading a book you loved
- A book on your TBR gets a new edition / price drop (if integrated)
- Author you follow published a new book
- Someone liked or replied to your review
- Monthly reading challenge progress reminder
- Spotify session expired (re-auth nudge)

---

## Tech Stack (Recommended)

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS + custom CSS variables for the design system
- **Animations:** Framer Motion (page transitions, star hover, fireplace flicker)
- **Illustrated Room:** HTML Canvas or Lottie animations for the Library scene
- **State:** Zustand (client state) + React Query (server state)

### Backend
- **Runtime:** Node.js with Express or Fastify (or Next.js API routes for smaller scale)
- **Database:** PostgreSQL (books, users, reviews, shelves) + Redis (sessions, recommendation cache)
- **ORM:** Prisma
- **Auth:** NextAuth.js (supports OAuth + credentials)
- **Search:** Meilisearch (fast fuzzy search for books/authors)
- **Recommendations:** Python microservice (scikit-learn collaborative filtering) or a simple SQL-based content filter to start

### Integrations
- **Spotify Web API** — OAuth 2.0 PKCE flow; playback via Spotify Web Playback SDK (requires Spotify Premium for users)
- **Open Library / Google Books API** — seed book metadata, covers, ISBNs
- **Cloudinary** — user avatars, custom book covers
- **SendGrid / Resend** — transactional + digest emails

### Hosting
- **Frontend + API:** Vercel
- **Database:** Supabase (managed Postgres) or Railway
- **Redis:** Upstash

---

## Database Schema (Core Tables)

```
users           id, email, password_hash, role (reader|author), display_name, avatar_url, bio, created_at
books           id, title, isbn, description, cover_url, published_at, page_count, open_library_id
authors         id, user_id (FK nullable), name, bio, verified (bool)
book_authors    book_id, author_id
genres          id, name, slug
book_genres     book_id, genre_id
shelves         id, user_id, book_id, status (tbr|reading|read|dnf), added_at, updated_at
ratings         id, user_id, book_id, score (0.5–5.0), created_at, updated_at
reviews         id, user_id, book_id, rating_id (FK), body, spoiler (bool), likes, created_at
reading_progress  id, user_id, book_id, current_page, total_pages, updated_at
follows         follower_id, followee_id
lists           id, user_id, title, description, public (bool)
list_books      list_id, book_id, position
discourse_threads  id, user_id, book_id (nullable), title, body, spoiler, created_at
discourse_replies  id, thread_id, user_id, body, spoiler, parent_reply_id, created_at
spotify_tokens  id, user_id, access_token, refresh_token, expires_at
```

---

## MVP Scope (Phase 1)

Focus on core loop before community and Spotify features.

- [ ] Auth (email + Google OAuth, reader/author roles)
- [ ] Book search (Open Library integration)
- [ ] Shelf management (TBR / Reading / Read / DNF)
- [ ] Star ratings (half-star)
- [ ] Basic reviews
- [ ] My Library page (shelf view, no illustrated room yet)
- [ ] Reader profiles
- [ ] Simple content-based recommendations

## Phase 2

- [ ] Illustrated Library room (Canvas/Lottie)
- [ ] Spotify integration
- [ ] Discourse forum
- [ ] Collaborative filtering recommendations
- [ ] Author Dashboard + verified badges
- [ ] Reading progress tracker + streaks

## Phase 3

- [ ] Mobile app (React Native)
- [ ] Reading challenges
- [ ] Author AMAs
- [ ] Weekly digest emails
- [ ] Social lists / book clubs

---

## Open Questions

1. **Spotify Playback SDK** requires users to have Spotify Premium — decide whether to gate the full player or fall back to a playlist-linker for free users.
2. **Book data licensing** — Open Library is CC licensed; Google Books API has rate limits. Consider a hybrid or a self-managed seed database.
3. **Moderation** — Discourse and reviews need a reporting + moderation queue; decide if this is human-moderated or AI-assisted.
4. **Author verification** — manual review process or self-serve with proof (publisher email domain, ISBN ownership)?

---

*Document version 1.0 — generated for initial planning. Update as decisions are made.*
