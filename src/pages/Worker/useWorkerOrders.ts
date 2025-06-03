
import { useState, useEffect } from 'react';
import { toast } from "@/hooks/use-toast";

export interface WorkerOrder {
  id: number;
  customerName: string;
  customerPhone: string;
  deliveryAddress?: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
    notes?: string;
  }>;
  total: number;
  status: 'pending' | 'accepted' | 'preparing' | 'completed' | 'cancelled';
  createdAt: string;
  estimatedTime: number;
  paymentMethod: string;
  notes?: string;
}

export const useWorkerOrders = () => {
  const [orders, setOrders] = useState<WorkerOrder[]>([
    {
      id: 1001,
      customerName: "Іван Петренко",
      customerPhone: "+380501234567",
      deliveryAddress: "вул. Хрещатик, 10, кв. 5",
      items: [
        { name: "Маргарита", quantity: 2, price: 289 },
        { name: "Кока-Кола 0.5л", quantity: 2, price: 45 }
      ],
      total: 668,
      status: 'pending',
      createdAt: new Date().toISOString(),
      estimatedTime: 25,
      paymentMethod: "Готівка",
      notes: "Додати більше сиру, будь ласка"
    },
    {
      id: 1002,
      customerName: "Марія Коваленко",
      customerPhone: "+380672345678",
      deliveryAddress: "вул. Володимирська, 15А",
      items: [
        { name: "Делюкс Чізбургер", quantity: 1, price: 199 },
        { name: "Картопля фрі", quantity: 1, price: 89 },
        { name: "Лимонад", quantity: 1, price: 55 }
      ],
      total: 343,
      status: 'accepted',
      createdAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
      estimatedTime: 20,
      paymentMethod: "Карткою"
    },
    {
      id: 1003,
      customerName: "Олексій Мельник",
      customerPhone: "+380503456789",
      items: [
        { name: "Цезар з куркою", quantity: 1, price: 165 },
        { name: "Сік апельсиновий", quantity: 1, price: 65 }
      ],
      total: 230,
      status: 'preparing',
      createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      estimatedTime: 15,
      paymentMethod: "Готівка"
    },
    {
      id: 1004,
      customerName: "Анна Сидоренко",
      customerPhone: "+380674567890",
      deliveryAddress: "вул. Саксаганського, 25",
      items: [
        { name: "Піца Пепероні", quantity: 1, price: 315 },
        { name: "Тірамісу", quantity: 1, price: 125 }
      ],
      total: 440,
      status: 'completed',
      createdAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
      estimatedTime: 30,
      paymentMethod: "Карткою"
    }
  ]);

  const pendingOrders = orders.filter(order => order.status === 'pending');
  const activeOrders = orders.filter(order => 
    order.status === 'accepted' || order.status === 'preparing'
  );
  const completedOrders = orders.filter(order => 
    order.status === 'completed' || order.status === 'cancelled'
  );

  const acceptOrder = (orderId: number) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { ...order, status: 'accepted' as const }
        : order
    ));
    
    toast({
      title: "Замовлення прийнято",
      description: `Замовлення #${orderId} було успішно прийнято`,
    });
  };

  const cancelOrder = (orderId: number) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { ...order, status: 'cancelled' as const }
        : order
    ));
    
    toast({
      title: "Замовлення скасовано",
      description: `Замовлення #${orderId} було скасовано`,
      variant: "destructive"
    });
  };

  const completeOrder = (orderId: number) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { ...order, status: 'completed' as const }
        : order
    ));
    
    toast({
      title: "Замовлення виконано",
      description: `Замовлення #${orderId} позначено як виконане`,
    });
  };

  const getOrderById = (orderId: number | null) => {
    if (!orderId) return null;
    return orders.find(order => order.id === orderId) || null;
  };

  // Симуляція отримання нових замовлень
  useEffect(() => {
    const interval = setInterval(() => {
      // Іноді додаємо нове замовлення для демонстрації
      if (Math.random() > 0.95) {
        const newOrder: WorkerOrder = {
          id: Date.now(),
          customerName: "Новий клієнт",
          customerPhone: "+380501111111",
          deliveryAddress: "вул. Нова, 1",
          items: [
            { name: "Тестова страва", quantity: 1, price: 150 }
          ],
          total: 150,
          status: 'pending',
          createdAt: new Date().toISOString(),
          estimatedTime: 20,
          paymentMethod: "Карткою"
        };
        
        setOrders(prev => [newOrder, ...prev]);
        
        toast({
          title: "Нове замовлення!",
          description: `Отримано замовлення #${newOrder.id}`,
        });
      }
    }, 30000); // Перевіряємо кожні 30 секунд

    return () => clearInterval(interval);
  }, []);

  return {
    orders,
    pendingOrders,
    activeOrders,
    completedOrders,
    acceptOrder,
    cancelOrder,
    completeOrder,
    getOrderById
  };
};
