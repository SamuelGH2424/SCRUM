// Catalogo.jsx
import { useEffect, useMemo, useState } from 'react'
import ProductCard from './ProductCard.jsx'

const POR_PAGINA = 6

const formatearPrecio = (precio) =>
  new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(precio)

const nombresSpecs = {
  processor: 'Procesador',
  ram_gb: 'Memoria RAM',
  storage: 'Almacenamiento',
  screen_size: 'Pantalla',
  operating_system: 'Sistema operativo',
  gpu: 'Tarjeta gráfica',
  weight_kg: 'Peso',
  battery_hours: 'Batería',
  year: 'Año',
  color: 'Color',
  connectivity: 'Conectividad',
  resolution: 'Resolución',
  refresh_rate: 'Frecuencia',
  panel: 'Panel',
  warranty: 'Garantía',
}

const iconosSpecs = {
  processor: '🧠',
  ram_gb: '⚡',
  storage: '💾',
  screen_size: '🖥️',
  operating_system: '🪟',
  gpu: '🎮',
  weight_kg: '⚖️',
  battery_hours: '🔋',
  year: '📅',
  color: '🎨',
  connectivity: '📡',
  resolution: '🔍',
  refresh_rate: '🌊',
  panel: '💡',
  warranty: '🛡️',
}

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

function formatearSpec(clave, valor) {
  if (valor === null || valor === undefined || valor === '') return '—'
  if (clave === 'ram_gb') return `${valor} GB`
  if (clave === 'weight_kg') return `${valor} kg`
  if (clave === 'battery_hours') return `${valor} horas`
  if (clave === 'refresh_rate') return `${valor} Hz`
  return String(valor)
}

function getSpecsProducto(producto) {
  if (producto.specifications) return producto.specifications
  if (producto.specs) return producto.specs
  return {}
}

function obtenerHighlights(producto) {
  const specs = getSpecsProducto(producto)

  return [
    specs.processor && { label: 'Procesador', value: specs.processor },
    specs.ram_gb && { label: 'RAM', value: `${specs.ram_gb} GB` },
    specs.storage && { label: 'Almacenamiento', value: specs.storage },
    specs.gpu && { label: 'Gráfica', value: specs.gpu },
    specs.screen_size && { label: 'Pantalla', value: specs.screen_size },
  ].filter(Boolean).slice(0, 4)
}

