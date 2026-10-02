import { useState } from "react";
import { motion } from "framer-motion";

import {
  ArrowUpRight,
  Menu,
  X,
  Globe2,
  Smartphone,
  Monitor,
  ShoppingBag,
  Sparkles,
  Layers3,
  Zap,
  ShieldCheck,
  Rocket,
  BrainCircuit,
  Boxes,
  Send,
  Mail,
  MapPin,
  CheckCircle2,
  Code2,
} from "lucide-react";

import OwnerLogin from "./components/owner/OwnerLogin";
import OwnerDashboard from "./components/owner/OwnerDashboard";

import "./index.css";


// ============================================================
// API CONFIGURATION
// ============================================================

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://127.0.0.1:8000";


// ============================================================
// WHAT WE BUILD
// ============================================================

const capabilities = [
  {
    number: "01",
    icon: Globe2,
    title: "Websites",
    description:
      "Modern digital experiences designed to give businesses a strong presence on the web.",
    tags: ["React", "UI/UX", "Responsive"],
  },
  {
    number: "02",
    icon: Smartphone,
    title: "Mobile Apps",
    description:
      "User-focused mobile applications designed to connect products, businesses and people.",
    tags: ["Mobile", "APIs", "Experience"],
  },
  {
    number: "03",
    icon: Monitor,
    title: "Web Applications",
    description:
      "Powerful web-based applications that turn ideas, workflows and business needs into digital products.",
    tags: ["Frontend", "Backend", "Cloud"],
  },
  {
    number: "04",
    icon: ShoppingBag,
    title: "E-commerce",
    description:
      "Digital commerce experiences built to help businesses sell, manage and grow online.",
    tags: ["Commerce", "Payments", "Platforms"],
  },
];


// ============================================================
// PRODUCT DIRECTIONS
// ============================================================

const productDirections = [
  {
    icon: BrainCircuit,
    title: "AI & Automation",
    description:
      "Exploring intelligent products that automate work and make technology more useful.",
  },
  {
    icon: Boxes,
    title: "SaaS & Business Tools",
    description:
      "Building ideas for software products that can help businesses operate and grow.",
  },
  {
    icon: Smartphone,
    title: "Consumer Apps",
    description:
      "Creating mobile-first experiences designed around real people and everyday needs.",
  },
  {
    icon: Globe2,
    title: "Web Platforms",
    description:
      "Working toward scalable internet products that connect people, businesses and ideas.",
  },
];


// ============================================================
// NAVBAR
// ============================================================

function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    ["Home", "#home"],
    ["What We Build", "#build"],
    ["Products", "#products"],
    ["Innovation", "#innovation"],
    ["About", "#about"],
    ["Contact", "#contact"],
  ];

  return (
    <header className="navbar">
      <a href="#home" className="brand">
        <span className="brand-icon">
          <Layers3 size={23} />
        </span>

        <span>
          <strong>LoopX</strong>
          <small>TECHNOLOGIES</small>
        </span>
      </a>

      <nav className={open ? "nav-links show" : "nav-links"}>
        {links.map(([label, href]) => (
          <a
            key={label}
            href={href}
            onClick={() => setOpen(false)}
          >
            {label}
          </a>
        ))}

        <a
          href="#contact"
          className="nav-cta"
          onClick={() => setOpen(false)}
        >
          Let's Talk
          <ArrowUpRight size={16} />
        </a>
      </nav>

      <button
        className="menu-button"
        onClick={() => setOpen(!open)}
        aria-label="Toggle navigation"
      >
        {open ? <X /> : <Menu />}
      </button>
    </header>
  );
}


// ============================================================
// HERO
// ============================================================

