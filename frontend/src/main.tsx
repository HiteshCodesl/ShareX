import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
    <div className='bg-[#0a0a0a] h-screen w-screen'>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </div>
)
