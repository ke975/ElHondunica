import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { sendToGemini } from "../../lib/aiServices";
import { auth } from "../../lib/firebase";
import { signOut } from "firebase/auth";
import { MaterialIcons } from "@expo/vector-icons";

export default function Noha({ navigation }) {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setResponse("");

    try {
      const currentUser = auth.currentUser;
      if (!currentUser) throw new Error("Usuario no autenticado");

      const message = await sendToGemini(currentUser.uid, query);
      setResponse(message);
    } catch (error) {
      console.error("Error en la vista:", error);
      setResponse(error.message || "Error al enviar la consulta.");
    } finally {
      setLoading(false);
      setQuery("");
    }
  };

  const handleLogout = async () => {
    Alert.alert("Cerrar sesión", "¿Deseas salir de tu cuenta?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Sí, salir",
        style: "destructive",
        onPress: async () => {
          try {
            await signOut(auth);
            navigation.replace("Login");
          } catch (error) {
            console.error("Error al cerrar sesión:", error);
            Alert.alert("Error", "No se pudo cerrar sesión.");
          }
        },
      },
    ]);
  };

  return (
    <LinearGradient colors={["#F9FAFB", "#E8F5E9"]} style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>🤖 Asistente de IA</Text>
          <Text style={styles.subtitle}>Tu aliado inteligente en segundos</Text>
        </View>

        <TouchableOpacity onPress={handleLogout} activeOpacity={0.8}>
          <LinearGradient colors={["#FF6F61", "#FF3D00"]} style={styles.logoutCircle}>
            <MaterialIcons name="logout" size={20} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Escribe tu consulta..."
          placeholderTextColor="#999"
          value={query}
          onChangeText={setQuery}
          multiline
        />
      </View>

      {/* Botón enviar */}
      <TouchableOpacity onPress={handleSend} activeOpacity={0.85} disabled={loading}>
        <LinearGradient
          colors={["#00796B", "#26A69A"]}
          style={[styles.button, loading && { opacity: 0.6 }]}
        >
          <Text style={styles.buttonText}>
            {loading ? "Pensando..." : "Enviar a IA"}
          </Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* Respuesta */}
      <ScrollView style={styles.responseContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#00796B" />
        ) : response ? (
          <View style={styles.chatBubble}>
            <MaterialIcons name="smart-toy" size={20} color="#00796B" />
            <Text style={styles.responseText}>{response}</Text>
          </View>
        ) : (
          <Text style={styles.placeholderText}>
            Escribe una pregunta para comenzar ✨
          </Text>
        )}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
    marginTop: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#004D40",
  },
  subtitle: {
    fontSize: 14,
    color: "#00796B",
    marginTop: 4,
  },
  logoutCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#FF3D00",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
  },
  inputContainer: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 3,
  },
  input: {
    minHeight: 80,
    fontSize: 16,
    color: "#333",
    textAlignVertical: "top",
  },
  button: {
    marginTop: 16,
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
    shadowColor: "#00796B",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
  },
  buttonText: { color: "#fff", fontWeight: "600", fontSize: 16 },
  responseContainer: {
    marginTop: 20,
    flex: 1,
  },
  chatBubble: {
    flexDirection: "row",
    gap: 8,
    backgroundColor: "#E0F2F1",
    borderRadius: 14,
    padding: 14,
    alignItems: "flex-start",
  },
  responseText: { fontSize: 16, color: "#004D40", flex: 1 },
  placeholderText: {
    textAlign: "center",
    color: "#999",
    fontSize: 15,
    marginTop: 20,
  },
});
