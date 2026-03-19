import { useState, useEffect } from 'react'
import { productosLocales } from '../data/productos'

// URL del backend — usa variable de entorno si existe, si no localhost para desarrollo
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

// ── Hook personalizado para cargar productos ──
// Intenta cargar desde el backend; si falla, usa datos locales
export function useProductos() {
  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  const [fuenteDatos, setFuenteDatos] = useState('api') // 'api' | 'local'

  useEffect(() => {
    cargarProductos()
  }, [])

  const cargarProductos = async () => {
    try {
      setCargando(true)
      setError(null)
      const respuesta = await fetch(`${API_URL}/products`)
      if (!respuesta.ok) throw new Error('Error al cargar los productos')
      const datos = await respuesta.json()
      setProductos(datos)
      setFuenteDatos('api')
    } catch (err) {
      // Si el backend no responde, usar datos locales
      console.warn('Backend no disponible, usando datos locales:', err.message)
      setProductos(productosLocales)
      setFuenteDatos('local')
      setError(null) // No mostrar error al usuario si tenemos datos locales
    } finally {
      setCargando(false)
    }
  }

  return { productos, cargando, error, fuenteDatos, recargar: cargarProductos }
}
