// ============================================================
// ProductCard.jsx — La tarjeta de cada producto en el catálogo
// ============================================================
// Este componente dibuja UNA tarjeta de producto.
// Es un componente "presentacional puro": no tiene lógica
// propia ni habla con el servidor — solo recibe datos por
// props y los muestra visualmente.
//
// Props que recibe:
//   - producto: objeto con todos los datos del producto
//   - enComparador: boolean — ¿este producto ya está en el comparador?
//   - onToggleComparar: función para agregar/quitar del comparador
//   - onVerDetalles: función para abrir la ficha de detalles
// ============================================================

// Formatea un número como precio en pesos colombianos
// Ejemplo: 4334900 → "$4.334.900"
const formatearPrecio = (precio) =>
  new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(precio)

// Emoji por marca: si el producto no tiene imagen,
// se muestra este emoji como representación visual de la marca
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

export default function ProductCard({
  producto,
  enComparador,
  onToggleComparar,
  onVerDetalles,
}) {
  const emoji = emojiPorMarca[producto.brand_name] || '💻'

  return (
    // article es el contenedor de la tarjeta completa.
    // Al hacer clic en cualquier parte de la tarjeta → abre el modal de detalles
    <article
      className="animate-fade-in product-card-premium"
      onClick={() => onVerDetalles(producto)}
      title="Haz clic para ver detalles"
      style={{
        background:
          'linear-gradient(180deg, rgba(15,23,42,0.92), rgba(2,6,23,0.96))',
        // Si el producto está en el comparador, el borde se pone cyan
        border: enComparador
          ? '1px solid rgba(34,211,238,0.55)'
          : '1px solid rgba(255,255,255,0.08)',
        borderRadius: '24px',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'transform 0.28s ease, border-color 0.28s ease, box-shadow 0.28s ease',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        boxShadow: enComparador
          ? '0 0 0 1px rgba(34,211,238,0.16), 0 18px 55px rgba(8,145,178,0.12)'
          : '0 14px 42px rgba(0,0,0,0.26)',
      }}
      // Efecto hover: la tarjeta sube 8px cuando el mouse entra
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-8px)'
        e.currentTarget.style.borderColor = 'rgba(34,211,238,0.48)'
        e.currentTarget.style.boxShadow = '0 24px 68px rgba(0,0,0,0.48)'
      }}
      // Cuando el mouse sale, vuelve a su posición original
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.borderColor = enComparador
          ? 'rgba(34,211,238,0.55)'
          : 'rgba(255,255,255,0.08)'
        e.currentTarget.style.boxShadow = enComparador
          ? '0 0 0 1px rgba(34,211,238,0.16), 0 18px 55px rgba(8,145,178,0.12)'
          : '0 14px 42px rgba(0,0,0,0.26)'
      }}
    >
      {/* ── Zona de imagen ── */}
      <div
        style={{
          position: 'relative',
          height: '220px',
          background: producto.image_url
            ? 'radial-gradient(circle at top, #ffffff, #dbeafe)'
            : 'radial-gradient(circle at top, rgba(34,211,238,0.16), rgba(15,23,42,0.95))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Si el producto tiene imagen, la muestra. Si no, muestra el emoji */}
        {producto.image_url ? (
          <img
            src={producto.image_url}
            alt={producto.name}
            className="product-card-premium-img"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.45s ease',
            }}
            onError={e => {
              // Si la imagen falla al cargar (URL rota), la oculta
              e.currentTarget.style.display = 'none'
            }}
          />
        ) : (
          <span style={{ fontSize: '74px', filter: 'drop-shadow(0 20px 28px rgba(0,0,0,0.35))' }}>
            {emoji}
          </span>
        )}

        {/* Capa oscura semitransparente encima de la imagen para legibilidad */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(0,0,0,0.06), rgba(2,6,23,0.76))',
            pointerEvents: 'none', // Esta capa no bloquea los clics
          }}
        />

        {/* ── Botón "+ Comparar" / "✓ Comparando" ── */}
        {/* IMPORTANTE: e.stopPropagation() evita que el clic en este botón
            también abra el modal de detalles del article padre */}
        <button
          onClick={e => {
            e.stopPropagation() // ← Sin esto, al comparar también abriría el modal
            onToggleComparar(producto.id)
          }}
          style={{
            position: 'absolute',
            top: '14px',
            left: '14px',
            // El botón cambia de color cuando el producto ya está en el comparador
            background: enComparador
              ? 'linear-gradient(135deg, #22c55e, #86efac)'
              : 'rgba(2,6,23,0.76)',
            border: enComparador
              ? '1px solid rgba(134,239,172,0.65)'
              : '1px solid rgba(34,211,238,0.36)',
            color: enComparador ? '#022c22' : '#67e8f9',
            fontFamily: 'DM Mono, monospace',
            fontSize: '10px',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            padding: '7px 11px',
            borderRadius: '999px',
            cursor: 'pointer',
            transition: 'all 0.2s',
            fontWeight: 900,
            backdropFilter: 'blur(10px)',
          }}
        >
          {enComparador ? '✓ Comparando' : '+ Comparar'}
        </button>

        {/* Badge de categoría en la esquina superior derecha */}
        <div
          style={{
            position: 'absolute',
            top: '14px',
            right: '14px',
            fontFamily: 'DM Mono, monospace',
            fontSize: '10px',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            background: 'rgba(2,6,23,0.76)',
            color: '#dbeafe',
            padding: '7px 11px',
            borderRadius: '999px',
            border: '1px solid rgba(255,255,255,0.10)',
            backdropFilter: 'blur(10px)',
          }}
        >
          {producto.category_name || 'Producto'}
        </div>

        {/* Botones inferiores sobre la imagen */}
        <div
          style={{
            position: 'absolute',
            bottom: '14px',
            left: '14px',
            right: '14px',
            display: 'flex',
            justifyContent: 'space-between',
            gap: '10px',
            alignItems: 'center',
          }}
        >
          <span
            style={{
              background: 'rgba(2,6,23,0.78)',
              color: '#e0f2fe',
              border: '1px solid rgba(125,211,252,0.25)',
              padding: '8px 12px',
              borderRadius: '999px',
              fontSize: '11px',
              fontWeight: 900,
              backdropFilter: 'blur(10px)',
            }}
          >
            Ver ficha premium
          </span>

          <span
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '999px',
              display: 'grid',
              placeItems: 'center',
              background: 'rgba(34,211,238,0.16)',
              color: '#67e8f9',
              border: '1px solid rgba(34,211,238,0.28)',
              fontWeight: 900,
            }}
          >
            ↗
          </span>
        </div>
      </div>

      {/* ── Zona de texto (debajo de la imagen) ── */}
      <div
        style={{
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
        }}
      >
        {/* Nombre de la marca en pequeño arriba */}
        <div
          style={{
            fontFamily: 'DM Mono, monospace',
            fontSize: '11px',
            color: '#94a3b8',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: '6px',
          }}
        >
          {producto.brand_name || 'Marca'}
        </div>

        {/* Nombre del producto */}
        <h3
          style={{
            fontWeight: 900,
            fontSize: '1.08rem',
            margin: '0 0 10px',
            lineHeight: '1.25',
            color: '#fff',
          }}
        >
          {producto.name}
        </h3>

        {/* Descripción corta (máximo 2 líneas con CSS) */}
        {producto.description && (
          <p
            style={{
              color: '#cbd5e1',
              fontSize: '0.86rem',
              lineHeight: 1.45,
              margin: '0 0 14px',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {producto.description}
          </p>
        )}

        {/* Precio y número de tiendas */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginTop: 'auto', // Empuja este bloque hacia abajo de la tarjeta
            paddingTop: '1rem',
            gap: '14px',
          }}
        >
          <div>
            <div style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '2px' }}>
              Desde
            </div>
            {/* lowest_price viene calculado del backend: es el precio más bajo entre todas las tiendas */}
            <div
              style={{
                fontSize: '1.35rem',
                fontWeight: 950,
                color: 'var(--accent-color)',
              }}
            >
              {producto.lowest_price
                ? formatearPrecio(producto.lowest_price)
                : 'No disponible'}
            </div>
          </div>

          {/* Cuántas tiendas venden este producto */}
          <div
            style={{
              fontFamily: 'DM Mono, monospace',
              fontSize: '11px',
              color: '#cbd5e1',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '999px',
              padding: '6px 10px',
              whiteSpace: 'nowrap',
            }}
          >
            {producto.prices_count || 0} tiendas
          </div>
        </div>
      </div>
    </article>
  )
}
