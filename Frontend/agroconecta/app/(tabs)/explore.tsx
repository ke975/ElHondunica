import { Collapsible } from "@/components/ui/collapsible";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { auth, db } from "../../lib/firebase";

export default function DashboardCultivos() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // 🔹 Cargar usuario actual
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const docRef = doc(db, "usuarios", currentUser.uid);
          const userDoc = await getDoc(docRef);
          if (userDoc.exists()) setUserData(userDoc.data());
        } catch (error) {
          console.error("Error al obtener datos del usuario:", error);
        }
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      router.replace("/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00796B" />
      </View>
    );
  }

  const metrics = [
    { title: "Humedad", value: "65%", color: ["#FFE0B2", "#FFB74D"], icon: "water" },
    { title: "Temperatura", value: "28°C", color: ["#234e25ff", "#81C784"], icon: "thermometer.sun.fill" },
    { title: "Plantas", value: "120", color: ["#BBDEFB", "#64B5F6"], icon: "leaf.fill" },
  ];

  const crops = [
    {
      title: "Banano",
      image: "https://upload.wikimedia.org/wikipedia/commons/4/44/Banana_plantation.jpg",
      status: "Saludable",
      lastWater: "Hace 2 horas",
    },
    {
      title: "Tomate",
      image: "https://upload.wikimedia.org/wikipedia/commons/8/89/Tomato_plant_2.jpg",
      status: "Requiere riego",
      lastWater: "Hace 6 horas",
    },
    {
      title: "Papaya",
      image: "https://upload.wikimedia.org/wikipedia/commons/0/02/Papaya_tree.jpg",
      status: "En crecimiento",
      lastWater: "Hace 4 horas",
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient colors={["#E0F7FA", "#ffffff"]} style={styles.header}>
        <View style={styles.headerContent}>
          <View>
            <Animated.Text entering={FadeInDown.duration(500)} style={styles.title}>
              Dashboard de Cultivos
            </Animated.Text>
            <Text style={styles.subText}>
              Hola, {userData?.nombre || "Usuario"} 👋
            </Text>
          </View>

          {/* Logout Button */}
          <TouchableOpacity onPress={handleLogout} activeOpacity={0.8}>
            <LinearGradient
              colors={["#FF6B6B", "#FF8E53"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.logoutButton}
            >
              <MaterialIcons name="logout" size={22} color="#fff" />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Métricas */}
        <View style={styles.metricsContainer}>
          {metrics.map((m, i) => (
            <Animated.View key={i} entering={FadeInDown.delay(100 * i)} style={styles.metricWrapper}>
              <LinearGradient colors={m.color} style={styles.metricCard}>
                <IconSymbol name={m.icon} size={28} color="#fff" style={{ marginBottom: 6 }} />
                <Text style={styles.metricTitle}>{m.title}</Text>
                <Text style={styles.metricValue}>{m.value}</Text>
              </LinearGradient>
            </Animated.View>
          ))}
        </View>

        {/* Cultivos */}
        {crops.map((crop, i) => (
          <Animated.View key={i} entering={FadeInDown.delay(200 * i)} style={styles.cropWrapper}>
            <Collapsible title={crop.title}>
              <Image source={{ uri: crop.image }} style={styles.cropImage} />
              <Text>
                Estado: <Text style={styles.boldText}>{crop.status}</Text>
              </Text>
              <Text>Último riego: {crop.lastWater}</Text>
            </Collapsible>
          </Animated.View>
        ))}

        {/* Historial */}
        <Animated.View entering={FadeInDown.delay(600)} style={{ marginHorizontal: 20, marginBottom: 20 }}>
          <Collapsible title="Historial de Riegos">
            <Text>✔️ Banano - 8:00 am</Text>
            <Text>✔️ Tomate - 10:00 am</Text>
            <Text>❌ Papaya - pendiente</Text>
          </Collapsible>
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB" },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  header: { paddingTop: 60, paddingBottom: 20, paddingHorizontal: 20, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
  headerContent: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  title: { fontSize: 22, fontWeight: "700", color: "#004D40" },
  subText: { fontSize: 14, color: "#555", marginTop: 4 },
  logoutButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#FF6B6B",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  metricsContainer: { flexDirection: "row", justifyContent: "space-between", marginHorizontal: 20, marginVertical: 20 },
  metricWrapper: { flex: 1, marginHorizontal: 5 },
  metricCard: {
    borderRadius: 18,
    padding: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 4,
  },
  metricTitle: { fontSize: 14, color: "#fff", fontWeight: "600", marginBottom: 4 },
  metricValue: { fontSize: 20, fontWeight: "700", color: "#fff" },
  cropWrapper: { marginHorizontal: 20, marginBottom: 16 },
  cropImage: { width: "100%", height: 160, borderRadius: 16, marginVertical: 12 },
  boldText: { fontWeight: "700" },
});
