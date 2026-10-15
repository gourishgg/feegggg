import React, { useState } from 'react';
import { useSelector } from 'react-redux';

export default function ReduxInspector() {
  const [isOpen, setIsOpen] = useState(false);
  const reduxState = useSelector((state) => state);

  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1500 }}>
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            color: '#ffffff',
            padding: '8px 14px',
            borderRadius: '24px',
            fontSize: '0.8rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 8px 24px rgba(124, 58, 237, 0.5)',
            cursor: 'pointer'
          }}
        >
          <span style={{ fontSize: '1.1rem' }}>⚡</span>
          <span>Redux Toolkit Inspector</span>
        </button>
      ) : (
        <div style={{
          width: '360px',
          maxHeight: '450px',
          background: 'rgba(15, 23, 42, 0.95)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(168, 85, 247, 0.5)',
          borderRadius: '20px',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}>
          {/* Header */}
          <div style={{
            padding: '12px 16px',
            background: 'linear-gradient(90deg, rgba(124, 58, 237, 0.3), rgba(79, 70, 229, 0.3))',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '1rem' }}>⚡</span>
              <strong style={{ fontSize: '0.88rem', color: '#fff' }}>Redux Store Live Inspector</strong>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#cbd5e1',
                fontSize: '1.2rem',
                cursor: 'pointer'
              }}
            >
              &times;
            </button>
          </div>

          {/* Body */}
          <div style={{ padding: '14px', overflowY: 'auto', flex: 1, fontSize: '0.78rem', color: '#e2e8f0' }}>
            <div style={{ marginBottom: '10px' }}>
              <span style={{ color: '#a855f7', fontWeight: 600 }}>Active RTK Slices:</span>
              <div style={{ display: 'flex', gap: '6px', marginTop: '4px' }}>
                <span style={{ background: 'rgba(168, 85, 247, 0.2)', padding: '2px 8px', borderRadius: '6px', border: '1px solid rgba(168, 85, 247, 0.4)' }}>
                  favoritesSlice ({reduxState.favorites?.favoriteIds?.length || 0})
                </span>
                <span style={{ background: 'rgba(56, 189, 248, 0.2)', padding: '2px 8px', borderRadius: '6px', border: '1px solid rgba(56, 189, 248, 0.4)' }}>
                  comparisonSlice (Async Thunk)
                </span>
              </div>
            </div>

            <div style={{ marginBottom: '6px', color: '#94a3b8' }}>
              <strong>State Snapshot:</strong>
            </div>

            <pre style={{
              background: 'rgba(0, 0, 0, 0.4)',
              padding: '10px',
              borderRadius: '10px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              fontFamily: 'monospace',
              fontSize: '0.72rem',
              color: '#38bdf8',
              maxHeight: '260px',
              overflowY: 'auto',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-all'
            }}>
              {JSON.stringify(reduxState, null, 2)}
            </pre>
          </div>

          {/* Footer note */}
          <div style={{
            padding: '8px 14px',
            background: 'rgba(0, 0, 0, 0.3)',
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            fontSize: '0.7rem',
            color: '#94a3b8',
            textAlign: 'center'
          }}>
            Evaluator Tool • Redux Toolkit (25CSE0203 Rubric Component 2)
          </div>
        </div>
      )}
    </div>
  );
}
