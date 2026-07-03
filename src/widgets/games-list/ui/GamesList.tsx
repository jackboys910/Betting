import { useCallback, useState } from 'react'
import { useAppSelector } from '@/app/store'
import { GameFilter } from '@/features/game-filter'
import { GameSearch } from '@/features/game-search'
import {
  GameCard,
  selectFilteredGames,
  selectSearch,
  selectTypeID,
  useGetGamesQuery,
} from '@/entities/game'
import { GAMES_PAGE_SIZE } from '@/shared/config'
import { useInfiniteScroll } from '@/shared/lib'
import { PragmaticLogo, Spinner } from '@/shared/ui'
import styles from './GamesList.module.scss'

export function GamesList() {
  const { isLoading, isError, refetch } = useGetGamesQuery()
  const games = useAppSelector(selectFilteredGames)
  const search = useAppSelector(selectSearch)
  const typeID = useAppSelector(selectTypeID)

  const [visibleCount, setVisibleCount] = useState(GAMES_PAGE_SIZE)
  const [prevFilters, setPrevFilters] = useState({ search, typeID })

  if (prevFilters.search !== search || prevFilters.typeID !== typeID) {
    setPrevFilters({ search, typeID })
    setVisibleCount(GAMES_PAGE_SIZE)
  }

  const hasMore = visibleCount < games.length

  const loadMore = useCallback(() => {
    setVisibleCount((count) => count + GAMES_PAGE_SIZE)
  }, [])

  const handleRetry = useCallback(() => {
    refetch()
  }, [refetch])

  const sentinelRef = useInfiniteScroll<HTMLDivElement>({
    onLoadMore: loadMore,
    enabled: hasMore,
  })

  return (
    <div className={styles.container}>
      <div className={styles.toolbar}>
        <div className={styles.filterSlot}>
          <GameFilter />
        </div>
        <div className={styles.searchSlot}>
          <GameSearch />
        </div>
      </div>

      <section className={styles.content}>
        <header className={styles.sectionHeader}>
          <PragmaticLogo className={styles.logo} />
          <h2 className={styles.title}>Pragmatic play</h2>
        </header>

        {isLoading && (
          <div className={styles.status}>
            <Spinner />
          </div>
        )}

        {isError && (
          <div className={styles.status}>
            <p>Failed to load games. Please try again.</p>
            <button className={styles.retry} type="button" onClick={handleRetry}>
              Retry
            </button>
          </div>
        )}

        {!isLoading && !isError && games.length === 0 && (
          <div className={styles.status}>
            <p>No games found.</p>
          </div>
        )}

        {!isLoading && !isError && games.length > 0 && (
          <>
            <div className={styles.grid}>
              {games.slice(0, visibleCount).map((game) => (
                <GameCard key={game.gameID} game={game} />
              ))}
            </div>
            {hasMore && <div ref={sentinelRef} className={styles.sentinel} />}
          </>
        )}
      </section>
    </div>
  )
}
