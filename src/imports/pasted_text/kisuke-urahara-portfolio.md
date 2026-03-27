Build a single-page portfolio website for Kisuke Urahara, a 19-year-old Computer Science Engineering student (3rd year) from Bhimavaram, Andhra Pradesh, India. The design must be NEO-BRUTALIST — raw, bold, and unapologetically graphic — with smooth Framer Motion animations throughout every interaction and scroll event.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎨 DESIGN SYSTEM — NEO-BRUTALISM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Color palette:
  - Background: #F5F0E8 (off-white, paper texture feel)
  - Primary accent: #F0E040 (electric yellow)
  - Secondary accent: #FF4D4D (bold red)
  - Text: #1A1A1A (near-black)
  - Card fill: #FFFFFF
  - Border: 3px solid #1A1A1A (all elements)

Typography:
  - Display / headings: "Space Grotesk" or "Syne" — bold, heavy weight (700–900)
  - Body: "DM Mono" or "IBM Plex Mono" — monospace feel
  - Accent labels: ALL CAPS, wide letter-spacing (0.1em+)

Visual rules:
  - Hard box-shadow on all cards: 5px 5px 0px #1A1A1A
  - Zero border-radius everywhere — sharp, square corners only
  - Thick 3px black borders on every component
  - Grid lines visible as design elements in the background
  - Buttons have solid black border + yellow fill + hover shifts shadow to 8px 8px
  - Asymmetric layouts — stagger cards, break the grid intentionally
  - Large section numbers (01, 02, 03...) as decorative elements

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✨ FRAMER MOTION ANIMATIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Apply these globally using Framer Motion:
  - Page load: staggered entrance (staggerChildren: 0.12s, initial y:40 opacity:0)
  - Scroll reveal: whileInView with once:true, y:30 → 0, opacity 0→1
  - Hover on cards: scale(1.02) + shadow deepens (y shifts +2px, x shifts +2px)
  - Hover on buttons: translateY(-2px) with spring easing
  - Nav links: underline animates in with layoutId for active state
  - Hero text: character-by-character stagger reveal (use motion.span per char)
  - Section transitions: slide-in from left for odd, right for even sections
  - Cursor: custom animated cursor that scales on hover
  - Skills: progress bars animate in with a spring effect on scroll
  - Project cards: tilt effect (Framer Motion useMotionValue x/y)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 SITE STRUCTURE & CONTENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[NAVBAR]
  Fixed top bar. Monospace font. Left: "KU.dev" logotype. Right: nav links — About, Projects, Skills, Contact.
  Active link has yellow underline animated with Framer Motion layoutId.

[HERO — Section 01]
  Left side (60%):
    - Large sticker-style badge: "AVAILABLE FOR INTERNSHIP" (red bg, black border, slight rotation -2deg)
    - Animated headline (char-by-char reveal):
      "Hi, I'm
      Kisuke Urahara."
    - Sub-headline (monospace): "CSE (AI & DS) Undergrad · 3rd Year · 19 · Bhimavaram, AP"
    - Short bio:
      "I build AI-powered web apps and turn data into stories.
      Python, Flask, React, Firebase — you name it, I ship it."
    - Two CTA buttons: [View Projects →] and [Download Resume ↓]
      Yellow filled + black border on primary. Outlined on secondary.

  Right side (40%):
    - Abstract neo-brutalist illustration: stacked geometric blocks, grid pattern, floating code snippets
    - Floating tags with black borders: "#AI", "#WebDev", "#DataViz", "#OpenSource"
    - All tags wobble on a slow looping motion (y: ±6px, rotation: ±2deg)

