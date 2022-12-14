import React, { useEffect } from 'react'
import { useStore, useDispatch } from '../lib/context'
import { SET_PROGRESS_VALUE } from '../lib/constants'

const TopBar = (): JSX.Element => {
  const { loadingProgress } = useStore()
  const dispatch = useDispatch()

  useEffect(() => {
    if (loadingProgress === 100) {
      setTimeout(() => {
        dispatch({ type: SET_PROGRESS_VALUE, payload: 0 })
      }, 500)
    }
  }, [loadingProgress])

  return (
        <div className='top-loading-bar'>
        <div style={{ height: '100%', background: 'red', transition: 'all 500ms ease 0s', width: `${loadingProgress}%`, opacity: 1 }} >
            <div style={{
              width: '5%',
              opacity: 1,
              position: 'absolute',
              height: '100%',
              transition: 'all 500ms ease 0s',
              transform: 'rotate(3deg) translate(0px, -4px)',
              left: `${loadingProgress}%`
            }}>
        </div>
    </div>
    </div>)
}

export default TopBar
