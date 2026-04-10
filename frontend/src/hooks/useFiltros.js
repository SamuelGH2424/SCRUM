import { useState, useEffect } from 'react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

export function useFiltros() {
  const [categorias, setCategorias] = useState([])
  const [marcas, setMarcas] = useState([])

  useEffect(() => {
    const cargarFiltros = async () => {
      try {
        const [catRes, brandRes] = await Promise.all([
          fetch(`${API_URL}/categories`),
          fetch(`${API_URL}/brands`)
        ])

        const categoriasData = await catRes.json()
        const marcasData = await brandRes.json()

        setCategorias(categoriasData)
        setMarcas(marcasData)

      } catch (error) {
        console.error('Error cargando filtros:', error)
      }
    }

    cargarFiltros()
  }, [])

  return { categorias, marcas }
}