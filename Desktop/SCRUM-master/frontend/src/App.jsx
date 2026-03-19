import './index.css'
import Navbar     from './components/Navbar.jsx'
import Hero       from './components/Hero.jsx'
import Catalogo   from './components/Catalogo.jsx'
import Comparador from './components/Comparador.jsx'
import Nosotros   from './components/Nosotros.jsx'
import Footer     from './components/Footer.jsx'
import { useProductos }  from './hooks/useProductos.js'
import { useComparador } from './hooks/useComparador.js'
import { useState } from 'react'

function App() {
  // ── Datos y lógica de productos ──
  const { productos, cargando, error, fuenteDatos } = useProductos()
  const { slots, toggleProducto, limpiarSlot, compararEspecificaciones } = useComparador()

  // ── Estado de búsqueda ──
  const [searchQuery, setSearchQuery]   = useState('')
  const [activeSearch, setActiveSearch] = useState('')

  const handleSearch = () => setActiveSearch(searchQuery.trim())
  const handleKeyDown = (e) => { if (e.key === 'Enter') handleSearch() }
  const clearSearch   = () => { setSearchQuery(''); setActiveSearch('') }

  // Filtra productos según búsqueda activa
  const productosFiltrados = activeSearch
    ? productos.filter(p => p.name.toLowerCase().includes(activeSearch.toLowerCase()))
    : productos

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      {/* ── NAVBAR con barra de búsqueda integrada ── */}
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={(e) => setSearchQuery(e.target.value)}
        onSearchSubmit={handleSearch}
        onKeyDown={handleKeyDown}
      />

      <main style={{ flex: 1 }}>
        <Hero />

        {/* Banner: modo offline */}
        {fuenteDatos === 'local' && (
          <div style={{
            maxWidth: '1280px', margin: '0 auto', padding: '0 48px',
            display: 'flex', alignItems: 'center', gap: '10px',
            fontFamily: 'DM Mono, monospace', fontSize: '11px',
            color: 'var(--accent-color)', opacity: 0.7,
          }}>
            <span>⚡</span> Modo offline — mostrando datos locales (backend no disponible)
          </div>
        )}

        {/* ── Indicador de búsqueda activa ── */}
        {activeSearch && !cargando && (
          <div style={{
            maxWidth: '1280px', margin: '0 auto', padding: '8px 48px',
            display: 'flex', alignItems: 'center', gap: '0.75rem',
            color: 'var(--text-secondary)', fontSize: '0.9rem',
          }}>
            <span>
              {productosFiltrados.length} resultado{productosFiltrados.length !== 1 ? 's' : ''} para{' '}
              <strong style={{ color: 'var(--accent-color)' }}>"{activeSearch}"</strong>
            </span>
            <button onClick={clearSearch} style={{
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid var(--border-color)',
              borderRadius: '6px', padding: '2px 10px',
              color: 'var(--text-secondary)', fontSize: '0.8rem', cursor: 'pointer',
            }}>
              ✕ Limpiar
            </button>
          </div>
        )}

        {/* ── Catálogo (maneja loading, error y sin resultados internamente) ── */}
        <Catalogo
          productos={productosFiltrados}
          cargando={cargando}
          error={error}
          slots={slots}
          onToggleComparar={toggleProducto}
          activeSearch={activeSearch}
          onClearSearch={clearSearch}
        />

        <Comparador
          slots={slots}
          productos={productos}
          onLimpiarSlot={limpiarSlot}
          compararEspecificaciones={compararEspecificaciones}
        />

        <Nosotros />
      </main>

      <Footer />
    </div>
  )
}

export default App
