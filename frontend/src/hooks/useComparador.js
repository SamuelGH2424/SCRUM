import { useState } from 'react'
import { especificacionesOrden } from '../data/productos'

// ── Hook para manejar el estado y lógica del comparador ──
export function useComparador() {
  const [slots, setSlots] = useState([null, null]) // [idProductoA, idProductoB]

  // Agregar o quitar un producto del comparador
  const toggleProducto = (id) => {
    setSlots(prev => {
      const [a, b] = prev

      // Si ya está en algún slot, quitarlo
      if (a === id) return [null, b]
      if (b === id) return [a, null]

      // Llenar el primer slot vacío
      if (a === null) return [id, b]
      if (b === null) return [a, id]

      // Ambos llenos → reemplazar el slot A
      return [id, b]
    })
  }

  const limpiarSlot = (indice) => {
    setSlots(prev => {
      const nuevo = [...prev]
      nuevo[indice] = null
      return nuevo
    })
  }

  const limpiarTodo = () => setSlots([null, null])

  // ── Lógica de comparación spec por spec ──
  const compararEspecificaciones = (productoA, productoB) => {
    return especificacionesOrden.map(spec => {
      const valA = productoA.specs?.[spec]
      const valB = productoB.specs?.[spec]

      if (valA == null || valB == null) {
        return { spec, valA: valA ?? '—', valB: valB ?? '—', ganador: 'empate' }
      }

      let ganador = 'empate'

      if (spec === 'Año') {
        ganador = valA > valB ? 'A' : valB > valA ? 'B' : 'empate'

      } else if (spec === 'RAM') {
        const numA = parseInt(valA), numB = parseInt(valB)
        ganador = numA > numB ? 'A' : numB > numA ? 'B' : 'empate'

      } else if (spec === 'Almacenamiento') {
        // Convertir TB a GB para comparar
        const aGB = s => { const n = parseInt(s); return s.includes('TB') ? n * 1024 : n }
        ganador = aGB(valA) > aGB(valB) ? 'A' : aGB(valB) > aGB(valA) ? 'B' : 'empate'

      } else if (spec === 'Tarjeta Gráfica') {
        // Puntaje por nivel de GPU
        const nivel = s => {
          if (s.includes('RTX 4090')) return 90
          if (s.includes('RTX 4080')) return 80
          if (s.includes('RTX 4070')) return 70
          if (s.includes('RTX 4060')) return 60
          if (s.includes('RTX 3080')) return 58
          if (s.includes('RTX 3070')) return 55
          if (s.includes('RTX 3060')) return 50
          if (s.includes('RTX 3050 Ti')) return 42
          if (s.includes('RTX 3050')) return 40
          if (s.includes('M2')) return 38
          if (s.includes('M1')) return 32
          const gb = parseInt(s.match(/(\d+)\s*GB/)?.[1] || 0)
          return gb * 5
        }
        ganador = nivel(valA) > nivel(valB) ? 'A' : nivel(valB) > nivel(valA) ? 'B' : 'empate'

      } else if (spec === 'Pantalla') {
        // Comparar por Hz de refresco
        const hz = s => parseInt(s.match(/(\d+)Hz/)?.[1] || 60)
        ganador = hz(valA) > hz(valB) ? 'A' : hz(valB) > hz(valA) ? 'B' : 'empate'

      } else if (spec === 'Procesador') {
        // Comparar por generación del procesador (heurística)
        const generacion = s => {
          const m = s.match(/i[357]-(\d{2})\d{3}/) || s.match(/Ryzen \d (\d{4})/)
          if (!m) { if (s.includes('M2')) return 99; if (s.includes('M1')) return 95; return 0 }
          return parseInt(m[1])
        }
        ganador = generacion(valA) > generacion(valB) ? 'A' : generacion(valB) > generacion(valA) ? 'B' : 'empate'
      }

      return { spec, valA: String(valA), valB: String(valB), ganador }
    })
  }

  return { slots, toggleProducto, limpiarSlot, limpiarTodo, compararEspecificaciones }
}
