import { createFeatureSelector, createSelector } from '@ngrx/store'
import { StatusState } from './Status.status'

const StatusSelector = createFeatureSelector<StatusState>('statusselector')

export const GetStatusError = createSelector(StatusSelector, (state) => {
  return state.error
})
export const GetStatusSuccsess = createSelector(StatusSelector, (state) => {
  return state.succsess
})
export const GetStatusLoading = createSelector(StatusSelector, (state) => {
  return state.loading
})
