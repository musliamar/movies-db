import React, { useEffect, useState } from 'react'
import { useStore, useDispatch } from '../lib/context'
import { SET_PROGRESS_VALUE } from '../lib/constants'

const TopBar = (): JSX.Element => {
  const { loadingProgress } = useStore()
  const [showBar, setShowBar] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    if (loadingProgress === 100) {
      setTimeout(() => {
        setShowBar(false)
      }, 500)
      setTimeout(() => {
        dispatch({ type: SET_PROGRESS_VALUE, payload: 0 })
      }, 600)
    }

    if (loadingProgress > 0) {
      setShowBar(true)
    }
  }, [loadingProgress])

  return (
    <div style={showBar ? undefined : { display: 'none' }} className='top-loading-bar'>
      <div style={{ height: '100%', background: 'red', transition: 'all 500ms ease 0ms', width: `${loadingProgress}%`, opacity: 1 }} >
      </div>
    </div>)
}

export default TopBar
