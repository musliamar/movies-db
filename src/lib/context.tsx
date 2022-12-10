import React, {
  useReducer,
  useContext,
  createContext,
  ReactNode,
  Dispatch
} from 'react'

import { SET_SEARCH } from './constants'

interface State {
  searchInput: string
}

const initialValues = {
  searchInput: ''
}

interface Action {
  type: 'SET_SEARCH'
  payload: string
}

const StateContext = createContext<State>(initialValues)
const DispatchContext = createContext<Dispatch<Action>>(
  () => null
)

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case SET_SEARCH:
      return {
        ...state,
        searchInput: action.payload
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
