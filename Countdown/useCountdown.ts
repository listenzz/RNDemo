import { useAppState } from '@react-native-community/hooks'
import { useCallback, useEffect, useRef, useState } from 'react'

export function useCountdown(seconds = 30) {
  const timer = useRef<ReturnType<typeof setInterval> | null>(null)
  const [target, setTarget] = useState<Date | null>(null)
  const [count, setCount] = useState<number>(0)
  const appState = useAppState()

  const start = useCallback(() => {
    setTarget(add(new Date(), seconds))
  }, [seconds])

  const stop = useCallback(() => {
    setTarget(null)
    setCount(0)
  }, [])

  useEffect(() => {
    if (target === null || appState !== 'active') {
      return
    }

    setCount(diff(new Date(), target))

    timer.current = setInterval(() => {
      setCount(diff(new Date(), target))
    }, 1000)

    return () => {
      if (timer.current) {
        clearInterval(timer.current)
        timer.current = null
      }
    }
  }, [target, appState])

  useEffect(() => {
    if (count === 0) {
      stop()
    }
  }, [count, stop])

  return { count, start, stop }
}

function add(date: Date, seconds: number) {
  return new Date(date.getTime() + seconds * 1000)
}

function diff(now: Date, target: Date) {
  return Math.max(Math.trunc((target.getTime() - now.getTime()) / 1000 + 0.5), 0)
}
