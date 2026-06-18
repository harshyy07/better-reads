import re

with open("index.html", "r", encoding="utf8") as f:
    content = f.read()

# 1. Replace Navbar
nav_replacement = """<nav class="navbar lumina-navbar" id="navbar">
    <div class="container nav-inner lumina-nav-inner">
      <a href="#" class="nav-logo lumina-logo" id="nav-logo">
        <span class="nav-logo-text">Lumina Library</span>
      </a>
      <div class="lumina-search">
        <svg viewBox="0 0 24 24" class="lumina-search-icon"><path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
        <input type="text" id="hero-search-input" placeholder="Search my shelves...">
        <button id="hero-search-btn" style="display:none;"></button>
      </div>
      <div class="lumina-nav-right">
        <ul class="nav-links lumina-nav-links">
          <li><a href="#discover" id="nav-discover">Browse</a></li>
          <li><a href="#library" id="nav-library">My Library</a></li>
          <li><a href="#discourse" id="nav-discourse">Community</a></li>
        </ul>
        <div class="nav-cta lumina-nav-cta">
          <div class="lumina-nav-icon" title="Notifications">🔔</div>
          <div class="lumina-nav-icon" title="Reading Mode">📖</div>
          <div class="nav-avatar lumina-avatar" id="nav-avatar" title="Sign in" style="background-image: url('https://i.pravatar.cc/100?img=5'); background-size: cover; color: transparent;">🌸</div>
        </div>
      </div>
      <div class="nav-hamburger" id="nav-hamburger" aria-label="Open menu">
        <span></span><span></span><span></span>
      </div>
    </div>
  </nav>"""

content = re.sub(r'<nav class="navbar".*?</nav>', nav_replacement, content, flags=re.DOTALL)

# 2. Replace Hero Section
hero_replacement = """<section class="lumina-hero" style="background-image: url('assets/pastel_library_hero.png');">
        <div class="lumina-hero-overlay"></div>
        <div class="lumina-hero-content">
          <h1>Welcome home,<br>Reader</h1>
          <p>Your sanctuary of stories is waiting.<br>Which world will you step into today?</p>
        </div>
        <div class="lumina-hero-actions">
          <button class="room-hotspot lumina-btn-read" data-shelf="reading"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg> Read</button>
          <button class="room-hotspot lumina-btn-tbr" data-shelf="tbr"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg> TBR</button>
          <button class="room-hotspot lumina-btn-dnf" data-shelf="dnf"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path><line x1="4" y1="4" x2="20" y2="20"></line></svg> DNF</button>
        </div>
      </section>"""

content = re.sub(r'<section class="hero" id="hero">.*?</section>', hero_replacement, content, flags=re.DOTALL)

# 3. Remove FEATURES STRIP and CTA SECTION
# We can just match from <!-- FEATURES STRIP --> up to <!-- FOOTER --> and replace with <!-- FOOTER -->
content = re.sub(r'<!-- FEATURES STRIP -->.*?<!-- FOOTER -->', '<!-- FOOTER -->', content, flags=re.DOTALL)

with open("index.html", "w", encoding="utf8") as f:
    f.write(content)
