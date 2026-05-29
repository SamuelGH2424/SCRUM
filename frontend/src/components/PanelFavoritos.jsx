// ============================================================
// PanelFavoritos.jsx — El panel deslizable de favoritos
// ============================================================
import { useEffect } from 'react'

const formatearPrecio = (precio) =>
  new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(precio)

const emojiPorMarca = {
  HP: '💻',
  ASUS: '🎮',
  Asus: '🎮',
  Dell: '🖥️',
  Lenovo: '🎯',
  Apple: '🍎',
  Acer: '⚡',
  Samsung: '📱',
  Xiaomi: '📱',
  Logitech: '🖱️',
  Corsair: '⌨️',
  AMD: '🔥',
  Intel: '🧠',
  NVIDIA: '🎮',
}

export default function PanelFavoritos({
  isOpen,
  onCerrar,
  favoritosIds,
  productos,
  onToggleFavorito,
  onToggleComparar,
  onVerDetalles,
  slots,
}) {
  // Encontrar la información completa de cada producto favorito
  const favoritos = productos.filter((p) => favoritosIds.includes(p.id))

  // Bloquear el scroll del body cuando el panel esté abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <>
      {/* Fondo oscuro semitransparente (Backdrop) */}
      <div
        onClick={onCerrar}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(2, 6, 23, 0.65)',
          backdropFilter: 'blur(6px)',
          zIndex: 9999,
          animation: 'premiumFadeIn 0.2s ease both',
        }}
      />

      {/* Cajón Lateral (Drawer) */}
      <aside
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: 'min(460px, 100vw)',
          background: 'linear-gradient(180deg, rgba(16, 16, 26, 0.98), rgba(10, 10, 16, 0.99))',
          borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '-10px 0 40px rgba(0, 0, 0, 0.5)',
          zIndex: 10000,
          display: 'flex',
          flexDirection: 'column',
          animation: 'slideIn 0.28s cubic-bezier(0.16, 1, 0.3, 1) both',
        }}
      >
        {/* Encabezado */}
        <div
          style={{
            padding: '24px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '1.4rem' }}>❤️</span>
            <h3
              style={{
                margin: 0,
                fontSize: '1.25rem',
                fontWeight: 900,
                color: '#fff',
                letterSpacing: '-0.02em',
              }}
            >
              Mis Favoritos
            </h3>
            <span
              style={{
                fontFamily: 'DM Mono, monospace',
                fontSize: '11px',
                background: 'rgba(239, 68, 68, 0.15)',
                color: '#ef4444',
                padding: '3px 8px',
                borderRadius: '999px',
                fontWeight: 750,
                marginLeft: '6px',
              }}
            >
              {favoritos.length}
            </span>
          </div>

          <button
            onClick={onCerrar}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#94a3b8',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              cursor: 'pointer',
              fontWeight: '900',
              display: 'grid',
              placeItems: 'center',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#fff'
              e.currentTarget.style.background = 'rgba(255,255,255,0.1)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#94a3b8'
              e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
            }}
          >
            ✕
          </button>
        </div>

        {/* Contenido / Lista */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
          {favoritos.length === 0 ? (
            /* Estado Vacío */
            <div
              style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: '24px',
              }}
            >
              <span
                style={{
                  fontSize: '4.5rem',
                  filter: 'drop-shadow(0 10px 20px rgba(239,68,68,0.15))',
                  marginBottom: '20px',
                  animation: 'pulse 2s infinite',
                }}
              >
                🤍
              </span>
              <h4 style={{ fontWeight: 800, fontSize: '1.1rem', color: '#fff', marginBottom: '8px' }}>
                ¿No tienes favoritos aún?
              </h4>
              <p style={{ color: '#7070a0', fontSize: '0.88rem', lineHeight: '1.5', maxWidth: '280px', margin: '0 auto 24px' }}>
                Explora nuestro catálogo tecnológico y marca tus productos preferidos haciendo clic en el corazón.
              </p>
              <button
                onClick={onCerrar}
                style={{
                  background: 'var(--accent-color)',
                  color: '#000',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '12px 24px',
                  fontWeight: '700',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              >
                Explorar catálogo
              </button>
            </div>
          ) : (
            /* Lista de favoritos */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {favoritos.map((producto) => {
                const emoji = emojiPorMarca[producto.brand_name] || '💻'
                const enComparador = slots.includes(producto.id)

                return (
                  <div
                    key={producto.id}
                    style={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.07)',
                      borderRadius: '20px',
                      padding: '14px',
                      display: 'flex',
                      gap: '14px',
                      position: 'relative',
                      transition: 'border-color 0.2s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(239,68,68,0.25)')}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)')}
                  >
                    {/* Mini Imagen/Emoji */}
                    <div
                      onClick={() => onVerDetalles(producto)}
                      style={{
                        width: '74px',
                        height: '74px',
                        borderRadius: '14px',
                        background: producto.image_url
                          ? '#fff'
                          : 'radial-gradient(circle, rgba(34,211,238,0.1) 0%, rgba(15,23,42,0.8) 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        flexShrink: 0,
                      }}
                    >
                      {producto.image_url ? (
                        <img
                          src={producto.image_url}
                          alt={producto.name}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          onError={(e) => (e.currentTarget.style.display = 'none')}
                        />
                      ) : (
                        <span style={{ fontSize: '30px' }}>{emoji}</span>
                      )}
                    </div>

                    {/* Información */}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                      <span
                        style={{
                          fontFamily: 'DM Mono, monospace',
                          fontSize: '9px',
                          color: '#7070a0',
                          textTransform: 'uppercase',
                          letterSpacing: '0.08em',
                        }}
                      >
                        {producto.brand_name}
                      </span>
                      <h4
                        onClick={() => onVerDetalles(producto)}
                        style={{
                          margin: '2px 0 6px',
                          fontSize: '0.92rem',
                          fontWeight: 750,
                          color: '#fff',
                          cursor: 'pointer',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {producto.name}
                      </h4>

                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginTop: 'auto' }}>
                        {/* Precio */}
                        <span
                          style={{
                            fontSize: '1rem',
                            fontWeight: 900,
                            color: 'var(--accent-color)',
                          }}
                        >
                          {producto.lowest_price ? formatearPrecio(producto.lowest_price) : 'N/D'}
                        </span>

                        {/* Botón rápido "+ Comparar" */}
                        <button
                          onClick={() => onToggleComparar(producto.id)}
                          style={{
                            background: enComparador
                              ? 'linear-gradient(135deg, #22c55e, #86efac)'
                              : 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid ' + (enComparador ? 'rgba(134,239,172,0.5)' : 'rgba(255, 255, 255, 0.1)'),
                            color: enComparador ? '#022c22' : '#dbeafe',
                            fontSize: '9px',
                            fontFamily: 'DM Mono, monospace',
                            fontWeight: 900,
                            padding: '4px 8px',
                            borderRadius: '999px',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                          }}
                        >
                          {enComparador ? '✓ Comparando' : '+ Comparar'}
                        </button>
                      </div>
                    </div>

                    {/* Botón Eliminar de Favoritos (Papelera) */}
                    <button
                      onClick={() => onToggleFavorito(producto.id)}
                      title="Quitar de favoritos"
                      style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        background: 'none',
                        border: 'none',
                        color: 'rgba(255, 255, 255, 0.35)',
                        cursor: 'pointer',
                        fontSize: '14px',
                        padding: '4px',
                        display: 'grid',
                        placeItems: 'center',
                        transition: 'color 0.2s',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#ff4d6d')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.35)')}
                    >
                      🗑️
                    </button>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </aside>
    </>
  )
}
