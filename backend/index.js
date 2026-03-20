const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Load database from JSON
const dataPath = path.join(__dirname, 'data.json');
let db = {};
try {
  const rawData = fs.readFileSync(dataPath, 'utf-8');
  db = JSON.parse(rawData);
  console.log('Base de datos cargada correctamente');
} catch (error) {
  console.error('Error al cargar la base de datos JSON:', error);
}

// Routes
app.get('/', (req, res) => {
  res.send('API de TechCompare funcionando. Ve a /api/products para ver el catálogo.');
});

// HU-0001: Catálogo de productos navegable
app.get('/api/products', (req, res) => {
  try {
    const products = db.products || [];
    const brands = db.brands || [];
    const categories = db.categories || [];
    const prices = db.product_prices || [];
    
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
    res.status(500).json({ error: 'Error procesando los productos' });
  }
});

// Export para Vercel Serverless Functions
module.exports = app;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });
}
