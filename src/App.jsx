import './App.css';
import { AppRouter } from './routes/Router';
import { RouterProvider } from 'react-router-dom';

function App() {
  return (
    <RouterProvider router={AppRouter} />
  );
}

export default App;