'use client';
import React from 'react';


import { UsersProvider } from '@/app/context/UsersContext';
import SearchBar from '@/components/SearchBar';
import UsersList from '@/components/UsersList';
import UserDetails from '@/components/UserDetails';

export default function UsersPage() {
  return (
    <UsersProvider>
      <div style={{ padding: '20px' }}>
        <h1>Список користувачів</h1>
        <SearchBar />
        <UsersList />
        <UserDetails />
      </div>
    </UsersProvider>
  );
}