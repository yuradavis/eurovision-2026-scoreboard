import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import PageContainer from '../components/layout/PageContainer'
import SectionCard from '../components/ui/SectionCard'
import CountryCardPlaceholder from '../components/ui/CountryCardPlaceholder'
import { semi1Countries, APP_CONFIG, VOTING_PHASES } from '../data/eurovision2026'
import { cn } from '../utils/cn'
import { useAuth } from '../context/AuthContext'
import { useVoting } from '../hooks/useVoting'
import { useLeaderboard } from '../hooks/useLeaderboard'
import LiveParticipants from '../components/ui/LiveParticipants'

const VIEWS = ['Running Order', 'Voting Cards']
const POINT_VALUES = [1, 2, 3, 4, 5, 6, 7, 8, 10, 12]
const STAGE = VOTING_PHASES.SEMI_1

export default function SemiFinal1() {
  const [activeView, setActiveView] = useState('Running Order')
  const { currentUser, isAuthenticated } = useAuth()
  const { myVotes, castVote, saving, isReady } = useVoting(STAGE)
  const leaderboard = useLeaderboard(STAGE, semi1Countries)

  const semi1Ids = new Set(semi1Countries.map(c => c.id))
  const semi1Votes = Object.fromEntries(Object.entries(myVotes).filter(([id]) => semi1Ids.has(id)))
  const totalPointsGiven = Object.values(semi1Votes).reduce((s, p) => s + p, 0)
  const countriesVoted = Object.keys(semi1Votes).length

  return (
    <PageContainer
      badge="Semi Final 1"
      title="First Semi Final"
      subtitle={`${APP_CONFIG.dates.semi1} · Голосування за країни, що пройдуть до Grand Final`}
    >

{/* Live Participants panel */}
      <LiveParticipants stage={STAGE} accent="pink" />

      {/* Status banner */}
      {isAuthenticated ? (
        <div className="flex items-center gap-3 bg-neon-pink/8 border border-neon-pink/25 rounded-xl px-4 py-3 mb-6">
          <div className="w-2 h-2 rounded-full bg-neon-pink animate-pulse" />
          <p className="text-white/70 text-sm font-body flex-1">
            <span className="text-neon-pink font-semibold">Voting Open</span>
            {' · '}Привіт, <span className="text-white/90">{currentUser.displayName?.split(' ')[0]}</span>!
            {' '}Ти проголосував за{' '}
            <span className="text-white font-semibold">{countriesVoted}</span> країн
            {countriesVoted > 0 && (
              <span className="text-white/40"> · {totalPointsGiven} балів роздано</span>
            )}
          </p>
        </div>
      ) : (
        <div className="flex items-center gap-3 bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 mb-6">
          <div className="w-2 h-2 rounded-full bg-white/20" />
          <p className="text-white/50 text-sm font-body flex-1">
            <span className="text-white/80 font-medium">Sign in to vote</span>
            {' · '}
            <Link to="/login" className="text-neon-pink hover:text-neon-pink/80 underline underline-offset-2 transition-colors">
              Увійти через Google
            </Link>{' '}щоб голосувати та бачити результати
          </p>
        </div>
      )}

      {/* View tabs */}
      <div className="flex gap-1 bg-white/[0.04] border border-white/[0.07] rounded-xl p-1 mb-6 w-fit">
        {VIEWS.map((v) => (
          <button
            key={v}
            onClick={() => setActiveView(v)}
            className={cn(
              'px-4 py-2 rounded-lg font-display font-semibold text-sm transition-all duration-200',
              activeView === v
                ? 'bg-neon-pink/20 text-neon-pink border border-neon-pink/25'
                : 'text-white/40 hover:text-white/70'
            )}
          >
            {v}
          </button>
        ))}
      </div>

      {/* Running Order view */}
      {activeView === 'Running Order' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SectionCard
            title="Running Order"
            subtitle={`${semi1Countries.length} країн · Semi Final 1`}
            accent="pink"
          >
            <div className="space-y-2 mt-4">
              {semi1Countries.map((c, i) => (
                <React.Fragment key={c.id}>
                  <CountryCardPlaceholder {...c} score={semi1Votes[c.id] ?? undefined} variant="default" />
                  {/* Auto-qualified guest performers */}
                  {c.id === 'ge' && (
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neon-violet/5 border border-neon-violet/15">
                      <span className="text-sm">🇮🇹</span>
                      <span className="text-xs font-mono text-white/30">Italy — guest performance (auto-qualified)</span>
                    </div>
                  )}
                  {c.id === 'il' && (
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neon-violet/5 border border-neon-violet/15">
                      <span className="text-sm">🇩🇪</span>
                      <span className="text-xs font-mono text-white/30">Germany — guest performance (auto-qualified)</span>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </SectionCard>

          <div className="space-y-4">
            {/* Info card */}
            <SectionCard title="Як це працює?" accent="purple">
              <div className="space-y-3 mt-3 text-sm text-white/50 font-body leading-relaxed">
                <p>🎵 Дивись Semi Final разом з друзями та голосуй за кожну країну після її виступу.</p>
                <p>⭐ Натискай на бал від 1 до 12 під кожною країною. Можна змінити будь-коли.</p>
                <p>🏆 Leaderboard оновлюється в реальному часі — переміг найкращий!</p>
                {isAuthenticated
                  ? <p className="text-neon-pink/80 font-medium">✅ Ти увійшов — голосування відкрито!</p>
                  : <p className="text-white/30"><Link to="/login" className="text-neon-pink/70 hover:text-neon-pink underline">Увійди</Link> щоб проголосувати</p>
                }
              </div>
            </SectionCard>

            {/* Leaderboard — global realtime */}
            <SectionCard
              title="Leaderboard"
              badge="Semi Final 1 · Live"
              accent="pink"
              subtitle="Сумарні бали від усіх учасників"
            >
              <div className="space-y-1 mt-4">
                {leaderboard.map((c, i) => {
                  const medalColor = i === 0
                    ? 'text-yellow-400'
                    : i === 1 ? 'text-white/50' : i === 2 ? 'text-amber-600/80' : 'text-white/20'
                  return (
                    <div
                      key={c.id}
                      className={cn(
                        'flex items-center gap-3 py-2 px-2 rounded-lg border border-transparent transition-all duration-300',
                        i < 3 && c.totalPoints > 0 && 'bg-neon-pink/[0.04] border-neon-pink/10'
                      )}
                    >
                      <span className={cn('font-mono text-xs w-5 text-center font-bold', medalColor)}>
                        {i + 1}
                      </span>
                      <span className="text-lg">{c.flag}</span>
                      <span className="font-display font-semibold text-sm text-white/70 flex-1">{c.country}</span>
                      <span className={cn(
                        'font-mono text-sm font-bold tabular-nums min-w-[2.5rem] text-right',
                        c.totalPoints > 0 ? 'text-neon-pink' : 'text-white/15'
                      )}>
                        {c.totalPoints > 0 ? c.totalPoints : '—'}
                      </span>
                    </div>
                  )
                })}
              </div>
            </SectionCard>
          </div>
        </div>
      )}

      {/* Voting Cards view */}
      {activeView === 'Voting Cards' && (
        <div>
          {/* My vote summary bar */}
          {isAuthenticated && (
            <div className="flex items-center gap-4 bg-white/[0.04] border border-white/[0.07] rounded-xl px-4 py-3 mb-5">
              <span className="text-white/40 text-sm font-body">Мій прогрес:</span>
              <div className="flex-1 flex flex-wrap gap-1.5">
                {POINT_VALUES.map(pts => {
                  const usedBy = Object.entries(semi1Votes).find(([, p]) => p === pts)
                  const countryData = usedBy ? semi1Countries.find(c => c.id === usedBy[0]) : null
                  return (
                    <div key={pts} className={cn(
                      'flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-mono border transition-all duration-200',
                      countryData
                        ? 'bg-neon-pink/15 border-neon-pink/30 text-neon-pink'
                        : 'bg-white/[0.04] border-white/[0.06] text-white/20'
                    )}>
                      <span>{pts}</span>
                      {countryData && <span className="text-white/60">{countryData.flag}</span>}
                    </div>
                  )
                })}
              </div>
              <span className="text-white/30 text-xs font-mono shrink-0">{countriesVoted}/15</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {semi1Countries.map(c => {
              const selectedPoints = myVotes[c.id]
              const isSaving = saving[c.id]

              return (
                <VotingCard
                  key={c.id}
                  country={c}
                  selectedPoints={selectedPoints}
                  isSaving={isSaving}
                  isAuthenticated={isAuthenticated}
                  isReady={isReady}
                  onVote={castVote}
                  accent="pink"
                />
              )
            })}
          </div>
        </div>
      )}

    </PageContainer>
  )
}

/** Individual voting card component */
function VotingCard({ country: c, selectedPoints, isSaving, isAuthenticated, isReady, onVote, accent }) {
  const accentColor = accent === 'pink' ? 'neon-pink' : 'neon-cyan'

  return (
    <div className={cn(
      'glass-card p-5 flex flex-col gap-4 transition-all duration-300',
      selectedPoints && `border-${accentColor}/30`,
      !selectedPoints && 'hover:border-white/20'
    )}>
      {/* Card header */}
      <div className="flex items-center gap-3">
        <span className="text-4xl">{c.flag}</span>
        <div className="flex-1 min-w-0">
          <p className="font-display font-black text-white text-base">{c.country}</p>
          <p className="text-white/40 text-xs truncate">{c.artist}</p>
          <p className="text-white/25 text-xs italic truncate">{c.song}</p>
        </div>
        {/* Selected badge */}
        {selectedPoints && (
          <div className={cn(
            'shrink-0 flex items-center justify-center w-9 h-9 rounded-xl font-mono font-black text-sm',
            accent === 'pink'
              ? 'bg-neon-pink/20 text-neon-pink border border-neon-pink/40'
              : 'bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/40'
          )}>
            {selectedPoints}
          </div>
        )}
      </div>

      {/* Point buttons */}
      <div className="bg-white/[0.03] rounded-xl p-3 border border-white/[0.06]">
        <p className="text-white/25 text-xs font-mono mb-2.5">
          {isAuthenticated ? 'Jury Points — оберіть бал' : 'Jury Points'}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {POINT_VALUES.map(pts => {
            const isSelected = selectedPoints === pts
            const canVote = isAuthenticated && isReady && !isSaving

            return (
              <button
                key={pts}
                onClick={() => canVote && onVote(c.id, pts)}
                disabled={!canVote}
                className={cn(
                  'w-8 h-8 rounded-lg text-xs font-mono font-bold transition-all duration-150',
                  isSelected && accent === 'pink' && [
                    'bg-neon-pink/25 border border-neon-pink/50 text-neon-pink',
                    'shadow-[0_0_10px_rgba(247,37,133,0.3)] scale-110',
                  ],
                  isSelected && accent === 'cyan' && [
                    'bg-neon-cyan/25 border border-neon-cyan/50 text-neon-cyan',
                    'shadow-[0_0_10px_rgba(76,201,240,0.3)] scale-110',
                  ],
                  !isSelected && canVote && accent === 'pink' && [
                    'bg-white/[0.06] border border-white/[0.10] text-white/50',
                    'hover:bg-neon-pink/15 hover:border-neon-pink/30 hover:text-neon-pink',
                  ],
                  !isSelected && canVote && accent === 'cyan' && [
                    'bg-white/[0.06] border border-white/[0.10] text-white/50',
                    'hover:bg-neon-cyan/15 hover:border-neon-cyan/30 hover:text-neon-cyan',
                  ],
                  !canVote && !isSelected && 'bg-white/[0.04] border border-white/[0.06] text-white/20 cursor-not-allowed',
                  isSaving && 'opacity-50 cursor-wait',
                )}
              >
                {pts}
              </button>
            )
          })}
        </div>
      </div>

      {/* Footer status */}
      <div className="text-center">
        {isSaving ? (
          <span className="text-white/40 text-xs font-mono">Saving…</span>
        ) : !isAuthenticated ? (
          <Link to="/login" className="text-white/25 hover:text-neon-pink text-xs font-mono transition-colors">
            Sign in to vote ↗
          </Link>
        ) : selectedPoints ? (
          <span className={cn(
            'text-xs font-mono font-semibold',
            accent === 'pink' ? 'text-neon-pink/60' : 'text-neon-cyan/60'
          )}>
            ✓ {selectedPoints} балів · натисни ще раз щоб скасувати
          </span>
        ) : (
          <span className="text-white/20 text-xs font-mono">Оберіть бал</span>
        )}
      </div>
    </div>
  )
}
