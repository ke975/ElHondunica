import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Router } from "expo-router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const validateFields = () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Error", "Correo y contraseña son obligatorios");
      return false;
    }
    if (password.length < 6) {
      Alert.alert("Error", "La contraseña debe tener al menos 6 caracteres");
      return false;
    }
    return true;
  };

const handleLogin = async () => {
  try {
    await fetch("http://192.168.175.1/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    // Navegar a la tab Explore
    router.replace("/(tabs)/explore");
  } catch (error) {
    Alert.alert("Error", "No se pudo conectar con el servidor");
    console.error(error);
  }
};



  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#fff" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : StatusBar.currentHeight}
    >
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
          <Image
                 source={require("../assets/logo.jpeg")}
                 style={styles.image}
                 resizeMode="contain"
               />

        {/* Tabs */}
        <View style={styles.tabContainer}>
          <Text style={[styles.tab, styles.activeTab]}>Login</Text>
          <Link href="/register">
            <Text style={styles.tab}>Register</Text>
          </Link>
        </View>

        {/* Title */}
        <Text style={styles.title}>Bienvenido</Text>
        <Text style={styles.subtitle}>Ingresa a tu cuenta</Text>
          <Link href="/(tabs)/explore">
            <Text style={styles.tab}>Dashboard</Text>
          </Link>

        {/* Inputs */}
        <TextInput
          style={styles.input}
          placeholder="Correo Electrónico"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, { flex: 1, marginBottom: 0 }]}
            placeholder="Contraseña"
            value={password}
            secureTextEntry={!showPassword}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeIcon}
          >
            <Text>{showPassword ? "🙈" : "👁️"}</Text>
          </TouchableOpacity>
        </View>

        {/* Login Button */}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Ingresar</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 60,
  },
  image: {
    width: 140,
    height: 140,
    marginBottom: 30,
    borderRadius: 70,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 25,
  },
  tab: {
    fontSize: 16,
    marginHorizontal: 25,
    fontWeight: "600",
    color: "#888",
  },
  activeTab: {
    color: "#009245",
    borderBottomWidth: 2,
    borderBottomColor: "#009245",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    width: 320,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 14,
    marginBottom: 15,
    fontSize: 14,
    backgroundColor: "#f5f5f5",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    marginBottom: 20,
    width: 320,
    backgroundColor: "#f5f5f5",
  },
  eyeIcon: {
    padding: 12,
  },
  loginButton: {
    backgroundColor: "#009245",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginVertical: 10,
    width: 320,
  },
  loginButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
