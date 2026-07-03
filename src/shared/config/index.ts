export const API_BASE_URL = '/api/'

export const PARTNER_NAME = 'belparyaj'

const GAME_IMAGE_BASE =
  'https://bsw-dk1.pragmaticplay.net/game_pic/square/200'

export const getGameImageUrl = (gameID: string): string =>
  `${GAME_IMAGE_BASE}/${gameID}.png`

export const GAMES_PAGE_SIZE = 48

export const SEARCH_DEBOUNCE_MS = 300
