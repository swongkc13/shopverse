import { useEffect, useState } from 'react';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
}

function App() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">ShopVerse Products</h1>
      {products.length === 0 && <p>No products found.</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {products.map(product => (
          <div key={product.id} className="border rounded p-4 shadow">
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-700">{product.description}</p>
            <p className="mt-2 font-bold">${product.price.toFixed(2)}</p>
            <p className="text-sm text-gray-500">Stock: {product.stock}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
