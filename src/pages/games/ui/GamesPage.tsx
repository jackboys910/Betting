import { GamesList } from '@/widgets/games-list'
import styles from './GamesPage.module.scss'

export function GamesPage() {
  return (
    <main className={styles.page}>
      <GamesList />
    </main>
  )
}
