import { useEffect, useState } from "react";
import { Compass, BookOpen, Sparkles } from "lucide-react";
import "./StemHero.css";

const worlds = [
{
name: "COSMOS",
number: "01",
image:
"https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=2400&q=90",
},
{
name: "TECHNOLOGY",
number: "02",
image:
"https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=2400&q=90",
},
{
name: "MATHEMATICS",
number: "03",
image:
"https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=2400&q=90",
},
{
name: "ENGINEERING",
number: "04",
image:
"https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=2400&q=90",
},
];

export default function StemHero() {
const [activeWorld, setActiveWorld] = useState(0);
const [reducedMotion, setReducedMotion] = useState(false);

useEffect(() => {
const mediaQuery = window.matchMedia(
"(prefers-reduced-motion: reduce)"
);


const updateMotionPreference = () =>
  setReducedMotion(mediaQuery.matches);

updateMotionPreference();
mediaQuery.addEventListener("change", updateMotionPreference);

return () =>
  mediaQuery.removeEventListener("change", updateMotionPreference);


}, []);

useEffect(() => {
if (reducedMotion) return;


const timer = window.setInterval(() => {
  setActiveWorld((current) => (current + 1) % worlds.length);
}, 3000);

return () => window.clearInterval(timer);


}, [reducedMotion]);

return ( <section className="stem-hero"> <div className="stem-backgrounds" aria-hidden="true">
{worlds.map((world, index) => (
<div
key={world.name}
className={`stem-background ${
              activeWorld === index ? "is-active" : ""
            }`}
style={{ backgroundImage: `url("${world.image}")` }}
/>
))} </div>

```
  <div className="stem-overlay" aria-hidden="true" />

  <div className="stem-hero-content">
    <span className="stem-eyebrow">WONDERLENS · A WORLD OF DISCOVERY</span>

    <h1>Understand the world by discovering how it works.</h1>

    <p>
      Explore the science hidden in everyday life, rediscover the ideas
      in your textbooks, and follow your curiosity into the unexpected.
    </p>

    <div className="stem-hero-actions">
      <button
        className="stem-button stem-button-primary"
        onClick={() => document.getElementById("explore")?.scrollIntoView({ behavior: "smooth" })}
      >
        <Compass size={18} />
        Explore the World
      </button>

      <button
        className="stem-button stem-button-secondary"
        onClick={() => document.getElementById("rediscover")?.scrollIntoView({ behavior: "smooth" })}
      >
        <BookOpen size={18} />
        Rediscover a Concept
      </button>

      <button
        className="stem-button stem-button-quiet"
        onClick={() => {
          const random = Math.floor(Math.random() * worlds.length);
          setActiveWorld(random);
        }}
      >
        <Sparkles size={18} />
        Surprise Me
      </button>
    </div>

    <div className="stem-world-indicator" aria-live="polite">
      <span>
        {worlds[activeWorld].number} / {worlds[activeWorld].name}
      </span>

      <div className="stem-progress" aria-label="Current STEM world">
        {worlds.map((world, index) => (
          <button
            key={world.name}
            className={`stem-progress-segment ${
              index === activeWorld ? "is-active" : ""
            }`}
            onClick={() => setActiveWorld(index)}
            aria-label={`Show ${world.name.toLowerCase()} background`}
            aria-pressed={index === activeWorld}
          />
        ))}
      </div>
    </div>
  </div>
</section>

);
}
