// ── Componente: Sección principal (Hero) ──
export default function Hero() {
  return (
    <div style={{ textAlign: 'center', padding: '96px 24px 72px', position: 'relative' }}>

      {/* Etiqueta de proyecto */}
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: '8px',
        fontFamily: 'DM Mono, monospace', fontSize: '11px',
        letterSpacing: '0.14em', textTransform: 'uppercase',
        color: 'var(--accent-color)',
        background: 'rgba(0,212,255,0.08)',
        border: '1px solid rgba(0,212,255,0.2)',
        borderRadius: '100px', padding: '6px 16px', marginBottom: '28px',
        animation: 'fadeUp 0.6s ease both',
      }}>
        <svg width="8" height="8" viewBox="0 0 10 10" fill="currentColor"><circle cx="5" cy="5" r="5"/></svg>
        Proyecto SCRUM · 2026
      </div>

      {/* Bienvenida */}
      <p style={{
        fontSize: '1.05rem', color: '#9090b8', marginBottom: '12px',
        animation: 'fadeUp 0.6s 0.05s ease both',
      }}>
        Si buscas lo mejor en calidad — precio, bienvenido a{' '}
        <strong style={{ color: 'var(--accent-color)' }}>TechCompare</strong>
      </p>

      {/* Título principal */}
      <h1 style={{
        fontSize: 'clamp(2.5rem, 7vw, 4.2rem)', fontWeight: '800',
        lineHeight: '1.08', letterSpacing: '-0.03em', marginBottom: '20px',
        animation: 'fadeUp 0.6s 0.1s ease both',
      }}>
        Encuentra el{' '}
        <em style={{
          fontStyle: 'normal', color: 'var(--accent-color)',
        }}>mejor precio</em>
        <br/>en tecnología
      </h1>

      {/* Descripción */}
      <p style={{
        fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: '1.65',
        maxWidth: '560px', margin: '0 auto 48px',
        animation: 'fadeUp 0.6s 0.2s ease both',
      }}>
        Explora nuestro catálogo de productos tecnológicos y compara especificaciones en las mejores tiendas de Colombia.
      </p>

      {/* Botones de acción */}
      <div style={{
        display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap',
        animation: 'fadeUp 0.6s 0.3s ease both',
      }}>
        <a href="#catalogo" style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          textDecoration: 'none', fontWeight: '700', fontSize: '0.92rem',
          padding: '13px 28px', borderRadius: '12px',
          background: 'var(--accent-color)', color: '#000',
          transition: 'all 0.22s',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent-hover)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
        onMouseLeave={e => { e.currentTarget.style.background = 'var(--accent-color)'; e.currentTarget.style.transform = 'translateY(0)' }}
        >
          Ver catálogo
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </a>
        <a href="#comparador" style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          textDecoration: 'none', fontWeight: '700', fontSize: '0.92rem',
          padding: '13px 28px', borderRadius: '12px',
          background: 'rgba(255,255,255,0.05)', color: 'var(--text-primary)',
          border: '1px solid var(--border-color)',
          transition: 'all 0.22s',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.09)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.transform = 'translateY(0)' }}
        >
          Comparar productos
        </a>
      </div>
    </div>
  )
}
