import { EnvApiStreamProps } from '@/types/env'

const { VITE_APISTREAM_CONFIG } = import.meta.env
export const APISTREAM_CONFIG = JSON.parse(
  VITE_APISTREAM_CONFIG
) as EnvApiStreamProps
