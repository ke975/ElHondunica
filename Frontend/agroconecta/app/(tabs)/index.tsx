import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { StyleSheet, View } from 'react-native';

export default function WelcomeScreen() {
  const tarjetas = [
    {
      title: 'Optimización de recursos y costos',
      text: 'Registra y controla insumos, labores agrícolas y aplicaciones fitosanitarias para prevenir desperdicios y sobrecostos.',
      icon: 'leaf',
      color: '#81C784',
    },
    {
      title: 'Fundamentación de decisiones en datos',
      text: 'Centraliza información de fincas, cultivos y costos para generar análisis financieros y tomar decisiones estratégicas.',
      icon: 'chart.bar',
      color: '#4DB6AC',
    },
    {
      title: 'Mejora en la planificación agrícola',
      text: 'Gestiona labores, fertilización, control de plagas y cosecha para planificar mejor los ciclos agrícolas y minimizar riesgos.',
      icon: 'calendar',
      color: '#4FC3F7',
    },
    {
      title: 'Control y trazabilidad',
      text: 'Registra aplicaciones de fertilizantes e insecticidas garantizando cumplimiento normativo e identificando posibles errores.',
      icon: 'shield.checkerboard',
      color: '#BA68C8',
    },
    {
      title: 'Incremento de la rentabilidad',
      text: 'Integra costos, gastos e ingresos para identificar los cultivos y prácticas más rentables.',
      icon: 'trending.up',
      color: '#FFB74D',
    },
    {
      title: 'Generación de reportes y tableros',
      text: 'Visualiza tus datos en informes claros que facilitan la toma de decisiones rápidas y precisas.',
      icon: 'document.text',
      color: '#4DD0E1',
    },
  ];

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#E0F7FA', dark: '#004D40' }}
      headerImage={
        <Image
          source={require('@/assets/Banner.jpg')}
          style={styles.banner}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={styles.title}>
          Bienvenido al Sistema de Gestión Agrícola
        </ThemedText>
        <HelloWave />
      </ThemedView>

      <ThemedText style={styles.intro}>
        Administra tus cultivos y fincas de manera eficiente, optimizando recursos, costos y aumentando la rentabilidad.
      </ThemedText>

      {/* Tarjetas de justificación */}
      {tarjetas.map((t, index) => (
        <ThemedView key={index} style={[styles.card, { backgroundColor: t.color }]}>
          <View style={styles.cardHeader}>
            <ThemedText type="subtitle" style={styles.cardTitle}>{t.title}</ThemedText>
          </View>
          <ThemedText style={styles.cardText}>{t.text}</ThemedText>
        </ThemedView>
      ))}

      {/* Botón de exploración */}
      <Link href="/explore">
        <ThemedView style={styles.button}>
          <ThemedText type="subtitle" style={styles.buttonText}>
            Explorar el Sistema
          </ThemedText>
        </ThemedView>
      </Link>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  banner: {
    width: '100%',
    height: 250,
    position: 'absolute',
    bottom: -10,
    left: 0,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  title: {
    color: '#00796B',
    fontSize: 24,
    flex: 1,
  },
  intro: {
    fontSize: 16,
    color: '#004D40',
    marginBottom: 20,
  },
  card: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    flexShrink: 1,
  },
  cardText: {
    fontSize: 14,
    color: '#ffffffee',
  },
  button: {
    backgroundColor: '#00796B',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginVertical: 20,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});
