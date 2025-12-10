# react-native-dynamic-navbar

A fully configurable, item-injected navigation bar component for React Native with beautiful glassy transparent design.

[![npm version](https://badge.fury.io/js/react-native-dynamic-navbar.svg)](https://www.npmjs.com/package/react-native-dynamic-navbar)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- ✨ **Fully configurable** - Inject any icons, labels, and actions via props
- 🎨 **Glassy transparent design** - Beautiful frosted glass effect with shadows
- 📍 **Flexible positioning** - Top or bottom placement
- 🎯 **Item-agnostic** - No hardcoded navigation logic
- 🔧 **Highly customisable** - Control height, colours, labels visibility
- 📦 **TypeScript support** - Full type safety
- 🎭 **Multiple icon families** - Support for Ionicons, MaterialIcons, FontAwesome, Feather, and MaterialCommunityIcons
- 🌟 **Special button support** - Highlight center buttons (like create/add actions)

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
| `height` | `number` | `70` | Height of the navbar in pixels |
| `activeItemId` | `string` | `undefined` | ID of the currently active item |
| `showLabels` | `boolean` | `true` | Whether to show labels below icons |
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

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `family` | `'Ionicons' \| 'MaterialIcons' \| 'FontAwesome' \| 'Feather' \| 'MaterialCommunityIcons'` | ✅ | Icon family |
| `name` | `string` | ✅ | Icon name from the family |
| `size` | `number` | ❌ | Icon size in pixels |

## Examples

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

## Styling

The navbar comes with a beautiful glassy transparent design out of the box:
- 65% transparent background
- Frosted glass overlay effect
- Deep shadows for depth
- Gold accent colours for active state

You can customise the background and border colours:

```tsx
<DynamicNavbar
  items={navItems}
  backgroundColor="rgba(20, 20, 40, 0.9)"
  borderColor="rgba(100, 100, 255, 0.3)"
/>
```

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
