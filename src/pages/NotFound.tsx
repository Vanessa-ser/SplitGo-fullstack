import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="min-h-screen flex flex-center items-center justify-center flex-col text-white p-10 text-center">
    <h1 className="text-9xl font-black italic opacity-20">404</h1>
    <p className="text-xl font-black uppercase tracking-tighter mb-8">Te has perdido entre tantos gastos...</p>
    <Link to="/" className="bg-white text-olive-500 px-8 py-4 rounded-3xl font-black uppercase text-xs shadow-xl hover:scale-105 transition-transform">
      Volver a la ruta principal
    </Link>
  </div>
);

export default NotFound;