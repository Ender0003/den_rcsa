// /app/order/page.js
"use client"

// 👇 ВИПРАВЛЕНО: Правильний імпорт компонента за замовчуванням та шлях
import MultiStepForm from '@/components/ui/MultiStepForm'; 

export default function OrderPage() {
  return <MultiStepForm />;
}