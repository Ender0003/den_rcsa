// /app/registration/page.js

"use client"
import { useState } from "react";
import { Input } from "@/components/ui/input";
// Іменований імпорт (як ми виправляли раніше)
import { Button } from "@/components/ui/button"; 
// 👇 НОВИЙ ІМПОРТ
import { PasswordInput } from "@/components/ui/PasswordInput"; 


export default function Registration() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  // Функція валідації (викликається лише при відправці)
  const validate = () => {
    const newErrors = {};

    if (form.name.trim().length < 2) {
      newErrors.name = "Ім'я має містити щонайменше 2 символи.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Введіть коректний email.";
    }

    if (
      form.password.length < 8 ||
      !/[A-Z]/.test(form.password) ||
      !/\d/.test(form.password)
    ) {
      newErrors.password =
        "Пароль має містити щонайменше 8 символів, 1 велику літеру та 1 цифру.";
    }

    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Паролі не збігаються.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(false);
    if (validate()) {
      setSuccess(true);
      console.log("✅ Дані форми:", form);
      // Очищення форми при успіху
      setForm({ name: "", email: "", password: "", confirmPassword: "" }); 
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedForm = { ...form, [name]: value };
    
    // 1. Оновлення стану форми
    setForm(updatedForm);
    
    // 2. Очищення поточної помилки
    let currentErrors = { ...errors, [name]: "" };
    
    // 3. Додаткова валідація для швидкої реакції кнопки
    // Перевіряємо помилки, які могли виникнути при зміні.
    if (name === 'password' || name === 'confirmPassword') {
        if (updatedForm.password !== updatedForm.confirmPassword) {
            currentErrors.confirmPassword = "Паролі не збігаються.";
        } else {
            // Видаляємо помилку неспівпадіння, якщо паролі збігаються
            delete currentErrors.confirmPassword;
        }

        if (name === 'password') {
            if (updatedForm.password.length < 8 || !/[A-Z]/.test(updatedForm.password) || !/\d/.test(updatedForm.password)) {
                // Якщо є помилка валідації пароля
                currentErrors.password = "Пароль має містити щонайменше 8 символів, 1 велику літеру та 1 цифру.";
            } else {
                // Видаляємо помилку, якщо пароль став коректним
                delete currentErrors.password;
            }
        }
    }
    setErrors(currentErrors);
  };


  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-2xl shadow-md bg-white">
      <h1 className="text-2xl font-bold mb-6 text-center">Реєстрація</h1>
      
      {/* Тимчасовий вивід помилок для налагодження */}
      {/* <pre className="text-red-500 text-sm mb-4">{JSON.stringify(errors, null, 2)}</pre> */}

      <form onSubmit={handleSubmit}>
        <Input
          label="Ім'я"
          name="name"
          value={form.name}
          onChange={handleChange}
          error={errors.name}
        />
        <Input
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          error={errors.email}
        />
        
        {/* 👇 ВИКОРИСТАННЯ PasswordInput */}
        <PasswordInput
          label="Пароль"
          name="password"
          value={form.password}
          onChange={handleChange}
          error={errors.password}
        />
        <PasswordInput
          label="Підтвердження пароля"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
        />
        {/* 👆 БЕЗ isPasswordToggle, showPassword і т.д. */}

        <Button 
          type="submit" 
          // Кнопка неактивна, якщо є будь-які помилки
          disabled={Object.keys(errors).some(key => errors[key] !== "")}
        >
          Зареєструватися
        </Button>

        {success && (
          <p className="text-green-600 text-center mt-4">
            ✅ Реєстрація успішна!
          </p>
        )}
      </form>
    </div>
  );
}