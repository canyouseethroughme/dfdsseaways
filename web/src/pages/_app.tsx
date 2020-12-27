import { ThemeProvider, CSSReset } from '@chakra-ui/core'
import { GlobalStyles } from '@dfds-ui/react-components'
import theme from '../theme'

function MyApp({ Component, pageProps }: any) {
  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <GlobalStyles />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
