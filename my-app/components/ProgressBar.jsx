// /components/ProgressBar.jsx

export default function ProgressBar({ progress }) {
  const normalizedProgress = Math.min(100, Math.max(0, progress));

  return (
    <div className="mb-8">
      {/* Текстове відображення відсотка */}
      <div className="text-sm font-medium text-gray-700 mb-1 text-center">
        Прогрес заповнення: {normalizedProgress}%
      </div>
      
      {/* Контейнер прогрес-бару */}
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        
        {/* Анімована смуга прогресу */}
        <div 
          className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500 ease-out" 
          style={{ width: `${normalizedProgress}%` }}
        ></div>
      </div>
    </div>
  );
}