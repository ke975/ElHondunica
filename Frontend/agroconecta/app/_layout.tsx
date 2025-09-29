import { Stack } from "expo-router";
import React, { useContext } from "react";
import { ActivityIndicator, View } from "react-native";
import { AuthContext, AuthProvider } from "../context/AuthContext";

function Root() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {user ? (
        <Stack.Screen name="(tabs)" />  // Pantalla principal
      ) : (
        <Stack.Screen name="login" />   // Login (archivo login.tsx)
      )}
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <Root />
    </AuthProvider>
  );
}
