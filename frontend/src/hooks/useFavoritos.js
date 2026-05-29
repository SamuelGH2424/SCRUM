// ============================================================
// useFavoritos.js — El guardián de productos favoritos
// ============================================================
// Este hook se encarga de:
//   1. Cargar la lista de favoritos de localStorage al arrancar.
//   2. Sincronizar los favoritos con localStorage cada vez que cambien.
//   3. Proveer funciones para añadir, quitar y verificar favoritos.
// ============================================================

import { useState, useEffect } from 'react'

export function useFavoritos() {
  // Cargar estado inicial desde localStorage de manera segura
  const [favoritos, setFavoritos] = useState(() => {
    try {
      const guardados = localStorage.getItem('techcompare_favoritos')
      return guardados ? JSON.parse(guardados) : []
    } catch (error) {
      console.error('Error al leer favoritos de localStorage:', error)
      return []
    }
  })

  // Sincronizar automáticamente con localStorage cuando el estado cambie
  useEffect(() => {
    try {
      localStorage.setItem('techcompare_favoritos', JSON.stringify(favoritos))
    } catch (error) {
      console.error('Error al guardar favoritos en localStorage:', error)
    }
  }, [favoritos])

  // Agregar un producto a favoritos
  const agregarFavorito = (id) => {
    if (!favoritos.includes(id)) {
      setFavoritos(prev => [...prev, id])
    }
  }

  // Quitar un producto de favoritos
  const quitarFavorito = (id) => {
    setFavoritos(prev => prev.filter(favId => favId !== id))
  }

  // Alternar (toggle) favorito
  const toggleFavorito = (id) => {
    setFavoritos(prev => 
      prev.includes(id) 
        ? prev.filter(favId => favId !== id) 
        : [...prev, id]
    )
  }

  // Verificar si un producto ya es favorito
  const esFavorito = (id) => favoritos.includes(id)

  return {
    favoritos,
    agregarFavorito,
    quitarFavorito,
    toggleFavorito,
    esFavorito
  }
}
