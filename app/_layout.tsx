import { Stack } from "expo-router";
import { ThemeProvider } from "styled-components";
import theme from '../src/Global/Styles/theme'
import { AuthContextProvider } from '../src/contexts/AuthContext'
import useAuth from '../src/hook/useAuth'

export default function RootLayout() {

  const { token } = useAuth()


  return ( 
  <AuthContextProvider>
    <ThemeProvider theme={theme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="home" />
      </Stack>
    </ThemeProvider>
  </AuthContextProvider>
  )
}
