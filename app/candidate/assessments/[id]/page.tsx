"use client"

import { use } from "react"
import { useApp } from "@/lib/context/app-context"
import { redirect, notFound } from "next/navigation"
import AssessmentTaker from "@/components/candidate/assessment-taker"
import { useEffect, useState } from "react"
import { useTranslation } from "@/lib/i18n/use-translation"

export default function TakeAssessmentPage({ params }: { params: Promise<{ id: string }> }) {
  const { currentUser, submissions, jobs, assessments, sections, questions, answers } = useApp()
  const t = useTranslation()
  const { id } = use(params)
  const [submission, setSubmission] = useState<any>(null)
  const [existingAnswers, setExistingAnswers] = useState<any[]>([])

  useEffect(() => {
    if (!currentUser) {
      redirect("/login")
      return
    }

    const foundSubmission = submissions.find((s) => s.id === id && s.userId === currentUser.id)
    if (!foundSubmission) {
      notFound()
      return
    }

    if (foundSubmission.status === "submitted") {
      redirect("/candidate/applications")
      return
    }

    // Build full submission object with nested data
    const job = jobs.find((j) => j.id === foundSubmission.jobId)
    const assessment = assessments.find((a) => a.id === foundSubmission.assessmentId)
    const assessmentSections = sections
      .filter((s) => s.assessmentId === assessment?.id)
      .sort((a, b) => (a.orderIndex || a.order || 0) - (b.orderIndex || b.order || 0))
    
    const sectionsWithQuestions = assessmentSections.map((section) => ({
      ...section,
      questions: questions
        .filter((q) => q.sectionId === section.id)
        .sort((a, b) => (a.orderIndex || a.order || 0) - (b.orderIndex || b.order || 0)),
    }))

    const fullSubmission = {
      ...foundSubmission,
      jobs: job,
      assessments: {
        ...assessment,
        assessment_sections: sectionsWithQuestions,
        sections: sectionsWithQuestions, // Also add as sections for compatibility
      },
    }

    setSubmission(fullSubmission)

    const submissionAnswers = answers.filter((a) => a.submissionId === id)
    setExistingAnswers(submissionAnswers)
  }, [currentUser, submissions, jobs, assessments, sections, questions, answers, id])

  if (!currentUser) return null
  if (!submission) return <div>{t.common.loading}</div>

  return <AssessmentTaker submission={submission} existingAnswers={existingAnswers} />
}
