import { motion } from "motion/react";
import { ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";

/* ─── Types ─────────────────────────────────────────────── */
interface Project {
  title: string;
  tags: string[];
  description: string;
  url: string;
  impact?: string;
}

/* ─── Data ───────────────────────────────────────────────── */
const featured: Project = {
  title: "RepoLogic — GitHub Repository Analyzer",
  tags: ["Python", "Gemini API", "RAG", "Flask"],
  description:
    "An AI-powered app that explains public GitHub repos using Retrieval-Augmented Generation. Ask questions in natural language, get file-level code explorations powered by Gemini 2.0 Flash.",
  url: "https://repologic8.onrender.com/",
  impact: "↗ Live on Render · RAG + Gemini 2.0 Flash",
};

const bentoProjects: (Project & { colSpan: number; rowSpan: number; isLarge?: boolean; problemSolution?: { problem: string; solution: string } })[] = [
  {
    title: "AgriVision — Crop Recommendation System",
    tags: ["Python", "Flask", "Machine Learning", "HTML/CSS"],
    description:
      "An AI-powered agriculture platform that helps farmers make smarter decisions — crop recommendations, soil analysis, and plant disease detection. ML + web dashboards delivering real-time insights for better yield and sustainability.",
    url: "https://agri-vision-tso2.onrender.com/",
    impact: "↗ Smart India Hackathon · ML model · Live on Render",
    colSpan: 4,
    rowSpan: 2,
    isLarge: true,
    problemSolution: {
      problem:
        "Small and marginal farmers rely on guesswork and local shopkeepers for crop and fertilizer decisions — no access to personalized advice based on actual soil, weather, or crop history. Poor yields and chemical overuse follow.",
      solution:
        "Built a mobile-friendly web platform for Smart India Hackathon — crop recommendations via a RandomForest ML model trained on soil NPK + pH values, fertilizer suggestions, real-time weather, plant disease detection, and a Gemini-powered chatbot. Deployed on Render.",
    },
  },
  {
    title: "College Food Choices — Data Visualization",
    tags: ["Python", "SQL", "Tableau", "Pandas"],
    description:
      "Analyzed college dietary survey data and built interactive Tableau dashboards exposing food, health, and lifestyle trends.",
    url: "https://public.tableau.com/app/profile/kaligotla.sri.datta.sai.vithal/viz/project1_17518128996070/HealthandNutritionDashboard",
    impact: "↗ Live on Tableau Public · Kaggle dataset",
    colSpan: 2,
    rowSpan: 1,
    problemSolution: {
      problem:
        "College students lack visibility into their own dietary habits — busy schedules, junk food access, and zero data-driven feedback make it impossible to identify unhealthy patterns.",
      solution:
        "4 Tableau dashboards from a 300-record student survey — Lifestyle, Dietary Habits, Health & Nutrition, Parental Influence. Deployed via Flask on Render.",
    },
  },
  {
    title: "My-timee",
    tags: ["HTML", "CSS", "JavaScript"],
    description:
      "A TV show time tracker that calculates how much time you've spent watching. LocalStorage persistence.",
    url: "https://github.com/Sridattasai18/My-timee",
    impact: "↗ Runs in browser · No dependencies",
    colSpan: 2,
    rowSpan: 1,
  },
  {
    title: "Builder-Logs",
    tags: ["HTML", "CSS", "JavaScript"],
    description:
      "A private developer journal that lives in your browser. Write in Markdown, save HTML prototypes, tag your work — no accounts, no servers.",
    url: "https://sridattasai18.github.io/Builder-Logs/",
    impact: "↗ Live on GitHub Pages · Zero dependencies",
    colSpan: 3,
    rowSpan: 1,
  },
  {
    title: "StudyFlow",
    tags: ["HTML", "CSS", "JavaScript"],
    description:
      "A NotebookLM-style research assistant. Upload PDFs, URLs, YouTube videos and chat with your material using Gemini + RAG.",
    url: "https://github.com/Sridattasai18/StudyFlow",
    impact: "↗ In progress · Inspired by NotebookLM",
    colSpan: 2,
    rowSpan: 1,
    problemSolution: {
      problem:
        "No simple tool existed for students to query their own study material before NotebookLM went public.",
      solution:
        "Full-stack RAG app with Next.js + FastAPI, ChromaDB vector search, and Gemini. Built before NotebookLM went mainstream.",
    },
  },
];

/* ─── Animated Stats Ticker ─────────────────────────────── */
function StatsTicker() {
  const stats = [
    "~90% Accuracy",
    "22 Crops Supported",
    "Real-time Weather",
    "Smart India Hackathon"
  ];
  
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % stats.length);
    }, 2000);
    
    return () => clearInterval(interval);
  }, [stats.length]);
  
  return (
    <div
      style={{
        background: "#00B4D8",
        padding: "12px 16px",
        marginTop: 10,
        marginBottom: 10,
        position: "relative",
        overflow: "hidden",
        height: "42px",
      }}
    >
      <style>{`
        @keyframes fadeInOut {
          0% { opacity: 0; transform: translateY(10px); }
          10% { opacity: 1; transform: translateY(0); }
          90% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-10px); }
        }
      `}</style>
      {stats.map((stat, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            top: "12px",
            left: "16px",
            fontFamily: "var(--font-mono)",
            fontSize: 14,
            fontWeight: 700,
            color: "#ffffff",
            textTransform: "uppercase",
            opacity: currentIndex === index ? 1 : 0,
            animation: currentIndex === index ? "fadeInOut 2s ease-in-out" : "none",
          }}
        >
          &gt; {stat}
        </div>
      ))}
    </div>
  );
}

