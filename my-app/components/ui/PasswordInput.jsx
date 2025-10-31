// /components/ui/PasswordInput.jsx

"use client";

import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react'; 
import { Input } from './input'; 


export const PasswordInput = ({ label, name, value, onChange, error, ...restProps }) => {
  const [show, setShow] = useState(false);
  const toggleShow = () => setShow(s => !s);

  // Вибір іконки залежно від стану
  const Icon = show ? EyeOff : Eye; 
  
  return (
    <div className="relative">
      <Input
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        error={error}
        type={show ? "text" : "password"} 
        {...restProps} 
      />
      
      {/* Кнопка/Іконка для перемикання (використовуємо Lucide-іконку) */}
      <button 
        type="button" 
        onClick={toggleShow} 
        className="absolute right-3 top-1/2 transform -translate-y-[15px] p-2 text-gray-500 hover:text-gray-700 focus:outline-none" 
        aria-label={show ? 'Приховати пароль' : 'Показати пароль'}
      >
        {/* Рендерінг іконки з розміром 20 пікселів */}
        <Icon size={20} /> 
      </button>
    </div>
  );
};