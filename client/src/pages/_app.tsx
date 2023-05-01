import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { createTheme, NextUIProvider, Text } from "@nextui-org/react"

const theme = createTheme({
  type: "light", // it could be "light" or "dark"
  theme: {
    colors: {
      primary: "#0e4735",
      secondary: "#ab1d41",
      tertiary: "#142850",
      background: "#f2f2f2",
      text: "#333",
      white: "#fff",
      black: "#000",
      gray: "#888",
      success: "#4bb543",
      warning: "#ffc107",
      error: "#dc3545",
      info: "#17a2b8",

      gradient: 'linear-gradient(112deg, $blue100 -25%, $pink500 -10%, $purple500 80%)',
      link: '#5E1DAD',

      // you can also create your own color
      myColor: '#ff4ecd'

    },
    space: {},
    fonts: {}
  }
})

function App({ Component, pageProps }: AppProps) {
  return (
    // 2. Use at the root of your app
    <NextUIProvider theme={theme}>
      <Component {...pageProps} />
    </NextUIProvider>
  );
}

export default App;