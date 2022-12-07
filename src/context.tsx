import React, {
  useReducer,
  useContext,
  createContext,
  ReactNode,
  Dispatch
} from 'react'

import type ProductType from '../interfaces/product'
import type CategoryType from '../interfaces/category'
import { SET_CATEGORIES, SET_CURRENCY, ADD_TO_CART } from '../lib/constants'

interface State {
  choosenCurrency: string
  itemsInCart: ProductType[]
  categories: CategoryType[]
}

const categories: CategoryType[] = []
const itemsInCart: ProductType[] = []

const initialValues = {
  choosenCurrency: 'usd',
  itemsInCart,
  categories
}

  type Action =
    | {
      type: 'SET_CURRENCY'
      payload: string
    }
    | {
      type: 'ADD_TO_CART'
      payload: ProductType
    }
    | {
      type: 'SET_CATEGORIES'
      payload: CategoryType[]
    }

const StateContext = createContext<State>(initialValues)
const DispatchContext = createContext<Dispatch<Action>>(
  () => null
)

const reducer = (state: State, action: Action): Object => {
  switch (action.type) {
    case SET_CURRENCY:
      return {
        ...state,
        choosenCurrency: action.payload
      }
    case ADD_TO_CART:
      return {
        ...state,
        itemsInCart: [...state.itemsInCart, action.payload]
      }
    case SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload
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

export const useStore = () => useContext(StateContext)
export const useDispatch = () => useContext(DispatchContext)
