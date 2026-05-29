export default function Navbar({ searchQuery, onSearchChange, onSearchSubmit, onKeyDown, favoritosCount, onAbrirFavoritos }) {
  const count = favoritosCount || 0
  return (
    <header className="glass" style={{
      position: 'sticky', top: 0, zIndex: 100,
      padding: '0 48px', height: '64px',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      gap: '1rem',
      width: '100%',
      boxSizing: 'border-box',
    }}>

      {/* Logo */}
      <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: 'var(--text-primary)', flexShrink: 0 }}>
        <div style={{
          width: '36px', height: '36px', borderRadius: '10px',
          background: 'linear-gradient(135deg, var(--accent-color), var(--accent3))',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: '800', fontSize: '16px', color: '#000',
        }}>T</div>
        <span style={{ fontWeight: '800', fontSize: '1.1rem' }}>
          Tech<span style={{ color: 'var(--accent-color)' }}>Compare</span>
        </span>
      </a>

      {/* Barra de busqueda */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1, maxWidth: '480px' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <span style={{
            position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)',
            color: 'var(--text-secondary)', pointerEvents: 'none', fontSize: '1rem',
          }}>🔍</span>
          <input
            type="text"
            placeholder="Buscar producto..."
            value={searchQuery}
            onChange={onSearchChange}
            onKeyDown={onKeyDown}
            style={{
              width: '100%',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid var(--border-color)',
              borderRadius: '10px',
              padding: '0.6rem 0.75rem 0.6rem 2.4rem',
              color: 'var(--text-primary)',
              fontSize: '0.95rem',
              outline: 'none',
              transition: 'border-color 0.2s',
              boxSizing: 'border-box',
            }}
            onFocus={(e) => e.target.style.borderColor = 'var(--accent-color)'}
            onBlur={(e)  => e.target.style.borderColor = 'var(--border-color)'}
          />
        </div>
        <button
          onClick={onSearchSubmit}
          style={{
            background: 'var(--accent-color)', color: '#000',
            border: 'none', borderRadius: '10px',
            padding: '0.6rem 1.2rem',
            fontWeight: '700', fontSize: '0.9rem',
            cursor: 'pointer', flexShrink: 0,
            transition: 'background 0.2s',
          }}
          onMouseEnter={(e) => e.target.style.background = 'var(--accent-color-hover)'}
          onMouseLeave={(e) => e.target.style.background = 'var(--accent-color)'}
        >
          Buscar
        </button>
      </div>

      {/* Links de navegacion */}
      <nav style={{ display: 'flex', gap: '8px', alignItems: 'center', flexShrink: 0 }}>
        {[
          { label: 'Catálogo',   href: '#catalogo',   activo: true  },
          { label: 'Comparador', href: '#comparador', activo: false },
          { label: 'Nosotros',   href: '#nosotros',   activo: false },
        ].map(link => (
          <a key={link.label} href={link.href} style={{
            textDecoration: 'none',
            color: link.activo ? 'var(--text-primary)' : '#9090a8',
            fontWeight: '600', fontSize: '0.9rem',
            padding: '8px 18px', borderRadius: '8px',
            background: link.activo ? 'rgba(255,255,255,0.06)' : 'transparent',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.target.style.color = 'var(--text-primary)'; e.target.style.background = 'rgba(255,255,255,0.06)' }}
          onMouseLeave={e => { e.target.style.color = link.activo ? 'var(--text-primary)' : '#9090a8'; e.target.style.background = link.activo ? 'rgba(255,255,255,0.06)' : 'transparent' }}
          >
            {link.label}
          </a>
        ))}

        {/* Boton de Favoritos */}
        <button
          id="btn-favoritos"
          onClick={onAbrirFavoritos}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: count > 0 ? 'rgba(239, 68, 68, 0.1)' : 'rgba(255,255,255,0.04)',
            border: count > 0 ? '1px solid rgba(239, 68, 68, 0.3)' : '1px solid rgba(255,255,255,0.1)',
            borderRadius: '20px',
            padding: '6px 14px',
            color: count > 0 ? '#ef4444' : '#9090a8',
            fontWeight: '700',
            fontSize: '0.88rem',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(239,68,68,0.18)'
            e.currentTarget.style.borderColor = 'rgba(239,68,68,0.5)'
            e.currentTarget.style.color = '#ef4444'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = count > 0 ? 'rgba(239,68,68,0.1)' : 'rgba(255,255,255,0.04)'
            e.currentTarget.style.borderColor = count > 0 ? 'rgba(239,68,68,0.3)' : 'rgba(255,255,255,0.1)'
            e.currentTarget.style.color = count > 0 ? '#ef4444' : '#9090a8'
          }}
        >
          <span style={{ fontSize: '1rem' }}>{count > 0 ? '❤\uFE0F' : '🤍'}</span>
          <span>Favoritos</span>
          {count > 0 && (
            <span style={{
              background: '#ef4444',
              color: '#fff',
              fontSize: '10px',
              fontWeight: '900',
              width: '18px',
              height: '18px',
              borderRadius: '50%',
              display: 'grid',
              placeItems: 'center',
            }}>
              {count}
            </span>
          )}
        </button>
      </nav>
    </header>
  )
}
