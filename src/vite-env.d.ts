/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APISTREAM_CONFIG: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
