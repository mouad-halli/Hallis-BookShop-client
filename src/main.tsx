import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import './index.css';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { router } from './pages/Router';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
      <RouterProvider router={router} >
        <App />
      </RouterProvider>
  </Provider>
)
