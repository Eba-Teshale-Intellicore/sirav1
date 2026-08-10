import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";
import QueryProvider from "@/services/src/providers/QueryProvider";
import { AuthProvider } from "@/context/AuthContext";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <QueryProvider>
      <AuthProvider>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            {/* <Stack.Screen
            name="(tabs)/profile.tsx"
            options={{ headerShown: false }}
          /> */}
            <Stack.Screen
              name="categories"
              options={{
                headerShown: false,
                title: "Categories",
              }}
            />
            <Stack.Screen
              name="category/[id]"
              options={{ headerShown: false, title: "detail Categories" }}
            />

            <Stack.Screen name="services" options={{ headerShown: false }} />
            <Stack.Screen
              name="service/[id]"
              options={{ title: "detail Service", headerShown: false }}
            />
            <Stack.Screen
              name="modal"
              options={{ presentation: "modal", title: "Modal" }}
            />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </AuthProvider>
    </QueryProvider>
  );
}
