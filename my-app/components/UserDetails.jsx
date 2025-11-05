'use client'
import React from 'react'
import { useUsers } from '@/app/context/UsersContext'
export default function UserDetails() {
  const { activeUser } = useUsers()
  if (!activeUser)
    return (
      <div className="text-muted-foreground text-sm">
        Клікніть на користувача, щоб побачити деталі
      </div>
    )

  const { name, username, email, phone, website, address, company } = activeUser
  return (
    <div className="rounded-lg border bg-card p-4 shadow-sm">
      <h2 className="text-lg font-semibold">{name}</h2>
      <div className="mt-2 text-sm space-y-1">
        <p><b>Username:</b> {username}</p>
        <p><b>Email:</b> {email}</p>
        <p><b>Phone:</b> {phone}</p>
        <p><b>Website:</b> <a href={`http://${website}`} target="_blank" className="text-primary underline">{website}</a></p>
        <div>
          <h4 className="font-medium mt-2">Address</h4>
          <p>{address.suite}, {address.street}, {address.city}</p>
        </div>
        <div>
          <h4 className="font-medium mt-2">Company</h4>
          <p>{company.name}</p>
          <p className="text-muted-foreground text-sm">{company.bs}</p>
        </div>
      </div>
    </div>
  )
}
