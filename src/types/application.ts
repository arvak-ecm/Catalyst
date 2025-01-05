import { themeSchema } from '@/types/theme'
import { z } from 'zod'

const appConfigSchema = z.object({
  theme: themeSchema,
  locale: z.string().default('es'),
  os: z.string().default('')
})

export type AppConfigProps = z.infer<typeof appConfigSchema>

const appPropsSchema = z.object({
  os: z.string().default('')
})

export type AppProps = z.infer<typeof appPropsSchema>
