import { baseApi } from '@/shared/api/baseApi'
import { PARTNER_NAME } from '@/shared/config'
import type { Game, GameListResponse } from '../model/types'

export const gamesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getGames: build.query<Game[], void>({
      query: () => `game/list?partner_name=${PARTNER_NAME}`,
      transformResponse: (response: GameListResponse) => {
        if (response.status !== 0) {
          throw new Error(response.error_message || 'Failed to load games')
        }
        return response.result
      },
    }),
  }),
})

export const { useGetGamesQuery } = gamesApi
