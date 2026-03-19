// ── Componente: Tarjeta de producto ──

// Formatea precio en pesos colombianos
const formatearPrecio = (precio) =>
  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(precio)

// Emojis por marca como placeholder de imagen
const emojiPorMarca = { HP: '💻', ASUS: '🎮', Dell: '🖥️', Lenovo: '🎯', Apple: '🍎', Acer: '⚡' }

export default function ProductCard({ producto, enComparador, onToggleComparar }) {
  const emoji = emojiPorMarca[producto.brand_name] || '💻'

  return (
    <div
      className="animate-fade-in"
      style={{
        background: 'var(--surface-hover)', border: '1px solid var(--border-color)',
        borderRadius: '20px', overflow: 'hidden', cursor: 'pointer',
        transition: 'all 0.28s ease', display: 'flex', flexDirection: 'column',
        ...(enComparador && { borderColor: 'rgba(0,212,255,0.35)' }),
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-4px)'
        e.currentTarget.style.borderColor = 'rgba(0,212,255,0.25)'
        e.currentTarget.style.boxShadow = '0 16px 48px rgba(0,0,0,0.5)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.borderColor = enComparador ? 'rgba(0,212,255,0.35)' : 'var(--border-color)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {/* Imagen / Placeholder */}
      <div style={{
        position: 'relative', height: '200px',
        background: producto.image_url ? '#fff' : '#1e1e2e',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {producto.image_url ? (
          <img
            src={producto.image_url}
            alt={producto.name}
            style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
            onError={e => { e.target.style.display = 'none' }}
          />
        ) : (
          <span style={{ fontSize: '64px' }}>{emoji}</span>
        )}

        {/* Etiqueta de categoría */}
        <div style={{
          position: 'absolute', top: '14px', right: '14px',
          fontFamily: 'DM Mono, monospace', fontSize: '10px',
          letterSpacing: '0.1em', textTransform: 'uppercase',
          background: 'rgba(0,0,0,0.75)', color: '#ccc',
          padding: '4px 10px', borderRadius: '6px',
          backdropFilter: 'blur(8px)',
        }}>
          {producto.category_name}
        </div>

        {/* Botón de comparar */}
        <button
          onClick={e => { e.stopPropagation(); onToggleComparar(producto.id) }}
          style={{
            position: 'absolute', top: '14px', left: '14px',
            background: enComparador ? 'var(--accent-color)' : 'rgba(0,212,255,0.15)',
            border: `1px solid ${enComparador ? 'var(--accent-color)' : 'rgba(0,212,255,0.35)'}`,
            color: enComparador ? '#000' : 'var(--accent-color)',
            fontFamily: 'DM Mono, monospace', fontSize: '10px',
            textTransform: 'uppercase', letterSpacing: '0.08em',
            padding: '4px 10px', borderRadius: '6px', cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          {enComparador ? '✓ En comparador' : '+ Comparar'}
        </button>
      </div>

      {/* Información del producto */}
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>
          {producto.brand_name}
        </div>
        <h3 style={{ fontWeight: '700', fontSize: '1.05rem', marginBottom: '12px', lineHeight: '1.3' }}>
          {producto.name}
        </h3>

        {/* Specs resumidas */}
        {producto.specs && (
          <div style={{ marginBottom: '16px' }}>
            {Object.entries(producto.specs)
              .filter(([k]) => !['Año'].includes(k))
              .slice(0, 3)
              .map(([, v]) => (
                <span key={v} style={{
                  display: 'inline-block', fontFamily: 'DM Mono, monospace',
                  fontSize: '10px', color: 'var(--text-secondary)',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '5px', padding: '3px 8px', margin: '2px 2px 2px 0',
                }}>
                  {v}
                </span>
              ))
            }
          </div>
        )}

        {/* Precio y tiendas */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '1rem' }}>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '2px' }}>Desde</div>
            <div style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--accent-color)' }}>
              {producto.lowest_price ? formatearPrecio(producto.lowest_price) : 'No disponible'}
            </div>
          </div>
          <div style={{
            fontFamily: 'DM Mono, monospace', fontSize: '11px',
            color: 'var(--text-secondary)', background: 'rgba(255,255,255,0.05)',
            border: '1px solid var(--border-color)', borderRadius: '6px', padding: '4px 10px',
          }}>
            {producto.prices_count} tiendas
          </div>
        </div>
      </div>
    </div>
  )
}
