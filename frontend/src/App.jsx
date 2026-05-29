// ============================================================
// App.jsx — El director de orquesta
// ============================================================
// Este es el componente raíz de toda la aplicación.
// No dibuja casi nada por sí solo, pero coordina todo:
//   - Tiene el estado global de productos y del comparador
//   - Le pasa los datos correctos a cada componente hijo
//   - Maneja los dos niveles de filtrado (servidor y local)
//
// Todos los componentes "se conectan" a través de App:
//   Filtros → App → useProductos → Backend → Catálogo
//   Catálogo → App → useComparador → Comparador
// ============================================================

import './index.css'
import Navbar     from './components/Navbar.jsx'
import Hero       from './components/Hero.jsx'
import Filtros    from './components/Filtros.jsx'
import Catalogo   from './components/Catalogo.jsx'
import Comparador from './components/Comparador.jsx'
import Nosotros   from './components/Nosotros.jsx'
import Footer     from './components/Footer.jsx'
import { useProductos }  from './hooks/useProductos.js'
import { useComparador } from './hooks/useComparador.js'
import { useState } from 'react'

function App() {
  // ── Hook de productos ─────────────────────────────────────
  // Maneja la carga de productos desde el servidor.
  // "recargar" es la función que usamos para pedir productos
  // con filtros nuevos cuando el usuario aplica un filtro.
  const { productos, cargando, error, fuenteDatos, recargar } = useProductos()

  // ── Hook del comparador ───────────────────────────────────
  // Maneja los 3 slots y la lógica de comparación.
  const { slots, toggleProducto, limpiarSlot, compararEspecificaciones } = useComparador()

  // ── Estado de búsqueda por nombre ────────────────────────
  // searchQuery: lo que el usuario está escribiendo en tiempo real
  // activeSearch: lo que se aplica al presionar Enter o el botón
  const [searchQuery, setSearchQuery]   = useState('')
  const [activeSearch, setActiveSearch] = useState('')

  // ── Manejo de filtros del panel ───────────────────────────
  // Cuando el usuario aplica filtros, llamamos a recargar()
  // con los filtros. Esto hace una nueva petición al servidor
  // con esos parámetros y actualiza el catálogo.
  const aplicarFiltros = (filtros) => {
    console.log("APLICANDO FILTROS EN APP:", filtros)
    recargar(filtros)
  }

  // ── Manejo de búsqueda por nombre ────────────────────────
  // Esta búsqueda es diferente a los filtros: se hace en el
  // navegador sobre los productos ya cargados, no en el servidor.
  const handleSearch  = () => setActiveSearch(searchQuery.trim())
  const handleKeyDown = (e) => { if (e.key === 'Enter') handleSearch() }
  const clearSearch   = () => { setSearchQuery(''); setActiveSearch('') }

  // ── Filtrado local por nombre ─────────────────────────────
  // Si hay una búsqueda activa, filtra los productos por nombre
  // en el mismo navegador (sin ir al servidor).
  // Si no hay búsqueda, muestra todos los productos que cargó el servidor.
  const productosFiltrados = activeSearch
    ? productos.filter(p => p.name.toLowerCase().includes(activeSearch.toLowerCase()))
    : productos

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      {/* Navbar con barra de búsqueda integrada */}
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={(e) => setSearchQuery(e.target.value)}
        onSearchSubmit={handleSearch}
        onKeyDown={handleKeyDown}
      />

      <main style={{ flex: 1 }}>
        <Hero />

        {/* Panel de filtros — cuando el usuario aplica, llama a aplicarFiltros */}
        <Filtros onFiltrar={aplicarFiltros} />

        {/* Banner de modo offline — solo aparece si el backend no respondió
            y estamos usando los datos guardados localmente */}
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

        {/* Indicador de búsqueda activa — muestra cuántos resultados hay */}
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

        {/* Catálogo de productos
            - productos: ya filtrados por nombre si hay búsqueda activa
            - slots: para saber qué productos están en el comparador (y marcarlos)
            - onToggleComparar: para agregar/quitar del comparador desde las tarjetas */}
        <Catalogo
          productos={productosFiltrados}
          cargando={cargando}
          error={error}
          slots={slots}
          onToggleComparar={toggleProducto}
          activeSearch={activeSearch}
          onClearSearch={clearSearch}
        />

        {/* Comparador de productos
            - slots: los 3 espacios con los ids de productos seleccionados
            - productos: la lista completa para buscar los datos por id
            - compararEspecificaciones: la función de scoring del hook */}
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