function Hero() {
  return (
    <section className="hero section" id="home">
      <div className="hero-glow glow-one" />
      <div className="hero-glow glow-two" />

      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="eyebrow">
          <span className="status-dot" />
          TECHNOLOGY STARTUP
        </div>

        <h1>
          Building the
          <br />
          <span className="gradient-text">
            Technology
          </span>
          <br />
          of Tomorrow<span className="accent-dot">.</span>
        </h1>

        <p className="hero-description">
          LoopX builds websites, applications and digital
          platforms for ambitious businesses while working
          toward creating technology products of our own.
        </p>

        <div className="hero-actions">
          <a href="#build" className="button button-primary">
            Explore What We Build
            <ArrowUpRight size={18} />
          </a>

          <a href="#products" className="button button-outline">
            Our Product Vision
          </a>
        </div>

        <div className="hero-proof">
          <span className="proof-line" />
          <span>BUILD • INNOVATE • EVOLVE</span>
        </div>
      </motion.div>

      <motion.div
        className="hero-visual"
        initial={{
          opacity: 0,
          scale: 0.8,
          rotate: -8,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          rotate: 0,
        }}
        transition={{ duration: 1 }}
      >
        <div className="orbit orbit-one" />
        <div className="orbit orbit-two" />
        <div className="orbit orbit-three" />

        <div className="visual-core">
          <div className="core-inner">
            <Layers3 size={76} strokeWidth={1.2} />
            <span>LOOPX</span>
          </div>
        </div>

        <div className="floating-card card-code">
          <Code2 size={20} />
          <span>Digital Products</span>
        </div>

        <div className="floating-card card-ai">
          <BrainCircuit size={20} />
          <span>AI Innovation</span>
        </div>

        <div className="floating-card card-cloud">
          <Globe2 size={20} />
          <span>Global Vision</span>
        </div>
      </motion.div>

      <div className="hero-bottom">
        <span>01 / 06</span>
        <span>SCROLL TO EXPLORE</span>

        <a href="#build" aria-label="Scroll to what we build">
          ↓
        </a>
      </div>
    </section>
  );
}


// ============================================================
// WHAT WE BUILD
// ============================================================

