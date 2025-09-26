// app/page.js

// Імпортуємо компонент Link з next/link
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function HomePage() {
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
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      textAlign: 'center',
      backgroundColor: '#f0f0f0',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        padding: '20px',
        borderRadius: '10px',
        backgroundColor: '#fff',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
      }}>
        <h1>{greeting}</h1>
        <p>Ласкаво просимо на головну сторінку.</p>
        
        <div style={{
          display: 'flex',
          gap: '10px',
          justifyContent: 'center',
        }}>
          <Button variant={'dk'} asChild>
            <Link href="/about" >
              Про нас
            </Link>
          </Button>
          <Button variant={'dk'} asChild>
          <Link 
            href="/contacts" 
            >
            Контакти
          </Link>
          </Button>
          <Button variant={'dk'} asChild>
          <Link 
            href="/sign" 
            >
            Вхід
          </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
