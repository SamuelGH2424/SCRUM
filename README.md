# 🖥️ TechCompare — Comparador de Productos Tecnológicos

> Plataforma web para buscar, filtrar y comparar productos tecnológicos de forma rápida, clara y segura.

---

## 📋 Descripción del Proyecto

**TechCompare** es una aplicación web que centraliza información de productos tecnológicos en una sola plataforma, permitiendo a los usuarios comparar precios, características técnicas y disponibilidad sin necesidad de navegar entre múltiples sitios.

El sistema facilita la toma de decisiones de compra al ofrecer comparaciones lado a lado, filtros por categoría, marca y precio, y visualizaciones gráficas de especificaciones.

---

## 🎯 Objetivos

### General
Desarrollar una aplicación que permita comparar productos tecnológicos mediante una base de datos estructurada, facilitando la búsqueda, filtrado y comparación para tomar decisiones de compra informadas.

### Específicos
- Diseñar y desarrollar una aplicación web para la comparación de productos tecnológicos.
- Implementar una base de datos con nombre, categoría, marca, precio, especificaciones y disponibilidad.
- Conectar la base de datos con la aplicación mediante un sistema backend.
- Implementar búsqueda y filtrado por múltiples criterios.
- Desarrollar interfaz de comparación de productos lado a lado.
- Representar comparaciones mediante gráficas o estadísticas.
- Desplegar la aplicación en una URL pública.

---

## 📦 Alcance

**Incluido:**
- Base de datos de productos tecnológicos.
- Backend para gestión de datos.
- Frontend interactivo con búsqueda, filtrado y comparación.
- Visualización de datos mediante gráficas.
- Despliegue en URL pública.

**No incluido (fuera de alcance):**
- Actualización automática en tiempo real de productos del mercado.
- Integración con tiendas reales en esta fase.

---

## ✅ Supuestos

- El profesor proporcionará una base de datos simulada con productos tecnológicos.
- Los usuarios contarán con acceso a internet.
- El equipo tiene conocimientos básicos de programación.
- Las tecnologías seleccionadas serán suficientes para el desarrollo.

---

## ⚠️ Restricciones

- Tiempo limitado por fechas de entrega del curso.
- Cantidad de marcas y productos limitada a la base de datos provista.
- Posibles limitaciones en experiencia con ciertas tecnologías.
- Dependencia de la base de datos del profesor.
- Restricciones en hosting o despliegue.

---

## 🛠️ Stack Tecnológico

| Área              | Tecnología         |
|-------------------|--------------------|
| Control de versiones | Git & GitHub    |
| Lenguaje          | Por definir        |
| Base de datos     | Por definir        |
| Frontend          | Por definir        |
| Backend           | Por definir        |
| Despliegue        | URL pública        |

---

## 📖 Historias de Usuario — Gestión PMP

Las siguientes historias corresponden a tareas de gestión del proyecto bajo el marco **PMP (Project Management Professional)**.

---

### 🗂️ HU-PMP-01 — Crear Project Charter

**Como** equipo de desarrollo,  
**quiero** elaborar un Project Charter formal,  
**para** definir el alcance, objetivos, entregables y partes interesadas del proyecto de manera oficial.

**Criterios de aceptación:**
- [ ] El Project Charter incluye nombre del proyecto, justificación, objetivos y alcance.
- [ ] Se identifican los roles del equipo y responsabilidades.
- [ ] El documento es aprobado y firmado (o validado) por el profesor/cliente.
- [ ] El charter está disponible en el repositorio en la carpeta `/docs`.

---

### ✔️ HU-PMP-02 — Definir Definition of Done (DoD)

**Como** equipo de desarrollo,  
**quiero** establecer una Definición de Done clara,  
**para** que todos los miembros del equipo sepan cuándo una tarea o historia de usuario se considera completada.

**Criterios de aceptación:**
- [ ] El DoD está documentado y accesible para todo el equipo.
- [ ] Incluye criterios de código (revisión, pruebas, sin errores).
- [ ] Incluye criterios de documentación y despliegue cuando aplica.
- [ ] El DoD está publicado en el repositorio o en el tablero del proyecto.

---

### 👥 HU-PMP-03 — Definir Registro de Stakeholders

**Como** equipo de desarrollo,  
**quiero** identificar y documentar a todos los stakeholders del proyecto,  
**para** gestionar sus expectativas y asegurar una comunicación efectiva durante el desarrollo.

**Criterios de aceptación:**
- [ ] Se identifican todos los interesados (profesor, equipo, usuarios objetivo, etc.).
- [ ] El registro incluye nombre, rol, interés, nivel de influencia y expectativas.
- [ ] El documento está disponible en la carpeta `/docs` del repositorio.
- [ ] El registro es revisado y actualizado al menos una vez durante el proyecto.

---

### 🐙 HU-PMP-04 — Configurar Repositorio GitHub

**Como** equipo de desarrollo,  
**quiero** configurar correctamente el repositorio en GitHub,  
**para** tener un entorno de colaboración organizado y con control de versiones desde el inicio del proyecto.

**Criterios de aceptación:**
- [ ] El repositorio está creado y es accesible para todos los miembros del equipo.
- [ ] El `README.md` inicial está redactado con descripción del proyecto.
- [ ] Se define una estrategia de ramas (ej. `main`, `develop`, `feature/*`).
- [ ] Se configura `.gitignore` adecuado al stack tecnológico.
- [ ] Se crea la carpeta `/docs` para documentación del proyecto.
- [ ] Se agrega al profesor/evaluador como colaborador o se comparte el enlace público.

---

## 📁 Estructura del Repositorio

```
📦 techcompare/
├── 📂 docs/               # Project Charter, DoD, Registro de Stakeholders
├── 📂 frontend/           # Código del cliente
├── 📂 backend/            # Código del servidor
├── 📂 database/           # Scripts y esquemas de base de datos
├── .gitignore
└── README.md
```

---

## 👥 Equipo

| Nombre | Rol |
|--------|-----|
| _Samuel Gerena_ | _Development_ |
| _Jorge Montes_ | _Development_ |
| _Jorge Camargo_ | _Scrub master_ |
| _Giovanni_ | _Product owner_ |

--
