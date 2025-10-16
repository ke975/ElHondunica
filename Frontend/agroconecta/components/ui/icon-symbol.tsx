// Fallback for using MaterialIcons on Android and web.

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolViewProps, SymbolWeight } from 'expo-symbols';
import { ComponentProps } from 'react';
import { OpaqueColorValue, type StyleProp, type TextStyle } from 'react-native';

type IconMapping = Record<SymbolViewProps['name'], ComponentProps<typeof MaterialIcons>['name']>;
type IconSymbolName = keyof typeof MAPPING;

/**
 * Add your SF Symbols to Material Icons mappings here.
 * - see Material Icons in the [Icons Directory](https://icons.expo.fyi).
 * - see SF Symbols in the [SF Symbols](https://developer.apple.com/sf-symbols/) app.
 */
const MAPPING = {
  // 📱 Navegación principal
  'house.fill': 'home',
  'house': 'home-outline',
  'paperplane.fill': 'send',
  'paperplane': 'send-outline',
  'chevron.right': 'chevron-right',
  'chevron.left': 'chevron-left',
  'chevron.up': 'chevron-up',
  'chevron.down': 'chevron-down',

  // ⚙️ Configuración y ajustes
  'gear': 'settings',
  'slider.horizontal.3': 'sliders',
  'bell': 'bell-outline',
  'bell.fill': 'bell',
  'lock.fill': 'lock',
  'lock.open.fill': 'unlock',
  'shield.checkerboard': 'shield-check',
  'key.fill': 'key',

  // 👤 Usuario / Perfil
  'person.fill': 'user',
  'person.circle.fill': 'user-circle',
  'person.2.fill': 'users',
  'person.crop.circle': 'account-circle',
  'arrow.right.square': 'log-in',
  'arrow.left.square': 'log-out',

  // 💬 Comunicación / Chat / IA
  'bubble.left.and.bubble.right.fill': 'message-circle',
  'text.bubble': 'chatbubbles-outline',
  'mic.fill': 'mic',
  'mic.slash.fill': 'mic-off',
  'brain.head.profile': 'bot',
  'sparkles': 'stars',
  'lightbulb.fill': 'bulb',

  // 💼 Negocios / Apps / Dashboards
  'chart.bar.fill': 'bar-chart',
  'chart.pie.fill': 'pie-chart',
  'bag.fill': 'shopping-bag',
  'bag': 'shopping-bag-outline',
  'cart.fill': 'shopping-cart',
  'creditcard.fill': 'credit-card',
  'doc.text.fill': 'file-text',
  'folder.fill': 'folder',
  'calendar': 'calendar',
  'clock.fill': 'clock',
  'map.fill': 'map',

  // ❤️ Favoritos / Estados
  'heart.fill': 'heart',
  'heart': 'heart-outline',
  'star.fill': 'star',
  'star': 'star-outline',
  'checkmark.circle.fill': 'check-circle',
  'xmark.circle.fill': 'x-circle',
  'exclamationmark.triangle.fill': 'alert-triangle',

  // 🔧 Desarrollo / IA / Código
  'chevron.left.forwardslash.chevron.right': 'code',
  'terminal.fill': 'terminal',
  'cpu': 'cpu',
  'cloud.fill': 'cloud',
  'cloud.upload.fill': 'cloud-upload',
  'cloud.download.fill': 'cloud-download',
  'folder.badge.plus': 'folder-plus',

  // 🧭 Otros útiles
  'camera.fill': 'camera',
  'photo.fill': 'image',
  'magnifyingglass': 'search',
  'plus.circle.fill': 'plus-circle',
  'minus.circle.fill': 'minus-circle',
  'trash.fill': 'trash',
  'eye.fill': 'eye',
  'eye.slash.fill': 'eye-off',
} as IconMapping;

/**
 * An icon component that uses native SF Symbols on iOS, and Material Icons on Android and web.
 * This ensures a consistent look across platforms, and optimal resource usage.
 * Icon `name`s are based on SF Symbols and require manual mapping to Material Icons.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  return <MaterialIcons color={color} size={size} name={MAPPING[name]} style={style} />;
}
