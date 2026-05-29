// ============================================================
// Filtros.jsx — El panel de filtros visual
// ============================================================
// Este componente dibuja el panel de filtros que aparece
// encima del catálogo. Permite filtrar por:
//   - Categoría (Computadores, Componentes, etc.)
//   - Marca (HP, ASUS, Dell, etc.)
//   - Precio mínimo
//   - Precio máximo
//
// Las opciones de categoría y marca NO están escritas a mano
// aquí — vienen del servidor a través del hook useFiltros.
// ============================================================

import { useState } from 'react'
import { useFiltros } from '../hooks/useFiltros'

export default function Filtros({ onFiltrar }) {
  // Estado local de cada campo del formulario
  // Empiezan vacíos (sin filtro aplicado)
  const [category, setCategory] = useState('')
  const [brand, setBrand]       = useState('')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')

  // Trae las listas de categorías y marcas del servidor
  // para rellenar los dropdowns
  const { categorias, marcas } = useFiltros()

  // ── Aplicar filtros ───────────────────────────────────────
  // Cuando el usuario presiona "Aplicar filtros", recoge solo
  // los campos que tienen valor y se los manda al componente padre.
  // El truco con && evita mandar campos vacíos al servidor.
  // Ejemplo: si no eligió marca, el objeto no tendrá campo "brand"
  const aplicarFiltros = () => {
    onFiltrar({
      ...(category && { category }),
      ...(brand    && { brand }),
      ...(minPrice && { minPrice }),
      ...(maxPrice && { maxPrice }),
    })
  }

  // ── Limpiar filtros ───────────────────────────────────────
  // Resetea todos los campos a vacío y le avisa al padre
  // que ya no hay filtros → el catálogo vuelve a mostrar todo
  const limpiarFiltros = () => {
    setCategory('')
    setBrand('')
    setMinPrice('')
    setMaxPrice('')
    onFiltrar({})
  }

  return (
    <section style={{ padding: '28px 24px' }}>
      <div style={panel}>

        <h3 style={title}>Filtra tu catálogo</h3>

        <div style={grid}>

          {/* Dropdown de categoría — opciones vienen del servidor */}
          <CustomSelect
            label="Categoría"
            value={category}
            placeholder="Todas las categorías"
            options={categorias.map(c => ({ value: c.id, label: c.name }))}
            onChange={setCategory}
          />

          {/* Dropdown de marca — opciones vienen del servidor */}
          <CustomSelect
            label="Marca"
            value={brand}
            placeholder="Todas las marcas"
            options={marcas.map(m => ({ value: m.id, label: m.name }))}
            onChange={setBrand}
          />

          {/* Campo de precio mínimo */}
          <Input
            label="Precio mínimo"
            value={minPrice}
            onChange={setMinPrice}
            placeholder="$ 0"
          />

          {/* Campo de precio máximo */}
          <Input
            label="Precio máximo"
            value={maxPrice}
            onChange={setMaxPrice}
            placeholder="$ 9999999"
          />

        </div>

        <div style={{ marginTop: 20, display: 'flex', gap: 10 }}>
          <button onClick={aplicarFiltros} style={btnPrimary}>
            Aplicar filtros
          </button>

          <button onClick={limpiarFiltros} style={btnSecondary}>
            Limpiar
          </button>
        </div>

      </div>
    </section>
  )
}

// ── Componente CustomSelect ───────────────────────────────────
// Un menú desplegable personalizado porque el <select> nativo
// de HTML no se puede estilizar bien con el diseño del proyecto.
// Abre y cierra una lista flotante cuando el usuario hace clic.
function CustomSelect({ label, value, placeholder, options, onChange }) {
  // Controla si el dropdown está abierto o cerrado
  const [open, setOpen] = useState(false)

  // Busca la opción seleccionada para mostrar su etiqueta
  const selected = options.find(o => String(o.value) === String(value))

  return (
    <div style={{ position: 'relative' }}>
      <label style={labelStyle}>{label}</label>

      {/* La "caja" clickeable que muestra el valor seleccionado */}
      <div
        onClick={() => setOpen(!open)}
        style={selectBox}
      >
        {selected ? selected.label : placeholder}
        <span>{open ? '▲' : '▼'}</span>
      </div>

      {/* La lista de opciones — solo se muestra si open=true */}
      {open && (
        <div style={dropdown}>
          {/* Primera opción siempre es "mostrar todos" */}
          <div
            onClick={() => {
              onChange('')
              setOpen(false)
            }}
            style={option}
          >
            {placeholder}
          </div>

          {/* Opciones reales que vienen del servidor */}
          {options.map(opt => (
            <div
              key={opt.value}
              onClick={() => {
                onChange(opt.value)
                setOpen(false)
              }}
              style={{
                ...option,
                // Si esta opción está seleccionada, la resalta en azul
                ...(String(value) === String(opt.value) ? selectedOption : {})
              }}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Componente Input ──────────────────────────────────────────
// Campo de texto para precios. Solo acepta números (type="number")
function Input({ label, value, onChange, placeholder }) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={input}
        type="number"
      />
    </div>
  )
}

/* ── Estilos ────────────────────────────────────────────────── */

const panel = {
  maxWidth: '1200px',
  margin: '0 auto',
  padding: 24,
  borderRadius: 20,
  background: 'linear-gradient(180deg,#020617,#0f172a)',
  border: '1px solid rgba(255,255,255,0.08)'
}

const title = {
  color: '#fff',
  marginBottom: 20
}

const grid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))',
  gap: 16
}

const labelStyle = {
  display: 'block',
  marginBottom: 6,
  color: '#94a3b8',
  fontWeight: 700,
  fontSize: 12
}

const selectBox = {
  background: '#0f172a',
  padding: 12,
  borderRadius: 10,
  border: '1px solid rgba(255,255,255,0.1)',
  color: '#fff',
  display: 'flex',
  justifyContent: 'space-between',
  cursor: 'pointer'
}

const dropdown = {
  position: 'absolute',
  width: '100%',
  background: '#020617',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 10,
  marginTop: 6,
  zIndex: 1000,
  maxHeight: 200,
  overflowY: 'auto'
}

const option = {
  padding: 10,
  cursor: 'pointer',
  color: '#e2e8f0'
}

const selectedOption = {
  background: '#0ea5e9',
  color: '#fff'
}

const input = {
  width: '100%',
  padding: 12,
  borderRadius: 10,
  border: '1px solid rgba(255,255,255,0.1)',
  background: '#0f172a',
  color: '#fff'
}

const btnPrimary = {
  padding: '10px 16px',
  borderRadius: 10,
  border: 'none',
  background: '#06b6d4',
  color: '#000',
  fontWeight: 700,
  cursor: 'pointer'
}

const btnSecondary = {
  padding: '10px 16px',
  borderRadius: 10,
  border: '1px solid rgba(255,255,255,0.1)',
  background: 'transparent',
  color: '#fff',
  cursor: 'pointer'
}
