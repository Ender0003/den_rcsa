'use client'

import React, { createContext, useContext, useEffect, useReducer } from 'react'

// --- Contexts ---
const UsersStateContext = createContext(undefined)
const UsersDispatchContext = createContext(undefined)

// --- Initial state ---
const initialState = {
  users: [],
  filteredUsers: [],
  loading: false,
  error: null,
  query: '',
  activeUser: null,
  posts: [],
  postsLoading: false,
  postsError: null,
}

// --- Reducer ---
function reducer(state, action) {
  switch (action.type) {
    case 'LOAD_START':
      return { ...state, loading: true, error: null }
    case 'LOAD_SUCCESS':
      return {
        ...state,
        loading: false,
        users: action.payload,
        filteredUsers: action.payload,
      }
    case 'LOAD_ERROR':
      return { ...state, loading: false, error: action.payload }

    case 'SET_QUERY': {
      const query = action.payload.toLowerCase()
      const filtered = state.users.filter((u) =>
        u.name.toLowerCase().includes(query)
      )
      return { ...state, query: action.payload, filteredUsers: filtered }
    }

    case 'SELECT_USER':
      return { ...state, activeUser: action.payload }

    case 'POSTS_LOAD_START':
      return { ...state, postsLoading: true, postsError: null }

    case 'POSTS_LOAD_SUCCESS':
      return { ...state, postsLoading: false, posts: action.payload }

    case 'POSTS_LOAD_ERROR':
      return { ...state, postsLoading: false, postsError: action.payload }

    default:
      return state
  }
}

// --- Provider ---
export function UsersProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  // Load users on mount
  useEffect(() => {
    async function fetchUsers() {
      dispatch({ type: 'LOAD_START' })
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/users')
        if (!res.ok) throw new Error('Не вдалося завантажити користувачів')
        const data = await res.json()
        dispatch({ type: 'LOAD_SUCCESS', payload: data })
      } catch (error) {
        dispatch({ type: 'LOAD_ERROR', payload: error.message })
      }
    }
    fetchUsers()
  }, [])

  // Load posts for selected user
  async function selectUser(user) {
    dispatch({ type: 'SELECT_USER', payload: user })
    dispatch({ type: 'POSTS_LOAD_START' })

    try {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/users/${user.id}/posts`
      )
      if (!res.ok) throw new Error('Не вдалося завантажити пости')
      const posts = await res.json()
      dispatch({ type: 'POSTS_LOAD_SUCCESS', payload: posts })
    } catch (error) {
      dispatch({ type: 'POSTS_LOAD_ERROR', payload: error.message })
    }
  }

  const valueState = state
  const valueDispatch = { dispatch, selectUser }

  return (
    <UsersStateContext.Provider value={valueState}>
      <UsersDispatchContext.Provider value={valueDispatch}>
        {children}
      </UsersDispatchContext.Provider>
    </UsersStateContext.Provider>
  )
}

// --- Custom hooks ---
export function useUsersState() {
  const context = useContext(UsersStateContext)
  if (context === undefined) {
    throw new Error('useUsersState must be used within a UsersProvider')
  }
  return context
}

export function useUsersDispatch() {
  const context = useContext(UsersDispatchContext)
  if (context === undefined) {
    throw new Error('useUsersDispatch must be used within a UsersProvider')
  }
  return context
}

export function useUsers() {
  return { ...useUsersState(), ...useUsersDispatch() }
}
