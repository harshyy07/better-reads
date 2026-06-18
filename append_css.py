lumina_css = """

/* ========================================================
   LUMINA THEME OVERRIDES (HERO & NAVBAR)
   ======================================================== */
.lumina-navbar {
  background: var(--bg);
  border-bottom: 1px solid var(--border);
  box-shadow: none;
}
.lumina-nav-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
}
.lumina-logo {
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  color: var(--ink);
  text-decoration: none;
}
.lumina-search {
  flex: 1;
  max-width: 400px;
  background: var(--bg-alt);
  border-radius: 20px;
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  margin: 0 2rem;
}
.lumina-search input {
  border: none;
  background: transparent;
  width: 100%;
  margin-left: 0.5rem;
  font-family: 'DM Sans', sans-serif;
  color: var(--ink);
  outline: none;
}
.lumina-search-icon {
  width: 18px;
  height: 18px;
  color: var(--ink-light);
}
.lumina-nav-right {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}
.lumina-nav-links {
  display: flex;
  gap: 1.5rem;
  list-style: none;
}
.lumina-nav-links a {
  text-decoration: none;
  color: var(--ink-light);
  font-weight: 500;
  font-size: 0.9rem;
}
.lumina-nav-cta {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.lumina-nav-icon {
  cursor: pointer;
  font-size: 1.2rem;
}
.lumina-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

/* LUMINA HERO */
.lumina-page-home {
  padding-top: 70px; /* offset navbar */
  background: var(--bg);
}
.lumina-hero {
  position: relative;
  height: 350px;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 3rem;
  margin-top: 2rem;
  background-size: cover;
  background-position: center;
}
.lumina-hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.lumina-hero-content {
  position: relative;
  z-index: 2;
  color: #333;
}
.lumina-hero-content h1 {
  font-family: 'Playfair Display', serif;
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  color: #2c2c2c;
  line-height: 1.2;
}
.lumina-hero-content p {
  font-family: 'DM Sans', sans-serif;
  font-size: 1rem;
  color: #4a4a4a;
  max-width: 400px;
  line-height: 1.4;
}
.lumina-hero-actions {
  position: relative;
  z-index: 2;
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
}
.lumina-hero-actions button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 20px;
  font-family: 'DM Sans', sans-serif;
  font-weight: 600;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(4px);
  color: #333;
  transition: all 0.2s ease;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
}
.lumina-hero-actions button:hover {
  background: white;
  transform: translateY(-2px);
}
"""

with open("css/style.css", "a", encoding="utf8") as f:
    f.write(lumina_css)
