// app/page.js

// !!! ОБОВ'ЯЗКОВО ДЛЯ ВИКОРИСТАННЯ ХУКІВ СТАНУ ТА DOM API !!!
'use client'; 

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

// ==========================================================
// Ваш клас modalWindow (з невеликими виправленнями стилів)
// ==========================================================
class modalWindow{
  #modal=document.createElement('div');
  #modal_parent=document.createElement('div');
  #modal_block=document.createElement('div');
  #modal_close=document.createElement('div');
  #modal_body=document.createElement('div');
  
  constructor(contentHTML, onCloseCallback){
    this.#modal.appendChild(this.#modal_parent);
    this.#modal.appendChild(this.#modal_block);
    this.#modal_block.appendChild(this.#modal_close);
    this.#modal_block.appendChild(this.#modal_body);
    
    // Перевизначаємо закриття, щоб воно викликало колбек React
    const boundClose = this.close.bind(this, onCloseCallback);
    this.#modal_parent.onclick = boundClose;
    this.#modal_close.onclick = boundClose;
    
    // Оновлені стилі
    this.#modal_parent.style='position:fixed;top:0;left:0;width:100%;height:100%;opacity:0.55;background-color:black;z-index:90;';
    this.#modal_close.innerHTML='&#10006;';
    this.#modal_close.style='padding:0;position:absolute;width: 20px;height:20px;top:-7px;right:1px;cursor:pointer;font-size:15px;line-height:20px;font:20px Arial;text-align:center;text-shadow: 0px 0px 4px black;color:white;';
    this.#modal_block.style='width:96%;max-width:400px;min-height:50px;position: fixed;top:50%;left:50%;transform: translate(-50%, -50%);background-color:white;box-shadow: 0px 0px 12px 0px black;z-index:99;border-radius:10px;overflow-y:auto;max-height:90vh;';
    this.#modal_body.style='padding:20px;';
    
    if(contentHTML)this.innerHTML=contentHTML;
  }

  get innerHTML(){
    return this.#modal_body.innerHTML;
  }
  set innerHTML(value){
    this.#modal_body.innerHTML=value;
  }
  show(){
    if (!document.body.contains(this.#modal)) {
      document.body.appendChild(this.#modal);
      // анімація
      this.#modal_block.animate([{opacity:0}, {opacity:1}], 500);
    }
  }
  // Метод close тепер приймає optional колбек
  close(onCloseCallback){
    if (document.body.contains(this.#modal)) {
      document.body.removeChild(this.#modal);
      if (onCloseCallback) onCloseCallback();
    }
  }
}

// ==========================================================
// HTML-вміст для форми входу
// ==========================================================
const loginFormHTML = `
  <h2 style="font-size: 1.5rem; font-weight: bold; margin-bottom: 20px; text-align: center;">Вхід в систему</h2>
  <form onsubmit="event.preventDefault(); alert('Вхід оброблено.');">
    <div style="margin-bottom: 1rem;">
      <label for="email" style="display: block; margin-bottom: 8px; font-size: 0.875rem; font-weight: 500; color: #1f2937;">Email</label>
      <input type="email" id="email_login" style="background-color: #f9fafb; border: 1px solid #d1d5db; color: #1f2937; font-size: 0.875rem; border-radius: 0.5rem; width: 100%; padding: 0.625rem;" placeholder="name@example.com" required />
    </div>
    <div style="margin-bottom: 1.5rem;">
      <label for="password" style="display: block; margin-bottom: 8px; font-size: 0.875rem; font-weight: 500; color: #1f2937;">Пароль</label>
      <input type="password" id="password_login" style="background-color: #f9fafb; border: 1px solid #d1d5db; color: #1f2937; font-size: 0.875rem; border-radius: 0.5rem; width: 100%; padding: 0.625rem;" placeholder="••••••••" required />
    </div>
    <button type="submit" style="color: white; background-color: #1d4ed8; font-weight: 500; border-radius: 0.5rem; font-size: 0.875rem; width: 100%; padding: 0.625rem 1.25rem; text-align: center; border: none; cursor: pointer;">
      Увійти
    </button>
  </form>
`;

// ==========================================================
// React Component
// ==========================================================
export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);

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

  // Функція для відкриття модального вікна
  const handleLoginClick = () => {
    setIsModalOpen(true);
  };
  
  // Функція для синхронізації закриття модалки зі станом React
  const handleCloseModal = () => {
      setIsModalOpen(false);
  };


  useEffect(() => {
    if (isModalOpen) {
        // Створюємо екземпляр класу і передаємо функцію, яка оновить стан React
        const modalInstance = new modalWindow(loginFormHTML, handleCloseModal);
        modalInstance.show();
        modalRef.current = modalInstance;
        
    } else if (modalRef.current) {
        // Якщо стан став false, але модалка ще існує, викликаємо її оригінальний метод close
        // (хоча це вже може бути зроблено через клік по закриттю)
        if (document.body.contains(modalRef.current.modal)) {
            modalRef.current.close();
        }
        modalRef.current = null;
    }

    // Cleanup-функція: видаляє модалку, якщо компонент вивантажується
    return () => {
        if (modalRef.current) {
            modalRef.current.close();
            modalRef.current = null;
        }
    };
  }, [isModalOpen]); // Залежність від isModalOpen

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
          marginTop: '20px'
        }}>
          
          {/* Кнопка "Вхід" - Тепер викликає модальне вікно */}
          <Button variant={'dk'} onClick={handleLoginClick}>
            Вхід
          </Button>
          
          {/* Існуючі посилання */}
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
        </div>
      </div>
    </div>
  );
}