import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ConfigureIndexedDBs } from './services/IndexedDBService.js';

const broadcastChannel = new BroadcastChannel("sw_channel");
var sw;

window.addEventListener('load', async () => {
  if ('serviceWorker' in navigator) {
    try {
      sw = navigator.serviceWorker;
      var reg = await sw.register('../sw.js');

      console.log('Service worker register success', reg)
    } catch (e) {
      console.log('Service worker register fail')
    }

    broadcastChannel.addEventListener("message", ({ data }) => {
      console.log(data);
    });

  }

  ConfigureIndexedDBs()

  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
})