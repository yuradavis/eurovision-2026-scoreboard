import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import PageContainer from '../components/layout/PageContainer'
import SectionCard from '../components/ui/SectionCard'
import GlowButton from '../components/ui/GlowButton'
import CountryCardPlaceholder from '../components/ui/CountryCardPlaceholder'
import { countries, autoFinalistsCountries, APP_CONFIG, VOTING_PHASES } from '../data/eurovision2026'
import { finalists } from '../data/finalists'
import { useGrandFinalLeaderboard } from '../hooks/useGrandFinalLeaderboard'
import { useVoting } from '../hooks/useVoting'
import { useAuth } from '../context/AuthContext'
import { cn } from '../utils/cn'

const TABS = ['Leaderboard', 'Jury Points', 'Public Vote', 'Running Order']
const POINT_VALUES = [1, 2, 3, 4, 5, 6, 7, 8, 10, 12]
const STAGE = VOTING_PHASES.GRAND_FINAL

export default function GrandFinal() {
  const [activeTab, setActiveTab] = useState('Leaderboard')
  const { currentUser, isAuthenticated } = useAuth()
  const { myVotes, castVote, saving, isReady } = useVoting(STAGE)

  // Build Grand Final country list
  const autoIds = new Set(autoFinalistsCountries.map(c => c.id))
  const semiQualifiers = finalists
    .map(id => countries.find(c => c.id === id))
    .filter(Boolean)
    .filter(c => !autoIds.has(c.id))

  const grandFinalCountries = semiQualifiers.length > 0
    ? [...autoFinalistsCountries, ...semiQualifiers]
    : countries.filter(Boolean)

  const { leaderboard, publicLoading } = useGrandFinalLeaderboard(grandFinalCountries)

  // Voting stats
  const gfIds = new Set(grandFinalCountries.map(c => c.id))
  const gfVotes = Object.fromEntries(Object.entries(myVotes).filter(([id]) => gfIds.has(id)))
  const totalPointsGiven = Object.values(gfVotes).reduce((s, p) => s + p, 0)
  const countriesVoted = Object.keys(gfVotes).length
  // Set of point values already assigned — each value can only be used once (Eurovision rules)
  const usedPoints = new Set(Object.values(gfVotes))

  return (
    <PageContainer
      badge="Grand Final"
      title="Grand Final"
      subtitle={`${APP_CONFIG.dates.grandFinal} · ${APP_CONFIG.venue} · Фінальне голосування`}
    >

      {/* Hero banner */}
      <div className="relative overflow-hidden rounded-2xl mb-6 p-6 md:p-8 text-center border border-neon-violet/20 bg-gradient-to-br from-neon-violet/10 via-neon-pink/5 to-transparent">
        <div className="absolute inset-0" aria-hidden>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-neon-pink/10 rounded-full blur-2xl" />
        </div>
        <div className="relative">
          <p className="text-5xl mb-3">🏆✨</p>
          <h2 className="font-display font-black text-3xl md:text-4xl text-white mb-2 text-glow-pink">
            12 Points Go To…
          </h2>
          <p className="text-white/40 text-sm font-body">
            {APP_CONFIG.dates.grandFinal} · {APP_CONFIG.venue}
          </p>
        </div>
      </div>

      {/* Auth / voting status banner */}
      {isAuthenticated ? (
        <div className="flex items-center gap-3 bg-neon-violet/8 border border-neon-violet/25 rounded-xl px-4 py-3 mb-6">
          <div className="w-2 h-2 rounded-full bg-neon-violet animate-pulse" />
          <p className="text-white/70 text-sm font-body flex-1">
            <span className="text-neon-violet font-semibold">Jury Voting Open</span>
            {' · '}Привіт, <span className="text-white/90">{currentUser.displayName?.split(' ')[0]}</span>!
            {' '}Проголосував за{' '}
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
            <Link to="/login" className="text-neon-violet hover:text-neon-violet/80 underline underline-offset-2 transition-colors">
              Увійти через Google
            </Link>{' '}щоб голосувати та бачити результати
          </p>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 bg-white/[0.04] border border-white/[0.07] rounded-xl p-1 mb-6 overflow-x-auto scrollbar-none">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              'px-3 py-2 rounded-lg font-display font-semibold text-sm whitespace-nowrap transition-all duration-200 shrink-0',
              activeTab === tab
                ? 'bg-neon-violet/20 text-neon-violet border border-neon-violet/25'
                : 'text-white/40 hover:text-white/70'
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ── LEADERBOARD TAB ─────────────────────────────────── */}
      {activeTab === 'Leaderboard' && (
        <SectionCard
          title="Final Leaderboard"
          subtitle="Підсумковий рейтинг Grand Final"
          badge="Grand Final"
          accent="purple"
        >
          {/* Column headers */}
          <div className="flex items-center gap-3 px-3 pt-4 pb-2 border-b border-white/[0.05]">
            <span className="w-7 shrink-0" />
            <span className="w-8 shrink-0" />
            <span className="flex-1 text-[10px] font-mono text-white/20 uppercase tracking-widest">Країна</span>
            <span className="font-mono text-[10px] text-neon-violet/60 w-10 text-right shrink-0 uppercase tracking-widest">Jury</span>
            <span className="font-mono text-[10px] text-neon-cyan/60 w-10 text-right shrink-0 uppercase tracking-widest">Public</span>
            <span className="font-mono text-[10px] text-white/40 w-14 text-right shrink-0 uppercase tracking-widest">Total</span>
          </div>

          <div className="space-y-1.5 mt-2">
            {leaderboard.map((entry) => {
              const rankColors = { 1: 'text-yellow-400', 2: 'text-slate-300', 3: 'text-amber-600' }
              const isTop3 = entry.rank <= 3 && entry.totalPoints > 0
              return (
                <div
                  key={entry.id}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-xl border transition-all duration-300',
                    isTop3
                      ? entry.rank === 1
                        ? 'bg-yellow-400/[0.05] border-yellow-400/20'
                        : 'bg-white/[0.04] border-white/[0.10]'
                      : 'bg-white/[0.02] border-transparent hover:bg-white/[0.05] hover:border-white/[0.08]',
                  )}
                >
                  <span className={cn('font-display font-black text-base w-7 text-center shrink-0', rankColors[entry.rank] || 'text-white/25')}>
                    {entry.rank}
                  </span>
                  <span className="text-2xl leading-none w-8 shrink-0">{entry.flag || '🏳️'}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-display font-bold text-sm text-white truncate leading-tight">{entry.country}</p>
                    <p className="text-white/30 text-[11px] truncate leading-tight mt-0.5">{entry.artist}</p>
                  </div>
                  <span className={cn('font-mono text-sm w-10 text-right shrink-0 tabular-nums', entry.juryPoints > 0 ? 'text-neon-violet font-bold' : 'text-white/15')}>
                    {entry.juryPoints > 0 ? entry.juryPoints : '—'}
                  </span>
                  <span className={cn('font-mono text-sm w-10 text-right shrink-0 tabular-nums', entry.publicPoints > 0 ? 'text-neon-cyan font-bold' : 'text-white/15')}>
                    {entry.publicPoints > 0 ? entry.publicPoints : '—'}
                  </span>
                  <span className={cn(
                    'font-display font-black text-lg w-14 text-right shrink-0 tabular-nums tracking-tight',
                    entry.rank === 1 && entry.totalPoints > 0
                      ? 'text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]'
                      : entry.totalPoints > 0
                        ? 'text-white'
                        : 'text-white/15'
                  )}>
                    {entry.totalPoints > 0 ? entry.totalPoints : '—'}
                  </span>
                </div>
              )
            })}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-5 mt-4 pt-3 border-t border-white/[0.05] px-3">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-neon-violet/60" />
              <span className="text-xs font-mono text-white/30">Jury = бали від учасників</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-neon-cyan/60" />
              <span className="text-xs font-mono text-white/30">Public = Semi Finals Combined</span>
            </div>
          </div>
        </SectionCard>
      )}

      {/* ── JURY POINTS TAB ───────────────────────────────────── */}
      {activeTab === 'Jury Points' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Left: ranking */}
          <SectionCard title="Jury Points" badge="Jury Points" accent="purple" subtitle="Бали від журі учасників">
            <div className="mt-4 space-y-1">
              {[...leaderboard]
                .sort((a, b) => b.juryPoints - a.juryPoints)
                .map((entry, i) => {
                  const medalColor = i === 0 ? 'text-yellow-400' : i === 1 ? 'text-slate-300' : i === 2 ? 'text-amber-600' : 'text-white/20'
                  return (
                    <div key={entry.id} className={cn(
                      'flex items-center gap-3 py-2 px-2 rounded-lg border border-transparent transition-all duration-300',
                      i < 3 && entry.juryPoints > 0 && 'bg-neon-violet/[0.05] border-neon-violet/10'
                    )}>
                      <span className={cn('font-mono text-xs w-5 text-center font-bold', medalColor)}>{i + 1}</span>
                      <span className="text-lg">{entry.flag}</span>
                      <span className="font-display font-semibold text-sm text-white/70 flex-1">{entry.country}</span>
                      <span className={cn('font-mono text-sm font-bold tabular-nums min-w-[2.5rem] text-right', entry.juryPoints > 0 ? 'text-neon-violet' : 'text-white/15')}>
                        {entry.juryPoints > 0 ? entry.juryPoints : '—'}
                      </span>
                    </div>
                  )
                })}
            </div>
          </SectionCard>

          {/* Right: my voting area */}
          <div className="space-y-3">
            {/* Progress bar */}
            {isAuthenticated && (
              <div className="flex items-center gap-3 bg-white/[0.04] border border-white/[0.07] rounded-xl px-4 py-3">
                <span className="text-white/40 text-xs font-body shrink-0">Мій прогрес:</span>
                <div className="flex-1 flex flex-wrap gap-1.5">
                  {POINT_VALUES.map(pts => {
                    const usedBy = Object.entries(gfVotes).find(([, p]) => p === pts)
                    const countryData = usedBy ? grandFinalCountries.find(c => c.id === usedBy[0]) : null
                    return (
                      <div key={pts} className={cn(
                        'flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-mono border transition-all duration-200',
                        countryData
                          ? 'bg-neon-violet/15 border-neon-violet/30 text-neon-violet'
                          : 'bg-white/[0.04] border-white/[0.06] text-white/20'
                      )}>
                        <span>{pts}</span>
                        {countryData && <span className="text-white/60">{countryData.flag}</span>}
                      </div>
                    )
                  })}
                </div>
                <span className="text-white/30 text-xs font-mono shrink-0">{countriesVoted}/{grandFinalCountries.length}</span>
              </div>
            )}

            {!isAuthenticated ? (
              <div className="p-6 rounded-xl bg-white/[0.03] border border-white/[0.05] text-center">
                <p className="text-4xl mb-3">🗳️</p>
                <p className="font-display font-bold text-white/60 mb-1">Jury Points</p>
                <p className="text-white/30 text-sm font-body mb-4">
                  Розподіли бали 1–12 між фіналістами.
                </p>
                <Link to="/login">
                  <GlowButton variant="primary" size="sm">Увійти щоб голосувати</GlowButton>
                </Link>
              </div>
            ) : (
              <div className="space-y-3 max-h-[65vh] overflow-y-auto pr-1">
                {grandFinalCountries.map(c => (
                  <VotingCard
                    key={c.id}
                    country={c}
                    selectedPoints={gfVotes[c.id]}
                    isSaving={saving[c.id]}
                    isAuthenticated={isAuthenticated}
                    isReady={isReady}
                    usedPoints={usedPoints}
                    onVote={castVote}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── PUBLIC VOTE TAB ───────────────────────────────────── */}
      {activeTab === 'Public Vote' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SectionCard title="Public Vote" badge="Public Vote" accent="cyan" subtitle="Народне голосування · авто-розрахунок з Semi Finals">
            <div className="mt-4 space-y-1">
              {publicLoading ? (
                <p className="text-white/30 text-sm font-body text-center py-6">Завантаження…</p>
              ) : (
                [...leaderboard]
                  .sort((a, b) => b.publicPoints - a.publicPoints)
                  .map((entry, i) => {
                    const medalColor = i === 0 ? 'text-yellow-400' : i === 1 ? 'text-slate-300' : i === 2 ? 'text-amber-600' : 'text-white/20'
                    return (
                      <div key={entry.id} className={cn(
                        'flex items-center gap-3 py-2 px-2 rounded-lg border border-transparent transition-all',
                        i < 3 && entry.publicPoints > 0 && 'bg-neon-cyan/[0.04] border-neon-cyan/10'
                      )}>
                        <span className={cn('font-mono text-xs w-5 text-center font-bold', medalColor)}>{i + 1}</span>
                        <span className="text-lg">{entry.flag}</span>
                        <div className="flex-1 min-w-0">
                          <p className="font-display font-semibold text-sm text-white/70 truncate">{entry.country}</p>
                          {entry.publicPoints > 0 && (
                            <div className="mt-1 h-1 bg-white/[0.06] rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-neon-cyan to-neon-blue rounded-full transition-all duration-500"
                                style={{ width: `${Math.round((entry.publicPoints / 12) * 100)}%` }}
                              />
                            </div>
                          )}
                        </div>
                        <span className={cn('font-mono text-sm font-bold tabular-nums min-w-[2.5rem] text-right', entry.publicPoints > 0 ? 'text-neon-cyan' : 'text-white/15')}>
                          {entry.publicPoints > 0 ? entry.publicPoints : '—'}
                        </span>
                      </div>
                    )
                  })
              )}
            </div>
          </SectionCard>

          <SectionCard title="Як рахується Public Vote?" badge="Public Vote" accent="cyan" subtitle="Автоматичний розрахунок">
            <div className="mt-4 space-y-3 text-sm text-white/50 font-body leading-relaxed">
              <p>📊 Public Vote розраховується <span className="text-white/70">автоматично</span> на основі ваших оцінок у Semi Finals.</p>
              <p>🔢 Країни ранжуються за сумарними балами з SF1 + SF2.</p>
              <p>🏆 Топ-10 отримують бали за шкалою Eurovision:</p>
              <div className="grid grid-cols-5 gap-1.5 mt-2">
                {[[1,'12'],[2,'10'],[3,'8'],[4,'7'],[5,'6'],[6,'5'],[7,'4'],[8,'3'],[9,'2'],[10,'1']].map(([pos, pts]) => (
                  <div key={pos} className="bg-neon-cyan/[0.07] border border-neon-cyan/15 rounded-lg p-1.5 text-center">
                    <p className="font-mono text-neon-cyan font-bold text-sm">{pts}</p>
                    <p className="font-mono text-white/30 text-[10px]">#{pos}</p>
                  </div>
                ))}
              </div>
              <p className="text-white/30 text-xs mt-3">🚫 Big 4 + Host (Франція, Німеччина, Італія, UK, Австрія) не беруть участь у Public Vote.</p>
            </div>
          </SectionCard>
        </div>
      )}

      {/* ── RUNNING ORDER TAB ─────────────────────────────────── */}
      {activeTab === 'Running Order' && (() => {
        const finalistCountriesDisplay = finalists
          .map(id => countries.find(c => c.id === id))
          .filter(Boolean)
        const qualifiedCount = finalistCountriesDisplay.length
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SectionCard title="Running Order" badge="Grand Final" accent="purple" subtitle="Порядок виступів у Grand Final">
              <p className="text-white/35 text-xs mt-2 font-body">
                Повний Running Order буде оголошено після обох Semi Finals.
              </p>
              <div className="space-y-2 mt-4">
                <p className="text-xs font-mono text-white/20 uppercase tracking-widest mb-3">Big 4 + Host (підтверджені)</p>
                {autoFinalistsCountries.map(c => (
                  <CountryCardPlaceholder key={c.id} {...c} variant="compact" />
                ))}
                {finalistCountriesDisplay.filter(c => c.semi !== null).length > 0 && (
                  <>
                    <p className="text-xs font-mono text-white/20 uppercase tracking-widest mb-3 mt-4">
                      Кваліфіковані ({finalistCountriesDisplay.filter(c => c.semi !== null).length}/20)
                    </p>
                    {finalistCountriesDisplay.filter(c => c.semi !== null).map(c => (
                      <CountryCardPlaceholder key={c.id} {...c} variant="compact" />
                    ))}
                  </>
                )}
                {qualifiedCount < 25 && (
                  <div className="mt-4 p-3 bg-white/[0.02] rounded-xl border border-dashed border-white/[0.08] text-center">
                    <p className="text-white/20 text-xs font-mono">+ {25 - qualifiedCount} країн після Semi Finals</p>
                  </div>
                )}
              </div>
            </SectionCard>

            <SectionCard title="Статистика" accent="blue" subtitle="Grand Final 2026">
              <div className="space-y-3 mt-4">
                {[
                  { label: 'Всього країн', value: '25', accent: 'text-neon-cyan' },
                  { label: 'Big 4 + Host', value: '5', accent: 'text-neon-violet' },
                  { label: 'З Semi Final 1', value: '10', accent: 'text-neon-pink' },
                  { label: 'З Semi Final 2', value: '10', accent: 'text-neon-blue' },
                  { label: 'Jury Points max', value: '12', accent: 'text-yellow-400' },
                  { label: 'Public Vote top', value: '12 pts', accent: 'text-neon-cyan' },
                ].map(({ label, value, accent }) => (
                  <div key={label} className="flex items-center justify-between py-2 border-b border-white/[0.04] last:border-0">
                    <span className="text-white/40 text-sm font-body">{label}</span>
                    <span className={`font-display font-black text-sm ${accent}`}>{value}</span>
                  </div>
                ))}
              </div>
            </SectionCard>
          </div>
        )
      })()}

    </PageContainer>
  )
}

/** ── Voting Card ─────────────────────────────────────────── */
function VotingCard({ country: c, selectedPoints, isSaving, isAuthenticated, isReady, usedPoints = new Set(), onVote }) {
  const canVote = isAuthenticated && isReady && !isSaving

  const handleVote = (pts) => {
    if (!canVote) return
    if (selectedPoints !== pts) onVote(c.id, pts)
  }

  const handleClear = () => {
    if (!canVote) return
    onVote(c.id, selectedPoints) // same value → useVoting toggles off (delete)
  }

  return (
    <div className={cn(
      'glass-card p-4 flex flex-col gap-3 transition-all duration-300',
      selectedPoints ? 'border-neon-violet/30' : 'hover:border-white/20'
    )}>
      <div className="flex items-center gap-3">
        <span className="text-3xl">{c.flag}</span>
        <div className="flex-1 min-w-0">
          <p className="font-display font-black text-white text-sm">{c.country}</p>
          <p className="text-white/40 text-xs truncate">{c.artist}</p>
          <p className="text-white/25 text-xs italic truncate">{c.song}</p>
        </div>
        {selectedPoints && (
          <div className="shrink-0 flex items-center justify-center w-9 h-9 rounded-xl font-mono font-black text-sm bg-neon-violet/20 text-neon-violet border border-neon-violet/40">
            {selectedPoints}
          </div>
        )}
      </div>

      <div className="bg-white/[0.03] rounded-xl p-3 border border-white/[0.06]">
        <p className="text-white/25 text-xs font-mono mb-2">
          {isAuthenticated ? 'Jury Points — оберіть бал' : 'Jury Points'}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {POINT_VALUES.map(pts => {
            const isSelected = selectedPoints === pts
            // Taken = already assigned to a DIFFERENT country
            const isTaken = !isSelected && usedPoints.has(pts)
            const canClick = canVote && !isTaken
            return (
              <button
                key={pts}
                onClick={() => handleVote(pts)}
                disabled={!canClick}
                title={isTaken ? 'Вже використано для іншої країни' : undefined}
                className={cn(
                  'w-8 h-8 rounded-lg text-xs font-mono font-bold transition-all duration-150',
                  isSelected
                    ? 'bg-neon-violet/25 border border-neon-violet/50 text-neon-violet shadow-[0_0_10px_rgba(139,92,246,0.3)] scale-110'
                    : isTaken
                      ? 'bg-white/[0.02] border border-white/[0.03] text-white/10 cursor-not-allowed decoration-white/10 line-through'
                      : canVote
                        ? 'bg-white/[0.06] border border-white/[0.10] text-white/50 hover:bg-neon-violet/15 hover:border-neon-violet/30 hover:text-neon-violet'
                        : 'bg-white/[0.04] border border-white/[0.06] text-white/20 cursor-not-allowed',
                  isSaving && 'opacity-50 cursor-wait',
                )}
              >
                {pts}
              </button>
            )
          })}
        </div>
      </div>

      <div className="text-center">
        {isSaving ? (
          <span className="text-white/40 text-xs font-mono">Saving…</span>
        ) : selectedPoints ? (
          <button
            onClick={handleClear}
            disabled={!canVote}
            className="text-white/25 hover:text-red-400/70 text-xs font-mono transition-colors"
          >
            ✓ {selectedPoints} балів · ✕ скасувати
          </button>
        ) : (
          <span className="text-white/20 text-xs font-mono">Оберіть бал</span>
        )}
      </div>
    </div>
  )
}
