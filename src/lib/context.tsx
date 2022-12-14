import React, {
  useReducer,
  useContext,
  createContext,
  ReactNode,
  Dispatch
} from 'react'

import { SET_SEARCH, SET_PROGRESS_VALUE, INCREASE_LOADED_IMAGES, RESET_LOADED_IMAGES } from './constants'

interface State {
  searchInput: string
  loadingProgress: number
  loadedImagesOnCategory: number
}

const initialValues = {
  searchInput: '',
  loadingProgress: 0,
  loadedImagesOnCategory: 0
}

type Action = | {
  type: 'SET_SEARCH'
  payload: string
} | {
  type: 'SET_PROGRESS_VALUE'
  payload: number
} | {
  type: 'INCREASE_LOADED_IMAGES'
} | {
  type: 'RESET_LOADED_IMAGES'
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
    case SET_PROGRESS_VALUE:
      return {
        ...state,
        loadingProgress: action.payload
      }
    case INCREASE_LOADED_IMAGES:
      return {
        ...state,
        loadedImagesOnCategory: state.loadedImagesOnCategory + 1
      }
    case RESET_LOADED_IMAGES:
      return {
        ...state,
        loadedImagesOnCategory: 0
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
