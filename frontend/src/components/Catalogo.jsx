import ProductCard from './ProductCard.jsx'

// ── Componente: Sección catálogo de productos ──
export default function Catalogo({ productos, cargando, error, slots, onToggleComparar, activeSearch, onClearSearch }) {

  // Estado de carga
  if (cargando) return (
    <section id="catalogo" style={{ padding: '72px 48px', maxWidth: '1280px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
        <div style={{
          width: '40px', height: '40px',
          border: '3px solid rgba(0, 212, 255, 0.2)',
          borderTopColor: 'var(--accent-color)',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
        }} />
      </div>
    </section>
  )

  // Estado de error
  if (error) return (
    <section id="catalogo" style={{ padding: '72px 48px', maxWidth: '1280px', margin: '0 auto' }}>
      <div className="glass" style={{ padding: '2rem', textAlign: 'center', borderRadius: '1rem', borderLeft: '4px solid var(--accent2)' }}>
        <h3 style={{ color: 'var(--accent2)', marginBottom: '0.5rem' }}>Error de conexión</h3>
        <p style={{ color: 'var(--text-secondary)' }}>
          Asegúrate de que el backend esté corriendo en el puerto 3001. ({error})
        </p>
      </div>
    </section>
  )

  // Sin resultados de búsqueda
  if (productos.length === 0 && activeSearch) return (
    <section id="catalogo" style={{ padding: '72px 48px', maxWidth: '1280px', margin: '0 auto' }}>
      <div className="glass" style={{ padding: '3rem', textAlign: 'center', borderRadius: '1rem', borderLeft: '4px solid var(--accent-color)' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
        <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '0.5rem' }}>
          Sin resultados para "{activeSearch}"
        </h3>
        <p style={{ color: 'var(--text-secondary)' }}>
          No encontramos productos que coincidan. Intenta con otro nombre.
        </p>
        <button onClick={onClearSearch} style={{
          marginTop: '1.5rem',
          background: 'var(--accent-color)', color: '#000',
          border: 'none', borderRadius: '8px',
          padding: '0.6rem 1.4rem', fontWeight: '700', cursor: 'pointer',
        }}>
          Ver todos los productos
        </button>
      </div>
    </section>
  )

  return (
    <section id="catalogo" style={{ padding: '72px 48px', maxWidth: '1280px', margin: '0 auto' }}>

      {/* Encabezado */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '1.85rem', fontWeight: '800', letterSpacing: '-0.02em', marginBottom: '8px' }}>
          Catálogo de <span style={{ color: 'var(--accent-color)' }}>Productos</span>
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          Selecciona hasta 2 productos para comparar — haz clic en "+ Comparar" en cada tarjeta
        </p>
      </div>

      {/* Grid de productos */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '24px',
      }}>
        {productos.map((producto, i) => (
          <div key={producto.id} style={{ animationDelay: `${i * 0.05}s` }}>
            <ProductCard
              producto={producto}
              enComparador={slots.includes(producto.id)}
              onToggleComparar={onToggleComparar}
            />
          </div>
        ))}
      </div>
    </section>
  )
}
