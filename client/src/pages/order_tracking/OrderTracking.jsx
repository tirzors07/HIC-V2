import React, { useState } from 'react';
import Notification from '../notifications/Notification';

const OrderTracking = () => {
  const [orderId, setOrderId] = useState('');
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);

  const handleTrackOrder = () => {
    // Simulación de seguimiento de pedido
    if (orderId) {
      const mockData = {
        '123': 'En preparación',
        '456': 'En camino',
        '789': 'Entregado'
      };
      setStatus(mockData[orderId] || 'Pedido no encontrado');
      setError(null);
    } else {
      setError('Por favor, introduce un ID de pedido.');
      setStatus(null);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Seguimiento de Pedido</h2>
      <input
        type="text"
        value={orderId}
        onChange={(e) => setOrderId(e.target.value)}
        placeholder="Introduce tu ID de pedido"
        className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white"
      />
      <button onClick={handleTrackOrder} className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white"
      >Rastrear Pedido</button>
      {error && <Notification message={error} type="error" />}
      {status && <Notification message={`Estado: ${status}`} type="success" />}
    </div>
  );
};

export default OrderTracking;
