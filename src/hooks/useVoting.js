/**
 * hooks/useVoting.js
 *
 * Manages the current user's votes for a given stage.
 * Subscribes to Firestore in realtime so the UI stays in sync.
 *
 * @param {string} stage  'semi-1' | 'semi-2' | 'grand-final'
 * @returns {{
 *   myVotes: object,       // { countryId: points }
 *   castVote: function,    // (countryId, points) => void — toggle or set
 *   saving: object,        // { countryId: boolean }
 *   isReady: boolean,      // true once initial snapshot is received
 * }}
 */

import { useState, useEffect, useCallback } from 'react'
import { dbService } from '../services/db'
import { useAuth } from '../context/AuthContext'

export function useVoting(stage) {
  const { currentUser } = useAuth()

  // { countryId: points }  — current user's selections
  const [myVotes, setMyVotes] = useState({})
  // { countryId: true }    — which countries are mid-save
  const [saving, setSaving] = useState({})
  const [isReady, setIsReady] = useState(false)

  // Subscribe to this user's votes for the stage
  useEffect(() => {
    if (!currentUser) {
      setMyVotes({})
      setIsReady(true)
      return
    }

    const unsub = dbService.onUserStageVotes(currentUser.uid, stage, (votes) => {
      const map = {}
      votes.forEach(v => { map[v.countryId] = v.points })
      setMyVotes(map)
      setIsReady(true)
    })

    return unsub
  }, [currentUser, stage])

  /**
   * castVote — toggle or set a point value for a country.
   * If the same point is clicked again → remove vote (toggle off).
   * If a different point is clicked → update to new value.
   */
  const castVote = useCallback(async (countryId, points) => {
    if (!currentUser) return

    const isSameValue = myVotes[countryId] === points

    setSaving(s => ({ ...s, [countryId]: true }))
    try {
      if (isSameValue) {
        // Deselect
        await dbService.deleteVote(currentUser.uid, stage, countryId)
      } else {
        await dbService.saveVote({
          userId: currentUser.uid,
          userName: currentUser.displayName || 'Anonymous',
          userPhoto: currentUser.photoURL || null,
          stage,
          countryId,
          points,
        })
      }
    } catch (err) {
      console.error('castVote error:', err)
    } finally {
      setSaving(s => ({ ...s, [countryId]: false }))
    }
  }, [currentUser, stage, myVotes])

  return { myVotes, castVote, saving, isReady }
}