[ABOUT — Section 02]
  Two-column layout (asymmetric: 55% / 45%)
  Left: Section number "02" huge and decorative (200px, 10% opacity). Paragraph text:
    "I'm a 3rd-year B.Tech student (CSE — AI & Data Science) at Vishnu Institute of Technology, Bhimavaram.
    CGPA: 8.33 | Expected Graduation: 2027.
    I'm obsessed with building things at the intersection of AI and the web.
    From ML pipelines to full-stack apps, I love turning complex ideas into clean, working software."
  Right: Info card (yellow background, black border, hard shadow):
    - 🎓 B.Tech CSE (AI & DS) — VIT Bhimavaram
    - 📍 Bhimavaram, Andhra Pradesh, India
    - 🎂 Age: 19
    - 📧 kaligotlasridattasai18@gmail.com
    - 🔗 GitHub | LinkedIn

[EXPERIENCE — Section 03]
  Timeline layout with thick black left border as the timeline spine.
  Each entry is a card (white, black border, 5px 5px 0 black shadow):

  Entry 1:
    Title: "Data Science Intern"
    Company: "SmartBridge — 2025"
    Bullets:
      · Data analysis and visualization with Python, SQL, Tableau
      · Cleaned and processed datasets to extract actionable insights
      · Designed interactive Tableau dashboards for decision-making

[PROJECTS — Section 04]
  3-column grid (on desktop) of project cards. Each card has:
    - Top tag bar: tech stack pills (yellow bg, black border, 0 radius)
    - Bold project title
    - Short description
    - [View Project →] button at bottom

  Project 1: RepoLogic — GitHub Repository Analyzer
    Tags: Python · Gemini API · RAG · Flask
    Desc: "AI-powered app that explains public GitHub repos using Retrieval-Augmented Generation. Ask questions in natural language, get file-level code explanations."
    Accent: Red top border 5px

  Project 2: AgriVision — Crop Recommendation System
    Tags: Python · Flask · Machine Learning · HTML/CSS
    Desc: "ML web app that recommends crops based on soil and weather data. Trained prediction model with Flask inference API."
    Accent: Yellow top border 5px

  Project 3: College Food Choices — Data Visualization
    Tags: Python · SQL · Tableau · Pandas
    Desc: "Analyzed college dietary survey data and built interactive Tableau dashboards exposing food, health, and lifestyle trends."
    Accent: Black top border 5px

[SKILLS — Section 05]
  Two-column layout.
  Left: Skill categories as labeled groups with animated bars:
    Languages: Python ████████░░ 80% | Java █████░░░░░ 50%
    Frontend: HTML/CSS ████████░░ 80% | React ██████░░░░ 60% | JS ███████░░░ 70%
    Backend: Flask ████████░░ 80% | Firebase ██████░░░░ 60% | Node.js ████░░░░░░ 40%
    Data & ML: Pandas/NumPy ████████░░ 80% | Tableau ███████░░░ 70% | SQL ███████░░░ 70%

  Right: Icon grid of tools in square tiles (black border, yellow hover):
    Python, Flask, React, Firebase, Git, SQL, Tableau, Gemini API, Figma, VS Code

[CERTIFICATIONS — Section 06]
  Horizontal scroll row of certificate cards (on mobile: scrollable). Cards:
    1. Programming in Java — NPTEL · IIT Kharagpur
    2. Pandas & NumPy — Kaggle
    3. Data Science Virtual Internship — Altair
    4. Web Full Stack Development — EduSkills

[CONTACT — Section 07]
  Dark section (background #1A1A1A, text #F5F0E8, accent #F0E040).
  Large heading: "Let's Build Something."
  Sub-text: "Open for internships, collabs, and cool ideas."
  Email link styled as a big button: [kaligotlasridattasai18@gmail.com]
  Social row: GitHub · LinkedIn (icon + label, yellow on hover)
  Footer: "© 2025 Kisuke Urahara — Built with React & Framer Motion"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚙️ TECH REQUIREMENTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  - Framework: React (Next.js preferred) or plain React with Vite
  - Animations: Framer Motion (not CSS-only)
  - Fonts: Google Fonts — load Syne + DM Mono
  - Fully responsive: mobile-first, 3 breakpoints (mobile / tablet / desktop)
  - Smooth scroll behavior between sections
  - Accessible: proper aria-labels, focus states visible
  - No external UI libraries (Tailwind for utility classes only is fine)
  - All animations must respect prefers-reduced-motion
    