function WhatWeBuild() {
  return (
    <section className="section build-section" id="build">
      <div className="section-label">
        <span>01</span> / WHAT WE BUILD
      </div>

      <div className="section-heading-row">
        <h2>
          From ideas
          <br />
          <span className="gradient-text">
            to digital products.
          </span>
        </h2>

        <p>
          We help startups, businesses and entrepreneurs
          transform ideas into useful digital experiences.
        </p>
      </div>

      <div className="capabilities-grid">
        {capabilities.map((item, index) => (
          <motion.article
            className="capability-card"
            key={item.number}
            initial={{
              opacity: 0,
              y: 35,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{ once: true }}
            transition={{
              delay: index * 0.1,
            }}
          >
            <div className="capability-top">
              <div className="capability-icon">
                <item.icon size={27} />
              </div>

              <span>{item.number}</span>
            </div>

            <h3>{item.title}</h3>

            <p>{item.description}</p>

            <div className="tag-list">
              {item.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>

            <a href="#contact" className="capability-arrow">
              <ArrowUpRight size={20} />
            </a>
          </motion.article>
        ))}
      </div>
    </section>
  );
}


// ============================================================
// PRODUCT VISION
// ============================================================

function Products() {
  return (
    <section className="section products-section" id="products">
      <div className="section-label">
        <span>02</span> / OUR PRODUCT VISION
      </div>

      <div className="product-vision-grid">
        <motion.div
          className="product-vision-copy"
          initial={{ opacity: 0, x: -35 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className="vision-badge">
            <Rocket size={15} />
            BUILDING TOWARD THE FUTURE
          </div>

          <h2>
            More than
            <br />
            <span className="gradient-text">
              client solutions.
            </span>
          </h2>

          <p className="large-copy">
            Our ambition is to grow LoopX into a technology
            product company.
          </p>

          <p>
            Alongside building digital solutions for businesses,
            we are exploring ideas for products that can solve
            real problems at scale.
          </p>

          <div className="product-flow">
            <span>IDEA</span>
            <i />
            <span>BUILD</span>
            <i />
            <span>LAUNCH</span>
            <i />
            <span>SCALE</span>
          </div>
        </motion.div>

        <div className="product-directions">
          {productDirections.map((item, index) => (
            <motion.div
              className="product-direction"
              key={item.title}
              initial={{
                opacity: 0,
                x: 30,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.1,
              }}
            >
              <div className="product-direction-icon">
                <item.icon size={23} />
              </div>

              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


// ============================================================
// INNOVATION
// ============================================================

function Innovation() {
  return (
    <section
      className="section innovation-section"
      id="innovation"
    >
      <div className="section-label">
        <span>03</span> / INNOVATION
      </div>

      <div className="innovation-heading">
        <h2>
          Exploring what's
          <br />
          <span className="gradient-text">
            next.
          </span>
        </h2>

        <p>
          Technology changes quickly. Our journey is about
          learning, experimenting and turning promising ideas
          into useful products.
        </p>
      </div>

      <div className="innovation-grid">
        <div className="innovation-feature">
          <div className="innovation-number">01</div>

          <Sparkles size={34} />

          <h3>AI & Automation</h3>

          <p>
            Exploring intelligent systems that can make
            everyday work faster, simpler and more useful.
          </p>
        </div>

        <div className="innovation-feature">
          <div className="innovation-number">02</div>

          <Boxes size={34} />

          <h3>SaaS Products</h3>

          <p>
            Exploring scalable software products designed
            around real business problems.
          </p>
        </div>

        <div className="innovation-feature">
          <div className="innovation-number">03</div>

          <Globe2 size={34} />

          <h3>Internet Platforms</h3>

          <p>
            Building toward digital platforms capable of
            connecting users, businesses and communities.
          </p>
        </div>
      </div>
    </section>
  );
}


// ============================================================
// ABOUT
// ============================================================

function About() {
  const values = [
    {
      icon: Zap,
      title: "Move Fast",
      text: "Turn promising ideas into practical digital experiences.",
    },
    {
      icon: ShieldCheck,
      title: "Build Responsibly",
      text: "Focus on quality, reliability and thoughtful engineering.",
    },
    {
      icon: Rocket,
      title: "Think Bigger",
      text: "Keep learning and build toward products that can scale.",
    },
  ];

  return (
    <section className="section about-section" id="about">
      <div className="section-label">
        <span>04</span> / ABOUT LOOPX
      </div>

      <div className="about-grid">
        <motion.div
          initial={{ opacity: 0, x: -35 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="about-heading"
        >
          <h2>
            Building today.
            <br />
            <span className="gradient-text">
              Thinking ahead.
            </span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 35 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="about-copy"
        >
          <p className="large-copy">
            LoopX Technologies Innovation Pvt. Ltd. is a
            technology startup focused on digital products
            and technology-driven solutions.
          </p>

          <p>
            We work across websites, mobile applications,
            web applications and e-commerce while exploring
            opportunities to create our own technology
            products in the future.
          </p>

          <p>
            Our long-term direction is to grow from building
            digital solutions into a technology product
            company with products used by people and
            businesses around the world.
          </p>

          <a href="#contact" className="text-link">
            Start a conversation
            <ArrowUpRight size={18} />
          </a>
        </motion.div>
      </div>

      <div className="values-grid">
        {values.map((item, index) => (
          <motion.div
            className="value-card"
            key={item.title}
            initial={{
              opacity: 0,
              y: 25,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{ once: true }}
            transition={{
              delay: index * 0.15,
            }}
          >
            <item.icon size={27} />

            <h3>{item.title}</h3>

            <p>{item.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}


// ============================================================
// CONTACT
// ============================================================

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    service: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/contact/`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(form),
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log("Success:", data);

        setSubmitted(true);

        setForm({
          name: "",
          email: "",
          service: "",
          message: "",
        });
      } else {
        console.error("Validation error:", data);

        alert("Please check your details.");
      }
    } catch (error) {
      console.error("Server error:", error);

      alert(
        "Unable to connect to the server. Please try again."
      );
    }
  }

  function resetForm() {
    setSubmitted(false);

    setForm({
      name: "",
      email: "",
      service: "",
      message: "",
    });
  }

  return (
    <section
      className="section contact-section"
      id="contact"
    >
      <div className="section-label">
        <span>05</span> / START A CONVERSATION
      </div>

      <div className="contact-grid">
        <div className="contact-copy">
          <h2>
            Have an idea?
            <br />
            <span className="gradient-text">
              Let's build it.
            </span>
          </h2>

          <p>
            Whether you are building a startup, launching a
            business or exploring a new digital product,
            tell us what you have in mind.
          </p>

          <div className="contact-detail">
            <div className="contact-detail-icon">
              <Mail size={20} />
            </div>

            <div>
              <small>EMAIL</small>
              <p>hello@loopx.example</p>
            </div>
          </div>

          <div className="contact-detail">
            <div className="contact-detail-icon">
              <MapPin size={20} />
            </div>

            <div>
              <small>LOCATION</small>
              <p>India</p>
            </div>
          </div>
        </div>

        <form
          className="contact-form"
          onSubmit={handleSubmit}
        >
          {submitted ? (
            <div className="success-message">
              <CheckCircle2 size={45} />

              <h3>Message received.</h3>

              <p>
                Thank you for reaching out to LoopX.
                Your enquiry has been submitted successfully.
              </p>

              <button
                type="button"
                className="button button-outline"
                onClick={resetForm}
              >
                Send another message
              </button>
            </div>
          ) : (
            <>
              <label>
                Your Name

                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                />
              </label>

              <label>
                Email Address

                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                />
              </label>

              <label>
                What are you looking to build?

                <select
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                  required
                >
                  <option value="">
                    Select an option
                  </option>

                  <option value="Website">
                    Website
                  </option>

                  <option value="Mobile App">
                    Mobile App
                  </option>

                  <option value="Web Application">
                    Web Application
                  </option>

                  <option value="E-commerce">
                    E-commerce
                  </option>

                  <option value="Product Development">
                    Product Development
                  </option>

                  <option value="Other">
                    Other
                  </option>
                </select>
              </label>

              <label>
                Tell us about your idea

                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us what you want to build..."
                  rows="5"
                  required
                />
              </label>

              <button
                type="submit"
                className="button button-primary submit-button"
              >
                Send Enquiry
                <Send size={17} />
              </button>
            </>
          )}
        </form>
      </div>
    </section>
  );
}


// ============================================================
// FOOTER
// ============================================================

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-main">
        <a href="#home" className="brand">
          <span className="brand-icon">
            <Layers3 size={23} />
          </span>

          <span>
            <strong>LoopX</strong>
            <small>TECHNOLOGIES</small>
          </span>
        </a>

        <p>
          Building digital products today.
          <br />
          Creating what's next.
        </p>

        <div className="footer-links">
          <a href="#build">What We Build</a>
          <a href="#products">Products</a>
          <a href="#innovation">Innovation</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>
      </div>

      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} LoopX Technologies
          Innovation Pvt. Ltd.
        </span>

        <a href="#home">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}


// ============================================================
// MAIN APP
// ============================================================

export default function App() {
  const [ownerLoggedIn, setOwnerLoggedIn] = useState(
    !!localStorage.getItem("loopx_access_token")
  );

  const isOwnerPage =
    window.location.pathname === "/owner";

  // ==========================================================
  // OWNER AREA
  // ==========================================================

  if (isOwnerPage) {
    if (ownerLoggedIn) {
      return (
        <OwnerDashboard
          onLogout={() => {
            localStorage.removeItem(
              "loopx_access_token"
            );

            localStorage.removeItem(
              "loopx_refresh_token"
            );

            setOwnerLoggedIn(false);
          }}
        />
      );
    }

    return (
      <OwnerLogin
        onLogin={() => {
          setOwnerLoggedIn(true);
        }}
      />
    );
  }

  // ==========================================================
  // PUBLIC WEBSITE
  // ==========================================================

  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <WhatWeBuild />
        <Products />
        <Innovation />
        <About />
        <Contact />
      </main>

      <Footer />
    </>
  );
}