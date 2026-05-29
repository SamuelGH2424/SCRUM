// ============================================================
// useProductos.js — El mensajero de productos
// ============================================================
// Un "hook" en React es un bloque de lógica reutilizable que
// cualquier componente puede usar. Este hook se encarga de ir
// a buscar los productos al servidor y devolverlos listos.
//
// Maneja tres situaciones:
//   1. Carga inicial: pide todos los productos al arrancar
//   2. Con filtros: pide productos filtrados cuando el usuario filtra
//   3. Sin servidor: si el backend falla, usa datos locales (plan B)
// ============================================================

import { useState, useEffect } from 'react'
import { productosLocales } from '../data/productos'

// La URL del servidor se toma de una variable de entorno.
// En desarrollo local apunta a localhost:3001
// En producción (Vercel) apunta a la URL real del backend
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

export function useProductos() {
  // Estado que guarda la lista de productos que llegaron del servidor
  const [productos, setProductos] = useState([])

  // true mientras estamos esperando la respuesta del servidor
  const [cargando, setCargando] = useState(true)

  // Guarda el mensaje de error si algo sale mal
  const [error, setError] = useState(null)

  // Indica de dónde vienen los datos: 'api' (servidor) o 'local' (plan B)
  const [fuenteDatos, setFuenteDatos] = useState('api')

  // ── Función principal: ir a buscar productos ──────────────
  // Acepta un objeto de filtros opcional.
  // Si no se manda nada, trae todos los productos.
  // Si se manda { category: 1, brand: 2 }, construye la URL con esos parámetros.
  const cargarProductos = async (filtros = {}) => {
    try {
      setCargando(true)
      setError(null)

      console.log("HOOK RECIBIÓ FILTROS:", filtros)

      // Convierte el objeto de filtros en parámetros de URL
      // Ejemplo: { category: 1, brand: 2 } → "category=1&brand=2"
      const params = new URLSearchParams(filtros).toString()
      const url = `${API_URL}/products${params ? `?${params}` : ''}`

      console.log("LLAMANDO A:", url)

      const respuesta = await fetch(url)

      if (!respuesta.ok) throw new Error('Error al cargar los productos')

      const datos = await respuesta.json()
      setProductos(datos)
      setFuenteDatos('api') // Confirma que los datos vienen del servidor real

    } catch (err) {
      // ── Plan B: datos locales ──
      // Si el servidor no responde (está apagado, hay error de red, etc.),
      // en lugar de mostrar una pantalla de error, usamos los productos
      // que están guardados directamente en el código (productosLocales).
      // El usuario ni se da cuenta — solo ve un banner pequeño avisando.
      console.warn('Backend no disponible, usando datos locales:', err.message)
      setProductos(productosLocales)
      setFuenteDatos('local') // Marca que estamos en modo offline
      setError(null)
    } finally {
      // Esto se ejecuta siempre, haya error o no.
      // Apaga el indicador de carga para que el usuario pueda ver los productos.
      setCargando(false)
    }
  }

  // ── Carga automática al montar el componente ──────────────
  // useEffect con [] vacío significa "ejecuta esto una sola vez
  // cuando el componente aparece en pantalla por primera vez"
  useEffect(() => {
    cargarProductos()
  }, [])

  // Devuelve todo lo que los componentes necesitan:
  // - productos: la lista para mostrar en el catálogo
  // - cargando: para mostrar un spinner mientras carga
  // - error: si algo salió mal
  // - fuenteDatos: para mostrar el banner de modo offline
  // - recargar: función para pedir productos con filtros nuevos
  return { productos, cargando, error, fuenteDatos, recargar: cargarProductos }
}
