import React, { useState } from 'react';
import axios from 'axios';
import Notification from '../notifications/Notification';

const OrderTracking = () => {
  const [order_id, setOrderId] = useState('');

  const handleTrackOrder = async() => {
    try{
      const response = await axios.get(`http://localhost:3000/order/find_order/${order_id}`);
      if(response.data.success){
        alert(`Orden: ${response.data.order.order_id} Paciente: ${response.data.order.username}`);
      } else{
        alert("No se encontro una orden con el ID especificado");
      }
    } catch(error){
      alert("Error al buscar la orden");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Seguimiento de Pedido</h2>
      <input
        type="text"
        value={order_id}
        onChange={(e) => setOrderId(e.target.value)}
        placeholder="Introduce tu ID de pedido"
        className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white"
      />
      <button onClick={handleTrackOrder} className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white">
        Rastrear Pedido
      </button>
    </div>
  );
};

export default OrderTracking;
