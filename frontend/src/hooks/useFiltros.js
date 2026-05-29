// ============================================================
// useFiltros.js — El que carga las opciones del filtro
// ============================================================
// Este hook tiene una sola responsabilidad: ir al servidor y
// traer las listas de categorías y marcas para poblar los
// menús desplegables del panel de filtros.
//
// ¿Por qué es importante hacerlo así?
// Si las opciones estuvieran escritas a mano en el código,
// cada vez que se agrega una marca nueva habría que editar
// el frontend. Así, vienen del servidor y se actualizan solas.
// ============================================================

import { useState, useEffect } from 'react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

export function useFiltros() {
  // Lista de categorías para el dropdown (ej: Computadores, Componentes)
  const [categorias, setCategorias] = useState([])

  // Lista de marcas para el dropdown (ej: HP, ASUS, Dell)
  const [marcas, setMarcas] = useState([])

  // Se ejecuta una vez cuando el componente aparece en pantalla
  useEffect(() => {
    const cargarFiltros = async () => {
      try {
        // Promise.all hace las DOS peticiones AL MISMO TIEMPO
        // en lugar de una después de la otra.
        // Esto es más rápido: si cada petición tarda 200ms,
        // en paralelo tardamos 200ms en total, no 400ms.
        const [catRes, brandRes] = await Promise.all([
          fetch(`${API_URL}/categories`),
          fetch(`${API_URL}/brands`)
        ])

        const categoriasData = await catRes.json()
        const marcasData = await brandRes.json()

        setCategorias(categoriasData)
        setMarcas(marcasData)

      } catch (error) {
        // Si falla, los dropdowns quedan vacíos pero la app no se rompe
        console.error('Error cargando filtros:', error)
      }
    }

    cargarFiltros()
  }, [])

  // Devuelve las dos listas para que Filtros.jsx las use en sus dropdowns
  return { categorias, marcas }
}
