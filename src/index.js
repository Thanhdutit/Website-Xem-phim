import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GlobalContextProvider } from './context/global';
import GlobalStyle from './Gloabalstyle';
import "./index.css";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'aos';
import 'aos/dist/aos.css';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <GlobalContextProvider>
      <App />
    </GlobalContextProvider>
  </React.StrictMode>
);
