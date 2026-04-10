import { useState } from 'react'
import { useFiltros } from '../hooks/useFiltros' 

export default function Filtros({ onFiltrar }) {
  const [category, setCategory] = useState('')
  const [brand, setBrand] = useState('')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')

  // 🔥 Hook dinámico
  const { categorias, marcas } = useFiltros()

  const aplicarFiltros = () => {
    const filtros = {
      ...(category && { category }),
      ...(brand && { brand }),
      ...(minPrice && { minPrice }),
      ...(maxPrice && { maxPrice }),
    }

    console.log("FILTROS ENVIADOS:", filtros)
    onFiltrar(filtros)
  }

  const limpiarFiltros = () => {
    setCategory('')
    setBrand('')
    setMinPrice('')
    setMaxPrice('')
    onFiltrar({})
  }

  return (
    <section style={{
      background: '#000',
      padding: '32px',
      display: 'flex',
      justifyContent: 'center'
    }}>
      
      <div style={{
        width: '100%',
        maxWidth: '1000px',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '16px',
        justifyContent: 'center',
        alignItems: 'center'
      }}>

        {/* 🔽 CATEGORY DINÁMICO */}
        <select 
          value={category} 
          onChange={e => setCategory(e.target.value)} 
          style={inputStyle}
        >
          <option value="">Categoría</option>

          {categorias
            .sort((a, b) => a.name.localeCompare(b.name))
            .map(cat => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
          ))}
        </select>

        {/* 🔽 BRAND DINÁMICO */}
        <select 
          value={brand} 
          onChange={e => setBrand(e.target.value)} 
          style={inputStyle}
        >
          <option value="">Marca</option>

          {marcas
            .sort((a, b) => a.name.localeCompare(b.name))
            .map(marca => (
              <option key={marca.id} value={marca.id}>
                {marca.name}
              </option>
          ))}
        </select>

        {/* PRECIO */}
        <input
          type="number"
          placeholder="Precio min"
          value={minPrice}
          onChange={e => setMinPrice(e.target.value)}
          style={inputStyle}
        />

        <input
          type="number"
          placeholder="Precio max"
          value={maxPrice}
          onChange={e => setMaxPrice(e.target.value)}
          style={inputStyle}
        />

        {/* BOTONES */}
        <button onClick={aplicarFiltros} style={botonPrincipal}>
          Filtrar
        </button>

        <button onClick={limpiarFiltros} style={botonPrincipal}>
          Limpiar
        </button>

      </div>
    </section>
  )
}

// 🎨 ESTILOS

const inputStyle = {
  background: '#fff',
  color: '#000',
  border: 'none',
  borderRadius: '8px',
  padding: '10px 14px',
  fontSize: '0.9rem',
  minWidth: '140px',
  outline: 'none'
}

const botonPrincipal = {
  background: '#00d4ff',
  color: '#000',
  border: 'none',
  borderRadius: '8px',
  padding: '10px 14px',
  fontWeight: '700',
  cursor: 'pointer',
  transition: '0.2s'
}