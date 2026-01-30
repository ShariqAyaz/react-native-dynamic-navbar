# react-native-dynamic-navbar

A fully configurable navigation bar component for React Native with glassmorphism effects and animated interactions.

[![npm version](https://badge.fury.io/js/react-native-dynamic-navbar.svg)](https://www.npmjs.com/package/react-native-dynamic-navbar)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- ✨ **Fully configurable** - Inject any icons, labels, and actions
- 🎨 **Glassmorphism theme** - Frosted glass effect with optional real blur
- ✨ **Animated interactions** - Glow effects and smooth transitions
- 📍 **Flexible positioning** - Top or bottom placement
- 🌍 **RTL/LTR support** - Right-to-left and left-to-right layouts
- 🖼️ **Multiple icon types** - Vector icons, images (PNG/JPEG), and SVG
- 📦 **TypeScript** - Full type safety
- 🌟 **Special buttons** - Highlight center buttons (create/add actions)

## Installation

```bash
npm install react-native-dynamic-navbar
```

or

```bash
yarn add react-native-dynamic-navbar
```

### Peer Dependencies

Make sure you have these installed:

```bash
npm install react-native-vector-icons
```

## Requirements

- React Native >= 0.72.0
- React >= 18.0.0
- react-native-vector-icons >= 10.0.0

## Usage

```tsx
import React, { useState } from 'react';
import { DynamicNavbar } from 'react-native-dynamic-navbar';

function App() {
  const [activeTab, setActiveTab] = useState('home');

  const navItems = [
    {
      id: 'home',
      label: 'Home',
      icon: { family: 'Ionicons', name: 'home', size: 24 },
      onPress: () => setActiveTab('home'),
    },
    {
      id: 'search',
      label: 'Search',
      icon: { family: 'Ionicons', name: 'search', size: 24 },
      onPress: () => setActiveTab('search'),
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: { family: 'Ionicons', name: 'person-circle', size: 24 },
      onPress: () => setActiveTab('profile'),
    },
  ];

  return (
    <DynamicNavbar
      items={navItems}
      position="bottom"
      activeItemId={activeTab}
      showLabels={true}
      height={70}
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `NavItem[]` | **required** | Array of navigation items |
| `position` | `'top' \| 'bottom'` | `'bottom'` | Position of the navbar |
| `height` | `number` | `70` | Height in pixels |
| `activeItemId` | `string` | `undefined` | Currently active item ID |
| `showLabels` | `boolean` | `true` | Show labels below icons |
| `theme` | `'default' \| 'glass'` | `'default'` | Theme variant |
| `direction` | `'ltr' \| 'rtl'` | `'ltr'` | Layout direction |
| `enableGlow` | `boolean` | `true` (glass) | Enable glow effect on press |
| `BlurComponent` | `Component` | `undefined` | Optional blur component |
| `backgroundColor` | `string` | `undefined` | Override background colour |
| `borderColor` | `string` | `undefined` | Override border colour |

### NavItem

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | `string` | ✅ | Unique identifier |
| `label` | `string` | ❌ | Text label |
| `icon` | `NavItemIcon` | ✅ | Icon configuration |
| `onPress` | `() => void` | ✅ | Callback function |
| `isSpecial` | `boolean` | ❌ | Highlight as special button |

### NavItemIcon

Supports three icon types:

**Vector Icons:**
```tsx
icon: { type: 'vector', family: 'Ionicons', name: 'home', size: 24 }
```

**Image Icons:**
```tsx
icon: { type: 'image', source: require('./icon.png'), width: 24, height: 24 }
```

**SVG Icons:**
```tsx
import HomeIcon from './icons/home.svg';
icon: { type: 'svg', component: HomeIcon, width: 24, height: 24, color: '#fff' }
```

## Examples

### Glassmorphism Theme

```tsx
import { BlurView } from '@react-native-community/blur';

<DynamicNavbar
  items={navItems}
  theme="glass"
  BlurComponent={BlurView}  // Optional for real blur
  blurIntensity={25}
  activeItemId={activeTab}
/>
```

### RTL Support

```tsx
<DynamicNavbar
  items={navItems}
  direction="rtl"  // Right-to-left layout
  activeItemId={activeTab}
/>
```

### With Special Create Button

```tsx
const navItems = [
  { id: 'home', label: 'Home', icon: { family: 'Ionicons', name: 'home' }, onPress: () => {} },
  { id: 'search', label: 'Search', icon: { family: 'Ionicons', name: 'search' }, onPress: () => {} },
  { 
    id: 'create', 
    label: 'Create', 
    icon: { family: 'Ionicons', name: 'add', size: 28 }, 
    onPress: () => {},
    isSpecial: true // Highlighted with gold background
  },
  { id: 'notifications', label: 'Alerts', icon: { family: 'Ionicons', name: 'notifications' }, onPress: () => {} },
  { id: 'profile', label: 'Profile', icon: { family: 'Ionicons', name: 'person' }, onPress: () => {} },
];
```

### Top Navigation

```tsx
<DynamicNavbar
  items={navItems}
  position="top"
  activeItemId={activeTab}
  showLabels={false}
  height={60}
/>
```

### With React Navigation

```tsx
import { useNavigation } from '@react-navigation/native';

function MyScreen() {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('home');

  const navItems = [
    {
      id: 'home',
      label: 'Home',
      icon: { family: 'Ionicons', name: 'home', size: 20 },
      onPress: () => {
        setActiveTab('home');
        navigation.navigate('Home');
      },
    },
    // ... more items
  ];

  return <DynamicNavbar items={navItems} activeItemId={activeTab} />;
}
```

## Themes

**Default:** Dark translucent design with gold accents

**Glass (Liquid Glass):** Apple-grade professional glassmorphism featuring:
- **4-Layer Glass Stack:**
  - Base material with enhanced background saturation simulation
  - Specular edge highlights (subtle top-edge light catch)
  - Soft, diffused physical shadows (40px radius, 0.08 opacity)
  - Variable border opacity (bright on top edges, subtle on bottom/sides)
- **Enhanced Color Vibrancy:** Multi-layer overlays that simulate CSS `saturate(200%)` for vibrant, non-muddy appearance
- **Apple's Signature Animations:** Cubic-bezier easing curve (0.16, 1, 0.3, 1) for that "weighty yet responsive" feel
- **Animated glow effects** on press with improved color composition
- **Smooth active state transitions** using Apple's standard timing
- **Optional real blur** with `BlurComponent` (@react-native-community/blur)

### Liquid Glass Technology

The glass theme now implements Apple's "Liquid Glass" design principles (as seen in macOS Tahoe and iOS 26):

```tsx
// Enhanced glassmorphism with professional-grade fidelity
<DynamicNavbar
  items={navItems}
  theme="glass"
  BlurComponent={BlurView}  // Optional for real backdrop blur
  blurIntensity={25}
  activeItemId={activeTab}
/>
```

**What makes it "Liquid Glass":**
- **Saturation Boost:** Strategic color overlays simulate the CSS `saturate(180-200%)` effect that makes backgrounds vibrant instead of muddy gray
- **Variable Borders:** Top edges are brighter (rgba 0.4) simulating light catch, bottom/sides are subtle (rgba 0.1-0.15)
- **Specular Highlights:** 1.5px bright overlay on the top edge creates realistic light reflection
- **Soft Shadows:** Large radius (40px) with very low opacity (0.08) for Apple's signature diffused depth
- **Physics-Based Animation:** All animations use Apple's (0.16, 1, 0.3, 1) cubic-bezier curve for authentic feel

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT © [Shariq Ayaz](https://github.com/ShariqAyaz)

## Author

**Shariq Ayaz**
- Email: gr8shariq@gmail.com
- GitHub: [@ShariqAyaz](https://github.com/ShariqAyaz)

---

**⚠️ Beta Notice:** This package is in active development. The glassmorphism theme and animation features are in beta. APIs may change in minor versions. Please report any issues on [GitHub](https://github.com/ShariqAyaz/react-native-dynamic-navbar/issues).

### Control Item Visibility and State

You can dynamically show/hide or enable/disable items:

```tsx
const items: NavItem[] = [
  {
    id: 'home',
    label: 'Home',
    icon: { type: 'vector', family: 'Ionicons', name: 'home' },
    onPress: () => {},
  },
  {
    id: 'premium',
    label: 'Premium',
    icon: { type: 'vector', family: 'Ionicons', name: 'star' },
    onPress: () => {},
    disabled: true, // Shown but not clickable (40% opacity)
  },
  {
    id: 'admin',
    label: 'Admin',
    icon: { type: 'vector', family: 'Ionicons', name: 'settings' },
    onPress: () => {},
    visible: false, // Completely hidden
  },
];
```

### Use Cases

**Conditional visibility:**
```tsx
{
  id: 'admin',
  visible: user.isAdmin, // Only show for admins
  // ...
}
```

**Disabled state:**
```tsx
{
  id: 'premium',
  disabled: !user.isPremium, // Show but disable for free users
  // ...
}
```
