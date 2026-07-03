export const ALL_TYPES = 'all'

const GAME_TYPE_LABELS: Record<string, string> = {
  vs: 'Video Slots',
  bj: 'Blackjack',
  rl: 'Roulette',
  bc: 'Baccarat',
  sc: 'Scratch Cards',
  vp: 'Video Poker',
}

export const getGameTypeLabel = (typeID: string): string =>
  GAME_TYPE_LABELS[typeID] ?? typeID.toUpperCase()
