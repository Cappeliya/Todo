import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { AppWithRedux } from './AppWithRedux'
import { Provider } from 'react-redux'
import { store } from './state/store'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <AppWithRedux />
    </Provider>
  </React.StrictMode>,
)
