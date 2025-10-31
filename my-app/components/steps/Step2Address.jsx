// /components/steps/Step2Address.jsx
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

const SearchableSelect = ({ label, name, value, onChange, options, error }) => (
    <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        <select
            name={name}
            value={value}
            onChange={onChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        >
            <option value="" disabled>Оберіть місто...</option>
            {options.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
        </select>
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
);

const cityOptions = [
    { value: 'kyiv', label: 'Київ' },
    { value: 'lviv', label: 'Львів' },
    { value: 'ivano-frankivsk', label: 'Івано-Франківськ' },
];
// ----------------------------


const validateStep2 = (data) => {
    const errors = {};
    if (!data.city) errors.city = "Оберіть місто для доставки.";
    if (!data.street || data.street.length < 3) errors.street = "Введіть назву вулиці.";
    if (!data.house || data.house.length < 1) errors.house = "Введіть номер будинку.";
    if (data.apartment && isNaN(Number(data.apartment))) errors.apartment = "Має бути число.";
    if (!/^\d{5}$/.test(data.zip)) errors.zip = "Поштовий індекс має містити 5 цифр.";
    return errors;
};


export default function Step2Address({ data, updateData, nextStep, prevStep }) {
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        updateData({ [name]: value });
        setErrors(prev => ({ ...prev, [name]: '' }));
    };
    
    const handleCityChange = (e) => {
         const value = e.target.value; 
         updateData({ city: value });
         setErrors(prev => ({ ...prev, city: '' }));
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateStep2(data);
        setErrors(validationErrors);

        nextStep(Object.keys(validationErrors).length === 0);
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Тимчасовий вивід помилок для налагодження */}
            {/* <pre className="text-red-500 text-sm mb-4">Помилки: {JSON.stringify(errors, null, 2)}</pre> */}
            
            {/* Місто (Select з пошуком) */}
            <SearchableSelect
                label="Місто"
                name="city"
                value={data.city}
                onChange={handleCityChange}
                options={cityOptions}
                error={errors.city}
            />

            <Input 
                label="Вулиця" 
                name="street" 
                value={data.street} 
                onChange={handleChange} 
                error={errors.street} 
            />

            <div className="flex space-x-4">
                <div className="w-1/2">
                    <Input 
                        label="Будинок" 
                        name="house" 
                        value={data.house} 
                        onChange={handleChange} 
                        error={errors.house} 
                    />
                </div>
                <div className="w-1/2">
                    <Input 
                        label="Квартира" 
                        name="apartment" 
                        value={data.apartment} 
                        onChange={handleChange} 
                        error={errors.apartment} 
                        maxLength={5}
                    />
                </div>
            </div>

            <Input 
                label="Поштовий індекс" 
                name="zip" 
                value={data.zip} 
                onChange={handleChange} 
                error={errors.zip} 
                maxLength={5}
            />

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
                    // Кнопка неактивна, якщо є помилки
                    disabled={Object.keys(errors).length > 0} 
                >
                    Далі
                </Button>
            </div>
        </form>
    );
}