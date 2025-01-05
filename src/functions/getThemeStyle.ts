import { BaseDirectory, readFile } from '@tauri-apps/plugin-fs'
import { ThemeProps } from '../types/theme'
export const getThemeStyle = async (
  pathFile: string,
  theme: ThemeProps
): Promise<void> => {
  //const path = await join(theme, color)
  const cssBin = await readFile(pathFile, { baseDir: BaseDirectory.Resource })
  try {
    const cssText = new TextDecoder().decode(cssBin)
    const rootMatch = cssText.match(/:root\s*{([^}]*)}/)
    if (!rootMatch) {
      console.error('No se encontró un bloque :root en el archivo CSS.')
      return
    }
    const variablesText = rootMatch[1]
    const variableRegex = /--([\w-]+)\s*:\s*([^;]+);/g
    let match
    const variables: Record<string, string> = {}

    while ((match = variableRegex.exec(variablesText)) !== null) {
      const [_, name, value] = match
      switch (name.trim()) {
        case 'radius':
          variables[`--${name.trim()}`] = `${theme.radius}`
          break
        case 'transition-duration':
          variables[`--${name.trim()}`] = `${theme.transtion}`
          break
        case 'animation-duration':
          variables[`--${name.trim()}`] = `${theme.animation}`
          break
        default:
          variables[`--${name.trim()}`] = value.trim()
          break
      }
    }
    const root = document.documentElement
    for (const [name, value] of Object.entries(variables)) {
      root.style.setProperty(name, value)
    }
  } catch (error) {
    console.error('Error al cargar el archivo CSS:', error)
  }
  //const css = new TextDecoder('utf-8').decode(cssBin)
  //console.log('css', css)
}
