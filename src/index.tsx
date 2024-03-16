import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { setupStore } from './store/store';
import { AdaptivityProvider, ConfigProvider } from '@vkontakte/vkui';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const store = setupStore();

root.render(
  <ConfigProvider>
    <AdaptivityProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </AdaptivityProvider>
  </ConfigProvider>
);
