import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { ALL_TYPES } from './constants'

interface FiltersState {
  search: string
  typeID: string
}

const initialState: FiltersState = {
  search: '',
  typeID: ALL_TYPES,
}

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload
    },
    setType(state, action: PayloadAction<string>) {
      state.typeID = action.payload
    },
  },
})

export const { setSearch, setType } = filtersSlice.actions
export const filtersReducer = filtersSlice.reducer
