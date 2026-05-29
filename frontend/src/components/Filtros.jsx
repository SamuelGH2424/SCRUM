// ============================================================
// Filtros.jsx — Panel de filtros visual mejorado
// ============================================================
// Cambios realizados:
// ✅ Categorías visuales tipo tarjetas
// ✅ Barra persistente de categorías
// ✅ Íconos por categoría
// ✅ Tarjetas más grandes y centradas
// ✅ Mantiene TODA la lógica original
// ✅ Compatible con el backend actual
// ============================================================

import { useState } from 'react'
import { useFiltros } from '../hooks/useFiltros'

// ============================================================
// COMPONENTE PRINCIPAL
// ============================================================

export default function Filtros({ onFiltrar }) {

  // ── Estados ────────────────────────────────────────────────
  const [category, setCategory] = useState('')
  const [brand, setBrand]       = useState('')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')

  // ── Datos desde el servidor ────────────────────────────────
  const { categorias, marcas } = useFiltros()

  // ── Aplicar filtros ────────────────────────────────────────
  const aplicarFiltros = (
    customCategory = category
  ) => {

    onFiltrar({
      ...(customCategory && { category: customCategory }),
      ...(brand && { brand }),
      ...(minPrice && { minPrice }),
      ...(maxPrice && { maxPrice }),
    })
  }

  // ── Limpiar filtros ────────────────────────────────────────
  const limpiarFiltros = () => {

    setCategory('')
    setBrand('')
    setMinPrice('')
    setMaxPrice('')

    onFiltrar({})
  }

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <section style={{ padding: '28px 24px' }}>

      {/* ── Barra visual persistente de categorías ─────────── */}
      <CategoryCards
        categories={categorias}
        selected={category}
        onSelect={(id) => {

          setCategory(id)

          // Aplica automáticamente el filtro
          aplicarFiltros(id)
        }}
      />

      {/* ── Panel principal de filtros ─────────────────────── */}
      <div style={panel}>

        <h3 style={title}>
          Filtra tu catálogo
        </h3>

        {/* ── Grid de filtros ──────────────────────────────── */}
        <div style={grid}>

          {/* Marca */}
          <CustomSelect
            label="Marca"
            value={brand}
            placeholder="Todas las marcas"
            options={marcas.map(m => ({
              value: m.id,
              label: m.name
            }))}
            onChange={setBrand}
          />

          {/* Precio mínimo */}
          <Input
            label="Precio mínimo"
            value={minPrice}
            onChange={setMinPrice}
            placeholder="$ 0"
          />

          {/* Precio máximo */}
          <Input
            label="Precio máximo"
            value={maxPrice}
            onChange={setMaxPrice}
            placeholder="$ 9999999"
          />

        </div>

        {/* ── Botones ──────────────────────────────────────── */}
        <div style={buttonContainer}>

          <button
            onClick={() => aplicarFiltros()}
            style={btnPrimary}
          >
            Aplicar filtros
          </button>

          <button
            onClick={limpiarFiltros}
            style={btnSecondary}
          >
            Limpiar
          </button>

        </div>

      </div>
    </section>
  )
}

// ============================================================
// COMPONENTE: CategoryCards
// ============================================================
// Barra visual de categorías con tarjetas
// ============================================================

function CategoryCards({
  categories,
  selected,
  onSelect
}) {

  // ── Íconos según nombre ──────────────────────────────────
  const iconMap = {
    computadores: '💻',
    celulares: '📱',
    tablets: '📲',
    perifericos: '⌨️',
    componentes: '🖥️'
  }

  return (
    <div style={categoryWrapper}>

      <h3 style={categoryTitle}>
        Explora por categorías
      </h3>

      {/* ── Barra de categorías ───────────────────────────── */}
      <div style={categoryBar}>

        {/* Todas */}
        <div
          onClick={() => onSelect('')}
          style={{
            ...categoryCard,

            ...(selected === ''
              ? activeCategory
              : {})
          }}
        >
          <span style={categoryIcon}>
            🛒
          </span>

          <span style={categoryText}>
            Todas
          </span>
        </div>

        {/* Categorías dinámicas */}
        {categories.map(cat => {

          const normalized = cat.slug

          return (
            <div
              key={cat.id}
              onClick={() => onSelect(cat.id)}
              style={{
                ...categoryCard,

                ...(String(selected) === String(cat.id)
                  ? activeCategory
                  : {})
              }}
            >
              <span style={categoryIcon}>
                {iconMap[normalized] || '📦'}
              </span>

              <span style={categoryText}>
                {cat.name}
              </span>
            </div>
          )
        })}

      </div>
    </div>
  )
}

// ============================================================
// COMPONENTE: CustomSelect
// ============================================================
// Select personalizado para marcas
// ============================================================

