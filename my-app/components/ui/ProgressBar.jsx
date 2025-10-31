// /components/ProgressBar.jsx
export default function ProgressBar({ progress }) {
  return (
    <div className="mb-8">
      <div className="text-sm font-medium text-gray-700 mb-1">
        Прогрес заповнення: {progress}%
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500 ease-out" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}