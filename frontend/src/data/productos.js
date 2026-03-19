// ── Base de datos local de productos ──
// Usada cuando no hay conexión con el backend
export const productosLocales = [
  {
    id: 1,
    brand_name: "HP",
    name: "HP Victus 14GK13",
    category_name: "Computadores",
    lowest_price: 5448900,
    prices_count: 4,
    image_url: null,
    specs: {
      Procesador: "AMD Ryzen 5 7535HS",
      RAM: "16 GB DDR5",
      Almacenamiento: "512 GB SSD NVMe",
      "Tarjeta Gráfica": "NVIDIA RTX 3050 4GB",
      Pantalla: "14 pulg FHD 144Hz",
      Año: 2023,
    }
  },
  {
    id: 2,
    brand_name: "ASUS",
    name: "Asus TUF Gaming 15BR45",
    category_name: "Computadores",
    lowest_price: 5558990,
    prices_count: 3,
    image_url: null,
    specs: {
      Procesador: "Intel Core i7-12700H",
      RAM: "16 GB DDR4",
      Almacenamiento: "1 TB SSD NVMe",
      "Tarjeta Gráfica": "NVIDIA RTX 3060 6GB",
      Pantalla: "15.6 pulg FHD 144Hz",
      Año: 2022,
    }
  },
  {
    id: 3,
    brand_name: "Dell",
    name: "Dell Vostro 16GR56",
    category_name: "Computadores",
    lowest_price: 4334900,
    prices_count: 4,
    image_url: null,
    specs: {
      Procesador: "Intel Core i5-1235U",
      RAM: "8 GB DDR4",
      Almacenamiento: "256 GB SSD",
      "Tarjeta Gráfica": "Intel Iris Xe",
      Pantalla: "16 pulg FHD 60Hz",
      Año: 2023,
    }
  },
  {
    id: 4,
    brand_name: "Lenovo",
    name: "Lenovo IdeaPad Gaming 3",
    category_name: "Computadores",
    lowest_price: 4890000,
    prices_count: 5,
    image_url: null,
    specs: {
      Procesador: "AMD Ryzen 5 6600H",
      RAM: "8 GB DDR5",
      Almacenamiento: "512 GB SSD NVMe",
      "Tarjeta Gráfica": "NVIDIA RTX 3050 Ti",
      Pantalla: "15.6 pulg FHD 120Hz",
      Año: 2022,
    }
  },
  {
    id: 5,
    brand_name: "Apple",
    name: "MacBook Air M2",
    category_name: "Computadores",
    lowest_price: 7999000,
    prices_count: 6,
    image_url: null,
    specs: {
      Procesador: "Apple M2 8-core",
      RAM: "8 GB Unificada",
      Almacenamiento: "256 GB SSD",
      "Tarjeta Gráfica": "GPU 8-core integrada",
      Pantalla: "13.6 pulg Liquid Retina",
      Año: 2023,
    }
  },
  {
    id: 6,
    brand_name: "Acer",
    name: "Acer Nitro 5 AN515",
    category_name: "Computadores",
    lowest_price: 4199000,
    prices_count: 3,
    image_url: null,
    specs: {
      Procesador: "Intel Core i5-12500H",
      RAM: "8 GB DDR4",
      Almacenamiento: "512 GB SSD NVMe",
      "Tarjeta Gráfica": "NVIDIA RTX 3050 4GB",
      Pantalla: "15.6 pulg FHD 144Hz",
      Año: 2022,
    }
  }
]

// ── Orden de especificaciones para comparación ──
export const especificacionesOrden = [
  'Procesador', 'RAM', 'Almacenamiento', 'Tarjeta Gráfica', 'Pantalla', 'Año'
]
