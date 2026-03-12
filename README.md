# 🖥️ TechCompare — Comparador de Productos Tecnológicos

> Plataforma web para buscar, comparar y guardar productos tecnológicos de forma rápida, clara y segura.

---

## 📋 Descripción del Proyecto

TechCompare es una aplicación web que centraliza información de productos tecnológicos en una sola plataforma, permitiendo a los usuarios comparar precios, características técnicas y disponibilidad sin necesidad de navegar entre múltiples sitios.

El sistema facilita la toma de decisiones de compra al ofrecer comparaciones lado a lado, filtros por categoría, marca y precio, y visualizaciones gráficas de especificaciones.

---

## 🎯 Objetivos

### General
Desarrollar una aplicación web que permita comparar productos tecnológicos de diferentes tiendas, proporcionando información clara sobre precios, características y valoraciones, con el fin de ayudar a los usuarios a tomar decisiones de compra informadas, rápidas y eficientes.

### Específicos
- Desarrollar una aplicación web funcional para la comparación de productos tecnológicos lado a lado.
- Integrar el aplicativo web con una base de datos que almacene la información de los productos.
- Implementar búsqueda y filtrado por múltiples criterios.
- Desarrollar interfaz de comparación de productos lado a lado.
- Desplegar la aplicación en una URL pública.

---

## 📦 Alcance

### Incluido
- Base de datos de productos tecnológicos.
- Catálogo navegable de productos.
- Barra de búsqueda de productos por nombre.
- Filtros dinámicos por categoría, marca y rango de precio.
- Módulo de comparación lado a lado para 2 o 3 productos.
- Vista detallada de producto con especificaciones técnicas.
- Módulo de reseñas y/o puntuaciones.
- Despliegue en URL pública.

### No incluido
- Pasarelas de pago o transacciones reales.
- Gestión de inventario en tiempo real.
- Integración con tiendas físicas o geolocalización.
- Actualización automática de productos del mercado en tiempo real.

---

## 🛠️ Stack Tecnológico

| Área | Tecnología | Razón |
|------|-----------|-------|
| Control de versiones | Git & GitHub | Estándar para colaboración y gestión de repositorios |
| Frontend | React (Vite) | Librería estándar de la industria, ideal para interfaces dinámicas |
| Backend / API | Node.js + Express | Ligero y eficiente |
| Despliegue | Vercel | URL pública con CI/CD integrado |
| Base de datos | Por definir | — |

---

## 📖 Historias de Usuario

| ID | Historia | Prioridad |
|----|----------|-----------|
| HU-0001 | Catálogo de productos navegable | Alta |
| HU-0002 | Búsqueda de productos | Alta |
| HU-0003 | Filtrar productos | Media |
| HU-0004 | Especificaciones de productos | Alta |
| HU-0005 | Comparador de productos | Media |
| HU-0006 | Marcado de productos favoritos | Media |
| HU-0007 | Reseñas o puntuaciones | Baja |
| HU-0008 | Aplicación desplegada en URL pública | Alta |

---

## ✅ Definition of Done

Una funcionalidad se considera **Done** cuando cumple con todos estos criterios:

1. **Desarrollo** — La aplicación compila sin errores y el código cumple los requisitos de la HU.
2. **Revisión de código** — Revisado por al menos otro desarrollador y correcciones aplicadas.
3. **Validación** — Demostrada al Product Owner y cumple los criterios de aceptación.
4. **Documentación** — Funcionalidad documentada y comentarios de código actualizados.
5. **Integración** — Código integrado en la rama principal sin conflictos.

---

## 📁 Estructura del Repositorio

```
📦 techcompare/
├── 📂 docs/               # Project Charter, DoD, Registro de Stakeholders
├── 📂 frontend/           # Código del cliente (React)
├── 📂 backend/            # Código del servidor (Node.js + Express)
├── 📂 database/           # Scripts y esquemas de base de datos
├── .gitignore
└── README.md
```

---

## 👥 Equipo

| Nombre | Rol |
|--------|-----|
| Samuel Gerena | Developer |
| Jorge Eliecer | Developer |
| Jorge Camargo | Scrum Master |
| Jovany Gutierrez | Product Owner |

---

## ⚠️ Restricciones

- Tiempo limitado por fechas de entrega del curso.
- Cantidad de productos limitada a la base de datos provista por el profesor.
- Dependencia de la base de datos del profesor.
- Posibles limitaciones en hosting o despliegue.

