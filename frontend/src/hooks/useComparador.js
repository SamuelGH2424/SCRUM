// useComparador.js
import { useState } from 'react'
import { especificacionesOrden } from '../data/productos'

export function useComparador() {
  const [slots, setSlots] = useState([null, null, null])

  const toggleProducto = (id) => {
    setSlots(prev => {
      if (prev.includes(id)) {
        return prev.map(slot => (slot === id ? null : slot))
      }

      const indiceLibre = prev.findIndex(slot => slot === null)
      if (indiceLibre !== -1) {
        const nuevo = [...prev]
        nuevo[indiceLibre] = id
        return nuevo
      }

      return [id, prev[1], prev[2]]
    })
  }

  const limpiarSlot = (indice) => {
    setSlots(prev => {
      const nuevo = [...prev]
      nuevo[indice] = null
      return nuevo
    })
  }

  const limpiarTodo = () => setSlots([null, null, null])

  const normalizar = (p) => {
    if (p.specs) return p.specs
    if (p.specifications) return {
      Procesador: p.specifications.processor,
      RAM: p.specifications.ram_gb ? `${p.specifications.ram_gb} GB` : null,
      Almacenamiento: p.specifications.storage,
      'Tarjeta Gráfica': p.specifications.gpu,
      Pantalla: p.specifications.screen_size,
      Año: p.specifications.year,
    }
    return {}
  }

  const extraerNumero = (texto = '') => {
    const match = String(texto).replace(',', '.').match(/(\d+(\.\d+)?)/)
    return match ? parseFloat(match[1]) : 0
  }

  const normalizarTexto = (texto = '') => String(texto).trim().toLowerCase()

  const puntuarProcesador = (texto = '') => {
    const s = String(texto)
    if (/ultra\s*9/i.test(s)) return 980
    if (/ultra\s*7/i.test(s)) return 940
    if (/ultra\s*5/i.test(s)) return 900
    if (/i9-/i.test(s)) return 860 + extraerNumero(s)
    if (/i7-/i.test(s)) return 760 + extraerNumero(s)
    if (/i5-/i.test(s)) return 660 + extraerNumero(s)
    if (/i3-/i.test(s)) return 560 + extraerNumero(s)
    if (/ryzen 9/i.test(s)) return 850 + extraerNumero(s)
    if (/ryzen 7/i.test(s)) return 750 + extraerNumero(s)
    if (/ryzen 5/i.test(s)) return 650 + extraerNumero(s)
    if (/m3/i.test(s)) return 930
    if (/m2/i.test(s)) return 880
    if (/m1/i.test(s)) return 820
    return extraerNumero(s)
  }

  const puntuarRam = (texto = '') => extraerNumero(texto)

  const puntuarAlmacenamiento = (texto = '') => {
    const s = normalizarTexto(texto)
    const cantidad = extraerNumero(s)
    if (s.includes('tb')) return cantidad * 1024
    return cantidad
  }

  const puntuarPantalla = (texto = '') => {
    const s = String(texto)
    const pulgadas = extraerNumero(s)
    const hzMatch = s.match(/(\d+)\s*hz/i)
    const hz = hzMatch ? parseInt(hzMatch[1]) : 60
    return hz * 10 + pulgadas
  }

  const puntuarGrafica = (texto = '') => {
    const s = String(texto)
    if (/rtx\s*4090/i.test(s)) return 990
    if (/rtx\s*4080/i.test(s)) return 940
    if (/rtx\s*4070/i.test(s)) return 900
    if (/rtx\s*4060/i.test(s)) return 850
    if (/rtx\s*4050/i.test(s)) return 810
    if (/rtx\s*3080/i.test(s)) return 790
    if (/rtx\s*3070/i.test(s)) return 760
    if (/rtx\s*3060/i.test(s)) return 720
    if (/rtx\s*3050 ti/i.test(s)) return 680
    if (/rtx\s*3050/i.test(s)) return 650
    if (/radeon\s*rx\s*7900/i.test(s)) return 930
    if (/radeon\s*rx\s*7800/i.test(s)) return 890
    if (/radeon\s*graphics/i.test(s)) return 420
    if (/iris\s*xe/i.test(s)) return 390
    if (/intel\s*uhd/i.test(s)) return 260
    if (/m3/i.test(s)) return 640
    if (/m2/i.test(s)) return 560
    if (/m1/i.test(s)) return 500

    const vram = s.match(/(\d+)\s*gb/i)
    if (vram) return 500 + parseInt(vram[1]) * 20
    return 0
  }

  const obtenerPuntaje = (spec, valor) => {
    switch (spec) {
      case 'Procesador': return puntuarProcesador(valor)
      case 'RAM': return puntuarRam(valor)
      case 'Almacenamiento': return puntuarAlmacenamiento(valor)
      case 'Tarjeta Gráfica': return puntuarGrafica(valor)
      case 'Pantalla': return puntuarPantalla(valor)
      case 'Año': return extraerNumero(valor)
      default: return extraerNumero(valor)
    }
  }

  const compararEspecificaciones = (...productos) => {
    const productosValidos = productos.filter(Boolean)

    return especificacionesOrden.map(spec => {
      const valores = productosValidos.map(producto => {
        const specs = normalizar(producto)
        const valor = specs[spec]

        if (valor == null || valor === '') {
          return { productoId: producto.id, valor: '—', puntaje: 0, estado: 'empate' }
        }

        return {
          productoId: producto.id,
          valor: String(valor),
          puntaje: obtenerPuntaje(spec, valor),
          estado: 'empate',
        }
      })

      const puntajes = valores.map(v => v.puntaje)
      const max = Math.max(...puntajes)
      const min = Math.min(...puntajes)
      const hayDiferencia = max !== min

      const valoresConEstado = valores.map(v => ({
        ...v,
        estado: !hayDiferencia
          ? 'empate'
          : v.puntaje === max
          ? 'ganador'
          : v.puntaje === min
          ? 'perdedor'
          : 'intermedio',
      }))

      const ganadores = valoresConEstado
        .filter(v => hayDiferencia && v.puntaje === max)
        .map(v => v.productoId)

      return { spec, valores: valoresConEstado, ganadores }
    })
  }

  return { slots, toggleProducto, limpiarSlot, limpiarTodo, compararEspecificaciones }
}
