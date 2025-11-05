'use client'
import React from 'react'
import { useUsers } from '@/app/context/UsersContext'

export default function UserCard({ user }) {
  const { selectUser, activeUser } = useUsers()
  const selected = activeUser && activeUser.id === user.id

  return (
    <button
      onClick={() => selectUser(user)}
      className={`flex items-center gap-3 rounded-lg border bg-card p-3 text-left transition hover:bg-accent hover:text-accent-foreground ${
        selected ? 'ring-2 ring-primary' : ''
      }`}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-md bg-secondary text-secondary-foreground font-semibold">
        {user.name.charAt(0)}
      </div>
      <div className="flex flex-col">
        <span className="font-semibold">{user.name}</span>
        <span className="text-sm text-muted-foreground">{user.email}</span>
      </div>
    </button>
  )
}
