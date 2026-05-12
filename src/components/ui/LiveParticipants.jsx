/**
 * components/ui/LiveParticipants.jsx
 *
 * Shows realtime count of how many users have voted in a stage.
 * Subscribes to Firestore and displays a live badge.
 */

import React, { useState, useEffect } from 'react'
import { dbService } from '../../services/db'
import { cn } from '../../utils/cn'

export default function LiveParticipants({ stage, className }) {
  const [count, setCount] = useState(null)

  useEffect(() => {
    if (!stage) return

    const unsub = dbService.onStageVotes(stage, (votes) => {
      // Count unique user IDs that have cast at least one vote
      const uniqueUsers = new Set(votes.map(v => v.userId))
      setCount(uniqueUsers.size)
    })

    return unsub
  }, [stage])

  if (count === null) return null

  return (
    <div className={cn(
      'inline-flex items-center gap-2 px-3 py-1.5 rounded-full',
      'bg-neon-violet/10 border border-neon-violet/20',
      className
    )}>
      <span className="relative flex h-2 w-2 shrink-0">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-violet opacity-60" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-violet" />
      </span>
      <span className="font-mono text-xs text-neon-violet font-semibold">
        {count} {count === 1 ? 'voter' : 'voters'} live
      </span>
    </div>
  )
}
