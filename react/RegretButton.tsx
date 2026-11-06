import React from 'react'
import { useCssHandles } from 'vtex.css-handles'

const CSS_HANDLES = ['regretButton', 'regretButtonLink'] as const

interface Props {
  /** Página o formulario donde se gestiona la revocación de la compra. */
  href?: string
  label?: string
  openInNewTab?: boolean
}

/**
 * Botón de arrepentimiento: un acceso visible y directo para revocar una compra online,
 * como pide la normativa de defensa del consumidor en Argentina.
 */
function RegretButton({
  href = '/botondearrepentimiento',
  label = 'Botón de arrepentimiento',
  openInNewTab = false,
}: Props) {
  const { handles } = useCssHandles(CSS_HANDLES)

  return (
    <div className={handles.regretButton}>
      <a
        className={handles.regretButtonLink}
        href={href}
        {...(openInNewTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {label}
      </a>
    </div>
  )
}

RegretButton.schema = {
  title: 'Botón de arrepentimiento',
  type: 'object',
  properties: {
    href: { title: 'Link', type: 'string', default: '/botondearrepentimiento' },
    label: { title: 'Texto', type: 'string', default: 'Botón de arrepentimiento' },
    openInNewTab: { title: 'Abrir en otra pestaña', type: 'boolean', default: false },
  },
}

export default RegretButton
