import { Container, NextUIProvider } from '@nextui-org/react';
import Navbar from 'components/common/Navbar';
import { AppContextProvider } from 'contexts/AppContext';
import { SessionProvider } from 'next-auth/react'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (<SessionProvider>
    <NextUIProvider>
      <AppContextProvider>
        <Container
          css={{
            padding: 10
          }}
          sm
        >
          <Navbar />
          <Component {...pageProps} />
        </Container>
      </AppContextProvider>
    </NextUIProvider>
  </SessionProvider>)
}

export default MyApp
