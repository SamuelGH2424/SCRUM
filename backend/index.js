const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// ── Cargar base de datos ──
const dataPath = path.join(__dirname, 'data.json');
let db = {};

try {
  const rawData = fs.readFileSync(dataPath, 'utf-8');
  db = JSON.parse(rawData);
  console.log('✅ Base de datos cargada correctamente');
} catch (error) {
  console.error('❌ Error al cargar la base de datos JSON:', error);
}

// ── Ruta raíz ──
app.get('/', (req, res) => {
  res.send('API de TechCompare funcionando. Ve a /api/products');
});

// ── NUEVO: Categorías ──
app.get('/api/categories', (req, res) => {
  res.json(db.categories || []);
});

// ── NUEVO: Marcas ──
app.get('/api/brands', (req, res) => {
  res.json(db.brands || []);
});

// ── API: Productos con filtros ──
app.get('/api/products', (req, res) => {
  try {
    const products = db.products || [];
    const brands = db.brands || [];
    const categories = db.categories || [];
    const prices = db.product_prices || [];

    // 🔥 Query params
    const { category, brand, minPrice, maxPrice, ram } = req.query;

    console.log("📥 QUERY RECIBIDO:", req.query);

    const enrichedProducts = products
      .map(product => {

        const brandData = brands.find(b => b.id === product.brand_id);
        const categoryData = categories.find(c => c.id === product.category_id);

        const productPrices = prices.filter(p => p.product_id === product.id);

        let lowestPrice = null;
        if (productPrices.length > 0) {
          lowestPrice = productPrices.reduce((min, p) =>
            p.price < min.price ? p : min,
            productPrices[0]
          );
        }

        return {
          ...product,
          brand_name: brandData ? brandData.name : 'Desconocida',
          category_name: categoryData ? categoryData.name : 'Desconocida',
          lowest_price: lowestPrice ? lowestPrice.price : null,
          currency: lowestPrice ? lowestPrice.currency : 'COP',
          prices_count: productPrices.length
        };
      })
      .filter(product => {

        // 🔽 FILTROS

        if (category && product.category_id !== parseInt(category)) return false;

        if (brand && product.brand_id !== parseInt(brand)) return false;

        if (minPrice && (!product.lowest_price || product.lowest_price < parseInt(minPrice))) return false;

        if (maxPrice && (!product.lowest_price || product.lowest_price > parseInt(maxPrice))) return false;

        if (ram && product.specifications?.ram_gb < parseInt(ram)) return false;

        return true;
      });

    console.log(`📦 Productos filtrados: ${enrichedProducts.length}`);

    res.json(enrichedProducts);

  } catch (error) {
    console.error('❌ Error en /api/products:', error);
    res.status(500).json({ error: 'Error procesando los productos' });
  }
});

// ── Export para Vercel ──
module.exports = app;

// ── Servidor local ──
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  });
}
