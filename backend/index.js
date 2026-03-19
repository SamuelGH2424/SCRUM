const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Load database from JSON (compatible con Vercel serverless)
let db = {};
try {
  db = require('./data.json');
  console.log('✅ Base de datos cargada correctamente');
  console.log(`📊 Productos: ${db.products?.length || 0}`);
  console.log(`🏷️ Marcas: ${db.brands?.length || 0}`);
  console.log(`📁 Categorías: ${db.categories?.length || 0}`);
} catch (error) {
  console.error('❌ Error al cargar data.json:', error.message);
  db = { 
    products: [], 
    brands: [], 
    categories: [], 
    product_prices: [] 
  };
}

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'API de TechCompare funcionando',
    endpoints: {
      products: '/api/products',
      status: 'OK'
    },
    database_info: {
      products: db.products?.length || 0,
      brands: db.brands?.length || 0,
      categories: db.categories?.length || 0,
      prices: db.product_prices?.length || 0
    }
  });
});

// HU-0001: Catálogo de productos navegable
app.get('/api/products', (req, res) => {
  try {
    const products = db.products || [];
    const brands = db.brands || [];
    const categories = db.categories || [];
    const prices = db.product_prices || [];
    
    if (products.length === 0) {
      return res.status(404).json({ 
        error: 'No hay productos en la base de datos',
        hint: 'Verifica que data.json tenga productos'
      });
    }
    
    // Enrich products with brand, category and prices
    const enrichedProducts = products.map(product => {
      const brand = brands.find(b => b.id === product.brand_id);
      const category = categories.find(c => c.id === product.category_id);
      
      const productPrices = prices.filter(p => p.product_id === product.id);
      
      let lowestPrice = null;
      if (productPrices.length > 0) {
        lowestPrice = productPrices.reduce((min, p) => p.price < min.price ? p : min, productPrices[0]);
      }
      
      return {
        ...product,
        brand_name: brand ? brand.name : 'Desconocida',
        category_name: category ? category.name : 'Desconocida',
        lowest_price: lowestPrice ? lowestPrice.price : null,
        currency: lowestPrice ? lowestPrice.currency : 'COP',
        prices_count: productPrices.length
      };
    });
    
    res.json(enrichedProducts);
  } catch (error) {
    console.error('Error procesando productos:', error);
    res.status(500).json({ 
      error: 'Error procesando los productos',
      details: error.message 
    });
  }
});

// Export para Vercel Serverless Functions
module.exports = app;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  });
}
