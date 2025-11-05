'use client'

import { useUsersState, useUsersDispatch } from '@/app/context/UsersContext'

export default function UsersList() {
  const { filteredUsers, loading, error, activeUser } = useUsersState()
  const { selectUser } = useUsersDispatch()

  if (loading) return <p>Завантаження користувачів...</p>
  if (error) return <p className="text-red-500">Помилка: {error}</p>

  return (
    <div className="space-y-2">
      {filteredUsers.map((user) => (
        <div
          key={user.id}
          onClick={() => selectUser(user)}
          className={`p-3 rounded-md cursor-pointer transition-colors ${
            activeUser?.id === user.id
              ? 'bg-primary text-white'
              : 'bg-card hover:bg-accent'
          }`}
        >
          <p className="font-semibold">{user.name}</p>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>
      ))}
    </div>
  )
}
