"use client"

interface MCQQuestionProps {
  question: any
  answer: any
  onChange: (data: any) => void
}

export default function MCQQuestion({ question, answer, onChange }: MCQQuestionProps) {
  const options = question.options || []

  return (
    <div className="space-y-3">
      {options.map((option: any, index: number) => (
        <label
          key={index}
          className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all hover-lift ${
            answer?.answerText === option.text
              ? "border-primary bg-primary/5"
              : "border-border hover:border-primary/50"
          }`}
        >
          <input
            type="radio"
            name={`question-${question.id}`}
            value={option.text}
            checked={answer?.answerText === option.text}
            onChange={(e) => onChange({ answerText: e.target.value })}
            className="mt-1"
          />
          <span className="flex-1">{option.text}</span>
        </label>
      ))}
    </div>
  )
}
