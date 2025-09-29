import { Image } from "expo-image";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";

import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Fonts } from "@/constants/theme";

const products = [
  { id: '1', name: "Café Orgánico", price: 8.5, image: "https://upload.wikimedia.org/wikipedia/commons/4/45/Coffee_beans.jpg" },
  { id: '2', name: "Miel Natural", price: 12.0, image: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Honey_in_jar.jpg" },
  { id: '3', name: "Aceite de Coco", price: 15.0, image: "https://upload.wikimedia.org/wikipedia/commons/5/59/Coconut_oil.jpg" },
  { id: '4', name: "Jabón Artesanal", price: 5.0, image: "https://upload.wikimedia.org/wikipedia/commons/8/85/Soap_bars.jpg" },
];

export default function EcommerceScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#E6F4EA", dark: "#1C1C1C" }}
      headerImage={
        <IconSymbol
          size={220}
          color="#A1D700" // Verde Lima
          name="basket.fill"
          style={styles.headerIcon}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={{ fontFamily: Fonts.rounded, color: "#A1D700" }}>
          Marketplace para Emprendedores
        </ThemedText>
      </ThemedView>

      <ThemedText style={styles.subtitle}>
        Descubre productos únicos de emprendedores locales 🛒
      </ThemedText>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 20 }}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <ThemedView style={styles.productCard}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <ThemedText type="defaultSemiBold" style={styles.productName}>{item.name}</ThemedText>
            <ThemedText style={styles.productPrice}>${item.price.toFixed(2)}</ThemedText>
            <TouchableOpacity style={styles.addButton}>
              <ThemedText type="defaultSemiBold" style={styles.addButtonText}>Agregar al carrito</ThemedText>
            </TouchableOpacity>
          </ThemedView>
        )}
      />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerIcon: {
    bottom: -40,
    left: -10,
    position: "absolute",
  },
  titleContainer: {
    marginBottom: 8,
    paddingHorizontal: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#00B0FF", // Azul Cielo
    marginBottom: 20,
    fontWeight: "500",
    textAlign: 'center',
  },
  productCard: {
    flex: 1,
    backgroundColor: "#FFFDF5", // Fondo cálido elegante
    borderRadius: 20,
    padding: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 10,
    elevation: 6,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: "#E6E6E6",
  },
  productImage: {
    width: '100%',
    height: 150,
    borderRadius: 16,
    marginBottom: 12,
  },
  productName: {
    fontSize: 15,
    color: "#FF6D00", // Naranja Vibrante
    marginBottom: 4,
    textAlign: "center",
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFC107", // Amarillo Sol
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: "#A1D700", // Verde Lima
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 14,
    width: '100%',
    alignItems: 'center',
  },
  addButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
});
