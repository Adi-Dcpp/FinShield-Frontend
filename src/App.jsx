import './App.css';
import { AppRouter } from './routes/Router';
import { RouterProvider } from 'react-router-dom';

function App() {
  return (
    <main className="theme-page">
      <RouterProvider router={AppRouter} />
    </main>
  );
}

export default App;