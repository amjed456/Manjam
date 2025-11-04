"use client"

import { use } from "react"
import { notFound } from "next/navigation"
import AssessmentForm from "@/components/company/assessment-form"
import { useApp } from "@/lib/context/app-context"
import { useTranslation } from "@/lib/i18n/use-translation"

export default function CreateAssessmentPage({ params }: { params: Promise<{ id: string }> }) {
  const { jobs } = useApp()
  const t = useTranslation()
  const { id } = use(params)

  const job = jobs.find((j) => j.id === id)

  if (!job) {
    notFound()
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 section-spacing page-transition">
      <div className="animate-fade-in">
        <h1 className="text-3xl font-bold gradient-text">{t.assessments.createAssessment}</h1>
        <p className="text-muted-foreground animate-fade-in animate-delay-100">{job.title}</p>
      </div>

      <AssessmentForm jobId={id} />
    </div>
  )
}
