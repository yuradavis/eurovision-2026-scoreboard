import React from 'react'
import CountryCardPlaceholder from './CountryCardPlaceholder'
import SectionCard from './SectionCard'
import { cn } from '../../utils/cn'

// Updated mock data for Eurovision 2026 — Vienna, Austria
const MOCK_LEADERBOARD = [
  { id: 'ua', country: 'Ukraine',        artist: 'Leléka',              song: 'Ridnym',             flag: '🇺🇦', score: 0, rank: 1 },
  { id: 'se', country: 'Sweden',         artist: 'Felicia',             song: 'My System',          flag: '🇸🇪', score: 0, rank: 2 },
  { id: 'no', country: 'Norway',         artist: 'Jonas Lovv',          song: 'Ya Ya Ya',           flag: '🇳🇴', score: 0, rank: 3 },
  { id: 'fr', country: 'France',         artist: 'TBA',                 song: 'TBA',                flag: '🇫🇷', score: 0, rank: 4 },
  { id: 'it', country: 'Italy',          artist: 'TBA',                 song: 'TBA',                flag: '🇮🇹', score: 0, rank: 5 },
  { id: 'gb', country: 'United Kingdom', artist: 'TBA',                 song: 'TBA',                flag: '🇬🇧', score: 0, rank: 6 },
  { id: 'at', country: 'Austria',        artist: 'TBA',                 song: 'TBA',                flag: '🇦🇹', score: 0, rank: 7 },
  { id: 'de', country: 'Germany',        artist: 'TBA',                 song: 'TBA',                flag: '🇩🇪', score: 0, rank: 8 },
]

/**
 * LeaderboardPlaceholder — shows a ranked list of countries.
 */
export default function LeaderboardPlaceholder({
  title = 'Leaderboard',
  subtitle,
  data = MOCK_LEADERBOARD,
  loading,
  limit,
  className,
  accent = 'pink',
}) {
  const displayed = limit ? data.slice(0, limit) : data

  return (
    <SectionCard
      title={title}
      subtitle={subtitle}
      badge="Leaderboard"
      accent={accent}
      className={className}
    >
      <div className="space-y-2 mt-4">
        {loading
          ? Array.from({ length: limit || 5 }).map((_, i) => (
              <CountryCardPlaceholder key={i} loading variant="leaderboard" />
            ))
          : displayed.map((entry) => (
              <CountryCardPlaceholder
                key={entry.id}
                {...entry}
                variant="leaderboard"
              />
            ))
        }
      </div>

      {limit && data.length > limit && (
        <p className="text-center text-white/30 text-xs mt-4 font-mono">
          + {data.length - limit} more countries
        </p>
      )}
    </SectionCard>
  )
}

export { MOCK_LEADERBOARD }
