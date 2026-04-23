import { useState } from 'react'
import { useFiltros } from '../hooks/useFiltros'

export default function Filtros({ onFiltrar }) {
  const [category, setCategory] = useState('')
  const [brand, setBrand] = useState('')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')

  const { categorias, marcas } = useFiltros()

  const aplicarFiltros = () => {
    onFiltrar({
      ...(category && { category }),
      ...(brand && { brand }),
      ...(minPrice && { minPrice }),
      ...(maxPrice && { maxPrice }),
    })
  }

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

          <CustomSelect
            label="Categoría"
            value={category}
            placeholder="Todas las categorías"
            options={categorias.map(c => ({ value: c.id, label: c.name }))}
            onChange={setCategory}
          />

          <CustomSelect
            label="Marca"
            value={brand}
            placeholder="Todas las marcas"
            options={marcas.map(m => ({ value: m.id, label: m.name }))}
            onChange={setBrand}
          />

          <Input
            label="Precio mínimo"
            value={minPrice}
            onChange={setMinPrice}
            placeholder="$ 0"
          />

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

function CustomSelect({ label, value, placeholder, options, onChange }) {
  const [open, setOpen] = useState(false)

  const selected = options.find(o => String(o.value) === String(value))

  return (
    <div style={{ position: 'relative' }}>
      <label style={labelStyle}>{label}</label>

      <div
        onClick={() => setOpen(!open)}
        style={selectBox}
      >
        {selected ? selected.label : placeholder}
        <span>{open ? '▲' : '▼'}</span>
      </div>

      {open && (
        <div style={dropdown}>
          <div
            onClick={() => {
              onChange('')
              setOpen(false)
            }}
            style={option}
          >
            {placeholder}
          </div>

          {options.map(opt => (
            <div
              key={opt.value}
              onClick={() => {
                onChange(opt.value)
                setOpen(false)
              }}
              style={{
                ...option,
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

/* 🎨 ESTILOS */

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