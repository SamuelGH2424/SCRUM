// ============================================================
// index.js — El servidor (Backend)
// ============================================================
// Este archivo es el cerebro del backend. Cuando lo enciendes,
// levanta un servidor que escucha peticiones del frontend y
// responde con datos de productos, marcas y categorías.
//
// Piénsalo como el mesero del restaurante:
//   - El frontend (cliente) hace un pedido
//   - Este archivo lo recibe, va a la cocina (data.json)
//   - Y devuelve lo que se pidió, ya preparado
// ============================================================

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// CORS permite que el frontend (que vive en otro dominio/puerto)
// pueda hablarle al servidor sin que el navegador lo bloquee
app.use(cors());

// Esto le dice al servidor que puede leer datos en formato JSON
// cuando el frontend le manda información
app.use(express.json());

// ── Cargar base de datos ──────────────────────────────────────
// Al encender el servidor, lee el archivo data.json UNA sola vez
// y lo guarda en memoria (en la variable db).
// Es más rápido que leerlo cada vez que alguien hace una petición.
const dataPath = path.join(__dirname, 'data.json');
let db = {};

try {
  const rawData = fs.readFileSync(dataPath, 'utf-8');
  db = JSON.parse(rawData); // Convierte el texto JSON en un objeto JavaScript
  console.log('✅ Base de datos cargada correctamente');
} catch (error) {
  // Si el archivo no existe o tiene errores, avisa pero sigue corriendo
  console.error('❌ Error al cargar la base de datos JSON:', error);
}

// ── Ruta raíz ────────────────────────────────────────────────
// Solo para confirmar que el servidor está vivo.
// Si entras a http://localhost:3001 en el navegador, ves este mensaje.
app.get('/', (req, res) => {
  res.send('API de TechCompare funcionando. Ve a /api/products');
});

// ── Endpoint: Categorías ─────────────────────────────────────
// El frontend llama aquí para saber qué categorías existen
// (ej: Computadores, Componentes, etc.)
// Así los menús desplegables del filtro se llenan solos del servidor,
// no hay que escribirlos a mano en el código.
app.get('/api/categories', (req, res) => {
  res.json(db.categories || []);
});

// ── Endpoint: Marcas ─────────────────────────────────────────
// Igual que categorías pero para las marcas
// (ej: HP, ASUS, Dell, Apple, etc.)
app.get('/api/brands', (req, res) => {
  res.json(db.brands || []);
});

// ── Endpoint: Productos con filtros ──────────────────────────
// Este es el más importante y el más complejo.
// El frontend puede pedirle productos con o sin filtros:
//   /api/products               → todos los productos
//   /api/products?brand=1       → solo de la marca con id=1
//   /api/products?minPrice=2000000 → solo productos desde $2.000.000
app.get('/api/products', (req, res) => {
  try {
    const products = db.products || [];
    const brands = db.brands || [];
    const categories = db.categories || [];
    const prices = db.product_prices || [];

    // Lee los filtros que mandó el frontend desde la URL
    // Ejemplo: si la URL es /api/products?category=1&brand=2
    // entonces: category="1", brand="2"
    const { category, brand, minPrice, maxPrice, ram } = req.query;

    console.log("📥 QUERY RECIBIDO:", req.query);

    const enrichedProducts = products
      .map(product => {
        // ── Paso 1: Enriquecer el producto ──
        // Los productos en la BD solo tienen IDs numéricos (brand_id: 2).
        // Acá buscamos el nombre real de la marca y la categoría
        // para que el frontend pueda mostrarlo sin hacer peticiones extra.
        const brandData = brands.find(b => b.id === product.brand_id);
        const categoryData = categories.find(c => c.id === product.category_id);

        // ── Paso 2: Calcular el precio más bajo ──
        // Cada producto puede estar en varias tiendas con precios distintos.
        // Buscamos todas las entradas de precio para este producto
        // y nos quedamos con la más barata usando reduce().
        const productPrices = prices.filter(p => p.product_id === product.id);

        let lowestPrice = null;
        if (productPrices.length > 0) {
          lowestPrice = productPrices.reduce((min, p) =>
            p.price < min.price ? p : min,
            productPrices[0]
          );
        }

        // Devolvemos el producto original más los campos nuevos que calculamos
        return {
          ...product,
          brand_name: brandData ? brandData.name : 'Desconocida',
          category_name: categoryData ? categoryData.name : 'Desconocida',
          lowest_price: lowestPrice ? lowestPrice.price : null,
          currency: lowestPrice ? lowestPrice.currency : 'COP',
          prices_count: productPrices.length // Cuántas tiendas lo venden
        };
      })

      // ── Paso 3: Filtrar ──
      // Después de enriquecer todos los productos, descartamos
      // los que no cumplan con los filtros que mandó el frontend.
      // Cada condición solo se evalúa si ese filtro fue enviado.
      .filter(product => {

        // Si se pidió filtrar por categoría y este producto es de otra, descártalo
        if (category && product.category_id !== parseInt(category)) return false;

        // Si se pidió filtrar por marca y este producto es de otra, descártalo
        if (brand && product.brand_id !== parseInt(brand)) return false;

        // Si se pidió precio mínimo y este producto es más barato, descártalo
        if (minPrice && (!product.lowest_price || product.lowest_price < parseInt(minPrice))) return false;

        // Si se pidió precio máximo y este producto es más caro, descártalo
        if (maxPrice && (!product.lowest_price || product.lowest_price > parseInt(maxPrice))) return false;

        // Si se pidió RAM mínima y este producto tiene menos, descártalo
        if (ram && product.specifications?.ram_gb < parseInt(ram)) return false;

        // Si pasó todos los filtros, inclúyelo en el resultado
        return true;
      });

    console.log(`📦 Productos filtrados: ${enrichedProducts.length}`);

    // Manda al frontend solo los productos que pasaron todos los filtros,
    // ya enriquecidos con nombre de marca, categoría y precio calculado
    res.json(enrichedProducts);

  } catch (error) {
    console.error('❌ Error en /api/products:', error);
    res.status(500).json({ error: 'Error procesando los productos' });
  }
});

// ── Export para Vercel ────────────────────────────────────────
// Vercel necesita que exportemos la app así para poder correrla
// como una función serverless en la nube
module.exports = app;

// ── Servidor local ────────────────────────────────────────────
// Cuando corres "node index.js" en tu máquina, esto levanta el servidor.
// En Vercel este bloque no se ejecuta porque Vercel maneja el arranque solo.
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  });
}
