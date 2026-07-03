import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from '@/app/store'
import { gamesApi } from '../api/gamesApi'
import { ALL_TYPES } from './constants'

const selectGamesResult = gamesApi.endpoints.getGames.select()

export const selectAllGames = createSelector(
  selectGamesResult,
  (result) => result.data ?? [],
)

export const selectSearch = (state: RootState) => state.filters.search
export const selectTypeID = (state: RootState) => state.filters.typeID

export const selectGameTypes = createSelector(selectAllGames, (games) => {
  const types = new Set<string>()
  for (const game of games) {
    types.add(game.gameTypeID)
  }
  return [...types].sort()
})

export const selectFilteredGames = createSelector(
  [selectAllGames, selectSearch, selectTypeID],
  (games, search, typeID) => {
    const query = search.trim().toLowerCase()
    return games.filter((game) => {
      const matchesType = typeID === ALL_TYPES || game.gameTypeID === typeID
      const matchesSearch =
        query === '' || game.gameName.toLowerCase().includes(query)
      return matchesType && matchesSearch
    })
  },
)
