import { useState } from 'react'
import { especificacionesOrden } from '../data/productos'

export function useComparador() {
  const [slots, setSlots] = useState([null, null])

  const toggleProducto = (id) => {
    setSlots(prev => {
      const [a, b] = prev
      if (a === id) return [null, b]
      if (b === id) return [a, null]
      if (a === null) return [id, b]
      if (b === null) return [a, id]
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

  // Normaliza specs sin importar si vienen del backend o de datos locales
  const normalizar = (p) => {
    if (p.specs) return p.specs
    if (p.specifications) return {
      Procesador:       p.specifications.processor,
      RAM:              p.specifications.ram_gb ? `${p.specifications.ram_gb} GB` : null,
      Almacenamiento:   p.specifications.storage,
      'Tarjeta Gráfica': p.specifications.gpu,
      Pantalla:         p.specifications.screen_size,
      Año:              null,
    }
    return {}
  }

  const compararEspecificaciones = (productoA, productoB) => {
    const specsA = normalizar(productoA)
    const specsB = normalizar(productoB)

    return especificacionesOrden.map(spec => {
      const valA = specsA[spec]
      const valB = specsB[spec]

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
        const aGB = s => { const n = parseInt(s); return s.includes('TB') ? n * 1024 : n }
        ganador = aGB(valA) > aGB(valB) ? 'A' : aGB(valB) > aGB(valA) ? 'B' : 'empate'

      } else if (spec === 'Tarjeta Gráfica') {
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
        const hz = s => parseInt(s.match(/(\d+)Hz/)?.[1] || 60)
        ganador = hz(valA) > hz(valB) ? 'A' : hz(valB) > hz(valA) ? 'B' : 'empate'

      } else if (spec === 'Procesador') {
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