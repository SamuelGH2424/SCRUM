// ── Componente: Sección Nosotros ──

// Información del equipo
const equipoScrum = [
  { iniciales: 'JC', nombre: 'Jorge Camargo',      rol: 'Scrum Master'  },
  { iniciales: 'GG', nombre: 'Giovanny Gutierrez', rol: 'Product Owner' },
  { iniciales: 'JM', nombre: 'Jorge Moreno',       rol: 'Developer'     },
  { iniciales: 'SG', nombre: 'Samuel Gerena',      rol: 'Developer'     },
]

export default function Nosotros() {
  return (
    <section id="nosotros" style={{ padding: '72px 48px', maxWidth: '1280px', margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center' }}>

        {/* Texto descriptivo */}
        <div>
          <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '16px' }}>
            ¿Quiénes <span style={{ color: 'var(--accent-color)' }}>somos</span>?
          </h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.75', marginBottom: '20px', fontSize: '0.97rem' }}>
            Somos un equipo de estudiantes apasionados por la tecnología y el desarrollo de software, trabajando bajo la metodología SCRUM para construir soluciones reales.
          </p>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.75', marginBottom: '28px', fontSize: '0.97rem' }}>
            Nuestra misión es ayudarte a tomar mejores decisiones de compra comparando productos tecnológicos de forma clara y objetiva.
          </p>

          {/* Botones externos */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <BotonExterno href="https://github.com/SamuelGH2424/SCRUM" icono={<IconoGitHub />}>
              Ver Repositorio
            </BotonExterno>
            <BotonExterno href="https://scrum-ex19.vercel.app/" icono={<IconoVercel />}>
              Ver Catálogo de Productos en Vercel
            </BotonExterno>
          </div>
        </div>

        {/* Tarjetas del equipo */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {equipoScrum.map(miembro => (
            <TarjetaMiembro key={miembro.nombre} miembro={miembro} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Sub-componente: Tarjeta de miembro del equipo ──
function TarjetaMiembro({ miembro }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '14px',
      background: 'var(--surface-hover)', border: '1px solid var(--border-color)',
      borderRadius: '12px', padding: '14px 18px',
      transition: 'border-color 0.2s',
    }}
    onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(0,212,255,0.2)'}
    onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-color)'}
    >
      <div style={{
        width: '40px', height: '40px', borderRadius: '50%',
        background: 'linear-gradient(135deg, var(--accent-color), var(--accent3))',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontWeight: '800', fontSize: '15px', color: '#fff', flexShrink: 0,
      }}>
        {miembro.iniciales}
      </div>
      <div>
        <div style={{ fontWeight: '700', fontSize: '0.92rem' }}>{miembro.nombre}</div>
        <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontFamily: 'DM Mono, monospace' }}>
          {miembro.rol}
        </div>
      </div>
    </div>
  )
}

// ── Sub-componente: Botón de enlace externo ──
function BotonExterno({ href, icono, children }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" style={{
      display: 'inline-flex', alignItems: 'center', gap: '8px',
      textDecoration: 'none', fontWeight: '700', fontSize: '0.82rem',
      padding: '10px 20px', borderRadius: '12px',
      background: 'rgba(255,255,255,0.05)', color: 'var(--text-primary)',
      border: '1px solid var(--border-color)', transition: 'all 0.22s',
    }}
    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.09)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.transform = 'translateY(0)' }}
    >
      {icono}
      {children}
    </a>
  )
}

// ── Íconos SVG ──
function IconoGitHub() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.16c-3.34.73-4.03-1.42-4.03-1.42-.55-1.39-1.33-1.76-1.33-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.49 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 016 0c2.3-1.55 3.3-1.23 3.3-1.23.66 1.65.24 2.87.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.19.7.8.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
    </svg>
  )
}

function IconoVercel() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 22.525H0l12-21.05 12 21.05z"/>
    </svg>
  )
}
