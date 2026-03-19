// ── Componente: Pie de página ──
const enlacesFooter = [
  { label: 'Catálogo',   href: '#catalogo'   },
  { label: 'Comparador', href: '#comparador' },
  { label: 'Nosotros',   href: '#nosotros'   },
  { label: 'GitHub',     href: 'https://github.com/SamuelGH2424/SCRUM', externo: true },
]

export default function Footer() {
  return (
    <footer className="glass" style={{
      position: 'relative', zIndex: 1,
      borderTop: '1px solid var(--border-color)',
      borderBottom: 'none', borderLeft: 'none', borderRight: 'none',
      borderRadius: 0, padding: '32px 48px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      flexWrap: 'wrap', gap: '12px',
    }}>

      {/* Logo */}
      <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: 'var(--text-primary)' }}>
        <div style={{
          width: '28px', height: '28px', borderRadius: '8px', fontSize: '13px',
          background: 'linear-gradient(135deg, var(--accent-color), var(--accent3))',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: '800', color: '#000',
        }}>T</div>
        <span style={{ fontWeight: '700', fontSize: '0.9rem' }}>
          Tech<span style={{ color: 'var(--accent-color)' }}>Compare</span>
        </span>
      </a>

      {/* Links */}
      <div style={{ display: 'flex', gap: '24px' }}>
        {enlacesFooter.map(link => (
          <a key={link.label} href={link.href}
            target={link.externo ? '_blank' : undefined}
            rel={link.externo ? 'noopener noreferrer' : undefined}
            style={{ textDecoration: 'none', color: 'var(--text-secondary)', fontSize: '0.8rem', transition: 'color 0.2s' }}
            onMouseEnter={e => e.target.style.color = 'var(--accent-color)'}
            onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* Copyright */}
      <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.7rem', color: '#50505f' }}>
        // SCRUM Project · 2026
      </span>
    </footer>
  )
}
