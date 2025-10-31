// /components/ui/MultiStepForm.jsx
"use client";

import { useState, useEffect } from 'react';

// 👇 ВИПРАВЛЕНО: Коректні імпорти відповідно до структури:
// Крокам та ProgressBar потрібен шлях на один рівень вище ('..')
import ProgressBar from '../ProgressBar'; 
import Step1Personal from '../steps/Step1Personal';
import Step2Address from '../steps/Step2Address';
import Step3Payment from '../steps/Step3Payment';
import Step4Confirmation from '../steps/Step4Confirmation';


// Встановіть початковий стан форми
const initialFormData = {
  // Крок 1
  name: '',
  surname: '',
  email: '',
  phone: '',
  // Крок 2
  city: '', 
  street: '',
  house: '',
  apartment: '',
  zip: '',
  // Крок 3
  paymentMethod: 'cash', 
  cardNumber: '',
  expiryDate: '',
  cvv: '',
};

// Функція для отримання збережених даних із sessionStorage (викликається ТІЛЬКИ на клієнті)
const getSavedState = () => {
  if (typeof window !== 'undefined') {
    const savedData = sessionStorage.getItem('multiStepFormData');
    const savedStep = sessionStorage.getItem('multiStepFormStep');
    return {
      formData: savedData ? JSON.parse(savedData) : initialFormData,
      currentStep: savedStep ? parseInt(savedStep) : 1,
    };
  }
  return { formData: initialFormData, currentStep: 1 };
};


export default function MultiStepForm() {
  // 🚨 ВИПРАВЛЕННЯ HYDRATION: Ініціалізуємо стан значеннями за замовчуванням (currentStep: 1)
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState(initialFormData);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMounted, setIsMounted] = useState(false); // Для відкладеної гідратації
  
  const totalSteps = 4;

  // 1. Завантаження стану з sessionStorage після гідратації (ТІЛЬКИ КЛІЄНТ)
  useEffect(() => {
    const savedState = getSavedState();
    setCurrentStep(savedState.currentStep);
    setData(savedState.formData);
    setIsMounted(true); // Форма готова до відображення
  }, []); 

  // 2. Збереження прогресу в sessionStorage
  useEffect(() => {
    if (isMounted) { 
      sessionStorage.setItem('multiStepFormData', JSON.stringify(data));
      sessionStorage.setItem('multiStepFormStep', currentStep.toString());
    }
  }, [data, currentStep, isMounted]);

  // Функція оновлення даних
  const updateData = (fields) => {
    setData(prev => ({ ...prev, ...fields }));
  };
  
  // Функція переходу до наступного кроку
  const nextStep = (isValid) => {
    if (isValid && currentStep < totalSteps) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(prev => prev + 1);
        setIsAnimating(false);
      }, 300); 
    }
  };
  
  // Функція повернення назад
  const prevStep = () => {
    if (currentStep > 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(prev => prev - 1);
        setIsAnimating(false);
      }, 300);
    }
  };
  
  // Функція для переходу до будь-якого кроку (для Step 4)
  const goToStep = (step) => {
    if (step >= 1 && step <= totalSteps) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(step);
        setIsAnimating(false);
      }, 300);
    }
  };

  // Визначення поточного контенту кроку
  const StepComponent = [
    null, 
    Step1Personal,
    Step2Address,
    Step3Payment,
    Step4Confirmation,
  ][currentStep];

  const progress = Math.round((currentStep / totalSteps) * 100);
  
  // 🚨 Обробка стану завантаження під час Hydration
  if (!isMounted) {
      return (
          <div className="max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-2xl" 
               style={{ minHeight: '400px' }}>
              <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
                Завантаження форми...
              </h2>
          </div>
      );
  }

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-2xl">
      
      {/* Прогрес-бар */}
      <ProgressBar progress={progress} />
      
      <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
        Замовлення: Крок {currentStep} з {totalSteps}
      </h2>

      {/* Анімовані переходи */}
      <div 
        className={`relative transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}
        style={{ minHeight: '400px' }} 
      >
        {StepComponent && (
          <StepComponent 
            data={data} 
            updateData={updateData} 
            nextStep={nextStep} 
            prevStep={prevStep}
            goToStep={goToStep} 
          />
        )}
      </div>

    </div>
  );
}