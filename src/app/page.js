// app/page.jsx
export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-green-700">Zapatito</h1>
        <nav className="space-x-4">
          <a href="#inicio" className="text-gray-700 hover:text-green-600">
            Inicio
          </a>
          <a href="#productos" className="text-gray-700 hover:text-green-600">
            Productos
          </a>
          <a href="/login" className="text-gray-700 hover:text-green-600">
            iniciar sesiòn
          </a>
          <a href="/register" className="text-gray-700 hover:text-green-600">
            Registrarse
          </a>
        </nav>
      </header>

      {/* Hero Section */}
      <section
        id="inicio"
        className="text-center py-16 bg-green-50"
      >
        <h2 className="text-3xl font-bold text-green-800">
          Bienvenido a Zapatito 
        </h2>
        <p className="mt-4 text-gray-700">
          Encuentra los mejores tenis para correr del suegro.
        </p>
      </section>

      {/* Productos */}
      <section id="productos" className="p-8">
        <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Nuestros Productos
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          {/* Producto 1 */}
          <div className="bg-white p-4 rounded-lg shadow">
            <img
              src="https://images.unsplash.com/photo-1600185365926-3a2ce7de3aa3?auto=format&fit=crop&w=600&q=80"
              alt="Tenis deportivos"
              className="w-full h-40 object-cover rounded"
            />
            <h4 className="mt-4 font-semibold">Tenis Running</h4>
            <p className="text-gray-600">Cómodos y ligeros para correr.</p>
          </div>

          {/* Producto 2 */}
          <div className="bg-white p-4 rounded-lg shadow">
            <img
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80"
              alt="Tenis blancos"
              className="w-full h-40 object-cover rounded"
            />
            <h4 className="mt-4 font-semibold">Tenis Urban</h4>
            <p className="text-gray-600">Estilo urbano y moderno.</p>
          </div>

          {/* Producto 3 */}
          <div className="bg-white p-4 rounded-lg shadow">
            <img
              src="https://images.unsplash.com/photo-1616628182509-20f52a5fb6e0?auto=format&fit=crop&w=600&q=80"
              alt="Tenis negros"
              className="w-full h-40 object-cover rounded"
            />
            <h4 className="mt-4 font-semibold">Tenis Sport</h4>
            <p className="text-gray-600">Resistentes y cómodos para entrenar</p>
          </div>
        </div>
      </section>

     
    </main>
  );
}
