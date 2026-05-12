import React from 'react'
import { Link } from 'react-router-dom'
import PageContainer from '../components/layout/PageContainer'
import SectionCard from '../components/ui/SectionCard'
import GlowButton from '../components/ui/GlowButton'
import LeaderboardPlaceholder from '../components/ui/LeaderboardPlaceholder'
import CountryCardPlaceholder from '../components/ui/CountryCardPlaceholder'
import { APP_CONFIG, semi1Countries, semi2Countries, VOTING_PHASES, countries, autoFinalistsCountries } from '../data/eurovision2026'
import { finalists } from '../data/finalists'
import { useLeaderboard } from '../hooks/useLeaderboard'
import { useGrandFinalLeaderboard } from '../hooks/useGrandFinalLeaderboard'

const PHASE_CARDS = [
  {
    label: 'Semi Final 1',
    date: APP_CONFIG.dates.semi1,
    to: '/semi-final-1',
    accent: 'bg-gradient-to-br from-neon-pink/20 to-neon-purple/10',
    border: 'border-neon-pink/20',
    dot: 'bg-neon-pink',
    count: semi1Countries.length,
    description: 'Перший тур — відбір країн до Grand Final',
    status: 'Незабаром',
  },
  {
    label: 'Semi Final 2',
    date: APP_CONFIG.dates.semi2,
    to: '/semi-final-2',
    accent: 'bg-gradient-to-br from-neon-blue/20 to-neon-cyan/10',
    border: 'border-neon-blue/20',
    dot: 'bg-neon-cyan',
    count: semi2Countries.length,
    description: 'Другий тур — фінальний відбір',
    status: 'Незабаром',
  },
  {
    label: 'Grand Final',
    date: APP_CONFIG.dates.grandFinal,
    to: '/grand-final',
    accent: 'bg-gradient-to-br from-neon-violet/20 to-neon-pink/10',
    border: 'border-neon-violet/20',
    dot: 'bg-neon-violet',
    count: 25,
    description: 'Фінальне голосування — Jury + Public Vote',
    status: 'Незабаром',
  },
]

