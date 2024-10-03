import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import store from "./Redux/store.ts"
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
<Provider store={store}>
  <App />
</Provider>

)
