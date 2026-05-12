import { useMemo } from 'react'
import { countries, semi1Countries, semi2Countries, autoFinalistsCountries } from '../data/eurovision2026'

/**
 * Hook to access and filter Eurovision country data.
 * Provides typed, memoised access to the mock dataset.
 * Will be extended with Firebase realtime updates in a later stage.
 */
export function useEurovisionData() {
  const data = useMemo(() => ({
    all: countries,
    semi1: semi1Countries,
    semi2: semi2Countries,
    autoFinalists: autoFinalistsCountries,
    getById: (id) => countries.find(c => c.id === id) || null,
    getByCountry: (name) => countries.find(c => c.country === name) || null,
    getSemiCountries: (semi) => countries.filter(c => c.semi === semi),
  }), [])

  return data
}
