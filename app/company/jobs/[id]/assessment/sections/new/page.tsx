"use client"

import { use } from "react"
import { notFound } from "next/navigation"
import SectionForm from "@/components/company/section-form"
import { useApp } from "@/lib/context/app-context"
import { useTranslation } from "@/lib/i18n/use-translation"

export default function NewSectionPage({ params }: { params: Promise<{ id: string }> }) {
  const { assessments } = useApp()
  const t = useTranslation()
  const { id } = use(params)

  const assessment = assessments.find((a) => a.jobId === id)

  if (!assessment) {
    notFound()
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 section-spacing page-transition">
      <div className="animate-fade-in">
        <h1 className="text-3xl font-bold gradient-text">{t.forms.add} {t.assessments.sections}</h1>
        <p className="text-muted-foreground animate-fade-in animate-delay-100">{t.assessments.sections}</p>
      </div>

      <SectionForm assessmentId={assessment.id} jobId={id} />
    </div>
  )
}
