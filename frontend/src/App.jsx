import { useState, useEffect } from 'react';
import './index.css';

// Usar variable de entorno si existe, o localhost para dev
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/products`);
      if (!response.ok) throw new Error('Error al cargar los productos');
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header Premium */}
      <header className="glass" style={{
        position: 'sticky', top: 0, zIndex: 100,
        padding: '1.5rem 2rem',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ 
            width: '32px', height: '32px', 
            background: `linear-gradient(135deg, var(--accent-color), #7b61ff)`,
            borderRadius: '8px',
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            fontWeight: 'bold', color: '#000'
          }}>T</div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: '800', letterSpacing: '-0.03em' }}>
            Tech<span style={{ color: 'var(--accent-color)' }}>Compare</span>
          </h1>
        </div>
        <nav style={{ display: 'flex', gap: '1.5rem' }}>
          <a href="#" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontWeight: '500' }}>Catálogo</a>
          <a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: '500', transition: 'color 0.2s' }}>Comparador</a>
        </nav>
      </header>

      <main style={{ padding: '3rem 2rem', maxWidth: '1200px', margin: '0 auto', width: '100%', flex: 1 }}>
        <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem' }}>Encuentra el mejor precio</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
            Explora nuestro catálogo de productos tecnológicos y compara precios en las mejores tiendas de Colombia.
          </p>
        </div>

        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
            <div style={{ 
              width: '40px', height: '40px', 
              border: '3px solid rgba(0, 229, 255, 0.2)', 
              borderTopColor: 'var(--accent-color)', 
              borderRadius: '50%', 
              animation: 'spin 1s linear infinite' 
            }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        ) : error ? (
           <div className="glass" style={{ padding: '2rem', textAlign: 'center', borderRadius: '1rem', borderLeft: '4px solid #ff4d6d' }}>
            <h3 style={{ color: '#ff4d6d', marginBottom: '0.5rem' }}>Parece que hay un error de conexión</h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              Asegúrate de que el backend esté corriendo en el puerto 3001. ({error})
            </p>
           </div>
        ) : (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
            gap: '2rem' 
          }}>
            {products.map((product, index) => (
              <div key={product.id} className="glass card animate-fade-in" style={{ 
                borderRadius: '16px', 
                overflow: 'hidden',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                animationDelay: `${index * 0.05}s`,
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = 'var(--card-shadow), 0 0 0 1px var(--accent-color)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
              >
                <div style={{ position: 'relative', height: '220px', backgroundColor: '#fff', padding: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <img 
                    src={product.image_url || `https://via.placeholder.com/200?text=${product.brand_name}`} 
                    alt={product.name} 
                    style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                    onError={(e) => { e.target.src = "https://via.placeholder.com/200?text=No+Image" }}
                  />
                  <div style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)', padding: '4px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '600' }}>
                    {product.category_name}
                  </div>
                </div>
                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '0.5rem', fontWeight: '500' }}>
                    {product.brand_name}
                  </div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '1rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {product.name}
                  </h3>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 'auto', paddingTop: '1rem' }}>
                    <div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.2rem' }}>Desde</div>
                      <div style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--accent-color)' }}>
                        {product.lowest_price ? formatPrice(product.lowest_price) : 'No disponible'}
                      </div>
                    </div>
                    <div style={{ fontSize: '0.8rem', background: 'rgba(255,255,255,0.05)', padding: '4px 8px', borderRadius: '6px' }}>
                      {product.prices_count} tiendas
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <footer className="glass" style={{ borderTop: '1px solid var(--border-color)', borderBottom: 'none', borderLeft: 'none', borderRight: 'none', padding: '2rem', textAlign: 'center', borderRadius: 0 }}>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          &copy; 2026 TechCompare - Proyecto Universitario. Los precios son simulados.
        </p>
      </footer>
    </div>
  );
}

export default App;