export default function Catalogo({
  productos,
  cargando,
  error,
  slots,
  onToggleComparar,
  activeSearch,
  onClearSearch,
}) {
  const [pagina, setPagina] = useState(1)
  const [productoDetalle, setProductoDetalle] = useState(null)
  const [zoomActivo, setZoomActivo] = useState(false)

  const totalPaginas = Math.ceil(productos.length / POR_PAGINA)
  const productosPagina = productos.slice(
    (pagina - 1) * POR_PAGINA,
    pagina * POR_PAGINA
  )

  useEffect(() => {
    setPagina(1)
  }, [productos.length, activeSearch])

  useEffect(() => {
    const cerrarConEscape = (e) => {
      if (e.key === 'Escape') {
        setProductoDetalle(null)
        setZoomActivo(false)
      }
    }

    window.addEventListener('keydown', cerrarConEscape)
    return () => window.removeEventListener('keydown', cerrarConEscape)
  }, [])

  useEffect(() => {
    document.body.style.overflow = productoDetalle ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [productoDetalle])

  if (cargando)
    return (
      <section
        id="catalogo"
        style={{ padding: '72px 48px', maxWidth: '1280px', margin: '0 auto' }}
      >
        <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              border: '3px solid rgba(0, 212, 255, 0.2)',
              borderTopColor: 'var(--accent-color)',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
            }}
          />
        </div>
      </section>
    )

  if (error)
    return (
      <section
        id="catalogo"
        style={{ padding: '72px 48px', maxWidth: '1280px', margin: '0 auto' }}
      >
        <div
          className="glass"
          style={{
            padding: '2rem',
            textAlign: 'center',
            borderRadius: '1rem',
            borderLeft: '4px solid var(--accent2)',
          }}
        >
          <h3 style={{ color: 'var(--accent2)', marginBottom: '0.5rem' }}>
            Error de conexión
          </h3>
          <p style={{ color: 'var(--text-secondary)' }}>
            Asegúrate de que el backend esté corriendo en el puerto 3001. ({error})
          </p>
        </div>
      </section>
    )

  if (productos.length === 0 && activeSearch)
    return (
      <section
        id="catalogo"
        style={{ padding: '72px 48px', maxWidth: '1280px', margin: '0 auto' }}
      >
        <div
          className="glass"
          style={{
            padding: '3rem',
            textAlign: 'center',
            borderRadius: '1rem',
            borderLeft: '4px solid var(--accent-color)',
          }}
        >
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
          <h3
            style={{
              fontSize: '1.3rem',
              fontWeight: '700',
              marginBottom: '0.5rem',
            }}
          >
            Sin resultados para "{activeSearch}"
          </h3>
          <p style={{ color: 'var(--text-secondary)' }}>
            No encontramos productos que coincidan. Intenta con otro nombre.
          </p>
          <button
            onClick={onClearSearch}
            style={{
              marginTop: '1.5rem',
              background: 'var(--accent-color)',
              color: '#000',
              border: 'none',
              borderRadius: '8px',
              padding: '0.6rem 1.4rem',
              fontWeight: '700',
              cursor: 'pointer',
            }}
          >
            Ver todos los productos
          </button>
        </div>
      </section>
    )

  return (
    <section
      id="catalogo"
      style={{ padding: '72px 48px', maxWidth: '1280px', margin: '0 auto' }}
    >
      <div style={{ marginBottom: '40px' }}>
        <h2
          style={{
            fontSize: '1.85rem',
            fontWeight: '800',
            letterSpacing: '-0.02em',
            marginBottom: '8px',
          }}
        >
          Catálogo de <span style={{ color: 'var(--accent-color)' }}>Productos</span>
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          Haz clic en una tarjeta para abrir una ficha premium con imagen grande,
          especificaciones y acciones rápidas.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '24px',
        }}
      >
        {productosPagina.map((producto, i) => (
          <div key={producto.id} style={{ animationDelay: `${i * 0.05}s` }}>
            <ProductCard
              producto={producto}
              enComparador={slots.includes(producto.id)}
              onToggleComparar={onToggleComparar}
              onVerDetalles={setProductoDetalle}
            />
          </div>
        ))}
      </div>

      {totalPaginas > 1 && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '12px',
            marginTop: '48px',
          }}
        >
          <button
            onClick={() => setPagina(p => p - 1)}
            disabled={pagina === 1}
            style={{
              background:
                pagina === 1 ? 'rgba(255,255,255,0.05)' : 'var(--accent-color)',
              color: pagina === 1 ? 'var(--text-secondary)' : '#000',
              border: 'none',
              borderRadius: '8px',
              padding: '0.6rem 1.2rem',
              fontWeight: '700',
              cursor: pagina === 1 ? 'not-allowed' : 'pointer',
            }}
          >
            ← Anterior
          </button>

          <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            {pagina} / {totalPaginas}
          </span>

          <button
            onClick={() => setPagina(p => p + 1)}
            disabled={pagina === totalPaginas}
            style={{
              background:
                pagina === totalPaginas
                  ? 'rgba(255,255,255,0.05)'
                  : 'var(--accent-color)',
              color: pagina === totalPaginas ? 'var(--text-secondary)' : '#000',
              border: 'none',
              borderRadius: '8px',
              padding: '0.6rem 1.2rem',
              fontWeight: '700',
              cursor: pagina === totalPaginas ? 'not-allowed' : 'pointer',
            }}
          >
            Siguiente →
          </button>
        </div>
      )}

      {productoDetalle && (
        <ProductoDetallePremium
          producto={productoDetalle}
          enComparador={slots.includes(productoDetalle.id)}
          onCerrar={() => {
            setProductoDetalle(null)
            setZoomActivo(false)
          }}
          onToggleComparar={onToggleComparar}
          zoomActivo={zoomActivo}
          setZoomActivo={setZoomActivo}
        />
      )}
    </section>
  )
}

