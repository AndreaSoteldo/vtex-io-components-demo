import { recommendSize, SizeRule } from '../utils/recommendSize'

const sizes: SizeRule[] = [
  { size: 'S', maxHeight: 168, maxWeight: 62 },
  { size: 'M', maxHeight: 176, maxWeight: 74 },
  { size: 'L', maxHeight: 184, maxWeight: 86 },
]

describe('recommendSize', () => {
  it('elige el talle que contiene altura y peso', () => {
    expect(recommendSize(165, 60, sizes)).toBe('S')
    expect(recommendSize(175, 70, sizes)).toBe('M')
  })

  it('usa el talle más grande que pide cualquiera de las dos medidas', () => {
    expect(recommendSize(165, 80, sizes)).toBe('L')
    expect(recommendSize(182, 60, sizes)).toBe('L')
  })

  it('devuelve el último talle si la persona supera todas las reglas', () => {
    expect(recommendSize(200, 120, sizes)).toBe('L')
  })

  it('no recomienda nada con datos inválidos', () => {
    expect(recommendSize(0, 70, sizes)).toBeNull()
    expect(recommendSize(170, NaN, sizes)).toBeNull()
    expect(recommendSize(170, 70, [])).toBeNull()
  })
})
