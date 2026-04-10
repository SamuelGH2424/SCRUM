import { useState, useEffect } from 'react'
import { productosLocales } from '../data/productos'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

export function useProductos() {
  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  const [fuenteDatos, setFuenteDatos] = useState('api')

  const cargarProductos = async (filtros = {}) => {
    try {
      setCargando(true)
      setError(null)

      console.log("HOOK RECIBIÓ FILTROS:", filtros)

      const params = new URLSearchParams(filtros).toString()
      const url = `${API_URL}/products${params ? `?${params}` : ''}`

      console.log("LLAMANDO A:", url)

      const respuesta = await fetch(url)

      if (!respuesta.ok) throw new Error('Error al cargar los productos')

      const datos = await respuesta.json()
      setProductos(datos)
      setFuenteDatos('api')

    } catch (err) {
      console.warn('Backend no disponible, usando datos locales:', err.message)
      setProductos(productosLocales)
      setFuenteDatos('local')
      setError(null)
    } finally {
      setCargando(false)
    }
  }

  useEffect(() => {
    cargarProductos()
  }, [])

  return { productos, cargando, error, fuenteDatos, recargar: cargarProductos }
}