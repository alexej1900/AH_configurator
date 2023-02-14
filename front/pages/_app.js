import Layout from '../components/layout/layout';
import { PersistGate } from 'redux-persist/integration/react'
import  { store, persistor } from "../redux/store"
import { Provider } from 'react-redux';

import '../assets/scss/base/_reset.scss';
import '../assets/scss/layout/_grid.scss';
import '../assets/scss/base/_utilities.scss';
import '../assets/scss/base/_typography.scss';
import '../assets/scss/abstracts/_variables.scss';

export default function MyApp({ Component, pageProps }) {
  return  (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </PersistGate>
    </Provider>
  )
}
