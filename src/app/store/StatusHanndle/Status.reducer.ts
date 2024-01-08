import { createReducer, on } from '@ngrx/store'
import { InitialStatusState } from './Status.status'
import {
  loadingEnd,
  loadingStart,
  statusError,
  statusSuccses,
} from './Status.action'

const _StatusReducer = createReducer(
  InitialStatusState,
  on(loadingStart, (state) => {
    return { ...state, loading: true }
  }),

  on(loadingEnd, (state) => {
    return { ...state, loading: false }
  }),
  on(statusError, (state, action) => {
    return { ...state, error: action.error }
  }),
  on(statusSuccses, (state, action) => {
    return { ...state, succsess: action.succses }
  }),
)

export function StatusReducer(state: any, action: any) {
  return _StatusReducer(state, action)
}
