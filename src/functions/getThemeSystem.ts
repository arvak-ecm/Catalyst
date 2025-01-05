export const getThemeSystem = (theme: string): string => {
  const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
  if (theme.toLocaleLowerCase() === 'system') {
    if (isDarkMode) {
      return 'dark'
    }
    return 'light'
  }
  return theme
}