function ProductoDetallePremium({
  producto,
  enComparador,
  onCerrar,
  onToggleComparar,
  zoomActivo,
  setZoomActivo,
}) {
  const specs = getSpecsProducto(producto)
  const specsArray = Object.entries(specs)
  const highlights = obtenerHighlights(producto)
  const emoji = emojiPorMarca[producto.brand_name] || '💻'

  const imagenes = useMemo(() => {
    const principal = producto.image_url
    return [
      principal,
      principal,
      principal,
    ].filter(Boolean)
  }, [producto.image_url])

  const [imagenActiva, setImagenActiva] = useState(imagenes[0] || null)

  useEffect(() => {
    setImagenActiva(imagenes[0] || null)
  }, [imagenes])

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onCerrar}
      style={modalOverlay}
    >
      <div onClick={e => e.stopPropagation()} style={modalCard}>
        <button onClick={onCerrar} aria-label="Cerrar detalles" style={closeButton}>
          ✕
        </button>

        <div style={premiumGlow} />

        <div style={modalGrid}>
          <aside style={galleryPanel}>
            <div style={mainImageWrap}>
              {imagenActiva ? (
                <img
                  src={imagenActiva}
                  alt={producto.name}
                  onClick={() => setZoomActivo(true)}
                  style={mainImage}
                  onError={e => {
                    e.currentTarget.style.display = 'none'
                  }}
                />
              ) : (
                <div style={emojiFallback}>{emoji}</div>
              )}

              <div style={imageTopBadge}>Vista premium</div>

              {imagenActiva && (
                <button
                  onClick={() => setZoomActivo(true)}
                  style={zoomButton}
                >
                  🔍 Ampliar imagen
                </button>
              )}
            </div>

            <div style={thumbnailRow}>
              {(imagenes.length ? imagenes : [null, null, null]).map((img, index) => (
                <button
                  key={index}
                  onClick={() => img && setImagenActiva(img)}
                  style={{
                    ...thumbnailButton,
                    ...(img === imagenActiva ? thumbnailButtonActive : {}),
                  }}
                >
                  {img ? (
                    <img src={img} alt={`Vista ${index + 1}`} style={thumbnailImage} />
                  ) : (
                    <span>{emoji}</span>
                  )}
                </button>
              ))}
            </div>

            <div style={quickInfoPanel}>
              <div style={quickInfoItem}>
                <span>Marca</span>
                <strong>{producto.brand_name || '—'}</strong>
              </div>
              <div style={quickInfoItem}>
                <span>Categoría</span>
                <strong>{producto.category_name || '—'}</strong>
              </div>
              <div style={quickInfoItem}>
                <span>Tiendas</span>
                <strong>{producto.prices_count || 0}</strong>
              </div>
            </div>
          </aside>

          <main style={contentPanel}>
            <div style={brandLine}>
              <span>{producto.brand_name || 'Marca desconocida'}</span>
              {producto.model && <span style={dotSeparator}>•</span>}
              {producto.model && <span>{producto.model}</span>}
              <span style={categoryMiniPill}>{producto.category_name || 'Producto'}</span>
            </div>

            <h2 style={modalTitle}>{producto.name}</h2>

            {producto.description && (
              <p style={descriptionStyle}>{producto.description}</p>
            )}

            <div style={priceHero}>
              <div>
                <div style={smallLabel}>Precio desde</div>
                <div style={priceStyle}>
                  {producto.lowest_price
                    ? formatearPrecio(producto.lowest_price)
                    : 'No disponible'}
                </div>
              </div>

              <div style={storeBadge}>
                Disponible en {producto.prices_count || 0} tienda(s)
              </div>
            </div>

            {highlights.length > 0 && (
              <div style={highlightsGrid}>
                {highlights.map(item => (
                  <div key={item.label} style={highlightCard}>
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                  </div>
                ))}
              </div>
            )}

            <div style={actionsRow}>
              <button
                onClick={() => onToggleComparar(producto.id)}
                style={{
                  ...compareButton,
                  ...(enComparador ? compareButtonActive : {}),
                }}
              >
                {enComparador ? '✓ Quitar del comparador' : '+ Agregar al comparador'}
              </button>

              <button onClick={onCerrar} style={secondaryButton}>
                Seguir viendo catálogo
              </button>
            </div>

            <div style={sectionTitleRow}>
              <div>
                <h3 style={sectionTitle}>Detalles técnicos</h3>
                <p style={sectionSubtitle}>
                  Información tomada del producto en tu base de datos.
                </p>
              </div>
              <small style={countBadge}>{specsArray.length} specs</small>
            </div>

            {specsArray.length > 0 ? (
              <div style={specsGrid}>
                {specsArray.map(([clave, valor]) => (
                  <div key={clave} style={specItem}>
                    <div style={specIcon}>{iconosSpecs[clave] || '✨'}</div>
                    <div>
                      <span style={specLabel}>{nombresSpecs[clave] || clave}</span>
                      <strong style={specValue}>{formatearSpec(clave, valor)}</strong>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={emptySpecs}>
                Este producto no tiene especificaciones adicionales registradas.
              </div>
            )}
          </main>
        </div>
      </div>

      {zoomActivo && (
        <div
          onClick={e => {
            e.stopPropagation()
            setZoomActivo(false)
          }}
          style={zoomOverlay}
        >
          <button style={zoomCloseButton}>✕</button>
          <img src={imagenActiva} alt={producto.name} style={zoomImage} />
        </div>
      )}
    </div>
  )
}

const modalOverlay = {
  position: 'fixed',
  inset: 0,
  zIndex: 99999,
  background:
    'radial-gradient(circle at top, rgba(14,165,233,0.18), transparent 38%), rgba(2,6,23,0.78)',
  backdropFilter: 'blur(18px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '24px',
  animation: 'premiumFadeIn 0.22s ease both',
}

const modalCard = {
  position: 'relative',
  width: 'min(1180px, 100%)',
  maxHeight: '92vh',
  overflowY: 'auto',
  borderRadius: '32px',
  background:
    'linear-gradient(145deg, rgba(15,23,42,0.98), rgba(2,6,23,0.99))',
  border: '1px solid rgba(255,255,255,0.12)',
  boxShadow:
    '0 38px 110px rgba(0,0,0,0.68), inset 0 1px 0 rgba(255,255,255,0.06)',
  animation: 'premiumScaleIn 0.24s ease both',
  overflow: 'hidden',
}

const premiumGlow = {
  position: 'absolute',
  width: '360px',
  height: '360px',
  right: '-120px',
  top: '-140px',
  borderRadius: '999px',
  background: 'rgba(34,211,238,0.14)',
  filter: 'blur(35px)',
  pointerEvents: 'none',
}

const closeButton = {
  position: 'absolute',
  top: '18px',
  right: '18px',
  zIndex: 5,
  width: '42px',
  height: '42px',
  borderRadius: '999px',
  border: '1px solid rgba(255,255,255,0.14)',
  background: 'rgba(15,23,42,0.88)',
  color: '#fff',
  cursor: 'pointer',
  fontWeight: '900',
  boxShadow: '0 12px 32px rgba(0,0,0,0.28)',
}

const modalGrid = {
  display: 'grid',
  gridTemplateColumns: 'minmax(320px, 0.92fr) minmax(0, 1.08fr)',
}

const galleryPanel = {
  padding: '28px',
  background:
    'linear-gradient(180deg, rgba(15,23,42,0.78), rgba(2,6,23,0.96))',
  borderRight: '1px solid rgba(255,255,255,0.08)',
}

const mainImageWrap = {
  position: 'relative',
  height: '470px',
  borderRadius: '26px',
  background: 'radial-gradient(circle at top, #ffffff, #dbeafe)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  boxShadow: '0 24px 70px rgba(0,0,0,0.32)',
}

const mainImage = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  cursor: 'zoom-in',
  transition: 'transform 0.35s ease',
}

