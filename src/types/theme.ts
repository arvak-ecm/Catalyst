import { z } from 'zod'

export const themeSchema = z.object({
  theme: z.string(),
  color: z.string(),
  radius: z.string(),
  fontSize: z.string().optional(),
  transtion: z.string(),
  animation: z.string()
})

export type ThemeProps = z.infer<typeof themeSchema>
