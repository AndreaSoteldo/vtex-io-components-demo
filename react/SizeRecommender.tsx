import React, { useEffect, useRef, useState } from 'react'
import { useCssHandles } from 'vtex.css-handles'

import { DEFAULT_SIZES, recommendSize, SizeRule } from './utils/recommendSize'

const CSS_HANDLES = [
  'sizeRecommender',
  'sizeRecommenderTrigger',
  'sizeRecommenderOverlay',
  'sizeRecommenderModal',
  'sizeRecommenderTitle',
  'sizeRecommenderField',
  'sizeRecommenderLabel',
  'sizeRecommenderInput',
  'sizeRecommenderResult',
  'sizeRecommenderClose',
] as const

interface Props {
  buttonText?: string
  title?: string
  sizes?: SizeRule[]
}

function SizeRecommender({
  buttonText = '¿Cuál es mi talle?',
  title = 'Te recomendamos un talle',
  sizes = DEFAULT_SIZES,
}: Props) {
  const { handles } = useCssHandles(CSS_HANDLES)
  const [open, setOpen] = useState(false)
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const firstFieldRef = useRef<HTMLInputElement>(null)

  const size = recommendSize(Number(height), Number(weight), sizes)

  useEffect(() => {
    if (!open) return undefined

    firstFieldRef.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }

    window.addEventListener('keydown', onKeyDown)

    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  return (
    <div className={handles.sizeRecommender}>
      <button
        type="button"
        className={handles.sizeRecommenderTrigger}
        onClick={() => setOpen(true)}
      >
        {buttonText}
      </button>

      {open && (
        <div
          className={handles.sizeRecommenderOverlay}
          onClick={() => setOpen(false)}
          role="presentation"
        >
          <div
            className={handles.sizeRecommenderModal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="size-recommender-title"
            onClick={event => event.stopPropagation()}
          >
            <h2 id="size-recommender-title" className={handles.sizeRecommenderTitle}>
              {title}
            </h2>

            <label className={handles.sizeRecommenderField}>
              <span className={handles.sizeRecommenderLabel}>Altura (cm)</span>
              <input
                ref={firstFieldRef}
                className={handles.sizeRecommenderInput}
                type="number"
                inputMode="numeric"
                min={100}
                max={230}
                value={height}
                onChange={event => setHeight(event.target.value)}
              />
            </label>

            <label className={handles.sizeRecommenderField}>
              <span className={handles.sizeRecommenderLabel}>Peso (kg)</span>
              <input
                className={handles.sizeRecommenderInput}
                type="number"
                inputMode="numeric"
                min={30}
                max={200}
                value={weight}
                onChange={event => setWeight(event.target.value)}
              />
            </label>

            <p className={handles.sizeRecommenderResult} aria-live="polite">
              {size
                ? `Tu talle recomendado es ${size}.`
                : 'Completá tu altura y tu peso para ver la recomendación.'}
            </p>

            <button
              type="button"
              className={handles.sizeRecommenderClose}
              onClick={() => setOpen(false)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

SizeRecommender.schema = {
  title: 'Recomendador de talles',
  type: 'object',
  properties: {
    buttonText: { title: 'Texto del botón', type: 'string', default: '¿Cuál es mi talle?' },
    title: { title: 'Título del modal', type: 'string', default: 'Te recomendamos un talle' },
    sizes: {
      title: 'Tabla de talles',
      type: 'array',
      items: {
        type: 'object',
        properties: {
          size: { title: 'Talle', type: 'string' },
          maxHeight: { title: 'Altura máxima (cm)', type: 'number' },
          maxWeight: { title: 'Peso máximo (kg)', type: 'number' },
        },
      },
    },
  },
}

export default SizeRecommender