const emojiFallback = {
  fontSize: '8rem',
  filter: 'drop-shadow(0 25px 38px rgba(0,0,0,0.32))',
}

const imageTopBadge = {
  position: 'absolute',
  top: '18px',
  left: '18px',
  background: 'rgba(2,6,23,0.76)',
  color: '#e0f2fe',
  border: '1px solid rgba(125,211,252,0.25)',
  padding: '8px 12px',
  borderRadius: '999px',
  fontWeight: 900,
  fontSize: '0.76rem',
  backdropFilter: 'blur(12px)',
}

const zoomButton = {
  position: 'absolute',
  right: '18px',
  bottom: '18px',
  border: '1px solid rgba(255,255,255,0.16)',
  background: 'rgba(2,6,23,0.78)',
  color: '#fff',
  padding: '10px 13px',
  borderRadius: '999px',
  cursor: 'pointer',
  fontWeight: 850,
  backdropFilter: 'blur(12px)',
}

const thumbnailRow = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '12px',
  marginTop: '16px',
}

const thumbnailButton = {
  height: '82px',
  borderRadius: '18px',
  border: '1px solid rgba(255,255,255,0.10)',
  background: 'rgba(255,255,255,0.04)',
  cursor: 'pointer',
  overflow: 'hidden',
  color: '#fff',
  fontSize: '2rem',
}

