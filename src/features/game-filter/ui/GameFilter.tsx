import { useCallback } from 'react'
import type { ChangeEvent } from 'react'
import { useAppDispatch, useAppSelector } from '@/app/store'
import {
  ALL_TYPES,
  getGameTypeLabel,
  selectGameTypes,
  selectTypeID,
  setType,
} from '@/entities/game'
import { ArrowIcon } from '@/shared/ui'
import styles from './GameFilter.module.scss'

export function GameFilter() {
  const dispatch = useAppDispatch()
  const typeID = useAppSelector(selectTypeID)
  const types = useAppSelector(selectGameTypes)

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      dispatch(setType(event.target.value))
    },
    [dispatch],
  )

  return (
    <div className={styles.filter}>
      <span className={styles.label}>Game Type</span>
      <div className={styles.select}>
        <select
          className={styles.native}
          value={typeID}
          onChange={handleChange}
          aria-label="Filter by game type"
        >
          <option value={ALL_TYPES}>All</option>
          {types.map((type) => (
            <option key={type} value={type}>
              {getGameTypeLabel(type)}
            </option>
          ))}
        </select>
        <ArrowIcon className={styles.arrow} />
      </div>
    </div>
  )
}
