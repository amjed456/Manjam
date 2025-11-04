"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { CheckCircle, XCircle, List, AlertCircle } from "lucide-react"
import { useApp } from "@/lib/context/app-context"

interface SubmissionReviewProps {
  submission: any
}

export default function SubmissionReview({ submission }: SubmissionReviewProps) {
  const router = useRouter()
  const { updateAnswer, updateSubmission, answers: allAnswers } = useApp()
  const [decision, setDecision] = useState(submission.decision || "")
  const [companyNotes, setCompanyNotes] = useState(submission.companyNotes || "")
  const [manualScores, setManualScores] = useState<Record<string, number>>({})
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")

  const sections = submission.assessments?.assessment_sections || []
  const answers = submission.answers || []

  // Group answers by question
  const answersByQuestion = answers.reduce((acc: any, answer: any) => {
    acc[answer.questionId] = answer
    return acc
  }, {})

  const handleManualScore = async (answerId: string, questionId: string, score: number, maxScore: number) => {
    try {
      updateAnswer(answerId, {
        score,
        maxScore,
        isManuallScored: true,
      })

      setManualScores((prev) => ({ ...prev, [questionId]: score }))

      // Recalculate total score
      await recalculateScore()
    } catch (err) {
      console.error("[v0] Failed to save score:", err)
    }
  }

  const recalculateScore = async () => {
    try {
      // Get all answers with scores for this submission
      const submissionAnswers = allAnswers.filter((a) => a.submissionId === submission.id)

      const totalScore = submissionAnswers.reduce((sum, a) => sum + (a.score || 0), 0)
      const maxScore = submissionAnswers.reduce((sum, a) => sum + (a.maxScore || 0), 0)

      updateSubmission(submission.id, { totalScore, maxScore })
    } catch (err) {
      console.error("Failed to recalculate score:", err)
    }
  }

  const handleAutoScore = async (answerId: string, questionId: string, question: any, answer: any) => {
    try {
      let score = 0
      let isCorrect = false

      if (question.questionType === "mcq") {
        isCorrect = answer.answerText === question.correctAnswer
        score = isCorrect ? question.points : 0
      } else if (question.questionType === "coding") {
        // Simple check - in production, run actual test cases
        isCorrect = answer.codeSubmission?.trim().length > 0
        score = isCorrect ? question.points : 0
      }

      updateAnswer(answerId, {
        score,
        maxScore: question.points,
        isCorrect,
      })

      await recalculateScore()
    } catch (err) {
      console.error("Failed to auto-score:", err)
    }
  }

  const handleDecision = async () => {
    if (!decision) {
      setError("يرجى اختيار قرار")
      return
    }

    setSaving(true)
    setError("")

    try {
      updateSubmission(submission.id, {
        decision,
        companyNotes,
        status: "reviewed",
      })

      router.push("/company/submissions")
    } catch (err: any) {
      setError(err.message || "فشل حفظ القرار")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Answers Review */}
      {sections.map((section: any, sectionIndex: number) => (
        <Card key={section.id}>
          <CardHeader>
            <CardTitle>{section.title}</CardTitle>
            <p className="text-sm text-muted-foreground">{section.description}</p>
          </CardHeader>
          <CardContent className="space-y-6">
            {section.questions?.map((question: any, qIndex: number) => {
              const answer = answersByQuestion[question.id]

              return (
                <div key={question.id} className="border-b pb-6 last:border-0">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <Badge variant="outline" className="mb-2">
                        سؤال {qIndex + 1}
                      </Badge>
                      <h4 className="font-semibold mb-2">{question.questionText}</h4>
                    </div>
                    <Badge>{question.points} نقطة</Badge>
                  </div>

                  {/* Answer Display */}
                  {answer ? (
                    <div className="space-y-3">
                      {question.questionType === "mcq" && (
                        <div className="bg-muted rounded-lg p-4">
                          <p className="text-sm text-muted-foreground mb-2">الإجابة:</p>
                          <p className="font-medium">{answer.answerText}</p>
                          {question.correctAnswer && (
                            <p className="text-sm text-muted-foreground mt-2">
                              الإجابة الصحيحة: {question.correctAnswer}
                            </p>
                          )}
                        </div>
                      )}

                      {question.questionType === "coding" && (
                        <div className="bg-muted rounded-lg p-4 border border-primary/20">
                          <p className="text-sm text-muted-foreground mb-2">الكود:</p>
                          <pre className="text-sm font-mono bg-background p-3 rounded overflow-x-auto border">
                            {answer.codeSubmission || "لا يوجد كود"}
                          </pre>
                        </div>
                      )}

                      {question.questionType === "short_answer" && (
                        <div className="bg-muted rounded-lg p-4">
                          <p className="text-sm text-muted-foreground mb-2">الإجابة:</p>
                          <p className="whitespace-pre-wrap">{answer.answerText}</p>
                        </div>
                      )}

                      {question.questionType === "long_answer" && (
                        <div className="bg-muted rounded-lg p-4">
                          <p className="text-sm text-muted-foreground mb-2">الإجابة:</p>
                          <p className="whitespace-pre-wrap text-sm">{answer.answerText}</p>
                        </div>
                      )}

                      {question.questionType === "video" && answer.videoUrl && (
                        <div>
                          <p className="text-sm text-muted-foreground mb-2">الفيديو:</p>
                          <video src={answer.videoUrl} controls className="w-full max-w-2xl rounded-lg" />
                        </div>
                      )}

                      {question.questionType === "file_upload" && answer.fileUrl && (
                        <div className="bg-muted rounded-lg p-4">
                          <p className="text-sm text-muted-foreground mb-2">الملف المرفوع:</p>
                          <a
                            href={answer.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-primary hover:underline"
                          >
                            تحميل الملف
                          </a>
                        </div>
                      )}

                      {/* Scoring */}
                      <div className="flex items-center gap-4 pt-3 border-t">
                        {(question.questionType === "mcq" || question.questionType === "coding") && (
                          <div className="flex items-center gap-2">
                            {!answer.score && (
                              <Button 
                                size="sm" 
                                onClick={() => handleAutoScore(answer.id, question.id, question, answer)}
                                className="btn-enhanced hover-lift"
                              >
                                تصحيح تلقائي
                              </Button>
                            )}
                            <div className="flex items-center gap-2">
                              <Label className="text-sm">الدرجة:</Label>
                              <Input
                                type="number"
                                min="0"
                                max={question.points}
                                value={answer.score ?? 0}
                                onChange={(e) => {
                                  const score = Number.parseInt(e.target.value) || 0
                                  handleManualScore(answer.id, question.id, score, question.points)
                                }}
                                className="w-20"
                              />
                              <span className="text-sm text-muted-foreground">/ {question.points}</span>
                            </div>
                          </div>
                        )}

                        {(question.questionType === "short_answer" ||
                          question.questionType === "long_answer" ||
                          question.questionType === "video" ||
                          question.questionType === "file_upload" ||
                          question.questionType === "excel") && (
                          <div className="flex items-center gap-2">
                            <Label className="text-sm">الدرجة:</Label>
                            <Input
                              type="number"
                              min="0"
                              max={question.points}
                              value={answer.score ?? 0}
                              onChange={(e) => {
                                const score = Number.parseInt(e.target.value) || 0
                                handleManualScore(answer.id, question.id, score, question.points)
                              }}
                              className="w-20"
                            />
                            <span className="text-sm text-muted-foreground">/ {question.points}</span>
                          </div>
                        )}

                        {answer.score !== null && answer.score !== undefined && (
                          <Badge
                            variant={answer.isCorrect ? "default" : "secondary"}
                            className={answer.isCorrect ? "bg-success text-success-foreground" : ""}
                          >
                            {answer.score} / {answer.maxScore || question.points}
                          </Badge>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="bg-muted/50 rounded-lg p-4 text-center text-muted-foreground">
                      لم يتم الإجابة على هذا السؤال
                    </div>
                  )}
                </div>
              )
            })}
          </CardContent>
        </Card>
      ))}

      {/* Decision */}
      <Card>
        <CardHeader>
          <CardTitle>القرار النهائي</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <div className="bg-danger/10 border border-danger/20 rounded-lg p-3 flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-danger flex-shrink-0 mt-0.5" />
              <p className="text-sm text-danger">{error}</p>
            </div>
          )}

          <div className="grid md:grid-cols-3 gap-3">
            <button
              onClick={() => setDecision("accepted")}
              className={`p-4 rounded-lg border-2 transition-all ${
                decision === "accepted" ? "border-success bg-success/10" : "border-border hover:border-success/50"
              }`}
            >
              <CheckCircle
                className={`h-6 w-6 mx-auto mb-2 ${decision === "accepted" ? "text-success" : "text-muted-foreground"}`}
              />
              <p className="font-medium">قبول</p>
            </button>

            <button
              onClick={() => setDecision("shortlisted")}
              className={`p-4 rounded-lg border-2 transition-all ${
                decision === "shortlisted" ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"
              }`}
            >
              <List
                className={`h-6 w-6 mx-auto mb-2 ${
                  decision === "shortlisted" ? "text-primary" : "text-muted-foreground"
                }`}
              />
              <p className="font-medium">قائمة مختصرة</p>
            </button>

            <button
              onClick={() => setDecision("rejected")}
              className={`p-4 rounded-lg border-2 transition-all ${
                decision === "rejected" ? "border-danger bg-danger/10" : "border-border hover:border-danger/50"
              }`}
            >
              <XCircle
                className={`h-6 w-6 mx-auto mb-2 ${decision === "rejected" ? "text-danger" : "text-muted-foreground"}`}
              />
              <p className="font-medium">رفض</p>
            </button>
          </div>

          <div className="space-y-2">
            <Label>ملاحظات (اختياري)</Label>
            <Textarea
              value={companyNotes}
              onChange={(e) => setCompanyNotes(e.target.value)}
              placeholder="أضف ملاحظات حول المتقدم..."
              rows={4}
            />
          </div>

          <Button onClick={handleDecision} disabled={saving} className="w-full" size="lg">
            {saving ? "جاري الحفظ..." : "حفظ القرار"}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
