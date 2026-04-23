// Comparador.jsx
const COLOR_WIN_BG = 'rgba(34, 197, 94, 0.14)'
const COLOR_WIN_BORDER = 'rgba(34, 197, 94, 0.45)'
const COLOR_LOSE_BG = 'rgba(239, 68, 68, 0.12)'
const COLOR_LOSE_BORDER = 'rgba(239, 68, 68, 0.35)'
const COLOR_MID_BG = 'rgba(59, 130, 246, 0.13)'
const COLOR_MID_BORDER = 'rgba(59, 130, 246, 0.42)'
const COLOR_TIE_BG = 'rgba(255,255,255,0.03)'
const COLOR_TIE_BORDER = 'rgba(255,255,255,0.08)'

export default function Comparador({ slots, productos, onLimpiarSlot, compararEspecificaciones }) {
  const productosSeleccionados = slots
    .map(id => productos.find(p => p.id === id))
    .filter(Boolean)

  const hayMinimo = productosSeleccionados.length >= 2

  const mismaCategoria =
    hayMinimo &&
    productosSeleccionados.every(
      p => p.category_id === productosSeleccionados[0].category_id
    )

  const filas = hayMinimo && mismaCategoria
    ? compararEspecificaciones(...productosSeleccionados)
    : []

  const puntosPorProducto = productosSeleccionados.reduce((acc, producto) => {
    acc[producto.id] = 0
    return acc
  }, {})

  filas.forEach(fila => {
    fila.ganadores.forEach(id => {
      puntosPorProducto[id] = (puntosPorProducto[id] || 0) + 1
    })
  })

  const mayorPuntaje = Math.max(0, ...Object.values(puntosPorProducto))
  const ganadoresGenerales = productosSeleccionados.filter(
    p => puntosPorProducto[p.id] === mayorPuntaje && mayorPuntaje > 0
  )

  const esEmpateGeneral = hayMinimo && ganadoresGenerales.length !== 1

  return (
    <section id="comparador" style={{ scrollMarginTop: '80px', padding: '72px 24px 96px' }}>
      <div style={outerWrap}>
        <div style={headerWrap}>
          <div>
            <h2 style={titleStyle}>
              Comparador <span style={{ color: 'var(--accent-color)' }}>Inteligente</span>
            </h2>
            <p style={subtitleStyle}>
              Compara 2 o 3 productos. Verde marca el mejor componente, rojo el inferior
              y azul el producto que sigue siendo competitivo o intermedio.
            </p>
          </div>

          {productosSeleccionados.length > 0 && (
            <button
              onClick={() => slots.forEach((_, index) => onLimpiarSlot(index))}
              style={clearAllButton}
            >
              Limpiar comparador
            </button>
          )}
        </div>

        <div style={comparatorShell}>
          <div style={slotsRow}>
            {[0, 1, 2].map(index => {
              const producto = productos.find(p => p.id === slots[index])
              const esGanador =
                hayMinimo &&
                !esEmpateGeneral &&
                ganadoresGenerales[0]?.id === producto?.id

              const estado = !producto
                ? 'vacio'
                : esGanador
                ? 'ganador'
                : esEmpateGeneral
                ? 'empate'
                : 'perdedor'

              return (
                <SlotSelector
                  key={index}
                  letra={String.fromCharCode(65 + index)}
                  producto={producto}
                  puntos={producto ? puntosPorProducto[producto.id] || 0 : 0}
                  onLimpiar={() => onLimpiarSlot(index)}
                  estadoGanador={estado}
                />
              )
            })}
          </div>

          <div style={tableShell}>
            {!hayMinimo ? (
              <EstadoVacio />
            ) : !mismaCategoria ? (
              <EstadoCategoriaInvalida />
            ) : (
              <TablaComparacion
                productosSeleccionados={productosSeleccionados}
                filas={filas}
                puntosPorProducto={puntosPorProducto}
                ganadoresGenerales={ganadoresGenerales}
                esEmpateGeneral={esEmpateGeneral}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function EstadoVacio() {
  return (
    <div style={emptyState}>
      <div style={{ fontSize: '2rem' }}>🧠</div>
      <h3 style={{ margin: 0, fontSize: '1.15rem' }}>Selecciona mínimo 2 productos</h3>
      <p style={{ margin: 0, color: 'var(--text-secondary)', maxWidth: '620px' }}>
        Puedes seleccionar 2 o 3 productos desde el catálogo. Cuando sean 3, el valor intermedio
        se mostrará en azul.
      </p>
    </div>
  )
}

function EstadoCategoriaInvalida() {
  return (
    <div style={emptyState}>
      <div style={{ fontSize: '2rem' }}>⚠️</div>
      <h3 style={{ margin: 0, fontSize: '1.15rem', color: '#ffb4b4' }}>
        Solo puedes comparar productos de la misma categoría
      </h3>
      <p style={{ margin: 0, color: 'var(--text-secondary)', maxWidth: '560px' }}>
        Ejemplo: computador vs computador vs computador.
      </p>
    </div>
  )
}

function SlotSelector({ letra, producto, puntos, onLimpiar, estadoGanador }) {
  const estilosEstado =
    estadoGanador === 'ganador'
      ? {
          border: `1px solid ${COLOR_WIN_BORDER}`,
          boxShadow: '0 0 0 1px rgba(34,197,94,0.18), 0 18px 45px rgba(34,197,94,0.10)',
          background: 'linear-gradient(180deg, rgba(34,197,94,0.14), rgba(255,255,255,0.03))',
        }
      : estadoGanador === 'perdedor'
      ? {
          border: `1px solid ${COLOR_LOSE_BORDER}`,
          background: 'linear-gradient(180deg, rgba(239,68,68,0.10), rgba(255,255,255,0.02))',
        }
      : {
          border: '1px solid rgba(255,255,255,0.08)',
          background: 'linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))',
        }

  return (
    <div style={{ ...slotCard, ...estilosEstado }}>
      <div style={slotLabelRow}>
        <span style={slotEyebrow}>Producto {letra}</span>
        {producto && estadoGanador === 'ganador' && <span style={winnerPill}>Ganador</span>}
        {producto && estadoGanador === 'empate' && <span style={tiePill}>Empate</span>}
      </div>

      {producto ? (
        <>
          <div style={{ fontWeight: 800, fontSize: '1.05rem', lineHeight: 1.25 }}>{producto.name}</div>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            {producto.brand_name || 'Marca no disponible'} · {puntos} punto(s)
          </div>

          <button onClick={onLimpiar} style={removeButton}>
            ✕ Quitar
          </button>
        </>
      ) : (
        <div style={{ color: 'var(--text-secondary)', fontSize: '0.96rem' }}>
          Selecciónalo desde el catálogo.
        </div>
      )}
    </div>
  )
}

function TablaComparacion({ productosSeleccionados, filas, puntosPorProducto, ganadoresGenerales, esEmpateGeneral }) {
  return (
    <>
      <div style={tableHeader}>
        <div style={tableHeaderTitle}>
          <strong>Comparación de {productosSeleccionados.length} productos</strong>
        </div>

        <div style={scoreWrap}>
          {productosSeleccionados.map(producto => (
            <span key={producto.id} style={scoreBadge}>
              {producto.name}: {puntosPorProducto[producto.id] || 0}
            </span>
          ))}
        </div>
      </div>

      <div style={rowsWrap}>
        <div style={columnHeaderGrid(productosSeleccionados.length)}>
          <div style={columnHeaderCell}>Especificación</div>
          {productosSeleccionados.map(producto => (
            <div key={producto.id} style={{ ...columnHeaderCell, textAlign: 'left' }}>
              {producto.name}
            </div>
          ))}
        </div>

        {filas.map(fila => (
          <FilaComparacion
            key={fila.spec}
            fila={fila}
            productosSeleccionados={productosSeleccionados}
          />
        ))}
      </div>

      <BarraGanador
        ganadoresGenerales={ganadoresGenerales}
        esEmpateGeneral={esEmpateGeneral}
        puntosPorProducto={puntosPorProducto}
      />
    </>
  )
}

function BarraGanador({ ganadoresGenerales, esEmpateGeneral, puntosPorProducto }) {
  const texto = esEmpateGeneral
    ? 'Empate técnico entre los productos seleccionados'
    : `${ganadoresGenerales[0]?.name} gana la comparación con ${puntosPorProducto[ganadoresGenerales[0]?.id] || 0} punto(s)`

  return (
    <div
      style={{
        ...winnerBar,
        background: esEmpateGeneral
          ? 'linear-gradient(90deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))'
          : 'linear-gradient(90deg, rgba(34,197,94,0.18), rgba(34,197,94,0.06))',
        borderTop: esEmpateGeneral
          ? `1px solid ${COLOR_TIE_BORDER}`
          : `1px solid ${COLOR_WIN_BORDER}`,
      }}
    >
      <span style={{ fontSize: '1.1rem' }}>{esEmpateGeneral ? '🤝' : '🏆'}</span>
      <strong>{texto}</strong>
    </div>
  )
}

function FilaComparacion({ fila, productosSeleccionados }) {
  return (
    <div style={rowGrid(productosSeleccionados.length)}>
      <div style={specCell}>{fila.spec}</div>

      {productosSeleccionados.map(producto => {
        const item = fila.valores.find(v => v.productoId === producto.id)
        return (
          <ValorComparado
            key={producto.id}
            valor={item?.valor ?? '—'}
            estado={item?.estado ?? 'empate'}
          />
        )
      })}
    </div>
  )
}

function ValorComparado({ valor, estado }) {
  const estilo =
    estado === 'ganador'
      ? { background: COLOR_WIN_BG, border: `1px solid ${COLOR_WIN_BORDER}`, color: '#b9fbcf' }
      : estado === 'perdedor'
      ? { background: COLOR_LOSE_BG, border: `1px solid ${COLOR_LOSE_BORDER}`, color: '#ffb4b4' }
      : estado === 'intermedio'
      ? { background: COLOR_MID_BG, border: `1px solid ${COLOR_MID_BORDER}`, color: '#bfdbfe' }
      : { background: COLOR_TIE_BG, border: `1px solid ${COLOR_TIE_BORDER}`, color: '#f8fafc' }

  return <div style={{ ...valueCell, ...estilo }}>{valor}</div>
}

const gridColumns = (cantidad) => `minmax(150px, 0.65fr) repeat(${cantidad}, minmax(0, 1fr))`

const outerWrap = { maxWidth: '1420px', margin: '0 auto' }
const headerWrap = { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '16px', marginBottom: '28px', flexWrap: 'wrap' }
const titleStyle = { fontSize: 'clamp(1.9rem, 2.8vw, 2.6rem)', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: '10px' }
const subtitleStyle = { color: 'var(--text-secondary)', fontSize: '0.98rem', maxWidth: '820px', margin: 0, lineHeight: 1.7 }
const comparatorShell = { borderRadius: '28px', padding: '28px', background: 'linear-gradient(180deg, rgba(11,18,32,0.95), rgba(20,28,44,0.96))', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 24px 60px rgba(0,0,0,0.38), inset 0 1px 0 rgba(255,255,255,0.04)', overflow: 'hidden' }
const slotsRow = { display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '20px', alignItems: 'stretch', marginBottom: '24px' }
const slotCard = { minHeight: '148px', borderRadius: '22px', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '12px' }
const slotLabelRow = { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', flexWrap: 'wrap' }
const slotEyebrow = { fontSize: '0.72rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.12em' }
const winnerPill = { background: 'rgba(34,197,94,0.16)', color: '#b9fbcf', border: `1px solid ${COLOR_WIN_BORDER}`, padding: '5px 10px', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 700 }
const tiePill = { background: 'rgba(255,255,255,0.07)', color: '#fff', border: `1px solid ${COLOR_TIE_BORDER}`, padding: '5px 10px', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 700 }
const removeButton = { alignSelf: 'flex-start', border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.04)', color: '#fff', borderRadius: '10px', padding: '10px 14px', cursor: 'pointer', fontWeight: 700 }
const clearAllButton = { border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.05)', color: '#fff', borderRadius: '12px', padding: '12px 16px', cursor: 'pointer', fontWeight: 700 }
const tableShell = { borderRadius: '24px', overflowX: 'auto', overflowY: 'hidden', border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.025)' }
const emptyState = { minHeight: '260px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '12px', textAlign: 'center', padding: '36px 20px' }
const tableHeader = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', padding: '22px 22px 18px', borderBottom: '1px solid rgba(255,255,255,0.08)', flexWrap: 'wrap', minWidth: '900px' }
const tableHeaderTitle = { fontSize: '1.1rem', lineHeight: 1.4 }
const scoreWrap = { display: 'flex', gap: '10px', flexWrap: 'wrap' }
const scoreBadge = { background: 'rgba(59,130,246,0.13)', border: `1px solid ${COLOR_MID_BORDER}`, color: '#bfdbfe', padding: '8px 12px', borderRadius: '999px', fontWeight: 700, fontSize: '0.83rem' }
const rowsWrap = { padding: '0 16px 18px', minWidth: '900px' }
const columnHeaderGrid = (cantidad) => ({ display: 'grid', gridTemplateColumns: gridColumns(cantidad), gap: '12px', padding: '14px 6px 12px' })
const columnHeaderCell = { color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }
const rowGrid = (cantidad) => ({ display: 'grid', gridTemplateColumns: gridColumns(cantidad), gap: '12px', alignItems: 'stretch', padding: '8px 6px' })
const specCell = { display: 'flex', alignItems: 'center', fontWeight: 700, color: '#fff', padding: '14px 10px' }
const valueCell = { display: 'flex', alignItems: 'center', borderRadius: '14px', padding: '14px 14px', minHeight: '54px', lineHeight: 1.4, fontWeight: 600 }
const winnerBar = { display: 'flex', alignItems: 'center', gap: '10px', padding: '18px 22px', fontSize: '1rem', minWidth: '900px' }
