/**
 * Dynamic Navigation Bar Component
 * Fully reusable, config-driven navbar with injected icons and actions
 * Supports top/bottom positioning with glassy transparent design
 */

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../constants/colors';
import { Typography } from '../constants/typography';

/**
 * Icon configuration for nav items
 */
export interface NavItemIcon {
  family: 'Ionicons' | 'MaterialIcons' | 'FontAwesome' | 'Feather' | 'MaterialCommunityIcons';
  name: string;
  size?: number;
}

/**
 * Navigation item configuration
 */
export interface NavItem {
  id: string;
  label?: string;
  icon: NavItemIcon;
  onPress: () => void;
  isSpecial?: boolean; // for center create-style buttons
}

/**
 * DynamicNavbar component props
 */
export interface DynamicNavbarProps {
  items: NavItem[];
  position?: 'top' | 'bottom';
  height?: number;
  activeItemId?: string;
  showLabels?: boolean;
  backgroundColor?: string;
  borderColor?: string;
}

/**
 * Get icon component based on family
 */
const getIconComponent = (family: NavItemIcon['family']) => {
  switch (family) {
    case 'MaterialIcons':
      return require('react-native-vector-icons/MaterialIcons').default;
    case 'FontAwesome':
      return require('react-native-vector-icons/FontAwesome').default;
    case 'Feather':
      return require('react-native-vector-icons/Feather').default;
    case 'MaterialCommunityIcons':
      return require('react-native-vector-icons/MaterialCommunityIcons').default;
    case 'Ionicons':
    default:
      return require('react-native-vector-icons/Ionicons').default;
  }
};

export const DynamicNavbar: React.FC<DynamicNavbarProps> = ({
  items,
  position = 'bottom',
  height = 70,
  activeItemId,
  showLabels = true,
  backgroundColor,
  borderColor,
}) => {
  return (
    <View
      style={[
        styles.container,
        position === 'top' ? styles.containerTop : styles.containerBottom,
        { height },
        backgroundColor && { backgroundColor },
        borderColor && position === 'top' && { borderBottomColor: borderColor },
        borderColor && position === 'bottom' && { borderTopColor: borderColor },
      ]}
    >
      {/* Glassy backdrop overlay for enhanced transparency effect */}
      <View style={styles.glassOverlay} />
      {items.map(item => {
        const isActive = activeItemId === item.id;
        const IconComponent = getIconComponent(item.icon.family);
        const iconSize = item.icon.size || 24;
        const iconColor = isActive ? Colors.goldText : Colors.textSecondary;

        return (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.tab,
              item.isSpecial && styles.tabSpecial,
            ]}
            onPress={item.onPress}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.iconContainer,
                item.isSpecial && styles.iconContainerSpecial,
              ]}
            >
              <IconComponent
                name={item.icon.name}
                size={item.isSpecial ? iconSize + 4 : iconSize}
                color={item.isSpecial ? Colors.midnightBlue : iconColor}
              />
            </View>
            {showLabels && item.label && (
              <Text
                style={[
                  styles.label,
                  isActive && styles.labelActive,
                  item.isSpecial && styles.labelSpecial,
                ]}
              >
                {item.label}
              </Text>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'rgba(10, 7, 25, 0.65)',
    paddingHorizontal: 8,
    paddingVertical: 8,
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
  },
  containerTop: {
    // Multi-layer shadows for glassy depth
    shadowColor: 'rgba(0, 0, 0, 0.4)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  containerBottom: {
    // Multi-layer shadows for glassy depth
    shadowColor: 'rgba(0, 0, 0, 0.4)',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
    paddingBottom: 20,
  },
  glassOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderLeftWidth: 0,
    borderRightWidth: 0,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  tabSpecial: {
    flex: 1.2,
  },
  iconContainer: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  iconContainerSpecial: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.gold,
    marginBottom: 4,
  },
  label: {
    ...Typography.ui.small,
    color: Colors.textSecondary,
    fontSize: 11,
  },
  labelActive: {
    color: Colors.goldText,
    fontWeight: '600',
  },
  labelSpecial: {
    color: Colors.midnightBlue,
    fontWeight: '600',
  },
});
