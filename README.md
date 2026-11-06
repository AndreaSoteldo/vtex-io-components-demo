# VTEX IO Components Demo

Componentes genéricos para tiendas **VTEX IO**, escritos en **React + TypeScript**. Resuelven necesidades que aparecen en casi cualquier e-commerce de moda o retail, y se configuran desde el **Site Editor** sin tocar código.

> Es un repositorio de ejemplo para mostrar cómo trabajo. No contiene código ni datos de ninguna tienda o cliente.

## Componentes

| Bloque | Qué hace |
|---|---|
| `size-recommender` | Botón que abre un modal accesible: la persona carga altura y peso, y recibe un talle recomendado según una tabla configurable. |
| `countdown-banner` | Cuenta regresiva para eventos como Cyber Monday o Hot Sale. Se oculta sola (o muestra un texto) cuando termina. |
| `regret-button` | Botón de arrepentimiento, el acceso directo para revocar una compra que pide la normativa argentina. |

## Uso

1. Agregar la app a las dependencias del store theme:

```json
"dependencies": {
  "andreasoteldo.vtex-io-components-demo": "0.x"
}
```

2. Usar los bloques en el theme:

```json
{
  "size-recommender": {
    "props": {
      "buttonText": "¿Cuál es mi talle?",
      "sizes": [
        { "size": "S", "maxHeight": 168, "maxWeight": 62 },
        { "size": "M", "maxHeight": 176, "maxWeight": 74 },
        { "size": "L", "maxHeight": 184, "maxWeight": 86 }
      ]
    }
  },
  "countdown-banner": {
    "props": {
      "endDate": "2026-11-09T23:59:00-03:00",
      "label": "Cyber Monday termina en"
    }
  },
  "regret-button": {
    "props": {
      "href": "/botondearrepentimiento"
    }
  }
}
```

## Decisiones

- **Lógica separada de la UI.** El cálculo del talle vive en `react/utils/recommendSize.ts`, es una función pura y tiene tests.
- **Accesibilidad.** El modal del recomendador toma el foco al abrirse, se cierra con `Esc`, tiene `role="dialog"` y anuncia el resultado con `aria-live`.
- **Sin diferencias entre servidor y navegador.** La cuenta regresiva se calcula recién en el navegador, para que el render del servidor no choque con el del cliente.
- **Estilos desde el theme.** Todos los elementos exponen CSS handles (`vtex.css-handles`), así cada tienda los estiliza con su propia marca.

## Estructura

```
manifest.json
store/interfaces.json        → bloques que expone la app
react/
  SizeRecommender.tsx
  CountdownBanner.tsx
  RegretButton.tsx
  utils/recommendSize.ts     → lógica pura del recomendador
  __tests__/                 → tests con Jest
```

## Desarrollo

```bash
vtex link              # vincular la app a un workspace de desarrollo
cd react && yarn test  # correr los tests
```

---

Hecho por [Andrea Soteldo](https://andrea-soteldo.pages.dev) · Desarrolladora Front-End
