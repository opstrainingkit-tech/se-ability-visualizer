import { useMemo, useState } from 'react'
import type { AssessmentAnswers } from '../types/assessment'
import { scaleQuestions, selectQuestions } from '../data/assessmentQuestions'

interface AssessmentPageProps {
  onComplete: (answers: AssessmentAnswers) => void
  onCancel: () => void
}

const PAGE_SIZE = 5

type RenderQuestion =
  | { kind: 'scale'; q: (typeof scaleQuestions)[number] }
  | { kind: 'select'; q: (typeof selectQuestions)[number] }

const allQuestions: RenderQuestion[] = [
  ...scaleQuestions.map(q => ({ kind: 'scale' as const, q })),
  ...selectQuestions.map(q => ({ kind: 'select' as const, q })),
]

const pages: RenderQuestion[][] = []
for (let i = 0; i < allQuestions.length; i += PAGE_SIZE) {
  pages.push(allQuestions.slice(i, i + PAGE_SIZE))
}

const NONE_VALUES = new Set(['none'])

export default function AssessmentPage({ onComplete, onCancel }: AssessmentPageProps) {
  const [answers, setAnswers] = useState<AssessmentAnswers>({ scale: {}, select: {} })
  const [pageIndex, setPageIndex] = useState(0)

  const isLast = pageIndex === pages.length - 1
  const progress = Math.round(((pageIndex + 1) / pages.length) * 100)
  const firstQNo = useMemo(() => pageIndex * PAGE_SIZE + 1, [pageIndex])
  const lastQNo = Math.min((pageIndex + 1) * PAGE_SIZE, allQuestions.length)

  const setScale = (qid: string, value: number) => {
    setAnswers(a => ({ ...a, scale: { ...a.scale, [qid]: value } }))
  }

  const toggleSelect = (qid: string, value: string, multi: boolean) => {
    setAnswers(a => {
      if (!multi) return { ...a, select: { ...a.select, [qid]: [value] } }
      const cur = a.select[qid] ?? []
      let next: string[]
      if (NONE_VALUES.has(value)) {
        next = cur.includes(value) ? [] : [value]
      } else {
        const cleaned = cur.filter(v => !NONE_VALUES.has(v))
        next = cleaned.includes(value) ? cleaned.filter(v => v !== value) : [...cleaned, value]
      }
      return { ...a, select: { ...a.select, [qid]: next } }
    })
  }

  const goNext = () => {
    if (isLast) {
      onComplete(answers)
      return
    }
    setPageIndex(i => i + 1)
    window.scrollTo({ top: 0 })
  }
  const goPrev = () => {
    if (pageIndex === 0) {
      onCancel()
      return
    }
    setPageIndex(i => i - 1)
    window.scrollTo({ top: 0 })
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: "url('/assets/backgrounds/background-sky.png')" }}
    >
      {/* ヘッダー＋進捗 */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-white/60 px-5 py-3">
        <div className="flex items-center justify-between mb-2">
          <button onClick={onCancel} className="text-slate-500 hover:text-slate-700 text-sm">
            ✕ やめる
          </button>
          <span className="text-blue-700 font-bold text-sm">能力測定診断</span>
          <span className="text-slate-500 text-xs tabular-nums">
            Q{firstQNo}–{lastQNo} / {allQuestions.length}
          </span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-1.5">
          <div className="h-1.5 rounded-full bg-blue-500 transition-all" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-5 pb-32 space-y-4">
        {pages[pageIndex].map((item, idx) => {
          const qNo = pageIndex * PAGE_SIZE + idx + 1
          return (
            <div
              key={item.q.id}
              className="bg-white/95 backdrop-blur-sm border border-white/60 rounded-2xl p-4 shadow-lg shadow-blue-900/10"
            >
              <p className="text-slate-800 text-sm font-medium mb-3 leading-snug">
                <span className="text-blue-500 font-bold mr-1">Q{qNo}.</span>
                {item.q.text}
              </p>

              {item.kind === 'scale' ? (
                <div className="space-y-2">
                  {item.q.options.map((opt, value) => {
                    const selected = answers.scale[item.q.id] === value
                    return (
                      <button
                        key={value}
                        onClick={() => setScale(item.q.id, value)}
                        className={`w-full text-left text-sm rounded-xl px-3 py-2 border transition-colors ${
                          selected
                            ? 'bg-blue-600 border-blue-600 text-white'
                            : 'bg-white border-slate-200 text-slate-700 hover:border-blue-300'
                        }`}
                      >
                        <span className={`inline-block w-5 font-bold ${selected ? 'text-white' : 'text-blue-400'}`}>
                          {value}
                        </span>
                        {opt}
                      </button>
                    )
                  })}
                </div>
              ) : (
                <>
                  {item.q.note && <p className="text-slate-400 text-xs mb-2">{item.q.note}</p>}
                  <div className="flex flex-wrap gap-2">
                    {item.q.options.map(opt => {
                      const selected = (answers.select[item.q.id] ?? []).includes(opt.value)
                      return (
                        <button
                          key={opt.value}
                          onClick={() => toggleSelect(item.q.id, opt.value, item.q.multi)}
                          className={`text-xs font-medium rounded-full px-3 py-1.5 border transition-colors ${
                            selected
                              ? 'bg-blue-600 border-blue-600 text-white shadow-sm'
                              : 'bg-white border-slate-300 text-slate-600 hover:border-blue-400'
                          }`}
                        >
                          {selected && <span className="mr-1">✓</span>}
                          {opt.label}
                        </button>
                      )
                    })}
                  </div>
                  {!item.q.multi && (
                    <p className="text-slate-400 text-[10px] mt-2">1つ選択（任意）</p>
                  )}
                </>
              )}
            </div>
          )
        })}
      </div>

      {/* フッター操作 */}
      <div className="fixed bottom-0 inset-x-0 z-20 bg-white/85 backdrop-blur-md border-t border-blue-100 px-5 py-3">
        <div className="max-w-lg mx-auto flex gap-3">
          <button
            onClick={goPrev}
            className="px-5 py-2.5 rounded-full text-sm font-semibold text-blue-700 bg-white border border-slate-300"
          >
            {pageIndex === 0 ? 'やめる' : '← 戻る'}
          </button>
          <button
            onClick={goNext}
            className="flex-1 py-2.5 rounded-full text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-sm transition-colors"
          >
            {isLast ? '▶ 診断結果を見る' : '次へ →'}
          </button>
        </div>
      </div>
    </div>
  )
}
