import { useEffect, useState } from "react"

const useDebounce = (value, delay = 300) => {
  const [debouncedValue, setDebouncedValue] = useState(value)
  const [immediateValue, setImmediateValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(immediateValue)
    }, delay)

    return () => {
      clearTimeout(timer)
    }
  }, [immediateValue, delay])

  const flush = () => {
    setDebouncedValue(immediateValue)
  }

  useEffect(() => {
    setImmediateValue(value)
  }, [value])

  return [debouncedValue, flush]
}

export default useDebounce
