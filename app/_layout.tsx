import { Stack } from "expo-router";
import { ThemeProvider } from "styled-components";
import theme from "../src/Global/Styles/theme";
import { AuthContextProvider } from "../src/contexts/AuthContext";

export default function RootLayout() {
  return (
    <AuthContextProvider>
      <ThemeProvider theme={theme}>
        <Stack screenOptions={{ headerShown: false }} />
        {/* <Stack.Screen name="/home" /> */}
      </ThemeProvider>
    </AuthContextProvider>
  );
}
