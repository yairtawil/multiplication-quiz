import { atom } from 'jotai'
import { ThemeKey } from '../types/ui.ts'

export const themeAtom = atom<ThemeKey>(ThemeKey.light)
export const volumeAtom = atom<number>(50) // Volume from 0-100, default 50
