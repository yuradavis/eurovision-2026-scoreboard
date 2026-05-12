/**
 * services/db.js — Firestore database service.
 *
 * Collections:
 *   users/   — user profiles (existing)
 *   votes/   — per-country vote per user per stage
 *              Document ID: `{userId}_{stage}_{countryId}`
 */

import {
  doc,
  setDoc,
  deleteDoc,
  getDoc,
  collection,
  query,
  where,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from './firebase'

export const dbService = {
  // ─── Users ───────────────────────────────────────────────────────────────

  upsertUser: async ({ uid, displayName, email, photoURL }) => {
    const ref = doc(db, 'users', uid)
    const snap = await getDoc(ref)

    if (!snap.exists()) {
      await setDoc(ref, {
        uid,
        displayName,
        email,
        photoURL,
        role: 'user',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      })
    } else {
      await setDoc(ref, {
        displayName,
        email,
        photoURL,
        updatedAt: serverTimestamp(),
      }, { merge: true })
    }
  },

  getUser: async (uid) => {
    const ref = doc(db, 'users', uid)
    const snap = await getDoc(ref)
    return snap.exists() ? { id: snap.id, ...snap.data() } : null
  },

  // ─── Votes ────────────────────────────────────────────────────────────────

  /**
   * Save or update a single country vote.
   * Doc ID is deterministic so calling it again just overwrites.
   */
  saveVote: async ({ userId, userName, stage, countryId, points }) => {
    const docId = `${userId}_${stage}_${countryId}`
    const ref = doc(db, 'votes', docId)
    await setDoc(ref, {
      userId,
      userName,
      stage,
      countryId,
      points,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }, { merge: true })
  },

  /**
   * Remove a vote (user deselected a country).
   */
  deleteVote: async (userId, stage, countryId) => {
    const docId = `${userId}_${stage}_${countryId}`
    await deleteDoc(doc(db, 'votes', docId))
  },

  /**
   * Realtime listener: all votes for a stage.
   * Used by leaderboard.
   */
  onStageVotes: (stage, callback) => {
    const q = query(
      collection(db, 'votes'),
      where('stage', '==', stage)
    )
    return onSnapshot(q, (snap) => {
      const votes = snap.docs.map(d => ({ id: d.id, ...d.data() }))
      callback(votes)
    })
  },

  /**
   * Realtime listener: one user's votes for a stage.
   * Used by the voting UI to show current selections.
   */
  onUserStageVotes: (userId, stage, callback) => {
    const q = query(
      collection(db, 'votes'),
      where('userId', '==', userId),
      where('stage', '==', stage)
    )
    return onSnapshot(q, (snap) => {
      const votes = snap.docs.map(d => ({ id: d.id, ...d.data() }))
      callback(votes)
    })
  },

  // ─── Public (Televote) ────────────────────────────────────────────────────

  /**
   * Save or overwrite one public vote per user for the Grand Final.
   * Doc ID is deterministic: {userId}_grand-final-public
   */
  savePublicVote: async ({ userId, userName, countryId }) => {
    const docId = `${userId}_grand-final-public`
    const ref = doc(db, 'publicvotes', docId)
    await setDoc(ref, {
      userId,
      userName,
      countryId,
      updatedAt: serverTimestamp(),
    }, { merge: true })
  },

  /**
   * Realtime listener: all public votes for the Grand Final.
   */
  onPublicVotes: (callback) => {
    return onSnapshot(collection(db, 'publicvotes'), (snap) => {
      const votes = snap.docs.map(d => ({ id: d.id, ...d.data() }))
      callback(votes)
    })
  },

  /**
   * Realtime listener: one user's public vote.
   */
  onUserPublicVote: (userId, callback) => {
    const ref = doc(db, 'publicvotes', `${userId}_grand-final-public`)
    return onSnapshot(ref, (snap) => {
      callback(snap.exists() ? snap.data() : null)
    })
  },

  /**
   * Batch-save all Grand Final jury votes for a user.
   * Overwrites all previous votes for that user+stage.
   * votes: { countryId: points }
   */
  saveGrandFinalJuryVotes: async ({ userId, userName, votes }) => {
    const stage = 'grand-final'
    const promises = Object.entries(votes).map(([countryId, points]) => {
      const docId = `${userId}_${stage}_${countryId}`
      const ref = doc(db, 'votes', docId)
      return setDoc(ref, {
        userId,
        userName,
        stage,
        countryId,
        points,
        updatedAt: serverTimestamp(),
      }, { merge: true })
    })
    await Promise.all(promises)
  },
}
