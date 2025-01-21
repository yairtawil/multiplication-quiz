import { atom } from 'jotai'
import { ThemeKey } from '../types/ui.ts'

export const themeAtom = atom<ThemeKey>(ThemeKey.girls)