export default function Home() {
  const sf1Leaderboard = useLeaderboard(VOTING_PHASES.SEMI_1, semi1Countries)
  const sf2Leaderboard = useLeaderboard(VOTING_PHASES.SEMI_2, semi2Countries)

  // Build Grand Final country list — same logic as GrandFinal.jsx
  const autoIds = new Set(autoFinalistsCountries.map(c => c.id))
  const semiQualifiers = finalists
    .map(id => countries.find(c => c.id === id))
    .filter(Boolean)
    .filter(c => !autoIds.has(c.id))
  const grandFinalCountries = semiQualifiers.length > 0
    ? [...autoFinalistsCountries, ...semiQualifiers]
    : countries.filter(Boolean)

  // Realtime Grand Final leaderboard — same source as Grand Final page
  const { leaderboard: gfLeaderboard } = useGrandFinalLeaderboard(grandFinalCountries)

  // Shape data for LeaderboardPlaceholder (needs { id, flag, country, score, rank })
  const gfLeaderboardData = gfLeaderboard.map(c => ({
    id: c.id,
    flag: c.flag,
    country: c.country,
    artist: c.artist,
    score: c.totalPoints,
    rank: c.rank,
  }))

  return (
    <PageContainer maxWidth="7xl">

      {/* ── Hero ───────────────────────────────────────────────── */}
      <section className="relative overflow-hidden rounded-3xl mb-8 mt-2">
        {/* Background */}
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="absolute inset-0" aria-hidden>
          <div className="absolute top-0 left-1/3 w-96 h-96 bg-neon-pink/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-neon-cyan/8 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-neon-purple/6 rounded-full blur-3xl" />
        </div>
        {/* Noise texture overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`
        }} />

        <div className="relative px-6 py-14 md:px-12 md:py-20 text-center">
          {/* Flag row */}
          <div className="flex justify-center gap-1 text-2xl mb-6 flex-wrap">
            {[].map((f, i) => (
              <span key={i} className="leading-none">{f}</span>
            ))}
          </div>

          <div className="inline-flex items-center gap-2 bg-neon-pink/10 border border-neon-pink/20 rounded-full px-4 py-1.5 text-neon-pink text-xs font-mono font-medium mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-neon-pink animate-pulse-slow" />
            {APP_CONFIG.hostCity}, {APP_CONFIG.host} · {APP_CONFIG.year}
          </div>

          <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[1.05] mb-4">
            Eurovision{' '}
            <span className="gradient-text">2026</span>
          </h1>
          <p className="font-display text-xl md:text-2xl text-white/60 mb-2">
            Friends Scoreboard
          </p>
          <p className="text-white/35 text-sm md:text-base font-body max-w-md mx-auto mb-8">
            Голосуй разом з друзями в реальному часі та слідкуй за рейтингом протягом усього конкурсу
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/grand-final">
              <GlowButton variant="primary" size="lg">
                Grand Final
              </GlowButton>
            </Link>
            <Link to="/rules">
              <GlowButton variant="ghost" size="lg">
                Як грати?
              </GlowButton>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Phase Cards ────────────────────────────────────────── */}
      <section className="mb-10">
        <h2 className="font-display font-bold text-xl text-white/80 mb-4 px-1">
          Етапи конкурсу
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {PHASE_CARDS.map(({ label, date, to, accent, border, dot, count, description, status }) => (
            <Link key={to} to={to} className="block group">
              <div className={`rounded-2xl border p-5 ${accent} ${border} transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-glass-lg h-full`}>
                <div className="flex items-start justify-between mb-3">
                  <span className={`w-2 h-2 rounded-full mt-1.5 ${dot} shadow-neon-pink`} />
                  <span className="text-xs font-mono text-white/30 bg-white/5 rounded-full px-2.5 py-0.5">
                    {status}
                  </span>
                </div>
                <h3 className="font-display font-black text-lg text-white mb-1">{label}</h3>
                <p className="text-white/40 text-xs mb-3">{description}</p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/30 font-mono">{date}</span>
                  <span className="text-white/50 font-mono">{count} країн</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Main grid: Leaderboard + Quick lists ───────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">

        {/* Final Leaderboard — realtime, same source as Grand Final page */}
        <div className="lg:col-span-2">
          <LeaderboardPlaceholder
            title="Final Leaderboard"
            subtitle="Jury + Public Vote combined"
            accent="pink"
            limit={8}
            data={gfLeaderboardData}
          />
        </div>

        {/* Side panel */}
        <div className="space-y-4">
          {/* Semi 1 preview — live totals */}
          <SectionCard title="Semi Final 1" badge="Semi Final" accent="pink" subtitle={APP_CONFIG.dates.semi1}>
            <div className="space-y-1.5 mt-3">
              {(sf1Leaderboard.length > 0 ? sf1Leaderboard : semi1Countries).slice(0, 5).map(c => (
                <CountryCardPlaceholder
                  key={c.id}
                  {...c}
                  score={c.totalPoints > 0 ? c.totalPoints : undefined}
                  variant="compact"
                />
              ))}
              <Link to="/semi-final-1" className="block text-center text-xs text-neon-pink/70 hover:text-neon-pink pt-2 transition-colors font-mono">
                + {semi1Countries.length - 5} more →
              </Link>
            </div>
          </SectionCard>

          {/* Semi 2 preview — live totals */}
          <SectionCard title="Semi Final 2" badge="Semi Final" accent="cyan" subtitle={APP_CONFIG.dates.semi2}>
            <div className="space-y-1.5 mt-3">
              {(sf2Leaderboard.length > 0 ? sf2Leaderboard : semi2Countries).slice(0, 4).map(c => (
                <CountryCardPlaceholder
                  key={c.id}
                  {...c}
                  score={c.totalPoints > 0 ? c.totalPoints : undefined}
                  variant="compact"
                />
              ))}
              <Link to="/semi-final-2" className="block text-center text-xs text-neon-cyan/70 hover:text-neon-cyan pt-2 transition-colors font-mono">
                + {semi2Countries.length - 4} more →
              </Link>
            </div>
          </SectionCard>
        </div>
      </div>

      {/* ── Grand Final preview ─────────────────────────────────── */}
      <section>
        <SectionCard
          title="Grand Final"
          badge="Grand Final"
          accent="purple"
          subtitle={`${APP_CONFIG.dates.grandFinal} · ${APP_CONFIG.venue}`}
          headerRight={
            <Link to="/grand-final">
              <GlowButton variant="outline" size="sm">Відкрити</GlowButton>
            </Link>
          }
        >
          <div className="mt-4 p-5 rounded-xl bg-gradient-to-br from-neon-violet/10 to-neon-pink/5 border border-neon-violet/15 text-center">
            <p className="text-6xl mb-3">🏆</p>
            <p className="font-display font-black text-2xl text-white mb-1">12 Points Go To…</p>
            <p className="text-white/40 text-sm font-body">
              Grand Final розпочнеться після двох Semi Finals.<br />
              Будь готовий голосувати!
            </p>
          </div>
        </SectionCard>
      </section>

    </PageContainer>
  )
}
