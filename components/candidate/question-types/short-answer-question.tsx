"use client"

import { Textarea } from "@/components/ui/textarea"

interface ShortAnswerQuestionProps {
  question: any
  answer: any
  onChange: (data: any) => void
}

export default function ShortAnswerQuestion({ question, answer, onChange }: ShortAnswerQuestionProps) {
  return (
    <Textarea
      value={answer?.answerText || ""}
      onChange={(e) => onChange({ answerText: e.target.value })}
      placeholder="اكتب إجابتك هنا..."
      rows={6}
      className="min-h-[150px]"
    />
  )
}
