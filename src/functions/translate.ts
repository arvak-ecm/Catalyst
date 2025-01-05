import { useTranslation } from 'react-i18next'

function Translate(value: string) {
  const { t } = useTranslation()
  return t(value)
}

export { Translate }
