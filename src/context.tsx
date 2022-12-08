import React, {
  useReducer,
  useContext,
  createContext,
  ReactNode,
  Dispatch
} from 'react'

import { ISingleEntryData } from './interfaces'
import { SET_CURRENT_DATA, SET_ERROR } from './constants'

interface State {
  currentData: ISingleEntryData[]
  error: string
}

const currentData: ISingleEntryData[] = []

const initialValues = {
  currentData,
  error: ''
}

type Action =
    | {
      type: 'SET_CURRENT_DATA'
      payload: ISingleEntryData[]
    }
    | {
      type: 'SET_ERROR'
      payload: string
    }

const StateContext = createContext<State>(initialValues)
const DispatchContext = createContext<Dispatch<Action>>(
  () => null
)

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case SET_CURRENT_DATA:
      return {
        ...state,
        currentData: action.payload,
        error: ''
      }
    case SET_ERROR:
      return {
        ...state,
        error: action.payload
      }
    default:
      throw new Error(`Unknown action: ${JSON.stringify(action)}`)
  }
}

interface ProviderProps { children: ReactNode }

export const StoreProvider = ({ children }: ProviderProps): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialValues)
  return (
      <DispatchContext.Provider value={dispatch}>
        <StateContext.Provider value={state}>
          {children}
        </StateContext.Provider>
      </DispatchContext.Provider>
  )
}

export const useStore = (): State => useContext(StateContext)
export const useDispatch = (): Dispatch<Action> => useContext(DispatchContext)
