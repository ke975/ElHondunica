// app/(tabs)/fincas.tsx
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { IconSymbol } from "@/components/ui/icon-symbol";
import React from "react";
import { FlatList, Image, StyleSheet, TouchableOpacity, View } from "react-native";

const fincas = [
  { 
    id: "1", 
    nombre: "Finca La Esperanza", 
    municipio: "León", 
    departamento: "León", 
    imagen: require('@/assets/foto1.jpeg') // <-- CORRECTO
  },
  { 
    id: "2", 
    nombre: "Finca San José", 
    municipio: "Masaya", 
    departamento: "Masaya", 
    imagen: require('@/assets/foto2.jpeg') 
  },
  { 
    id: "3", 
    nombre: "Finca El Paraíso", 
    municipio: "Matagalpa", 
    departamento: "Matagalpa", 
    imagen: require('@/assets/foto3.jpeg') 
  },
  { 
    id: "4", 
    nombre: "Finca Las Flores", 
    municipio: "Estelí", 
    departamento: "Estelí", 
    imagen: { uri: "https://upload.wikimedia.org/wikipedia/commons/6/6b/Esteli_Farm.jpg" } 
  },
  { 
    id: "5", 
    nombre: "Finca La Pradera", 
    municipio: "Chinandega", 
    departamento: "Chinandega", 
    imagen: { uri: "https://upload.wikimedia.org/wikipedia/commons/1/1b/Chinandega_Farm.jpg" } 
  },
];


export default function FincasScreen() {
  const renderItem = ({ item }: { item: typeof fincas[0] }) => (
    <TouchableOpacity activeOpacity={0.8}>
      <ThemedView style={styles.card}>
<Image source={item.imagen} style={styles.image} />
        <View style={styles.info}>
          <ThemedText type="defaultSemiBold" style={styles.nombre}>
            {item.nombre}
          </ThemedText>
          <View style={styles.locationContainer}>
            <IconSymbol name="location.fill" size={18} color="#A1D700" style={{ marginRight: 6 }} />
            <ThemedText style={styles.ubicacion}>
              {item.municipio}, {item.departamento}
            </ThemedText>
          </View>
        </View>
      </ThemedView>
    </TouchableOpacity>
  );

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Fincas de Nicaragua
      </ThemedText>
      <FlatList
        data={fincas}
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
    color: "#00796B", // Verde Lima más profundo
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
    borderColor: "#E0F2F1", // Borde suave
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
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ubicacion: {
    fontSize: 14,
    color: "#004D40", // Verde oscuro
  },
});
