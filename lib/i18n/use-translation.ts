"use client"

import { useLanguage } from "./language-context"
import { translations, type Translations } from "./translations"

export function useTranslation() {
  const { language } = useLanguage()
  const t = translations[language]

  return t
}


