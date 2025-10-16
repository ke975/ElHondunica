import { MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Link, useRouter } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { auth, db } from "../../lib/firebase";

export default function WelcomeScreen() {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const tarjetas = [
    {
      title: "Optimización de recursos y costos",
      text: "Controla insumos, labores agrícolas y aplicaciones fitosanitarias para prevenir desperdicios.",
      color: ["#A8E063", "#56AB2F"],
    },
    {
      title: "Decisiones basadas en datos",
      text: "Centraliza la información de fincas, cultivos y costos para tomar decisiones inteligentes.",
      color: ["#43C6AC", "#191654"],
    },
    {
      title: "Planificación agrícola eficiente",
      text: "Gestiona labores, fertilización, control de plagas y cosecha con precisión.",
      color: ["#36D1DC", "#5B86E5"],
    },
    {
      title: "Control y trazabilidad",
      text: "Registra aplicaciones de fertilizantes e insecticidas cumpliendo con normativas.",
      color: ["#B24592", "#F15F79"],
    },
  ];

  // 🔹 Cargar usuario actual
 useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
    if (currentUser) {
      setUser(currentUser);
      try {
        // Referencia al documento del usuario en Firestore
        const docRef = doc(db, "users", currentUser.uid);
        const usersDoc = await getDoc(docRef);

        let data = {};
        if (usersDoc.exists()) {
          data = usersDoc.data();
        }

        // Definir un nombre seguro
        const nombreSeguro =
          data.nombre || currentUser.displayName || currentUser.email?.split("@")[0] || "Usuario";

        setUserData({ ...data, nombre: nombreSeguro });
      } catch (error) {
        console.error("Error al obtener datos del usuario:", error);
        // Si falla, usar fallback
        const nombreSeguro =
          currentUser.displayName || currentUser.email?.split("@")[0] || "Usuario";
        setUserData({ nombre: nombreSeguro });
      }
    } else {
      setUser(null);
      setUserData(null);
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

  return (
    <View style={styles.container}>
      {/* Header con degradado */}
      <LinearGradient colors={["#E0F7FA", "#ffffff"]} style={styles.header}>
        <View style={styles.headerContent}>
          <View>
            <Animated.Text entering={FadeInDown.duration(500)} style={styles.welcomeText}>
             Hola, {userData?.nombre || "Usuario"} 👋
            </Animated.Text>
            <Text style={styles.subText}>Administra tus cultivos con inteligencia</Text>
          </View>

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

      {/* Contenido scrollable */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <Animated.View entering={FadeInDown.delay(200)} style={styles.hero}>
          <Image
            source={require("@/assets/Banner.jpg")}
            style={styles.heroImage}
            contentFit="cover"
          />
        </Animated.View>

        <Animated.Text entering={FadeInDown.delay(400)} style={styles.sectionTitle}>
          Beneficios del Sistema
        </Animated.Text>

        {tarjetas.map((t, index) => (
          <Animated.View
            key={index}
            entering={FadeInDown.delay(500 + index * 100)}
            style={styles.cardWrapper}
          >
            <LinearGradient colors={t.color} style={styles.card}>
              <Text style={styles.cardTitle}>{t.title}</Text>
              <Text style={styles.cardText}>{t.text}</Text>
            </LinearGradient>
          </Animated.View>
        ))}

        <Animated.View entering={FadeInDown.delay(800)} style={{ alignItems: "center" }}>
          <Link href="/explore" asChild>
            <TouchableOpacity activeOpacity={0.85}>
              <LinearGradient
                colors={["#00796B", "#48C9B0"]}
                style={styles.exploreButton}
              >
                <Text style={styles.exploreText}>Explorar el Sistema</Text>
              </LinearGradient>
            </TouchableOpacity>
          </Link>
        </Animated.View>
      </ScrollView>
    </View>
  );
}

import { Text } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: "700",
    color: "#004D40",
  },
  subText: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },
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
  hero: {
    marginVertical: 20,
    borderRadius: 20,
    overflow: "hidden",
    marginHorizontal: 20,
  },
  heroImage: {
    width: "100%",
    height: 200,
    borderRadius: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#004D40",
    marginLeft: 24,
    marginBottom: 12,
  },
  cardWrapper: {
    marginHorizontal: 20,
    marginBottom: 16,
  },
  card: {
    borderRadius: 18,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 6,
  },
  cardText: {
    fontSize: 14,
    color: "#ffffffdd",
  },
  exploreButton: {
    paddingVertical: 14,
    paddingHorizontal: 60,
    borderRadius: 30,
    shadowColor: "#00796B",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  exploreText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
