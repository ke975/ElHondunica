import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";

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
      headerBackgroundColor={{ light: "#FFFFFF", dark: "#1C1C1C" }}
      headerImage={
        <IconSymbol
          size={220}
          color="#3BB54A"
          name="basket.fill"
          style={styles.headerIcon}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <Animated.Text entering={FadeInUp.duration(600)} style={styles.title}>
          Marketplace para Emprendedores
        </Animated.Text>
        <Animated.Text entering={FadeInUp.delay(200)} style={styles.subtitle}>
          Descubre productos únicos de emprendedores locales 🛒
        </Animated.Text>
      </ThemedView>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 20 }}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 40 }}
        renderItem={({ item, index }) => (
          <Animated.View entering={FadeInUp.delay(300 + index * 100)} style={styles.productCard}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <View style={styles.productInfo}>
              <ThemedText type="defaultSemiBold" style={styles.productName}>{item.name}</ThemedText>
              <ThemedText style={styles.productPrice}>${item.price.toFixed(2)}</ThemedText>
              <TouchableOpacity activeOpacity={0.85}>
                <LinearGradient
                  colors={["#3BB54A", "#34A853"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.addButton}
                >
                  <ThemedText type="defaultSemiBold" style={styles.addButtonText}>
                    Agregar al carrito
                  </ThemedText>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </Animated.View>
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
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  title: {
    fontFamily: Fonts.rounded,
    fontSize: 24,
    fontWeight: '700',
    color: "#3BB54A",
    textAlign: "center",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280", // gris elegante
    textAlign: "center",
  },
  productCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 4,
    marginHorizontal: 5,
    overflow: "hidden",
  },
  productImage: {
    width: "100%",
    height: 160,
  },
  productInfo: {
    padding: 12,
    alignItems: "center",
  },
  productName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    textAlign: "center",
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 15,
    fontWeight: "600",
    color: "#10B981",
    marginBottom: 10,
  },
  addButton: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
  },
  addButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
});
