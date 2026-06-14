import { useState, useCallback } from 'react'

/**
 * Manages multiple named grid groups.
 * setText(id, x, y) — adds or updates a group at 1-indexed (x, y).
 * Returns [groups, setText] where groups is a Map<id, { x, y }>.
 */
export function useGridLogo(initial = []) {
  const [groups, setGroups] = useState(() => {
    const map = new Map()
    initial.forEach(({ id, x, y }) => map.set(id, { x, y }))
    return map
  })

  const setText = useCallback((id, x, y) => {
    setGroups(prev => new Map(prev).set(id, { x, y }))
  }, [])

  return [groups, setText]
}
