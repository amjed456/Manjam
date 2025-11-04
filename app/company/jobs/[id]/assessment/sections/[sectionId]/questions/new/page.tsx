"use client"

import { use } from "react"
import { useApp } from "@/lib/context/app-context"
import { redirect, notFound } from "next/navigation"
import QuestionForm from "@/components/company/question-form"
import { useEffect, useState } from "react"
import { useTranslation } from "@/lib/i18n/use-translation"

export default function NewQuestionPage({
  params,
}: {
  params: Promise<{ id: string; sectionId: string }>
}) {
  const { currentUser, sections } = useApp()
  const t = useTranslation()
  const { id, sectionId } = use(params)
  const [section, setSection] = useState<any>(null)

  useEffect(() => {
    if (!currentUser) {
      redirect("/login")
      return
    }

    const foundSection = sections.find((s) => s.id === sectionId)
    if (!foundSection) {
      notFound()
      return
    }

    setSection(foundSection)
  }, [currentUser, sections, sectionId])

  if (!currentUser) return null
  if (!section) return null

  return (
    <div className="max-w-4xl mx-auto space-y-6 section-spacing page-transition">
      <div className="animate-fade-in">
        <h1 className="text-3xl font-bold gradient-text">{t.forms.add} {t.assessments.questions}</h1>
        <p className="text-muted-foreground animate-fade-in animate-delay-100">{section.title}</p>
      </div>

      <QuestionForm sectionId={sectionId} sectionType={section.sectionType} jobId={id} />
    </div>
  )
}
