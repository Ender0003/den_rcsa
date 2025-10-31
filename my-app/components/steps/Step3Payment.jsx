// /components/steps/Step3Payment.jsx
import { useState } from 'react';

// --- Заглушки компонентів ---
const Input = ({ label, name, value, onChange, error, type = 'text', maxLength }) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input 
        type={type} 
        name={name} 
        value={value} 
        onChange={onChange} 
        maxLength={maxLength}
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

const RadioGroup = ({ label, name, options, selectedValue, onChange }) => (
    <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
        {options.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
                <input
                    type="radio"
                    id={option.value}
                    name={name}
                    value={option.value}
                    checked={selectedValue === option.value}
                    onChange={onChange}
                    className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                />
                <label htmlFor={option.value} className="text-sm font-medium text-gray-700">
                    {option.label}
                </label>
            </div>
        ))}
    </div>
);
// ----------------------------


const paymentOptions = [
    { label: 'Готівка при отриманні', value: 'cash' },
    { label: 'Банківська картка', value: 'card' },
    { label: 'PayPal', value: 'paypal' },
];

const validateStep3 = (data) => {
    const errors = {};
    if (!data.paymentMethod) {
        errors.paymentMethod = "Оберіть спосіб оплати.";
    }

    if (data.paymentMethod === 'card') {
        if (!/^\d{16}$/.test(data.cardNumber)) errors.cardNumber = "Номер картки має містити 16 цифр.";
        if (!/^\d{2}\/\d{2}$/.test(data.expiryDate)) errors.expiryDate = "Некоректний термін (MM/YY).";
        if (!/^\d{3}$/.test(data.cvv)) errors.cvv = "CVV має містити 3 цифри.";
    }
    return errors;
};


export default function Step3Payment({ data, updateData, nextStep, prevStep }) {
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        updateData({ [e.target.name]: e.target.value });
        setErrors(prev => ({ ...prev, [e.target.name]: '' }));
    };

    const handleRadioChange = (e) => {
        const newMethod = e.target.value;
        const updates = { paymentMethod: newMethod };
        
        if (newMethod !== 'card') {
            updates.cardNumber = '';
            updates.expiryDate = '';
            updates.cvv = '';
        }

        updateData(updates);
        setErrors({}); 
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateStep3(data);
        setErrors(validationErrors);

        nextStep(Object.keys(validationErrors).length === 0);
    };

    const isCardSelected = data.paymentMethod === 'card';

    return (
        <form onSubmit={handleSubmit}>
            
            {/* 1. Вибір способу оплати */}
            <RadioGroup
                label="Спосіб оплати"
                name="paymentMethod"
                options={paymentOptions}
                selectedValue={data.paymentMethod}
                onChange={handleRadioChange}
            />

            {/* 2. УМОВНІ ПОЛЯ ДЛЯ КАРТКИ */}
            {isCardSelected && (
                <div className="mt-4 p-4 border rounded-lg bg-gray-50">
                    <h4 className="font-semibold mb-3">Дані картки</h4>
                    <Input 
                        label="Номер картки" 
                        name="cardNumber" 
                        value={data.cardNumber} 
                        onChange={handleChange} 
                        error={errors.cardNumber} 
                        type="text"
                        maxLength={16}
                    />
                    <div className="flex space-x-4">
                        <div className="w-1/2">
                            <Input 
                                label="Термін дії (MM/YY)" 
                                name="expiryDate" 
                                value={data.expiryDate} 
                                onChange={handleChange} 
                                error={errors.expiryDate} 
                                type="text"
                                maxLength={5}
                            />
                        </div>
                        <div className="w-1/2">
                            <Input 
                                label="CVV" 
                                name="cvv" 
                                value={data.cvv} 
                                onChange={handleChange} 
                                error={errors.cvv} 
                                type="password" 
                                maxLength={3}
                            />
                        </div>
                    </div>
                </div>
            )}

            <div className="flex justify-between mt-6 space-x-4">
                <Button 
                    onClick={prevStep} 
                    className="bg-gray-500 hover:bg-gray-600 w-1/3"
                >
                    Назад
                </Button>
                <Button 
                    type="submit" 
                    className="w-2/3"
                    disabled={Object.keys(errors).length > 0} 
                >
                    Далі
                </Button>
            </div>
        </form>
    );
}