import styles from './Spinner.module.scss'

export function Spinner() {
  return <span className={styles.spinner} role="status" aria-label="Loading" />
}
