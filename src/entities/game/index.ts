export { GameCard } from './ui/GameCard/GameCard'
export { gamesApi, useGetGamesQuery } from './api/gamesApi'
export { filtersReducer, setSearch, setType } from './model/filtersSlice'
export {
  selectFilteredGames,
  selectGameTypes,
  selectSearch,
  selectTypeID,
} from './model/selectors'
export { ALL_TYPES, getGameTypeLabel } from './model/constants'
export type { Game } from './model/types'
