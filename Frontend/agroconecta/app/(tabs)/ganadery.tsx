// app/(tabs)/ganaderia.tsx
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { IconSymbol } from "@/components/ui/icon-symbol";
import React from "react";
import { FlatList, Image, StyleSheet, TouchableOpacity, View } from "react-native";

// Datos de ejemplo del ganado
const ganado = [
  { 
    id: "1", 
    nombre: "Vaca Holstein", 
    tipo: "Leche", 
    peso: 550, 
    imagen: require('@/assets/foto10.jpeg') // Imagen local
  },
  { 
    id: "2", 
    nombre: "Toro Angus", 
    tipo: "Carne", 
    peso: 800, 
    imagen: require('@/assets/foto11.jpeg') 
  },

];

export default function GanaderiaScreen() {
  const renderItem = ({ item }: { item: typeof ganado[0] }) => (
    <TouchableOpacity activeOpacity={0.8}>
      <ThemedView style={styles.card}>
        <Image source={item.imagen} style={styles.image} />
        <View style={styles.info}>
          <ThemedText type="defaultSemiBold" style={styles.nombre}>
            {item.nombre}
          </ThemedText>
          <ThemedText style={styles.tipo}>
            Tipo: {item.tipo}
          </ThemedText>
          <View style={styles.statsContainer}>
            <ThemedText style={styles.peso}>
              {item.peso} kg
            </ThemedText>
          </View>
        </View>
      </ThemedView>
    </TouchableOpacity>
  );

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Ganado Registrado
      </ThemedText>
      <FlatList
        data={ganado}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#F0F4F3", // Fondo suave verde oliva
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginTop: 40,
    marginBottom: 20,
    color: "#00796B", // Verde Lima profundo
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    marginBottom: 18,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 4,
    borderWidth: 1,
    borderColor: "#E0F2F1",
  },
  image: {
    width: "100%",
    height: 180,
  },
  info: {
    padding: 16,
  },
  nombre: {
    fontSize: 18,
    color: "#00ACC1", // Azul agua
    marginBottom: 6,
  },
  tipo: {
    fontSize: 14,
    color: "#FF6D00", // Naranja vibrante
    marginBottom: 6,
  },
  statsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  peso: {
    fontSize: 14,
    color: "#004D40", // Verde oscuro
  },
});