const thumbnailButtonActive = {
  border: '1px solid rgba(34,211,238,0.62)',
  boxShadow: '0 0 0 2px rgba(34,211,238,0.12)',
}

const thumbnailImage = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
}

const quickInfoPanel = {
  marginTop: '16px',
  display: 'grid',
  gap: '10px',
}

const quickInfoItem = {
  display: 'flex',
  justifyContent: 'space-between',
  gap: '12px',
  padding: '13px 14px',
  borderRadius: '16px',
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.08)',
  color: '#94a3b8',
}

const contentPanel = {
  padding: '42px',
  position: 'relative',
}

const brandLine = {
  color: 'var(--accent-color)',
  fontFamily: 'DM Mono, monospace',
  fontSize: '0.78rem',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  flexWrap: 'wrap',
  marginBottom: '12px',
}

const dotSeparator = {
  color: 'rgba(255,255,255,0.32)',
}

const categoryMiniPill = {
  marginLeft: '4px',
  padding: '5px 9px',
  borderRadius: '999px',
  background: 'rgba(34,211,238,0.10)',
  border: '1px solid rgba(34,211,238,0.22)',
  color: '#67e8f9',
}

const modalTitle = {
  fontSize: 'clamp(1.9rem, 3vw, 3rem)',
  lineHeight: 1.02,
  margin: '0 0 14px',
  letterSpacing: '-0.05em',
  color: '#fff',
}

const descriptionStyle = {
  color: '#cbd5e1',
  lineHeight: 1.75,
  margin: '0 0 24px',
}

const priceHero = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '18px',
  padding: '20px',
  borderRadius: '22px',
  background:
    'linear-gradient(135deg, rgba(34,211,238,0.12), rgba(255,255,255,0.035))',
  border: '1px solid rgba(34,211,238,0.18)',
  marginBottom: '18px',
}

const smallLabel = {
  color: '#94a3b8',
  fontSize: '0.78rem',
  marginBottom: '4px',
}

const priceStyle = {
  color: 'var(--accent-color)',
  fontWeight: '950',
  fontSize: '1.85rem',
}

const storeBadge = {
  fontFamily: 'DM Mono, monospace',
  fontSize: '0.78rem',
  color: '#bfdbfe',
  background: 'rgba(59,130,246,0.13)',
  border: '1px solid rgba(59,130,246,0.34)',
  padding: '9px 12px',
  borderRadius: '999px',
  whiteSpace: 'nowrap',
}

const highlightsGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(135px, 1fr))',
  gap: '12px',
  marginBottom: '20px',
}

const highlightCard = {
  padding: '14px',
  borderRadius: '18px',
  background: 'rgba(255,255,255,0.045)',
  border: '1px solid rgba(255,255,255,0.08)',
  color: '#94a3b8',
  display: 'grid',
  gap: '6px',
}

const actionsRow = {
  display: 'flex',
  gap: '12px',
  flexWrap: 'wrap',
  marginBottom: '30px',
}

const compareButton = {
  border: 'none',
  borderRadius: '16px',
  padding: '14px 18px',
  background: 'linear-gradient(135deg, #06b6d4, #22d3ee)',
  color: '#03131a',
  fontWeight: '950',
  cursor: 'pointer',
  boxShadow: '0 16px 34px rgba(34,211,238,0.16)',
}

const compareButtonActive = {
  background: 'linear-gradient(135deg, #22c55e, #86efac)',
}

const secondaryButton = {
  border: '1px solid rgba(255,255,255,0.12)',
  borderRadius: '16px',
  padding: '14px 18px',
  background: 'rgba(255,255,255,0.04)',
  color: '#fff',
  fontWeight: '850',
  cursor: 'pointer',
}

const sectionTitleRow = {
  display: 'flex',
  justifyContent: 'space-between',
  gap: '14px',
  alignItems: 'flex-end',
  marginBottom: '14px',
}

const sectionTitle = {
  margin: 0,
  color: '#fff',
  fontWeight: 950,
  fontSize: '1.1rem',
}

const sectionSubtitle = {
  margin: '4px 0 0',
  color: '#94a3b8',
  fontSize: '0.85rem',
}

const countBadge = {
  padding: '7px 10px',
  borderRadius: '999px',
  color: '#bfdbfe',
  border: '1px solid rgba(59,130,246,0.24)',
  background: 'rgba(59,130,246,0.10)',
}

const specsGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
  gap: '12px',
}

const specItem = {
  padding: '14px',
  borderRadius: '18px',
  background: 'rgba(255,255,255,0.045)',
  border: '1px solid rgba(255,255,255,0.08)',
  display: 'flex',
  gap: '12px',
  alignItems: 'flex-start',
}

const specIcon = {
  width: '34px',
  height: '34px',
  borderRadius: '12px',
  display: 'grid',
  placeItems: 'center',
  background: 'rgba(34,211,238,0.12)',
  border: '1px solid rgba(34,211,238,0.18)',
  flex: '0 0 auto',
}

const specLabel = {
  display: 'block',
  color: '#94a3b8',
  fontSize: '0.76rem',
  marginBottom: '6px',
}

const specValue = {
  color: '#fff',
  fontSize: '0.95rem',
  lineHeight: 1.35,
}

const emptySpecs = {
  padding: '16px',
  borderRadius: '14px',
  color: '#94a3b8',
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.08)',
}

const zoomOverlay = {
  position: 'fixed',
  inset: 0,
  zIndex: 100000,
  background: 'rgba(0,0,0,0.88)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '28px',
  animation: 'premiumFadeIn 0.18s ease both',
  cursor: 'zoom-out',
}

const zoomImage = {
  maxWidth: 'min(1100px, 96vw)',
  maxHeight: '90vh',
  objectFit: 'contain',
  borderRadius: '22px',
  boxShadow: '0 30px 90px rgba(0,0,0,0.7)',
}

const zoomCloseButton = {
  position: 'fixed',
  top: '24px',
  right: '24px',
  width: '44px',
  height: '44px',
  borderRadius: '999px',
  border: '1px solid rgba(255,255,255,0.16)',
  background: 'rgba(15,23,42,0.82)',
  color: '#fff',
  fontWeight: 900,
  cursor: 'pointer',
}
