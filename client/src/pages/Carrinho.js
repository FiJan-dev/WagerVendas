const Carrinho = () => {
  const items = [
    { id: 1, name: "Apple Watch", price: 1300.00 },
    { id: 2, name: "Apple Watch", price: 2000.00 }
  ];

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Seu Carrinho</h1>
      
      <div className="space-y-3">
        {items.map(item => (
          <div key={item.id} className="border-b pb-3">
            <p>{item.name}</p>
            <p className="text-gray-600">R$ {item.price.toFixed(2)}</p>
          </div>
        ))}
      </div>

      <button className="mt-6 w-full bg-green-600 text-white py-2 rounded">
        Comprar
      </button>
    </div>
  );
};

export default Carrinho;