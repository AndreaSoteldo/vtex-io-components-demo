export interface SizeRule {
  /** Talle que se muestra, por ejemplo "M" o "42". */
  size: string
  /** Altura máxima en centímetros para este talle. */
  maxHeight: number
  /** Peso máximo en kilos para este talle. */
  maxWeight: number
}

export const DEFAULT_SIZES: SizeRule[] = [
  { size: 'S', maxHeight: 168, maxWeight: 62 },
  { size: 'M', maxHeight: 176, maxWeight: 74 },
  { size: 'L', maxHeight: 184, maxWeight: 86 },
  { size: 'XL', maxHeight: 192, maxWeight: 98 },
]

/**
 * Devuelve el talle más chico que contiene a la vez la altura y el peso.
 * Si la persona supera todas las reglas, devuelve el talle más grande.
 */
export function recommendSize(
  height: number,
  weight: number,
  sizes: SizeRule[] = DEFAULT_SIZES
): string | null {
  if (!sizes.length || !(height > 0) || !(weight > 0)) return null

  const sorted = [...sizes].sort((a, b) => a.maxHeight - b.maxHeight)
  const last = sorted.length - 1
  const byHeight = sorted.findIndex(rule => height <= rule.maxHeight)
  const byWeight = sorted.findIndex(rule => weight <= rule.maxWeight)

  const index = Math.max(
    byHeight === -1 ? last : byHeight,
    byWeight === -1 ? last : byWeight
  )

  return sorted[index].size
}
