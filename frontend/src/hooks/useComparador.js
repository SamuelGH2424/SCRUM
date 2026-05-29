// ============================================================
// useComparador.js — El cerebro del comparador
// ============================================================
// Este es el hook más complejo del proyecto. Se encarga de:
//   1. Manejar los 3 "slots" (espacios) del comparador
//   2. Puntuar cada especificación de cada producto
//   3. Determinar quién gana cada fila de la comparación
//   4. Declarar un ganador general
//
// Un "slot" es simplemente una de las 3 posiciones disponibles
// en el comparador. Puede estar vacío (null) o tener el id
// de un producto.
// ============================================================

import { useState } from 'react'
import { especificacionesOrden } from '../data/productos'

export function useComparador() {
  // Los 3 slots del comparador: [productoA, productoB, productoC]
  // Al inicio todos están vacíos (null)
  const [slots, setSlots] = useState([null, null, null])

  // ── Agregar o quitar un producto del comparador ───────────
  // Si el producto ya está en algún slot → lo quita
  // Si hay un slot vacío → lo mete ahí
  // Si todos están llenos → reemplaza el primero (slot A)
  const toggleProducto = (id) => {
    setSlots(prev => {
      if (prev.includes(id)) {
        // El producto ya está → quítalo (pon null en su lugar)
        return prev.map(slot => (slot === id ? null : slot))
      }

      // Busca el primer slot vacío
      const indiceLibre = prev.findIndex(slot => slot === null)
      if (indiceLibre !== -1) {
        const nuevo = [...prev]
        nuevo[indiceLibre] = id
        return nuevo
      }

      // Si no hay slots libres, reemplaza el primero
      return [id, prev[1], prev[2]]
    })
  }

  // Limpia un slot específico por su índice (0, 1 o 2)
  const limpiarSlot = (indice) => {
    setSlots(prev => {
      const nuevo = [...prev]
      nuevo[indice] = null
      return nuevo
    })
  }

  // Limpia todos los slots de una vez
  const limpiarTodo = () => setSlots([null, null, null])

  // ── Normalizar especificaciones ───────────────────────────
  // Los productos del backend tienen sus specs en "specifications"
  // pero los productos locales las tienen en "specs".
  // Esta función unifica el formato para que el comparador
  // funcione con ambas fuentes de datos.
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

  // ── Utilidades de extracción ──────────────────────────────

  // Saca el primer número que encuentre en un texto
  // Ejemplo: "16 GB DDR5" → 16 | "512 GB SSD" → 512
  const extraerNumero = (texto = '') => {
    const match = String(texto).replace(',', '.').match(/(\d+(\.\d+)?)/)
    return match ? parseFloat(match[1]) : 0
  }

  // Convierte texto a minúsculas sin espacios extras para comparar
  const normalizarTexto = (texto = '') => String(texto).trim().toLowerCase()

  // ── Funciones de puntuación ───────────────────────────────
  // Cada especificación tiene su propia función de puntuación.
  // El que tenga el puntaje MÁS ALTO gana esa fila.
  // (Excepción: precio, donde ganaría el más bajo — pero precio
  //  no está implementado en esta versión)

  // Procesador: reconoce la familia con expresiones regulares
  // y le da una puntuación base + el número del modelo
  // Ejemplo: i9-13900H → 860 + 13900 = 14760 puntos
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
    if (/m3/i.test(s)) return 930  // Apple M3
    if (/m2/i.test(s)) return 880  // Apple M2
    if (/m1/i.test(s)) return 820  // Apple M1
    return extraerNumero(s) // Fallback: usa cualquier número que encuentre
  }

  // RAM: simplemente extrae el número de GB
  // Ejemplo: "16 GB DDR5" → 16
  const puntuarRam = (texto = '') => extraerNumero(texto)

  // Almacenamiento: convierte todo a GB para poder comparar
  // "512 GB" vs "1 TB" → 512 vs 1024 → 1 TB gana
  const puntuarAlmacenamiento = (texto = '') => {
    const s = normalizarTexto(texto)
    const cantidad = extraerNumero(s)
    if (s.includes('tb')) return cantidad * 1024 // 1 TB = 1024 GB
    return cantidad
  }

  // Pantalla: combina pulgadas y Hz de refresco
  // Un monitor más rápido (144Hz) puntúa mejor que uno más grande pero lento
  const puntuarPantalla = (texto = '') => {
    const s = String(texto)
    const pulgadas = extraerNumero(s)
    const hzMatch = s.match(/(\d+)\s*hz/i)
    const hz = hzMatch ? parseInt(hzMatch[1]) : 60 // Si no dice Hz, asume 60
    return hz * 10 + pulgadas
  }

  // Tarjeta gráfica: ranking hardcodeado basado en benchmarks conocidos
  // RTX 4090 es la más potente (990 pts), Intel UHD es la más básica (260 pts)
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
    if (/iris\s*xe/i.test(s)) return 390    // GPU integrada Intel — gráficos básicos
    if (/intel\s*uhd/i.test(s)) return 260  // GPU integrada básica
    if (/m3/i.test(s)) return 640
    if (/m2/i.test(s)) return 560
    if (/m1/i.test(s)) return 500

    // Si tiene VRAM mencionada pero no reconocemos el modelo,
    // damos puntos proporcionales a los GB de VRAM
    const vram = s.match(/(\d+)\s*gb/i)
    if (vram) return 500 + parseInt(vram[1]) * 20
    return 0
  }

  // Decide qué función de puntuación usar según el nombre de la spec
  const obtenerPuntaje = (spec, valor) => {
    switch (spec) {
      case 'Procesador':    return puntuarProcesador(valor)
      case 'RAM':           return puntuarRam(valor)
      case 'Almacenamiento':return puntuarAlmacenamiento(valor)
      case 'Tarjeta Gráfica':return puntuarGrafica(valor)
      case 'Pantalla':      return puntuarPantalla(valor)
      case 'Año':           return extraerNumero(valor)
      default:              return extraerNumero(valor)
    }
  }

  // ── Comparación principal ─────────────────────────────────
  // Recibe 2 o 3 productos y devuelve un array de filas.
  // Cada fila tiene:
  //   - spec: nombre de la especificación (ej: "Procesador")
  //   - valores: array con el valor y estado de cada producto
  //   - ganadores: ids de los productos que ganaron esa fila
  const compararEspecificaciones = (...productos) => {
    const productosValidos = productos.filter(Boolean)

    return especificacionesOrden.map(spec => {
      // Para esta spec, calcula el puntaje de cada producto
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
          estado: 'empate', // Estado provisional, se actualiza abajo
        }
      })

      // Busca el puntaje más alto y más bajo entre todos los productos
      const puntajes = valores.map(v => v.puntaje)
      const max = Math.max(...puntajes)
      const min = Math.min(...puntajes)
      const hayDiferencia = max !== min // Si todos tienen el mismo puntaje → empate

      // Asigna el estado final a cada valor:
      //   ganador     → el de mayor puntaje (se pinta verde)
      //   perdedor    → el de menor puntaje (se pinta rojo)
      //   intermedio  → el del medio cuando hay 3 productos (se pinta azul)
      //   empate      → todos tienen el mismo puntaje (sin color especial)
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
