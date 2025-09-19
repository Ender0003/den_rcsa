// app/page.js

// Імпортуємо компонент Link з next/link
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
          <Link 
            href="/about" 
            style={{
              display: 'flex', // Включаємо Flexbox
              justifyContent: 'center', // Центруємо по горизонталі
              alignItems: 'center', // Центруємо по вертикалі
              padding: '10px 20px',
              borderRadius: '5px',
              backgroundColor: '#007bff',
              color: '#fff',
              textDecoration: 'none',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Про нас
          </Link>
          <Link 
            href="/contacts" 
            style={{
              display: 'flex', // Включаємо Flexbox
              justifyContent: 'center', // Центруємо по горизонталі
              alignItems: 'center', // Центруємо по вертикалі
              padding: '10px 20px',
              borderRadius: '5px',
              backgroundColor: '#a200ffff',
              color: '#fff',
              textDecoration: 'none',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Контакти
          </Link>
        </div>
      </div>
    </div>
  );
}