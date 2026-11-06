declare module 'vtex.css-handles' {
  export function useCssHandles<T extends readonly string[]>(
    handles: T
  ): { handles: Record<T[number], string> }
}
