import React, { useEffect, useState } from 'react'
import { useCssHandles } from 'vtex.css-handles'

const CSS_HANDLES = [
  'countdownBanner',
  'countdownBannerLabel',
  'countdownBannerTime',
  'countdownBannerUnit',
  'countdownBannerValue',
  'countdownBannerUnitLabel',
] as const

interface Props {
  /** Fecha y hora de fin del evento, en formato ISO (por ejemplo 2026-11-09T23:59:00-03:00). */
  endDate?: string
  label?: string
  /** Si se deja vacío, el banner desaparece cuando termina el evento. */
  expiredText?: string
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

const pad = (value: number) => String(value).padStart(2, '0')

function getTimeLeft(endDate: string): TimeLeft | null {
  const diff = new Date(endDate).getTime() - Date.now()

  if (Number.isNaN(diff) || diff <= 0) return null

  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor(diff / 3600000) % 24,
    minutes: Math.floor(diff / 60000) % 60,
    seconds: Math.floor(diff / 1000) % 60,
  }
}

function CountdownBanner({ endDate = '', label = 'El evento termina en', expiredText = '' }: Props) {
  const { handles } = useCssHandles(CSS_HANDLES)
  // Arranca vacío para que el render del servidor y el del navegador coincidan.
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const tick = () => setTimeLeft(getTimeLeft(endDate))

    tick()
    setReady(true)
    const interval = window.setInterval(tick, 1000)

    return () => window.clearInterval(interval)
  }, [endDate])

  if (!ready) return null

  if (!timeLeft) {
    return expiredText ? <div className={handles.countdownBanner}>{expiredText}</div> : null
  }

  const units: Array<[string, number]> = [
    ['días', timeLeft.days],
    ['hs', timeLeft.hours],
    ['min', timeLeft.minutes],
    ['seg', timeLeft.seconds],
  ]

  return (
    <div className={handles.countdownBanner} role="timer">
      <span className={handles.countdownBannerLabel}>{label}</span>
      <span className={handles.countdownBannerTime}>
        {units.map(([unitLabel, value]) => (
          <span key={unitLabel} className={handles.countdownBannerUnit}>
            <span className={handles.countdownBannerValue}>{pad(value)}</span>
            <span className={handles.countdownBannerUnitLabel}>{unitLabel}</span>
          </span>
        ))}
      </span>
    </div>
  )
}

CountdownBanner.schema = {
  title: 'Cuenta regresiva de evento',
  type: 'object',
  properties: {
    endDate: { title: 'Fin del evento (ISO)', type: 'string', default: '' },
    label: { title: 'Texto', type: 'string', default: 'El evento termina en' },
    expiredText: { title: 'Texto cuando termina (opcional)', type: 'string', default: '' },
  },
}

export default CountdownBanner
