'use client'
import React from 'react'
import { useUsers } from '../context/UsersContext'

export default function PostsList() {
  const { posts, postsLoading, postsError } = useUsers()

  if (postsLoading)
    return <div className="text-muted-foreground animate-pulse">Завантаження постів...</div>
  if (postsError)
    return <div className="text-destructive">Помилка: {postsError}</div>
  if (!posts.length)
    return <div className="text-muted-foreground">Постів немає</div>

  return (
    <div className="grid gap-3">
      {posts.map((p) => (
        <article key={p.id} className="rounded-md border bg-card p-3 shadow-sm">
          <h3 className="font-semibold text-base">{p.title}</h3>
          <p className="text-sm text-muted-foreground mt-1">{p.body}</p>
        </article>
      ))}
    </div>
  )
}
