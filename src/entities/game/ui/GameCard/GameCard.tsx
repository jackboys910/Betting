import { useCallback, useState } from 'react'
import { getGameImageUrl } from '@/shared/config'
import type { Game } from '../../model/types'
import styles from './GameCard.module.scss'

interface GameCardProps {
  game: Game
}

export function GameCard({ game }: GameCardProps) {
  const [hasImageError, setHasImageError] = useState(false)

  const handleError = useCallback(() => {
    setHasImageError(true)
  }, [])

  return (
    <article className={styles.card}>
      <div className={styles.image}>
        {hasImageError ? (
          <div className={styles.fallback}>
            <span>{game.gameName}</span>
          </div>
        ) : (
          <img
            src={getGameImageUrl(game.gameID)}
            alt={game.gameName}
            loading="lazy"
            onError={handleError}
          />
        )}
      </div>
      <p className={styles.name} title={game.gameName}>
        {game.gameName}
      </p>
    </article>
  )
}
