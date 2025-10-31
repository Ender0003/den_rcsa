// /components/steps/Step1Personal.jsx
import { useState } from 'react';

// --- Заглушки компонентів ---
const Input = ({ label, name, value, onChange, error, type = 'text' }) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input 
        type={type} 
        name={name} 
        value={value} 
        onChange={onChange} 
        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
);
const Button = ({ children, onClick, disabled = false, type = 'button', className = '' }) => (
    <button 
      onClick={onClick} 
      type={type}
      disabled={disabled}
      className={`w-full py-2 px-4 rounded-md text-white font-semibold transition duration-200 ${className} ${disabled ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'}`}
    >
      {children}
    </button>
);
// ----------------------------

const validateStep1 = (data) => {
  const errors = {};
  if (!data.name || data.name.length < 2) errors.name = "Введіть ім'я (мін. 2 симв.)";
  if (!data.surname || data.surname.length < 2) errors.surname = "Введіть прізвище";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = "Некоректний Email";
  if (!/^\d{10}$/.test(data.phone)) errors.phone = "Некоректний телефон (10 цифр)";
  return errors;
};

export default function Step1Personal({ data, updateData, nextStep }) {
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    updateData({ [e.target.name]: e.target.value });
    setErrors(prev => ({ ...prev, [e.target.name]: '' })); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateStep1(data);
    setErrors(validationErrors);

    nextStep(Object.keys(validationErrors).length === 0);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input label="Ім'я" name="name" value={data.name} onChange={handleChange} error={errors.name} />
      <Input label="Прізвище" name="surname" value={data.surname} onChange={handleChange} error={errors.surname} />
      <Input label="Email" name="email" value={data.email} onChange={handleChange} error={errors.email} />
      <Input label="Телефон" name="phone" value={data.phone} onChange={handleChange} error={errors.phone} />
      
      <div className="mt-6">
        <Button type="submit">Далі</Button>
      </div>
    </form>
  );
}