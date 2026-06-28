export type TabKey = 'top' | 'status' | 'special'

interface BottomNavProps {
  active: TabKey
  onChange: (tab: TabKey) => void
  selectedCount: number
}

function HomeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9.5V21h14V9.5" />
    </svg>
  )
}

function StatusIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="4" y1="7" x2="20" y2="7" /><circle cx="9" cy="7" r="2" fill="currentColor" />
      <line x1="4" y1="12" x2="20" y2="12" /><circle cx="15" cy="12" r="2" fill="currentColor" />
      <line x1="4" y1="17" x2="20" y2="17" /><circle cx="8" cy="17" r="2" fill="currentColor" />
    </svg>
  )
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2.5l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.8 6.2 20.9l1.1-6.5L2.6 9.3l6.5-.9z" />
    </svg>
  )
}

const items: { key: TabKey; label: string; Icon: (p: { className?: string }) => React.ReactElement }[] = [
  { key: 'top', label: 'TOP', Icon: HomeIcon },
  { key: 'status', label: 'ステータス', Icon: StatusIcon },
  { key: 'special', label: '特殊能力', Icon: StarIcon },
]

export default function BottomNav({ active, onChange, selectedCount }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 inset-x-0 z-20 h-16 bg-white/85 backdrop-blur-md border-t border-blue-100 flex">
      {items.map(({ key, label, Icon }) => {
        const isActive = active === key
        return (
          <button
            key={key}
            onClick={() => onChange(key)}
            className={`relative flex-1 flex flex-col items-center justify-center gap-1 transition-colors ${
              isActive ? 'text-blue-600' : 'text-slate-400 hover:text-blue-500'
            }`}
          >
            <Icon className="w-6 h-6" />
            <span className="text-[10px] font-medium tracking-wide">{label}</span>
            {key === 'special' && selectedCount > 0 && (
              <span className="absolute top-1.5 right-1/2 translate-x-4 bg-blue-600 text-white text-[9px] font-bold rounded-full min-w-4 h-4 px-1 flex items-center justify-center">
                {selectedCount}
              </span>
            )}
          </button>
        )
      })}
    </nav>
  )
}
