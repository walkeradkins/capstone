import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './store';
import { ModalProvider } from './context/modal';
import SidebarProvider from './context/sidebar-context';
import WorkspaceProvider from './context/workspace-context';
import CardStateProvider from './context/card-state-context';
import LabelProvider from './context/label-context';

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <CardStateProvider>
        <WorkspaceProvider>
          <LabelProvider>
            <SidebarProvider>
              <ModalProvider>
                <App />
              </ModalProvider>
            </SidebarProvider>
          </LabelProvider>
        </WorkspaceProvider>
      </CardStateProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
