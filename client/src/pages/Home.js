import React from 'react';
import AppleWatch from '../assets/images/applewatch.jpeg';

function ItemCard({ item }) {
  return (
    <div className="border rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-32 object-cover rounded-md mb-2"
      />
      <h2 className="text-lg font-semibold">{item.name}</h2>
      <p className="text-green-600 font-bold">{item.price}</p>
    </div>
  );
}

function Home() {
  const items = [
    { id: 1, name: 'Apple Watch', price: 'R$ 500,00', image: AppleWatch },
    { id: 2, name: 'Apple Watch', price: 'R$ 600,00', image: AppleWatch },
    { id: 3, name: 'Apple Watch', price: 'R$ 700,00', image: AppleWatch },
    { id: 4, name: 'Apple Watch', price: 'R$ 800,00', image: AppleWatch },
    { id: 5, name: 'Apple Watch', price: 'R$ 900,00', image: AppleWatch },
    { id: 6, name: 'Apple Watch', price: 'R$ 1.000,00', image: AppleWatch },
    { id: 7, name: 'Apple Watch', price: 'R$ 1.100,00', image: AppleWatch },
    { id: 8, name: 'Apple Watch', price: 'R$ 1.200,00', image: AppleWatch },
    { id: 9, name: 'Apple Watch', price: 'R$ 1.300,00', image: AppleWatch },
    { id: 10, name: 'Apple Watch', price: 'R$ 1.400,00', image: AppleWatch },
    { id: 11, name: 'Apple Watch', price: 'R$ 1.500,00', image: AppleWatch },
    { id: 12, name: 'Apple Watch', price: 'R$ 1.600,00', image: AppleWatch },
    { id: 13, name: 'Apple Watch', price: 'R$ 1.700,00', image: AppleWatch },
    { id: 14, name: 'Apple Watch', price: 'R$ 1.800,00', image: AppleWatch },
    { id: 15, name: 'Apple Watch', price: 'R$ 1.900,00', image: AppleWatch },
    { id: 16, name: 'Apple Watch', price: 'R$ 2.000,00', image: AppleWatch },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Itens à venda</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default Home;