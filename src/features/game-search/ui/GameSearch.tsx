import { useCallback, useEffect, useRef, useState } from 'react'
import type { ChangeEvent, SyntheticEvent } from 'react'
import { useAppDispatch } from '@/app/store'
import { setSearch } from '@/entities/game'
import { SEARCH_DEBOUNCE_MS } from '@/shared/config'
import { useDebounce } from '@/shared/lib'
import { SearchIcon } from '@/shared/ui'
import styles from './GameSearch.module.scss'

export function GameSearch() {
  const dispatch = useAppDispatch()
  const [value, setValue] = useState('')
  const debouncedValue = useDebounce(value, SEARCH_DEBOUNCE_MS)
  const latestValue = useRef(value)

  useEffect(() => {
    latestValue.current = value
  }, [value])

  useEffect(() => {
    dispatch(setSearch(debouncedValue))
  }, [debouncedValue, dispatch])

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }, [])

  const handleSubmit = useCallback(
    (event: SyntheticEvent<HTMLFormElement>) => {
      event.preventDefault()
      dispatch(setSearch(latestValue.current))
    },
    [dispatch],
  )

  return (
    <form className={styles.search} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label className={styles.field}>
          <span className={styles.label}>Search</span>
          <span className={styles.inputWrapper}>
            <SearchIcon className={styles.icon} />
            <input
              className={styles.input}
              type="text"
              placeholder="Search"
              value={value}
              onChange={handleChange}
            />
          </span>
        </label>
        <button className={styles.button} type="submit">
          Search
        </button>
      </div>
    </form>
  )
}
