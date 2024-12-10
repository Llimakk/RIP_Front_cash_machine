import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter} from "react-router-dom";
import { Provider } from 'react-redux'; 
import {store} from './store.ts';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
      <BrowserRouter basename="/Front_cash_machine/">
          <App />
      </BrowserRouter>
  </Provider>
)

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register("/serviceWorker.js")
      .then(res => console.log("service worker11111111111", res))
      .catch(err => console.log("service worker not registered", err))
  })
}