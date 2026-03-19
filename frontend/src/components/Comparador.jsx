// ── Componente: Sección comparador de productos ──
export default function Comparador({ slots, productos, onLimpiarSlot, compararEspecificaciones }) {
  const productoA = productos.find(p => p.id === slots[0])
  const productoB = productos.find(p => p.id === slots[1])

  return (
    <section id="comparador" style={{ scrollMarginTop: '80px', padding: '72px 48px', maxWidth: '1280px', margin: '0 auto' }}>

      {/* Encabezado */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '1.85rem', fontWeight: '800', letterSpacing: '-0.02em', marginBottom: '8px' }}>
          Comparador <span style={{ color: 'var(--accent-color)' }}>Inteligente</span>
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          Elige 2 productos del catálogo y descubre cuál es el ganador spec por spec
        </p>
      </div>

      {/* Slots seleccionados */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '24px', alignItems: 'center', marginBottom: '40px' }}>
        {['A', 'B'].map((letra, i) => (
          <SlotSelector
            key={letra}
            letra={letra}
            producto={i === 0 ? productoA : productoB}
            onLimpiar={() => onLimpiarSlot(i)}
          />
        ))}
        <div style={{
          width: '48px', height: '48px', borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--accent-color), var(--accent3))',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: '800', fontSize: '0.85rem', color: '#fff', flexShrink: 0, alignSelf: 'center',
        }}>VS</div>
      </div>

      {/* Tabla de comparación */}
      <div style={{ background: 'var(--surface-hover)', border: '1px solid var(--border-color)', borderRadius: '20px', overflow: 'hidden' }}>
        {productoA && productoB ? (
          <TablaComparacion
            productoA={productoA}
            productoB={productoB}
            filas={compararEspecificaciones(productoA, productoB)}
          />
        ) : (
          <div style={{ textAlign: 'center', padding: '64px 24px', color: '#50505f', lineHeight: '1.6' }}>
            Selecciona <strong style={{ color: 'var(--accent-color)' }}>2 productos</strong> del catálogo para ver la comparación detallada aquí.
          </div>
        )}
      </div>
    </section>
  )
}

// ── Sub-componente: Slot de selección ──
function SlotSelector({ letra, producto, onLimpiar }) {
  return (
    <div style={{
      background: 'var(--surface-hover)',
      border: `1px solid ${producto ? 'rgba(0,212,255,0.25)' : 'var(--border-color)'}`,
      borderRadius: '16px', padding: '20px', minHeight: '100px',
      display: 'flex', flexDirection: 'column', gap: '8px',
      transition: 'border-color 0.2s',
    }}>
      <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-secondary)' }}>
        Producto {letra}
      </div>
      {producto ? (
        <>
          <div style={{ fontWeight: '700', fontSize: '1rem' }}>{producto.name}</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            {producto.brand_name}
          </div>
          <button onClick={onLimpiar} style={{
            background: 'none', border: 'none', color: 'var(--accent2)',
            fontFamily: 'DM Mono, monospace', fontSize: '10px',
            textTransform: 'uppercase', letterSpacing: '0.1em', cursor: 'pointer', padding: 0,
          }}>✕ Quitar</button>
        </>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#50505f', fontSize: '0.9rem' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/>
          </svg>
          Selecciona desde el catálogo
        </div>
      )}
    </div>
  )
}

// ── Sub-componente: Tabla de comparación ──
function TablaComparacion({ productoA, productoB, filas }) {
  const victoriasA = filas.filter(f => f.ganador === 'A').length
  const victoriasB = filas.filter(f => f.ganador === 'B').length
  const ganadorGeneral = victoriasA > victoriasB ? productoA.name : victoriasB > victoriasA ? productoB.name : 'Empate'

  return (
    <>
      {/* Encabezado de tabla */}
      <div style={{
        display: 'grid', gridTemplateColumns: '200px 1fr 80px 1fr',
        background: 'var(--surface-color)', borderBottom: '1px solid var(--border-color)',
        padding: '20px 24px', gap: '16px', alignItems: 'center',
      }}>
        {[
          <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Especificación</span>,
          <div><div style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>{productoA.brand_name}</div><div style={{ fontWeight: '700' }}>{productoA.name}</div></div>,
          <div style={{ textAlign: 'center', color: 'var(--text-secondary)', fontFamily: 'DM Mono, monospace', fontSize: '12px' }}>VS</div>,
          <div><div style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>{productoB.brand_name}</div><div style={{ fontWeight: '700' }}>{productoB.name}</div></div>,
        ].map((cell, i) => <div key={i}>{cell}</div>)}
      </div>

      {/* Filas de specs */}
      {filas.map(fila => (
        <FilaComparacion key={fila.spec} fila={fila} />
      ))}

      {/* Veredicto final */}
      <div style={{
        background: 'var(--surface-color)', borderTop: '1px solid var(--border-color)',
        padding: '28px 32px', display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px',
      }}>
        <div>
          <div style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>Ganador general</div>
          <div style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--win-color)', display: 'flex', alignItems: 'center', gap: '10px' }}>
            🏆 {ganadorGeneral}
          </div>
        </div>
        <div style={{
          fontFamily: 'DM Mono, monospace', fontSize: '0.85rem',
          color: 'var(--text-secondary)', background: 'rgba(255,255,255,0.05)',
          padding: '8px 16px', borderRadius: '8px', border: '1px solid var(--border-color)',
        }}>
          {productoA.name.split(' ').slice(-1)[0]}: {victoriasA} victorias &nbsp;|&nbsp; {productoB.name.split(' ').slice(-1)[0]}: {victoriasB} victorias
        </div>
      </div>
    </>
  )
}

// ── Sub-componente: Fila individual de comparación ──
function FilaComparacion({ fila }) {
  const estiloValor = (esGanador, esPerdedor) => ({
    fontWeight: '600', fontSize: '0.92rem',
    padding: '6px 12px', borderRadius: '8px',
    ...(esGanador && { background: 'rgba(0,230,118,0.1)', color: 'var(--win-color)', border: '1px solid rgba(0,230,118,0.25)' }),
    ...(esPerdedor && { background: 'rgba(255,77,109,0.07)', color: '#ff8099', border: '1px solid rgba(255,77,109,0.15)' }),
    ...(!esGanador && !esPerdedor && { background: 'rgba(255,255,255,0.05)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }),
  })

  return (
    <div style={{
      display: 'grid', gridTemplateColumns: '200px 1fr 80px 1fr',
      padding: '14px 24px', gap: '16px', alignItems: 'center',
      borderBottom: '1px solid rgba(255,255,255,0.04)',
    }}>
      <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '12px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
        {fila.spec}
      </div>
      <div style={estiloValor(fila.ganador === 'A', fila.ganador === 'B')}>
        {fila.valA} {fila.ganador === 'A' ? '✓' : ''}
      </div>
      <div style={{ textAlign: 'center', fontFamily: 'DM Mono, monospace', fontSize: '11px', color: '#50505f' }}>
        {fila.ganador === 'empate' ? '≡' : fila.ganador === 'A' ? '◀' : '▶'}
      </div>
      <div style={estiloValor(fila.ganador === 'B', fila.ganador === 'A')}>
        {fila.valB} {fila.ganador === 'B' ? '✓' : ''}
      </div>
    </div>
  )
}
