'use client'

import { useUsersDispatch, useUsersState } from '@/app/context/UsersContext'

export default function SearchBar() {
  const { dispatch } = useUsersDispatch()
  const { query, loading } = useUsersState()

  return (
    <input
      type="text"
      placeholder={loading ? 'Завантаження...' : 'Пошук користувача...'}
      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
      value={query}
      onChange={(e) => dispatch({ type: 'SET_QUERY', payload: e.target.value })}
      disabled={loading}
    />
  )
}
