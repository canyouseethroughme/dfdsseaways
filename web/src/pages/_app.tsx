import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react'
import { GlobalStyles } from '@dfds-ui/react-components'
import theme from '../theme'

function MyApp({ Component, pageProps }: any) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <ColorModeProvider
        options={{
          useSystemColorMode: true,
        }}
      >
        <GlobalStyles />
        <Component {...pageProps} />
      </ColorModeProvider>
    </ChakraProvider>
  )
}

export default MyApp
