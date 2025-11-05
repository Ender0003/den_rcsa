// app/page.js

import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function HomePage() {
  // Функція для визначення привітання залежно від часу доби
  const getGreeting = () => {
    const now = new Date();
    const hours = now.getHours();

    if (hours < 12) {
      return 'Доброго ранку!';
    } else if (hours < 18) {
      return 'Доброго дня!';
    } else {
      return 'Доброго вечора!';
    }
  };

  const greeting = getGreeting();

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        textAlign: 'center',
        backgroundColor: '#f0f0f0',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div
        style={{
          padding: '20px',
          borderRadius: '10px',
          backgroundColor: '#fff',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h1>{greeting}</h1>
        <p>Ласкаво просимо на головну сторінку.</p>

        <div
          style={{
            display: 'flex',
            gap: '10px',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginTop: '20px',
          }}
        >
          {/* 1. Кнопка "Про нас" */}
          <Button variant={'dk'} asChild>
            <Link href="/about">Про нас</Link>
          </Button>

          {/* 2. Кнопка "Контакти" */}
          <Button variant={'dk'} asChild>
            <Link href="/contacts">Контакти</Link>
          </Button>

          {/* 3. Кнопка "Реєстрація" */}
          <Button variant={'dk'} asChild>
            <Link href="/registration">Реєстрація</Link>
          </Button>

          {/* 4. Кнопка "Оформити замовлення" */}
          <Button variant={'dk'} asChild style={{ backgroundColor: '#22C55E' }}>
            <Link href="/order">Оформити замовлення (Multi-step)</Link>
          </Button>

          {/* 🚀 5. НОВА КНОПКА — Сторінка користувачів */}
          <Button variant={'dk'} asChild style={{ backgroundColor: '#3B82F6' }}>
            <Link href="/users">Користувачі</Link>
          </Button>
          <Button variant={'dk'} asChild style={{ backgroundColor: '#3B82F6' }}>
            <Link href="/toDo">Список завдань (ToDo)
            </Link>
            </Button>
        </div>
      </div>
    </div>
  );
}
