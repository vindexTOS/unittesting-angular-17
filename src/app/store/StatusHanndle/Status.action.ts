import { createAction, props } from '@ngrx/store'
import { StatusState } from './Status.status'

export const LOADING_START = '[Status loading start] Loading Start'
export const LOADING_END = '[Status loading end] Loading End'

export const loadingStart = createAction(LOADING_START)
export const loadingEnd = createAction(LOADING_END)

export const ERROR = '[Status error]status error'
export const statusError = createAction(ERROR, props<{ error: string }>())

export const SUCCSESS = '[Status succsess]status succsess'
export const statusSuccses = createAction(
  SUCCSESS,
  props<{ succses: string }>(),
)
