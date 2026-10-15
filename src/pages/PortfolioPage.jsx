import React from 'react';
import { NavLink } from 'react-router-dom';

export default function PortfolioPage() {
  const teamMembers = [
    {
      name: "Lead Developer / Architect",
      rollNo: "Batch 2025 • CSE",
      role: "Architecture, React Router & Redux Toolkit",
      contributions: "Configured multi-page SPA routing, Redux Toolkit store, createAsyncThunk comparison engine, and theme context.",
      avatar: "👨‍💻"
    },
    {
      name: "Frontend Engineer",
      rollNo: "Batch 2025 • CSE",
      role: "Reusable Form Handling & UI Components",
      contributions: "Engineered TextInput, SelectInput, TextAreaInput, and custom validation hook with field & submit level checks.",
      avatar: "👩‍💻"
    },
    {
      name: "Geospatial & State Specialist",
      rollNo: "Batch 2025 • CSE",
      role: "Leaflet Map & Context API Telemetry",
      contributions: "Implemented Leaflet dark vector basemap, click coordinate picker, and WeatherContext global state architecture.",
      avatar: "🌐"
    },
    {
      name: "API & Backend Engineer",
      rollNo: "Batch 2025 • CSE",
      role: "Node.js REST Backend & OpenWeather API",
      contributions: "Built Node.js HTTP server with full CRUD REST API endpoints, SPA fallback routing, and persistent JSON database.",
      avatar: "⚙️"
    }
  ];

  const rubricChecklist = [
    {
      category: "React-Navigation layout & page structure",
      marks: "7-8 Marks",
      status: "Implemented",
      details: "Multi-page SPA design using react-router-dom (BrowserRouter, Routes, Route, NavLink, useNavigate, ProtectedRoute, 404 handler). Active tab highlights and clean page hierarchy.",
      link: "/portal"
    },
    {
      category: "Context API & State architecture",
      marks: "6-8 Marks",
      status: "Implemented",
      details: "AuthContext (user authentication & persistence), ThemeContext (dynamic Dark/Light theme switching), and WeatherContext (global telemetry, loading/error states, unit conversion).",
      link: "/portal"
    },
    {
      category: "Intro to Redux Toolkit",
      marks: "3-5 Marks",
      status: "Implemented",
      details: "@reduxjs/toolkit configureStore, favoritesSlice (pinning/bookmarked cities in localStorage), and comparisonSlice with createAsyncThunk (async telemetry lifecycle).",
      link: "/analytics"
    },
    {
      category: "Form handling in React",
      marks: "3-4 Marks",
      status: "Implemented",
      details: "Reusable components (TextInput, SelectInput, TextAreaInput, CheckboxInput, Button) + useFormValidation hook with real-time validation, coordinate bounds, and error states.",
      link: "/report"
    }
  ];

  return (
    <div style={{
      maxWidth: '1300px',
      margin: '0 auto',
      padding: '24px 20px',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: '32px'
    }}>
      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8), rgba(15, 23, 42, 0.9))',
        border: '1px solid var(--card-border)',
        borderRadius: '28px',
        padding: '36px',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.4)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <span style={{
              background: 'linear-gradient(135deg, #ff7043, #f59e0b)',
              color: '#fff',
              fontSize: '0.78rem',
              fontWeight: 800,
              padding: '4px 12px',
              borderRadius: '20px'
            }}>
              CHITKARA UNIVERSITY
            </span>
            <span style={{ fontSize: '0.82rem', color: 'var(--accent-cyan)', fontWeight: 600 }}>
              Course Code: 25CSE0203 • Front End Engineering-II
            </span>
          </div>

          <h1 style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.5px' }}>
            Mini Project: Team &amp; Engineering Portfolio
          </h1>
          <p style={{ color: 'var(--text-sub)', fontSize: '1.05rem', maxWidth: '780px', marginTop: '10px', lineHeight: 1.6 }}>
            Desh Dekho is a modern, responsive web application engineered for Project-based Evaluation-II.
            It seamlessly integrates client-side SPA routing, Context API, Redux Toolkit async thunks, and enterprise form validation.
          </p>

          <div style={{ display: 'flex', gap: '10px', marginTop: '20px', flexWrap: 'wrap' }}>
            {['React 18', 'React Router v6', 'Redux Toolkit', 'Context API', 'Vite', 'Leaflet.js', 'Node.js REST API'].map(tech => (
              <span
                key={tech}
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid var(--card-border)',
                  color: 'var(--text-main)',
                  padding: '6px 14px',
                  borderRadius: '20px',
                  fontSize: '0.82rem',
                  fontWeight: 600
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Rubric Evaluation Alignment Matrix */}
      <div>
        <div style={{ marginBottom: '16px' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-main)' }}>
            📋 Project Evaluation-II Rubric Alignment (Annexure-A)
          </h2>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-sub)' }}>
            Direct mapping of university syllabus rubrics to working application features and source code.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
          gap: '18px'
        }}>
          {rubricChecklist.map((item, idx) => (
            <div
              key={idx}
              style={{
                background: 'var(--card-bg)',
                border: '1px solid var(--card-border)',
                borderRadius: '20px',
                padding: '22px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.25)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{
                  fontSize: '0.75rem',
                  padding: '3px 8px',
                  borderRadius: '8px',
                  background: 'rgba(52, 211, 153, 0.15)',
                  color: '#34d399',
                  fontWeight: 700
                }}>
                  {item.status} ✓
                </span>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-cyan)' }}>
                  {item.marks}
                </span>
              </div>

              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)' }}>
                {item.category}
              </h3>

              <p style={{ fontSize: '0.84rem', color: 'var(--text-sub)', lineHeight: 1.5, flex: 1 }}>
                {item.details}
              </p>

              <NavLink
                to={item.link}
                style={{
                  background: 'rgba(56, 189, 248, 0.15)',
                  border: '1px solid rgba(56, 189, 248, 0.3)',
                  color: 'var(--accent-cyan)',
                  padding: '8px 12px',
                  borderRadius: '10px',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  textAlign: 'center',
                  textDecoration: 'none',
                  marginTop: '6px'
                }}
              >
                Inspect Feature in App →
              </NavLink>
            </div>
          ))}
        </div>
      </div>

      {/* Team Members Section */}
      <div>
        <div style={{ marginBottom: '16px' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-main)' }}>
            👥 Project Team (3-4 Members)
          </h2>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-sub)' }}>
            Individual roles and engineering contributions for Project-based Evaluation-II.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '18px'
        }}>
          {teamMembers.map((m, idx) => (
            <div
              key={idx}
              style={{
                background: 'var(--card-bg)',
                border: '1px solid var(--card-border)',
                borderRadius: '20px',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{
                  fontSize: '2rem',
                  width: '50px',
                  height: '50px',
                  borderRadius: '14px',
                  background: 'rgba(56, 189, 248, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {m.avatar}
                </span>
                <div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)' }}>
                    Member {idx + 1}
                  </h3>
                  <span style={{ fontSize: '0.78rem', color: 'var(--accent-cyan)' }}>
                    {m.role}
                  </span>
                </div>
              </div>

              <span style={{ fontSize: '0.76rem', color: 'var(--text-sub)', fontWeight: 500 }}>
                {m.rollNo}
              </span>

              <p style={{ fontSize: '0.83rem', color: 'var(--text-sub)', lineHeight: 1.5, marginTop: '4px' }}>
                {m.contributions}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Architecture & State Flow Diagram */}
      <div style={{
        background: 'var(--card-bg)',
        border: '1px solid var(--card-border)',
        borderRadius: '24px',
        padding: '28px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
      }}>
        <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-main)' }}>
          🏗️ Architectural Hierarchy: Local vs Context vs Redux
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '16px'
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid var(--card-border)',
            borderRadius: '14px',
            padding: '16px'
          }}>
            <strong style={{ color: '#38bdf8', fontSize: '0.95rem' }}>1. Local State (useState)</strong>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-sub)', marginTop: '6px', lineHeight: 1.5 }}>
              Component-scoped UI state: Modal visibility, form input values, local table search, password reveal toggle.
            </p>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid var(--card-border)',
            borderRadius: '14px',
            padding: '16px'
          }}>
            <strong style={{ color: '#34d399', fontSize: '0.95rem' }}>2. Context API (Global App State)</strong>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-sub)', marginTop: '6px', lineHeight: 1.5 }}>
              Application-wide state: AuthContext (session login/logout), ThemeContext (dark/light mode), WeatherContext (telemetry, units, toasts).
            </p>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid var(--card-border)',
            borderRadius: '14px',
            padding: '16px'
          }}>
            <strong style={{ color: '#a855f7', fontSize: '0.95rem' }}>3. Redux Toolkit (Enterprise State)</strong>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-sub)', marginTop: '6px', lineHeight: 1.5 }}>
              Complex / async state: favoritesSlice (persisted location bookmarks) and comparisonSlice (multi-city telemetry via createAsyncThunk).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
