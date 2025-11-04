"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Plus, X, HelpCircle, CheckCircle2 } from "lucide-react"
import { useApp } from "@/lib/context/app-context"
import { useTranslation } from "@/lib/i18n/use-translation"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface QuestionFormProps {
  sectionId: string
  sectionType: string
  jobId: string
  initialData?: any
}

export default function QuestionForm({ sectionId, sectionType, jobId, initialData }: QuestionFormProps) {
  const router = useRouter()
  const { questions, addQuestion, updateQuestion } = useApp()
  const t = useTranslation()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const [formData, setFormData] = useState({
    questionText: initialData?.questionText || "",
    points: initialData?.points || 10,
  })

  // MCQ options
  const [options, setOptions] = useState<Array<{ text: string; isCorrect: boolean }>>(
    initialData?.options || [
      { text: "", isCorrect: false },
      { text: "", isCorrect: false },
    ],
  )

  // Coding test cases (optional - for auto-grading)
  const [testCases, setTestCases] = useState<Array<{ input: string; expectedOutput: string }>>(
    initialData?.testCases || [],
  )
  const [showTestCases, setShowTestCases] = useState(initialData?.testCases?.length > 0 || false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      // Get max order_index
      const sectionQuestions = questions.filter((q) => q.sectionId === sectionId)
      const nextOrder = sectionQuestions.length > 0 ? Math.max(...sectionQuestions.map((q) => q.orderIndex)) + 1 : 0

      const questionData: any = {
        ...formData,
        sectionId,
        questionType: sectionType,
        orderIndex: initialData?.orderIndex ?? nextOrder,
      }

      // Add type-specific data
      if (sectionType === "mcq") {
        questionData.options = options
        const correctOption = options.find((o) => o.isCorrect)
        questionData.correctAnswer = correctOption?.text || null
      } else if (sectionType === "coding") {
        // Only include test cases if they were added
        if (testCases.length > 0 && testCases.some(tc => tc.input && tc.expectedOutput)) {
          questionData.testCases = testCases.filter(tc => tc.input && tc.expectedOutput)
        }
      }

      if (initialData?.id) {
        updateQuestion(initialData.id, questionData)
      } else {
        addQuestion(questionData)
      }

      router.push(`/company/jobs/${jobId}/assessment/sections/${sectionId}/questions`)
    } catch (err: any) {
      setError(err.message || "فشل حفظ السؤال")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card className="card-enhanced shadow-brand">
        <CardHeader>
          <CardTitle className="gradient-text">
            {initialData ? t.common.edit : t.forms.add} {t.assessments.questions}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {error && (
            <div className="bg-danger/10 border border-danger/20 rounded-lg p-3 flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-danger flex-shrink-0 mt-0.5" />
              <p className="text-sm text-danger">{error}</p>
            </div>
          )}

          {/* Question Text */}
          <div className="space-y-2">
            <Label htmlFor="questionText" className="text-base font-semibold">
              {t.assessments.questions} *
            </Label>
            <Textarea
              id="questionText"
              value={formData.questionText}
              onChange={(e) => setFormData({ ...formData, questionText: e.target.value })}
              placeholder={
                sectionType === "mcq"
                  ? "مثال: ما هي لغة البرمجة المستخدمة في تطوير الواجهات الأمامية؟"
                  : sectionType === "coding"
                    ? "مثال: اكتب دالة لحساب مجموع الأرقام في مصفوفة"
                    : sectionType === "short_answer"
                      ? "مثال: ما هي مزايا استخدام React؟"
                      : sectionType === "long_answer"
                        ? "مثال: اشرح بالتفصيل كيف يعمل نظام إدارة الحالة في React"
                        : "اكتب السؤال هنا..."
              }
              rows={4}
              required
              disabled={loading}
              className="min-h-[120px] text-base"
            />
          </div>

          {/* Points */}
          <div className="space-y-2">
            <Label htmlFor="points" className="text-base font-semibold">
              {t.assessments.passingScore} (النقاط)
            </Label>
            <Input
              id="points"
              type="number"
              value={formData.points}
              onChange={(e) => setFormData({ ...formData, points: Number.parseInt(e.target.value) || 10 })}
              min="1"
              max="100"
              disabled={loading}
              className="w-32"
            />
            <p className="text-sm text-muted-foreground">عدد النقاط التي يحصل عليها المتقدم عند الإجابة الصحيحة</p>
          </div>

          {/* MCQ Options */}
          {sectionType === "mcq" && (
            <div className="space-y-4 p-4 bg-primary/5 rounded-lg border border-primary/20">
              <div className="flex items-center justify-between mb-2">
                <Label className="text-base font-semibold">خيارات الإجابة (اختر من متعدد)</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setOptions([...options, { text: "", isCorrect: false }])}
                  disabled={loading}
                  className="btn-enhanced hover-lift"
                >
                  <Plus className="ml-2 h-4 w-4" />
                  {t.forms.add} خيار
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                أضف خيارات الإجابة وحدد الإجابة الصحيحة بالنقر على زر "صحيح"
              </p>
              <div className="space-y-3">
                {options.map((option, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-background rounded-lg border">
                    <div className="flex-1">
                      <Input
                        value={option.text}
                        onChange={(e) => {
                          const newOptions = [...options]
                          newOptions[index].text = e.target.value
                          setOptions(newOptions)
                        }}
                        placeholder={`الخيار ${index + 1}`}
                        disabled={loading}
                        className="text-base"
                      />
                    </div>
                    <Button
                      type="button"
                      variant={option.isCorrect ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        const newOptions = options.map((o, i) => ({
                          ...o,
                          isCorrect: i === index,
                        }))
                        setOptions(newOptions)
                      }}
                      disabled={loading}
                      className={`whitespace-nowrap ${option.isCorrect ? "bg-success text-success-foreground" : ""}`}
                    >
                      {option.isCorrect ? (
                        <>
                          <CheckCircle2 className="ml-2 h-4 w-4" />
                          صحيح
                        </>
                      ) : (
                        "تحديد كصحيح"
                      )}
                    </Button>
                    {options.length > 2 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setOptions(options.filter((_, i) => i !== index))}
                        disabled={loading}
                        className="text-danger hover:text-danger"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Coding Test Cases - Optional */}
          {sectionType === "coding" && (
            <div className="space-y-4 p-4 bg-primary/5 rounded-lg border border-primary/20">
              <div className="flex items-center gap-2 mb-2">
                <Label className="text-base font-semibold">{t.assessments.testCasesOptional}</Label>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p className="text-sm">{t.assessments.testCasesExample}</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <p className="text-sm text-muted-foreground">
                {t.assessments.testCasesDescription}
              </p>
              <p className="text-xs text-muted-foreground italic">
                {t.assessments.manualReview}
              </p>
              
              {!showTestCases && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowTestCases(true)
                    if (testCases.length === 0) {
                      setTestCases([{ input: "", expectedOutput: "" }])
                    }
                  }}
                  disabled={loading}
                  className="btn-enhanced hover-lift"
                >
                  <Plus className="ml-2 h-4 w-4" />
                  {t.assessments.addTestCase} (اختياري)
                </Button>
              )}

              {showTestCases && (
                <div className="space-y-3">
                  {testCases.map((testCase, index) => (
                    <Card key={index} className="p-4 bg-background border">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">حالة الاختبار {index + 1}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              const newCases = testCases.filter((_, i) => i !== index)
                              setTestCases(newCases)
                              if (newCases.length === 0) {
                                setShowTestCases(false)
                              }
                            }}
                            disabled={loading}
                            className="text-danger hover:text-danger"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="grid md:grid-cols-2 gap-3">
                          <div className="space-y-2">
                            <Label className="text-sm">{t.assessments.input}</Label>
                            <Input
                              value={testCase.input}
                              onChange={(e) => {
                                const newTestCases = [...testCases]
                                newTestCases[index].input = e.target.value
                                setTestCases(newTestCases)
                              }}
                              placeholder='مثال: [1, 2, 3] أو "hello"'
                              disabled={loading}
                              className="font-mono text-sm"
                            />
                            <p className="text-xs text-muted-foreground">القيمة التي سيتم تمريرها للكود</p>
                          </div>
                          <div className="space-y-2">
                            <Label className="text-sm">{t.assessments.expectedOutput}</Label>
                            <Input
                              value={testCase.expectedOutput}
                              onChange={(e) => {
                                const newTestCases = [...testCases]
                                newTestCases[index].expectedOutput = e.target.value
                                setTestCases(newTestCases)
                              }}
                              placeholder="مثال: 6 أو 'olleh'"
                              disabled={loading}
                              className="font-mono text-sm"
                            />
                            <p className="text-xs text-muted-foreground">النتيجة المتوقعة من الكود</p>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setTestCases([...testCases, { input: "", expectedOutput: "" }])}
                    disabled={loading}
                    className="btn-enhanced hover-lift"
                  >
                    <Plus className="ml-2 h-4 w-4" />
                    إضافة حالة أخرى
                  </Button>
                </div>
              )}
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <Button type="submit" disabled={loading} className="flex-1 btn-enhanced hover-lift shadow-brand">
              {loading ? t.common.loading : initialData ? t.common.edit : t.forms.add}
            </Button>
            <Button type="button" variant="outline" onClick={() => router.back()} disabled={loading} className="btn-enhanced hover-lift">
              {t.common.cancel}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}
