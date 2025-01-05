import { z } from 'zod'

const itemSchema = z.object({
  idTree: z.string(),
  keyViewState: z.string(),
  keyDataProvider: z.string(),
  keyFocusedItem: z.string(),
  keyExpandedItems: z.string(),
  keySelectedItems: z.string()
})

export const envApiStreamSchema = z.object({
  keyFocusedItem: z.string(),
  collections: itemSchema,
  enviroment: itemSchema
})

export type ConfigTreeProps = z.infer<typeof itemSchema>
export type EnvApiStreamProps = z.infer<typeof envApiStreamSchema>
