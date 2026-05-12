/**
 * context/AppContext.jsx — Global app state context.
 *
 * Auth state is now sourced from AuthContext / Firebase.
 * This context handles UI state, game phase, and vote drafts.
 */

import React, { createContext, useContext, useReducer } from 'react'

const AppContext = createContext(null)

const initialState = {
  // UI state
  isMobileMenuOpen: false,

  // Game phase tracking
  currentPhase: 'semi-1', // 'semi-1' | 'semi-2' | 'grand-final'

  // Voting state (placeholder — real logic comes in Stage 3)
  votes: {
    semi1: {},
    semi2: {},
    grandFinal: {
      jury: {},
      public: {},
    },
  },

  // Leaderboard (placeholder)
  leaderboard: [],
}

function appReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_MOBILE_MENU':
      return { ...state, isMobileMenuOpen: !state.isMobileMenuOpen }

    case 'CLOSE_MOBILE_MENU':
      return { ...state, isMobileMenuOpen: false }

    case 'SET_PHASE':
      return { ...state, currentPhase: action.payload }

    default:
      return state
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  const actions = {
    toggleMobileMenu: () => dispatch({ type: 'TOGGLE_MOBILE_MENU' }),
    closeMobileMenu: () => dispatch({ type: 'CLOSE_MOBILE_MENU' }),
    setPhase: (phase) => dispatch({ type: 'SET_PHASE', payload: phase }),
  }

  return (
    <AppContext.Provider value={{ state, actions }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
