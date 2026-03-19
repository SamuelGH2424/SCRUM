# TechCompare — Frontend

Proyecto SCRUM · 2026  
Comparador de precios de productos tecnológicos para Colombia.

---

## 📁 Estructura del proyecto

```
techcompare/
├── index.html              ← Punto de entrada HTML (Vite)
├── package.json            ← Dependencias del proyecto
├── vite.config.js          ← Configuración de Vite
├── .env.example            ← Plantilla de variables de entorno
└── src/
    ├── main.jsx            ← Arranque de React
    ├── App.jsx             ← Componente raíz (solo orquesta)
    ├── index.css           ← Estilos globales y variables CSS
    │
    ├── components/         ← Componentes visuales
    │   ├── Navbar.jsx      ← Barra de navegación fija
    │   ├── Hero.jsx        ← Sección principal / bienvenida
    │   ├── Catalogo.jsx    ← Grid de tarjetas de productos
    │   ├── ProductCard.jsx ← Tarjeta individual de producto
    │   ├── Comparador.jsx  ← Comparador spec por spec
    │   ├── Nosotros.jsx    ← Sección del equipo
    │   └── Footer.jsx      ← Pie de página
    │
    ├── hooks/              ← Lógica reutilizable (hooks)
    │   ├── useProductos.js ← Carga productos del API o datos locales
    │   └── useComparador.js← Estado y lógica del comparador
    │
    └── data/
        └── productos.js    ← Datos locales (fallback sin backend)
```

---

## 🚀 Cómo correr el proyecto

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar variables de entorno
cp .env.example .env
# Edita .env con tu URL de backend

# 3. Correr en modo desarrollo
npm run dev

# 4. Construir para producción
npm run build
```

---

## ⚙️ Variables de entorno

| Variable           | Descripción                                     | Default                         |
|--------------------|-------------------------------------------------|---------------------------------|
| `VITE_API_URL`     | URL base del backend                            | `http://localhost:3001/api`     |
| `VITE_IMAGES_URL`  | URL base del bucket de imágenes (Vercel Blob)   | *(pendiente — ver .env.example)*|

Si el backend no responde, la app carga automáticamente los **datos locales** de `src/data/productos.js` sin mostrar error al usuario.

---

## 🖼️ Conexión de imágenes desde Vercel

El catálogo en https://scrum-ex19.vercel.app/ tiene las fotos de los productos.  
Cuando quieras conectarlas al front:

1. Sube las imágenes a **Vercel Blob Storage** desde tu dashboard.
2. Anota la URL base del bucket (ej: `https://xxxx.public.blob.vercel-storage.com`).
3. Agrega `VITE_IMAGES_URL=<url-del-bucket>` a tu `.env`.
4. En `ProductCard.jsx`, reemplaza:
   ```jsx
   src={producto.image_url}
   ```
   por:
   ```jsx
   const IMAGES_URL = import.meta.env.VITE_IMAGES_URL || ''
   src={producto.image_key ? `${IMAGES_URL}/${producto.image_key}` : null}
   ```

---

## 🔌 Conexión con el backend

`useProductos.js` hace `GET /api/products`. Cada producto debe tener:

```json
{
  "id": 1,
  "brand_name": "HP",
  "name": "HP Victus 14GK13",
  "category_name": "Computadores",
  "lowest_price": 5448900,
  "prices_count": 4,
  "image_url": null,
  "specs": {
    "Procesador": "AMD Ryzen 5 7535HS",
    "RAM": "16 GB DDR5",
    "Almacenamiento": "512 GB SSD NVMe",
    "Tarjeta Gráfica": "NVIDIA RTX 3050 4GB",
    "Pantalla": "14 pulg FHD 144Hz",
    "Año": 2023
  }
}
```

---

## 👥 Equipo

| Nombre              | Rol           |
|---------------------|---------------|
| Jorge Camargo       | Scrum Master  |
| Giovanny Gutierrez  | Product Owner |
| Jorge Moreno        | Developer     |
| Samuel Gerena       | Developer     |

---

## 🌐 Links

- **Repositorio GitHub:** https://github.com/SamuelGH2424/SCRUM
- **Catálogo Vercel:** https://scrum-ex19.vercel.app/
