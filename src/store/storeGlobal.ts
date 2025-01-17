import { signal } from '@preact/signals-react'

export const panelSize = signal<number>(300)
export const isOpenSideBar = signal<boolean>(true)
export const actionBar = signal<string>('')


export const TOKEN_VALUE = signal<string>('')
