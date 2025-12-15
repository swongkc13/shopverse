import { useState, useEffect } from "react";
import Login from "./components/Login";
import Register from "./components/Register";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
}

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [showRegister, setShowRegister] = useState(false);

  const fetchProducts = async () => {
    const res = await fetch("http://localhost:5000/api/products");
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (!token) {
    return showRegister ? (
      <>
        <Register onRegister={(t, r) => { setToken(t); setRole(r); }} />
        <p className="text-center mt-2">
          Already have an account?{" "}
          <button className="text-blue-500" onClick={() => setShowRegister(false)}>
            Login
          </button>
        </p>
      </>
    ) : (
      <>
        <Login onLogin={(t, r) => { setToken(t); setRole(r); }} />
        <p className="text-center mt-2">
          Don't have an account?{" "}
          <button className="text-blue-500" onClick={() => setShowRegister(true)}>
            Register
          </button>
        </p>
      </>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">ShopVerse Products</h1>
        <div>
          <p>Logged in as: {role}</p>
          <button
            onClick={() => { setToken(null); setRole(null); }}
            className="mt-1 text-sm text-red-500"
          >
            Logout
          </button>
        </div>
      </header>

      {products.length === 0 && <p>No products found.</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border rounded p-4 shadow">
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-700">{product.description}</p>
            <p className="mt-2 font-bold">${product.price.toFixed(2)}</p>
            <p className="text-sm text-gray-500">Stock: {product.stock}</p>
          </div>
        ))}
      </div>

      {role === "admin" && (
        <div className="mt-6 p-4 border rounded bg-gray-50">
          <h3 className="font-semibold mb-2">Add Product</h3>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const formData = new FormData(form);
              const product = {
                name: formData.get("name"),
                description: formData.get("description"),
                price: parseFloat(formData.get("price") as string),
                stock: parseInt(formData.get("stock") as string),
              };

              const res = await fetch("http://localhost:5000/api/products", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(product),
              });

              if (res.ok) {
                fetchProducts(); // refresh product list
                form.reset();
              } else {
                alert("Failed to add product");
              }
            }}
            className="space-y-2"
          >
            <input
              name="name"
              placeholder="Name"
              className="border p-2 rounded w-full"
              required
            />
            <input
              name="description"
              placeholder="Description"
              className="border p-2 rounded w-full"
            />
            <input
              name="price"
              type="number"
              step="0.01"
              placeholder="Price"
              className="border p-2 rounded w-full"
              required
            />
            <input
              name="stock"
              type="number"
              placeholder="Stock"
              className="border p-2 rounded w-full"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
            >
              Add Product
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;
