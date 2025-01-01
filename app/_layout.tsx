import { Stack } from "expo-router";
import { ThemeProvider } from "styled-components";
import theme from '../src/Global/Styles/theme'

export default function RootLayout() {
  return ( 

  <ThemeProvider theme={theme}>
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
    </Stack>
  </ThemeProvider>
  )
}
