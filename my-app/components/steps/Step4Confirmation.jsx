// /components/steps/Step4Confirmation.jsx
// --- Заглушки компонентів ---
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

const FieldDisplay = ({ label, value, onEdit }) => (
  <div className="flex justify-between items-center py-2 border-b">
    <span className="font-semibold text-gray-600">{label}:</span>
    <span className="text-gray-900">{value}</span>
    {onEdit && (
      <button 
        onClick={onEdit} 
        className="text-indigo-600 hover:text-indigo-800 text-sm ml-4"
      >
        Змінити
      </button>
    )}
  </div>
);

export default function Step4Confirmation({ data, prevStep, goToStep }) {
  
  const handleConfirm = () => {
    alert('Замовлення оформлено! Дані в консолі.');
    console.log('FINAL ORDER DATA:', data);
    
    if (typeof window !== 'undefined') {
        sessionStorage.removeItem('multiStepFormData');
        sessionStorage.removeItem('multiStepFormStep');
    }
    // Тут має бути логіка відправки даних на сервер
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Перевірте дані замовлення</h3>
      
      {/* Крок 1: Особисті дані */}
      <h4 className="font-semibold mt-4 mb-2 text-indigo-700">Особисті дані</h4>
      <FieldDisplay label="Ім'я" value={`${data.name} ${data.surname}`} onEdit={() => goToStep(1)} />
      <FieldDisplay label="Email" value={data.email} onEdit={() => goToStep(1)} />
      <FieldDisplay label="Телефон" value={data.phone} onEdit={() => goToStep(1)} />

      {/* Крок 2: Адреса */}
      <h4 className="font-semibold mt-4 mb-2 text-indigo-700">Адреса доставки</h4>
      <FieldDisplay label="Місто" value={data.city || 'Не вказано'} onEdit={() => goToStep(2)} />
      <FieldDisplay label="Вулиця" value={data.street} onEdit={() => goToStep(2)} />
      <FieldDisplay label="Будинок/Кв." value={`${data.house}/${data.apartment}`} onEdit={() => goToStep(2)} />
      <FieldDisplay label="Індекс" value={data.zip} onEdit={() => goToStep(2)} />

      {/* Крок 3: Оплата */}
      <h4 className="font-semibold mt-4 mb-2 text-indigo-700">Спосіб оплати</h4>
      <FieldDisplay label="Метод" value={data.paymentMethod} onEdit={() => goToStep(3)} />
      {data.paymentMethod === 'card' && (
        <FieldDisplay label="Карта" value={`**** **** **** ${data.cardNumber.slice(-4)}`} />
      )}
      
      <div className="flex justify-between mt-8 space-x-4">
        <Button onClick={prevStep} className="bg-gray-500 hover:bg-gray-600 w-1/3">Назад</Button>
        <Button onClick={handleConfirm} className="bg-green-600 hover:bg-green-700 w-2/3">Підтвердити замовлення</Button>
      </div>
    </div>
  );
}