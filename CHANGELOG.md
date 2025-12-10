# Changelog

## [1.0.0] - 2024-12-10

### 🎉 First Stable Release

#### Core Features
- **Item-agnostic design** - Fully configurable navigation bar with injected items
- **Glassy transparent design** - Beautiful frosted glass effect with shadows
- **Top/bottom positioning** - Flexible navbar placement
- **Active state management** - Visual feedback for current selection

#### Icon Support
- **Vector icons** - Support for 5 icon families:
  - Ionicons
  - MaterialIcons
  - FontAwesome
  - Feather
  - MaterialCommunityIcons
- **PNG/Image icons** - Use local or remote images
  - Local images: `require('./icon.png')`
  - Remote images: `{ uri: 'https://...' }`
  - Optional tint color for customisation
- **Mix both types** - Use vector and image icons together

#### Internationalisation
- **RTL/LTR support** - Built-in support for Arabic and other RTL languages
- Simple prop: `direction="rtl"` or `direction="ltr"`
- Items automatically reorder for RTL

#### Item Control
- **Visible prop** - Show/hide items dynamically (`visible?: boolean`)
- **Disabled prop** - Disable item interaction (`disabled?: boolean`)
- Disabled items shown with reduced opacity (40%)

#### Styling
- Customisable height
- Custom background colour
- Custom border colour
- Gold accent for active items
- Special button styling (e.g., create button)

#### TypeScript
- Full type safety
- Clear interfaces
- Exported types for all props

### Requirements
- React Native >= 0.72.0
- React >= 18.0.0
- react-native-vector-icons >= 10.0.0