/* ─── Shared button ──────────────────────────────────────── */
function ViewBtn({ url }: { url: string }) {
  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      style={{ boxShadow: "3px 3px 0px #1A1A1A", fontFamily: "var(--font-mono)" }}
      className="inline-flex items-center gap-2 bg-transparent border-[2px] border-[#1A1A1A] py-2 px-4 text-xs font-bold uppercase tracking-wider"
      whileHover={{ y: -2, boxShadow: "5px 5px 0px #1A1A1A", transition: { type: "spring", stiffness: 400 } }}
    >
      View Project <ExternalLink className="w-3 h-3" />
    </motion.a>
  );
}

/* ─── Bento card ─────────────────────────────────────────── */
function BentoCard({ project, index }: { project: typeof bentoProjects[0]; index: number }) {
  return (
    <motion.div
      className="project-card bg-[#F5F0E8] border-[2px] border-[#1A1A1A] p-4 flex flex-col overflow-hidden"
      style={{
        gridColumn: `span ${project.colSpan}`,
        gridRow: `span ${project.rowSpan}`,
        boxShadow: "3px 3px 0 #1A1A1A",
        borderRadius: 0,
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      whileHover={{ y: -6, boxShadow: "8px 8px 0px #1A1A1A", transition: { duration: 0.2, ease: "easeOut" } }}
    >
      {/* Tags */}
      <div className="flex flex-wrap gap-1 mb-3">
        {project.tags.map((tag, i) => (
          <span
            key={i}
            style={{ fontFamily: "var(--font-mono)", fontSize: 10, border: "1.5px solid #1A1A1A", background: "#ffffff" }}
            className="px-2 py-[2px] font-bold uppercase"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Title */}
      <h3 style={{ fontFamily: "var(--font-display)" }} className="font-black text-base sm:text-lg mb-2 leading-tight">
        {project.title}
      </h3>

      {/* AgriVision accent block */}
      {project.isLarge && (
        <div
          style={{
            background: "#00B4D8",
            border: "none",
            borderRadius: 0,
            padding: "12px 16px",
            marginTop: 10,
            marginBottom: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 20, fontWeight: 700, color: "#1A1A1A", lineHeight: 1.2 }}>
            ML + AI
          </span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#1A1A1A", opacity: 0.7, marginTop: 2 }}>
            ~90% Accuracy
          </span>
        </div>
      )}

      {/* Description */}
      <p style={{ fontFamily: "var(--font-display)", fontSize: 12, marginBottom: project.isLarge ? "16px" : "8px" }} className="leading-relaxed">
        {project.description}
      </p>

      {/* Animated Stats Ticker — AgriVision only */}
      {project.isLarge && (
        <div style={{ marginBottom: "16px" }}>
          <StatsTicker />
        </div>
      )}

      {/* Problem / Solution — College Food only */}
      {project.problemSolution && (
        <div style={{ 
          marginTop: project.isLarge ? "20px" : "10px", 
          marginBottom: project.isLarge ? "20px" : "10px",
          paddingTop: 10, 
          borderTop: "1px solid rgba(26,26,26,0.12)", 
          fontFamily: "var(--font-mono)", 
          fontSize: 10, 
          lineHeight: 1.6 
        }} className="flex-1">
          <p style={{ marginBottom: 6 }}>
            <span style={{ fontWeight: 700, opacity: 0.7, letterSpacing: "0.08em" }}>PROBLEM — </span>
            <span style={{ opacity: 0.85, fontWeight: 400 }}>{project.problemSolution.problem}</span>
          </p>
          <p>
            <span style={{ fontWeight: 700, opacity: 0.7, letterSpacing: "0.08em" }}>SOLUTION — </span>
            <span style={{ opacity: 0.85, fontWeight: 400 }}>{project.problemSolution.solution}</span>
          </p>
        </div>
      )}

      {/* Impact */}
      {project.impact && (
        <p style={{ fontFamily: "var(--font-mono)", fontSize: 10 }} className="opacity-55 mb-3">
          {project.impact}
        </p>
      )}

      <ViewBtn url={project.url} />
    </motion.div>
  );
}

/* ─── Main component ─────────────────────────────────────── */
export function Projects() {
  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 scroll-mt-20">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative mb-12"
        >
          <span
            style={{ fontFamily: "var(--font-display)" }}
            className="absolute -left-4 -top-8 font-black text-[140px] leading-none opacity-[0.06] select-none z-0"
          >
            05
          </span>
          <h2 style={{ fontFamily: "var(--font-display)" }} className="relative z-10 font-black text-4xl sm:text-5xl">
            Projects
          </h2>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: 12 }} className="mt-2 opacity-50">
            Things I've built and shipped.
          </p>
        </motion.div>

        {/* ── FEATURED CARD ── */}
        <motion.div
          className="project-card border-[3px] border-[#1A1A1A] bg-[#F5F0E8] overflow-hidden mb-5 flex flex-col sm:flex-row"
          style={{ boxShadow: "7px 7px 0px #1A1A1A", minHeight: 180 }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          whileHover={{ y: -6, boxShadow: "10px 10px 0px #1A1A1A", transition: { duration: 0.2, ease: "easeOut" } }}
        >
          {/* Yellow accent block — top on mobile, right on desktop */}
          <div
            className="w-full sm:w-[40%] sm:order-last flex flex-col items-center justify-center py-8 sm:py-0"
            style={{ background: "#00B4D8", borderLeft: "0", borderBottom: "3px solid #1A1A1A" }}
          >
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 28, fontWeight: 700, color: "#1A1A1A" }}>
              RAG + AI
            </span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#1A1A1A" }} className="opacity-70 mt-1">
              Gemini 2.0 Flash
            </span>
          </div>

          {/* Left content */}
          <div className="flex-1 p-6 flex flex-col justify-between" style={{ borderRight: "3px solid #1A1A1A" }}>
            <div>
              <p
                style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.15em" }}
                className="uppercase opacity-50 mb-2"
              >
                Featured Project
              </p>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700 }} className="mb-3 leading-tight">
                {featured.title}
              </h3>
              <div className="flex flex-wrap gap-2 mb-3">
                {featured.tags.map((tag, i) => (
                  <span
                    key={i}
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 10,
                      fontWeight: 700,
                      background: "#00B4D8",
                      border: "2px solid #1A1A1A",
                      padding: "2px 8px",
                      color: "#1A1A1A",
                    }}
                    className="uppercase"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p style={{ fontFamily: "sans-serif", fontSize: 12 }} className="leading-relaxed mb-2">
                {featured.description}
              </p>

              {/* Problem / Solution */}
              <div style={{ marginTop: 10, paddingTop: 10, borderTop: "1px solid rgba(26,26,26,0.12)", fontFamily: "var(--font-mono)", fontSize: 11, lineHeight: 1.6 }} className="mb-2">
                <p style={{ marginBottom: 6 }}>
                  <span style={{ fontWeight: 700, opacity: 0.7, letterSpacing: "0.08em" }}>PROBLEM — </span>
                  <span style={{ opacity: 0.85, fontWeight: 400 }}>Understanding an unfamiliar codebase or GitHub repo means constantly switching between the code and an LLM — copy, paste, ask, repeat. It breaks focus and slows everything down.</span>
                </p>
                <p>
                  <span style={{ fontWeight: 700, opacity: 0.7, letterSpacing: "0.08em" }}>SOLUTION — </span>
                  <span style={{ opacity: 0.85, fontWeight: 400 }}>Built RepoLogic to fix my own workflow — chat with any public repo directly, hover over code or docs for instant explanations. A RAG pipeline ingests the repo files and Gemini 2.0 Flash answers queries with full file-level context. No more tab switching.</span>
                </p>
              </div>

              {featured.impact && (
                <p style={{ fontFamily: "var(--font-mono)", fontSize: 10 }} className="opacity-55 mb-4">
                  {featured.impact}
                </p>
              )}
            </div>
            <ViewBtn url={featured.url} />
          </div>
        </motion.div>

        {/* ── BENTO GRID ── */}
        <p
          style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.1em" }}
          className="uppercase opacity-45 mb-3"
        >
          More Projects
        </p>

        {/* Desktop: 6-col CSS grid */}
        <div
          className="hidden sm:grid gap-[14px]"
          style={{ gridTemplateColumns: "repeat(6, 1fr)" }}
        >
          {bentoProjects.map((project, index) => (
            <BentoCard key={index} project={project} index={index} />
          ))}
          {/* Always building tile */}
          <motion.div
            className="bg-[#00B4D8] border-[2px] border-[#1A1A1A] p-4 flex flex-col justify-between"
            style={{ gridColumn: "span 1", gridRow: "span 1", boxShadow: "3px 3px 0 #1A1A1A", borderRadius: 0 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            whileHover={{ y: -6, boxShadow: "8px 8px 0px #1A1A1A", transition: { duration: 0.2, ease: "easeOut" } }}
          >
            <div>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700 }} className="opacity-50 mb-1">
                MORE COMING
              </p>
              <h3 style={{ fontFamily: "var(--font-display)" }} className="font-black text-lg mb-4">
                Always building.
              </h3>
            </div>
            <motion.a
              href="https://github.com/Sridattasai18"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontFamily: "var(--font-mono)", boxShadow: "3px 3px 0 #1A1A1A" }}
              className="inline-flex items-center gap-1 border-[2px] border-[#1A1A1A] bg-transparent py-2 px-4 text-xs font-bold uppercase tracking-wider self-start"
              whileHover={{ y: -2, boxShadow: "5px 5px 0 #1A1A1A", transition: { type: "spring", stiffness: 400 } }}
            >
              GitHub ↗
            </motion.a>
          </motion.div>
        </div>

        {/* Mobile: single column stack */}
        <div className="flex flex-col gap-4 sm:hidden">
          {bentoProjects.map((project, index) => (
            <motion.div
              key={index}
              className="project-card bg-[#F5F0E8] border-[2px] border-[#1A1A1A] p-4 flex flex-col"
              style={{ boxShadow: "3px 3px 0 #1A1A1A" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
            >
              <div className="flex flex-wrap gap-1 mb-3">
                {project.tags.map((tag, i) => (
                  <span
                    key={i}
                    style={{ fontFamily: "var(--font-mono)", fontSize: 10, border: "1.5px solid #1A1A1A", background: "#ffffff" }}
                    className="px-2 py-[2px] font-bold uppercase"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h3 style={{ fontFamily: "var(--font-display)" }} className="font-black text-lg mb-2">
                {project.title}
              </h3>
              <p style={{ fontFamily: "var(--font-display)", fontSize: 12 }} className="leading-relaxed mb-2 flex-1">
                {project.description}
              </p>
              {project.impact && (
                <p style={{ fontFamily: "var(--font-mono)", fontSize: 10 }} className="opacity-55 mb-3">
                  {project.impact}
                </p>
              )}
              <ViewBtn url={project.url} />
            </motion.div>
          ))}
          {/* Always building — mobile */}
          <div
            className="bg-[#00B4D8] border-[2px] border-[#1A1A1A] p-4 flex flex-col gap-3"
            style={{ boxShadow: "3px 3px 0 #1A1A1A" }}
          >
            <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700 }} className="opacity-50">
              MORE COMING
            </p>
            <h3 style={{ fontFamily: "var(--font-display)" }} className="font-black text-lg">
              Always building.
            </h3>
            <p style={{ fontFamily: "var(--font-display)", fontSize: 12 }} className="leading-relaxed">
              New projects ship regularly. Check GitHub for latest work.
            </p>
            <motion.a
              href="https://github.com/Sridattasai18"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontFamily: "var(--font-mono)", boxShadow: "3px 3px 0 #1A1A1A" }}
              className="inline-flex items-center gap-1 border-[2px] border-[#1A1A1A] bg-transparent py-2 px-4 text-xs font-bold uppercase tracking-wider self-start"
              whileHover={{ y: -2, boxShadow: "5px 5px 0 #1A1A1A", transition: { type: "spring", stiffness: 400 } }}
            >
              GitHub ↗
            </motion.a>
          </div>
        </div>

      </div>
    </section>
  );
}
