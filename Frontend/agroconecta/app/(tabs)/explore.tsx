import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";

import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Collapsible } from "@/components/ui/collapsible";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Fonts } from "@/constants/theme";

export default function DashboardCultivos() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#E0F7FA", dark: "#1C1C1C" }}
      headerImage={
        <IconSymbol
          size={220}
          color="#00ACC1"
          name="leaf"
          style={styles.headerImage}
        />
      }
    >
      {/* Título */}
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={{ fontFamily: Fonts.rounded, color: "#00796B" }}>
          Dashboard de Cultivos
        </ThemedText>
      </ThemedView>

      <ThemedText style={styles.subtitle}>
        Monitorea tus cultivos en tiempo real 🌱
      </ThemedText>

      {/* Métricas principales */}
      <ThemedView style={styles.cardsContainer}>
        <View style={[styles.card, { backgroundColor: "#FFE0B2" }]}>
          <ThemedText type="defaultSemiBold">Humedad</ThemedText>
          <ThemedText style={[styles.value, { color: "#FB8C00" }]}>65%</ThemedText>
        </View>
        <View style={[styles.card, { backgroundColor: "#C8E6C9" }]}>
          <IconSymbol name="thermometer.sun.fill" size={28} color="#2E7D32" style={styles.cardIcon} />
          <ThemedText type="defaultSemiBold">Temperatura</ThemedText>
          <ThemedText style={[styles.value, { color: "#2E7D32" }]}>28°C</ThemedText>
        </View>
        <View style={[styles.card, { backgroundColor: "#BBDEFB" }]}>
          <IconSymbol name="leaf.fill" size={28} color="#1565C0" style={styles.cardIcon} />
          <ThemedText type="defaultSemiBold">Plantas</ThemedText>
          <ThemedText style={[styles.value, { color: "#1565C0" }]}>120</ThemedText>
        </View>
      </ThemedView>

      {/* Secciones colapsables */}
      <Collapsible title="Cultivo de Banano">
        <Image
          source={{
            uri: "https://upload.wikimedia.org/wikipedia/commons/4/44/Banana_plantation.jpg",
          }}
          style={styles.image}
        />
        <ThemedText>
          Estado: <ThemedText type="defaultSemiBold">Saludable</ThemedText>
        </ThemedText>
        <ThemedText>Último riego: Hace 2 horas</ThemedText>
      </Collapsible>

      <Collapsible title="Cultivo de Tomate">
        <Image
          source={{
            uri: "https://upload.wikimedia.org/wikipedia/commons/8/89/Tomato_plant_2.jpg",
          }}
          style={styles.image}
        />
        <ThemedText>
          Estado: <ThemedText type="defaultSemiBold">Requiere riego</ThemedText>
        </ThemedText>
        <ThemedText>Último riego: Hace 6 horas</ThemedText>
      </Collapsible>

      <Collapsible title="Cultivo de Papaya">
        <Image
          source={{
            uri: "https://upload.wikimedia.org/wikipedia/commons/0/02/Papaya_tree.jpg",
          }}
          style={styles.image}
        />
        <ThemedText>
          Estado: <ThemedText type="defaultSemiBold">En crecimiento</ThemedText>
        </ThemedText>
        <ThemedText>Último riego: Hace 4 horas</ThemedText>
      </Collapsible>

      <Collapsible title="Historial de Riegos">
        <ThemedText>✔️ Banano - 8:00 am</ThemedText>
        <ThemedText>✔️ Tomate - 10:00 am</ThemedText>
        <ThemedText>❌ Papaya - pendiente</ThemedText>
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    bottom: -50,
    left: -20,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#00796B",
    marginBottom: 20,
  },
  cardsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  card: {
    flex: 1,
    padding: 20,
    marginHorizontal: 5,
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 4,
  },
  cardIcon: {
    marginBottom: 8,
  },
  value: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 6,
  },
  image: {
    width: "100%",
    height: 160,
    borderRadius: 16,
    marginVertical: 14,
  },
});
