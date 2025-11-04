"use client"

import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface CodingQuestionProps {
  question: any
  answer: any
  onChange: (data: any) => void
}

export default function CodingQuestion({ question, answer, onChange }: CodingQuestionProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>اكتب الكود الخاص بك</Label>
        <Textarea
          value={answer?.codeSubmission || ""}
          onChange={(e) => onChange({ codeSubmission: e.target.value })}
          placeholder="// اكتب الكود هنا..."
          rows={15}
          className="font-mono text-sm min-h-[300px]"
        />
      </div>
      {question.testCases && question.testCases.length > 0 && (
        <div className="bg-muted rounded-lg p-4 border border-primary/20">
          <h4 className="font-semibold mb-3">حالات الاختبار:</h4>
          <div className="space-y-3">
            {question.testCases.map((testCase: any, index: number) => (
              <div key={index} className="text-sm bg-background p-3 rounded">
                <div className="font-medium mb-2">حالة {index + 1}:</div>
                <div className="mt-1 space-y-1">
                  <div>
                    المدخلات: <code className="bg-muted px-2 py-1 rounded">{testCase.input}</code>
                  </div>
                  <div>
                    المخرجات المتوقعة:{" "}
                    <code className="bg-muted px-2 py-1 rounded">{testCase.expectedOutput}</code>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
