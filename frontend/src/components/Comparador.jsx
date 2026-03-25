// ─────────────────────────────────────────────────────────────
// 🔥 COMPONENTE PRINCIPAL: COMPARADOR
// Se encarga de:
// - Obtener los productos seleccionados
// - Validar si son de la misma categoría
// - Mostrar mensaje o tabla según el caso
// ─────────────────────────────────────────────────────────────
export default function Comparador({ slots, productos, onLimpiarSlot, compararEspecificaciones }) {

  // 📌 Busca los productos seleccionados en los slots A y B
  const productoA = productos.find(p => p.id === slots[0])
  const productoB = productos.find(p => p.id === slots[1])

  // 🧠 VALIDACIÓN CLAVE:
  // Evita comparar cosas distintas (ej: celular vs computador)
  const mismaCategoria =
    productoA &&
    productoB &&
    productoA.category_id === productoB.category_id

  return (
    <section id="comparador" style={{ scrollMarginTop: '80px', padding: '72px 48px', maxWidth: '1280px', margin: '0 auto' }}>

      {/* 🧾 HEADER DEL COMPARADOR */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '1.85rem', fontWeight: '800' }}>
          Comparador <span style={{ color: 'var(--accent-color)' }}>Inteligente</span>
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          Elige 2 productos del catálogo y compara sus especificaciones
        </p>
      </div>

      {/* ⚖️ SECCIÓN VISUAL: SLOT A vs SLOT B */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '24px', alignItems: 'center', marginBottom: '40px' }}>

        {/* 🅰️ Slot A */}
        <SlotSelector
          letra="A"
          producto={productoA}
          onLimpiar={() => onLimpiarSlot(0)}
        />

        {/* ⚔️ VS */}
        <div style={{
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--accent-color), var(--accent3))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: '800',
          color: '#fff'
        }}>
          VS
        </div>

        {/* 🅱️ Slot B */}
        <SlotSelector
          letra="B"
          producto={productoB}
          onLimpiar={() => onLimpiarSlot(1)}
        />
      </div>

      {/* 📊 CONTENIDO PRINCIPAL */}
      <div style={{ background: 'var(--surface-hover)', borderRadius: '20px', overflow: 'hidden' }}>

        {/* ❌ Caso 1: No hay productos */}
        {!productoA || !productoB ? (
          <div style={{ textAlign: 'center', padding: '64px 24px' }}>
            Selecciona <strong>2 productos</strong> para comparar
          </div>

        /* ❌ Caso 2: Diferente categoría */
        ) : !mismaCategoria ? (
          <div style={{ textAlign: 'center', padding: '64px 24px', color: '#ff8099' }}>
            Solo puedes comparar productos de la misma categoría
            <br />
            (computador vs computador, celular vs celular, etc)
          </div>

        /* ✅ Caso 3: Comparación válida */
        ) : (
          <TablaComparacion
            productoA={productoA}
            productoB={productoB}

            // ⚙️ Aquí se generan las filas de comparación
            filas={compararEspecificaciones(productoA, productoB)}
          />
        )}
      </div>
    </section>
  )
}


// ─────────────────────────────────────────────────────────────
// 🧩 COMPONENTE: SLOT SELECTOR
// Se encarga de:
// - Mostrar producto seleccionado
// - Mostrar botón de quitar
// - Mostrar placeholder si está vacío
// ─────────────────────────────────────────────────────────────
function SlotSelector({ letra, producto, onLimpiar }) {
  return (
    <div
      style={{
        background: 'var(--surface-hover)',
        borderRadius: '16px',
        padding: '20px',
        minHeight: '100px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      }}
    >
      {/* Etiqueta A o B */}
      <div style={{ fontSize: '11px', color: 'gray' }}>
        Producto {letra}
      </div>

      {/* ✅ Si hay producto */}
      {producto ? (
        <>
          <div style={{ fontWeight: '700' }}>{producto.name}</div>
          <div style={{ fontSize: '0.8rem' }}>{producto.brand_name}</div>

          {/* Botón eliminar */}
          <button onClick={onLimpiar}>
            ✕ Quitar
          </button>
        </>
      ) : (

        /* ❌ Si no hay producto */
        <div>Selecciona desde el catálogo</div>
      )}
    </div>
  )
}


// ─────────────────────────────────────────────────────────────
// 📊 COMPONENTE: TABLA DE COMPARACIÓN
// Se encarga de:
// - Mostrar encabezado
// - Mostrar cada spec
// - Calcular ganador general
// ─────────────────────────────────────────────────────────────
function TablaComparacion({ productoA, productoB, filas }) {

  // 🧠 Contar victorias
  const victoriasA = filas.filter(f => f.ganador === 'A').length
  const victoriasB = filas.filter(f => f.ganador === 'B').length

  // 🏆 Determinar ganador total
  const ganadorGeneral =
    victoriasA > victoriasB
      ? productoA.name
      : victoriasB > victoriasA
      ? productoB.name
      : 'Empate'

  return (
    <>
      {/* HEADER */}
      <div style={{ padding: '20px', borderBottom: '1px solid gray' }}>
        <strong>{productoA.name}</strong> VS <strong>{productoB.name}</strong>
      </div>

      {/* FILAS */}
      {filas.map(fila => (
        <FilaComparacion key={fila.spec} fila={fila} />
      ))}

      {/* RESULTADO FINAL */}
      <div style={{ padding: '20px' }}>
        🏆 Ganador: <strong>{ganadorGeneral}</strong>
      </div>
    </>
  )
}


// ─────────────────────────────────────────────────────────────
// 🧮 COMPONENTE: FILA DE COMPARACIÓN
// Se encarga de:
// - Mostrar spec
// - Mostrar valores A y B
// - Resaltar ganador
// ─────────────────────────────────────────────────────────────
function FilaComparacion({ fila }) {

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', padding: '10px' }}>

      {/* Nombre de la spec */}
      <div>{fila.spec}</div>

      {/* Valor A */}
      <div style={{ color: fila.ganador === 'A' ? 'green' : 'white' }}>
        {fila.valA}
      </div>

      {/* Valor B */}
      <div style={{ color: fila.ganador === 'B' ? 'green' : 'white' }}>
        {fila.valB}
      </div>
    </div>
  )
}