function CustomSelect({
  label,
  value,
  placeholder,
  options,
  onChange
}) {

  // ── Estado del dropdown ──────────────────────────────────
  const [open, setOpen] = useState(false)

  // ── Opción seleccionada ──────────────────────────────────
  const selected =
    options.find(
      o => String(o.value) === String(value)
    )

  return (
    <div style={{ position: 'relative' }}>

      <label style={labelStyle}>
        {label}
      </label>

      {/* Caja principal */}
      <div
        onClick={() => setOpen(!open)}
        style={selectBox}
      >
        {selected
          ? selected.label
          : placeholder}

        <span>
          {open ? '▲' : '▼'}
        </span>
      </div>

      {/* Dropdown */}
      {open && (
        <div style={dropdown}>

          {/* Opción vacía */}
          <div
            onClick={() => {

              onChange('')
              setOpen(false)
            }}
            style={option}
          >
            {placeholder}
          </div>

          {/* Opciones dinámicas */}
          {options.map(opt => (

            <div
              key={opt.value}
              onClick={() => {

                onChange(opt.value)
                setOpen(false)
              }}
              style={{
                ...option,

                ...(String(value) === String(opt.value)
                  ? selectedOption
                  : {})
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

// ============================================================
// COMPONENTE: Input
// ============================================================
// Campo numérico reutilizable
// ============================================================

function Input({
  label,
  value,
  onChange,
  placeholder
}) {

  return (
    <div>

      <label style={labelStyle}>
        {label}
      </label>

      <input
        value={value}
        onChange={e =>
          onChange(e.target.value)
        }
        placeholder={placeholder}
        style={input}
        type="number"
      />

    </div>
  )
}

// ============================================================
// ESTILOS GENERALES
// ============================================================

const panel = {
  maxWidth: '1200px',
  margin: '0 auto',
  padding: 24,
  borderRadius: 20,
  background:
    'linear-gradient(180deg,#020617,#0f172a)',
  border:
    '1px solid rgba(255,255,255,0.08)'
}

const title = {
  color: '#fff',
  marginBottom: 20
}

const grid = {
  display: 'grid',
  gridTemplateColumns:
    'repeat(auto-fit,minmax(220px,1fr))',
  gap: 16
}

const labelStyle = {
  display: 'block',
  marginBottom: 6,
  color: '#94a3b8',
  fontWeight: 700,
  fontSize: 12
}

// ============================================================
// ESTILOS: SELECT PERSONALIZADO
// ============================================================

const selectBox = {
  background: '#0f172a',
  padding: 12,
  borderRadius: 10,
  border:
    '1px solid rgba(255,255,255,0.1)',
  color: '#fff',
  display: 'flex',
  justifyContent: 'space-between',
  cursor: 'pointer'
}

const dropdown = {
  position: 'absolute',
  width: '100%',
  background: '#020617',
  border:
    '1px solid rgba(255,255,255,0.1)',
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

// ============================================================
// ESTILOS: INPUT
// ============================================================

const input = {
  width: '100%',
  padding: 12,
  borderRadius: 10,
  border:
    '1px solid rgba(255,255,255,0.1)',
  background: '#0f172a',
  color: '#fff'
}

// ============================================================
// ESTILOS: BOTONES
// ============================================================

const buttonContainer = {
  marginTop: 20,
  display: 'flex',
  gap: 10,
  flexWrap: 'wrap'
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
  border:
    '1px solid rgba(255,255,255,0.1)',
  background: 'transparent',
  color: '#fff',
  cursor: 'pointer'
}

// ============================================================
// ESTILOS: CATEGORÍAS VISUALES
// ============================================================

const categoryWrapper = {
  maxWidth: '1400px',
  margin: '0 auto 32px auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
}

const categoryTitle = {
  color: '#fff',
  marginBottom: 22,
  fontSize: 28,
  fontWeight: 800,
  textAlign: 'center'
}

const categoryBar = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 24,
  flexWrap: 'wrap',
  width: '100%'
}

const categoryCard = {
  width: 180,
  height: 180,
  padding: 24,
  borderRadius: 24,
  background: '#0f172a',
  border:
    '1px solid rgba(255,255,255,0.08)',
  color: '#fff',
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 14,
  transition: 'all .25s ease',
  fontWeight: 700,
  userSelect: 'none'
}

const activeCategory = {
  background: '#06b6d4',
  color: '#000',
  border: '1px solid #06b6d4',
  transform: 'translateY(-6px) scale(1.03)',
  boxShadow:
    '0 16px 35px rgba(6,182,212,.35)'
}

const categoryIcon = {
  fontSize: 52
}

const categoryText = {
  textAlign: 'center',
  fontSize: 18,
  fontWeight: 700
}