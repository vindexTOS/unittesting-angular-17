export interface StatusState {
  error: string
  succsess: string
  loading: boolean
}

export const InitialStatusState: StatusState = {
  error: '',
  succsess: '',
  loading: false,
}
