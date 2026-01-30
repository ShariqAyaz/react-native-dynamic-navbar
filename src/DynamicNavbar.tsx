/**
 * Dynamic Navigation Bar Component
 * Fully reusable, config-driven navbar with injected icons and actions
 * Supports top/bottom positioning with glassy transparent design
 * Includes glassmorphism theme option (crystal/frosted glass effect)
 * Features animated glow effects and smooth transitions
 */

import React, { useRef, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageSourcePropType,
  TextStyle,
  Platform,
  ViewStyle,
  Animated,
  Pressable,
  Easing,
} from 'react-native';

// Default colors
const DEFAULT_COLORS = {
  gold: '#FF9500',
  goldText: '#FFB340',
  midnightBlue: '#1C1C1E',
  textSecondary: '#B8B8C8',
};

// Default typography
const DEFAULT_TYPOGRAPHY: { ui: { small: TextStyle } } = {
  ui: {
    small: {
      fontSize: 12,
      fontWeight: '400',
      letterSpacing: 0,
      lineHeight: 18,
    },
  },
};

/**
 * Vector icon configuration (from icon families)
 */
export interface VectorIcon {
  type: 'vector';
  family: 'Ionicons' | 'MaterialIcons' | 'FontAwesome' | 'Feather' | 'MaterialCommunityIcons';
  name: string;
  size?: number;
}

/**
 * Image/PNG/JPEG icon configuration
 */
export interface ImageIcon {
  type: 'image';
  source: ImageSourcePropType;
  width?: number;
  height?: number;
  tintColor?: string;
}

/**
 * SVG icon configuration (requires react-native-svg and react-native-svg-transformer)
 * Put SVG files in: src/assets/icons/
 * Import as: import MyIcon from './assets/icons/my-icon.svg'
 */
export interface SvgIcon {
  type: 'svg';
  component: React.ComponentType<any>;
  width?: number;
  height?: number;
  color?: string;
}

/**
 * Icon can be vector, image, or SVG
 */
export type NavItemIcon = VectorIcon | ImageIcon | SvgIcon;

/**
 * Theme variants for the navbar
 * - 'default': Original dark translucent style
 * - 'glass': Glassmorphism/frosted crystal effect (like Canva)
 */
export type NavbarTheme = 'default' | 'glass';

/**
 * Navigation item configuration
 */
export interface NavItem {
  id: string;
  label?: string;
  icon: NavItemIcon;
  onPress: () => void;
  isSpecial?: boolean;
  visible?: boolean;
  disabled?: boolean;
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
  direction?: 'ltr' | 'rtl';
  /** Theme variant: 'default' or 'glass' (glassmorphism/crystal effect) */
  theme?: NavbarTheme;
  /** Custom blur component for glass theme (e.g. BlurView from @react-native-community/blur) */
  BlurComponent?: React.ComponentType<any>;
  /** Blur intensity for glass theme (0-100, default 20) */
  blurIntensity?: number;
  /** Blur type for glass theme when using BlurComponent */
  blurType?: 'light' | 'dark' | 'chromeMaterial' | 'material' | 'thickMaterial' | 'thinMaterial' | 'ultraThinMaterial' | 'regular';
  /** Enable glow effect on press (default: true for glass theme) */
  enableGlow?: boolean;
  /** Glow colour (default: white with opacity) */
  glowColor?: string;
  /** Active indicator colour */
  activeColor?: string;
}

/**
 * Get icon component based on family (for vector icons)
 */
const getIconComponent = (family: VectorIcon['family']) => {
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

/**
 * Render icon based on type (vector, image, or SVG)
 */
const renderIcon = (
  icon: NavItemIcon,
  isActive: boolean,
  isSpecial: boolean
) => {
  // SVG icon (from imported SVG files)
  if (icon.type === 'svg') {
    const SvgComponent = icon.component;
    const iconSize = icon.width || icon.height || 24;
    const iconColor = icon.color || (isActive ? DEFAULT_COLORS.goldText : DEFAULT_COLORS.textSecondary);
    const finalColor = isSpecial ? DEFAULT_COLORS.midnightBlue : iconColor;
    const finalSize = isSpecial ? iconSize + 4 : iconSize;

    return (
      <SvgComponent
        width={finalSize}
        height={finalSize}
        color={finalColor}
        fill={finalColor}
      />
    );
  }

  // Image/PNG/JPEG icon
  if (icon.type === 'image') {
    const imageSize = icon.width || icon.height || 24;
    const imageStyle: any = {
      width: icon.width || imageSize,
      height: icon.height || imageSize,
    };

    if (icon.tintColor) {
      imageStyle.tintColor = icon.tintColor;
    }

    return (
      <Image
        source={icon.source}
        style={imageStyle}
        resizeMode="contain"
      />
    );
  }

  // Vector icon (from icon families)
  const IconComponent = getIconComponent(icon.family);
  const iconSize = icon.size || 24;
  const iconColor = isActive ? DEFAULT_COLORS.goldText : DEFAULT_COLORS.textSecondary;

  return (
    <IconComponent
      name={icon.name}
      size={isSpecial ? iconSize + 4 : iconSize}
      color={isSpecial ? DEFAULT_COLORS.midnightBlue : iconColor}
    />
  );
};

/**
 * Animated Nav Item with glow effect
 */
interface AnimatedNavItemProps {
  item: NavItem;
  isActive: boolean;
  showLabels: boolean;
  enableGlow: boolean;
  glowColor: string;
  activeColor: string;
  theme: NavbarTheme;
}

const AnimatedNavItem: React.FC<AnimatedNavItemProps> = ({
  item,
  isActive,
  showLabels,
  enableGlow,
  glowColor,
  activeColor,
  theme,
}) => {
  const glowAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const activeAnim = useRef(new Animated.Value(isActive ? 1 : 0)).current;

  // Animate active state transitions with Apple's cubic-bezier curve
  useEffect(() => {
    Animated.timing(activeAnim, {
      toValue: isActive ? 1 : 0,
      duration: 400,
      easing: Easing.bezier(0.16, 1, 0.3, 1), // Apple's signature curve
      useNativeDriver: true,
    }).start();
  }, [isActive, activeAnim]);

  const handlePressIn = useCallback(() => {
    if (!enableGlow || item.disabled) return;

    // Scale down slightly and start glow with Apple's easing
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 0.92,
        duration: 200,
        easing: Easing.bezier(0.16, 1, 0.3, 1),
        useNativeDriver: true,
      }),
      Animated.timing(glowAnim, {
        toValue: 1,
        duration: 150,
        easing: Easing.bezier(0.16, 1, 0.3, 1),
        useNativeDriver: true,
      }),
    ]).start();
  }, [enableGlow, item.disabled, scaleAnim, glowAnim]);

  const handlePressOut = useCallback(() => {
    if (!enableGlow || item.disabled) return;

    // Scale back and fade glow with Apple's easing
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 400,
        easing: Easing.bezier(0.16, 1, 0.3, 1),
        useNativeDriver: true,
      }),
      Animated.sequence([
        // Brief hold at peak glow
        Animated.delay(50),
        // Fade out with spread
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 300,
          easing: Easing.bezier(0.16, 1, 0.3, 1),
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, [enableGlow, item.disabled, scaleAnim, glowAnim]);

  const isDisabled = item.disabled === true;

  // Interpolate glow spread
  const glowScale = glowAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.5, 1.2, 1.5],
  });

  const glowOpacity = glowAnim.interpolate({
    inputRange: [0, 0.3, 1],
    outputRange: [0, 0.6, 0.8],
  });

  // Active indicator scale
  const activeIndicatorScale = activeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const activeIndicatorOpacity = activeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={isDisabled ? undefined : item.onPress}
      disabled={isDisabled}
      style={[
        styles.tab,
        item.isSpecial && styles.tabSpecial,
        isDisabled && styles.tabDisabled,
      ]}
    >
      <Animated.View
        style={[
          styles.tabContent,
          { transform: [{ scale: scaleAnim }] },
        ]}
      >
        {/* Icon container with glow */}
        <View style={styles.iconWrapper}>
          {/* Glow effect layer - positioned behind icon */}
          {enableGlow && !item.isSpecial && (
            <Animated.View
              style={[
                styles.glowEffect,
                {
                  backgroundColor: glowColor,
                  opacity: glowOpacity,
                  transform: [{ scale: glowScale }],
                },
              ]}
            />
          )}

          <View
            style={[
              styles.iconContainer,
              item.isSpecial && styles.iconContainerSpecial,
            ]}
          >
            {renderIcon(item.icon, isActive, item.isSpecial || false)}
          </View>
        </View>

        {/* Active indicator */}
        {!item.isSpecial && (
          <Animated.View
            style={[
              styles.activeIndicator,
              theme === 'glass' && styles.activeIndicatorGlass,
              {
                backgroundColor: activeColor,
                opacity: activeIndicatorOpacity,
                transform: [{ scale: activeIndicatorScale }],
              },
            ]}
          />
        )}

        {showLabels && item.label && (
          <Animated.Text
            style={[
              styles.label,
              isActive && styles.labelActive,
              item.isSpecial && styles.labelSpecial,
              {
                transform: [{
                  scale: activeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 1.05],
                  }),
                }],
              },
            ]}
          >
            {item.label}
          </Animated.Text>
        )}

        {/* Active indicator - below label or icon */}
        {!item.isSpecial && (
          <Animated.View
            style={[
              styles.activeIndicator,
              theme === 'glass' && styles.activeIndicatorGlass,
              !(showLabels && item.label) && styles.activeIndicatorNoLabel,
              {
                backgroundColor: activeColor,
                opacity: activeIndicatorOpacity,
                transform: [{ scale: activeIndicatorScale }],
              },
            ]}
          />
        )}
      </Animated.View>
    </Pressable>
  );
};

/**
 * Get theme-specific container styles
 */
const getThemeStyles = (
  theme: NavbarTheme,
  position: 'top' | 'bottom'
): { container: ViewStyle; overlay: ViewStyle; border: ViewStyle } => {
  if (theme === 'glass') {
    // Liquid Glass theme (Apple's professional-grade glassmorphism)
    // 4-Layer Stack: Base Material + Specular Edge + Physical Shadow + Variable Border
    return {
      container: {
        // Layer 1: Base Material - darker for better contrast
        backgroundColor: Platform.select({
          ios: 'rgba(30, 30, 40, 0.5)',
          android: 'rgba(30, 30, 40, 0.55)',
        }),
        // Layer 3: Physical Shadow - soft, diffused, long (Apple standard)
        ...(position === 'top'
          ? {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 12 },
            shadowOpacity: 0.08, // Much softer diffusion
            shadowRadius: 40, // Larger spread
            elevation: 24,
          }
          : {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -12 },
            shadowOpacity: 0.08,
            shadowRadius: 40,
            elevation: 24,
          }),
      },
      overlay: {
        // Enhanced saturation simulation layer
        backgroundColor: Platform.select({
          ios: 'rgba(255, 255, 255, 0.1)',
          android: 'rgba(255, 255, 255, 0.08)',
        }),
        // Layer 4: Variable Border - bright on top (light catch), subtle on bottom
        borderTopWidth: position === 'bottom' ? 1.5 : 0,
        borderTopColor: 'rgba(255, 255, 255, 0.4)', // Bright specular edge
        borderBottomWidth: position === 'top' ? 1 : 0,
        borderBottomColor: 'rgba(255, 255, 255, 0.1)', // Subtle bottom
        borderLeftWidth: 0.5,
        borderLeftColor: 'rgba(255, 255, 255, 0.15)',
        borderRightWidth: 0.5,
        borderRightColor: 'rgba(255, 255, 255, 0.15)',
      },
      border: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      },
    };
  }

  // Default theme
  return {
    container: {
      backgroundColor: 'rgba(10, 7, 25, 0.65)',
      ...(position === 'top'
        ? {
          shadowColor: 'rgba(0, 0, 0, 0.4)',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 16,
          elevation: 12,
        }
        : {
          shadowColor: 'rgba(0, 0, 0, 0.4)',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.3,
          shadowRadius: 16,
          elevation: 12,
        }),
    },
    overlay: {
      backgroundColor: 'rgba(255, 255, 255, 0.03)',
    },
    border: {},
  };
};

export const DynamicNavbar: React.FC<DynamicNavbarProps> = ({
  items,
  position = 'bottom',
  height = 70,
  activeItemId,
  showLabels = true,
  backgroundColor,
  borderColor,
  direction = 'ltr',
  theme = 'default',
  BlurComponent,
  blurIntensity = 20,
  blurType = 'light',
  enableGlow,
  glowColor,
  activeColor,
}) => {
  const displayItems = direction === 'rtl' ? [...items].reverse() : items;
  const themeStyles = getThemeStyles(theme, position);

  // Default glow enabled for glass theme
  const isGlowEnabled = enableGlow ?? (theme === 'glass');

  // Default colours based on theme
  const effectiveGlowColor = glowColor ?? (theme === 'glass'
    ? 'rgba(255, 255, 255, 0.5)'
    : 'rgba(255, 149, 0, 0.4)');
  const effectiveActiveColor = activeColor ?? (theme === 'glass'
    ? 'rgba(255, 255, 255, 0.2)'
    : DEFAULT_COLORS.gold);

  const renderBackground = () => {
    // If BlurComponent is provided and theme is glass, use real blur
    if (BlurComponent && theme === 'glass') {
      return (
        <>
          <BlurComponent
            style={styles.blurBackground}
            blurType={blurType}
            blurAmount={blurIntensity}
            reducedTransparencyFallbackColor="rgba(255, 255, 255, 0.3)"
          />
          {/* Overlay on top of blur for extra frosting */}
          <View style={[styles.glassOverlay, styles.glassBlurOverlay]} />
          <View style={themeStyles.border as ViewStyle} />
        </>
      );
    }

    // Fallback: layered overlays to simulate glass effect
    return (
      <>
        <View style={[styles.glassOverlay, themeStyles.overlay]} />
        {theme === 'glass' && (
          <>
            {/* Additional frost layers for glass theme */}
            <View style={[styles.glassOverlay, styles.glassFrostLayer1]} />
            <View style={[styles.glassOverlay, styles.glassFrostLayer2]} />
            <View style={[styles.glassOverlay, styles.glassFrostLayer3]} />
            {/* Specular Highlight - top edge light catch (Layer 2) */}
            {position === 'bottom' && (
              <View style={styles.glassSpecularHighlight} />
            )}
            {position === 'top' && (
              <View style={[styles.glassSpecularHighlight, { top: 'auto', bottom: 0 }]} />
            )}
            <View style={themeStyles.border as ViewStyle} />
          </>
        )}
      </>
    );
  };

  return (
    <View
      style={[
        styles.container,
        position === 'bottom' && styles.containerBottom,
        { height },
        themeStyles.container,
        backgroundColor ? { backgroundColor } : undefined,
        borderColor && position === 'top' ? { borderBottomColor: borderColor } : undefined,
        borderColor && position === 'bottom' ? { borderTopColor: borderColor } : undefined,
      ]}
    >
      {renderBackground()}
      {displayItems.map(item => {
        const isActive = activeItemId === item.id;
        const isVisible = item.visible !== false;

        if (!isVisible) {
          return null;
        }

        return (
          <AnimatedNavItem
            key={item.id}
            item={item}
            isActive={isActive}
            showLabels={showLabels}
            enableGlow={isGlowEnabled}
            glowColor={effectiveGlowColor}
            activeColor={effectiveActiveColor}
            theme={theme}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 8,
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    overflow: 'hidden',
  },
  containerBottom: {
    paddingBottom: 20,
  },
  blurBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  glassOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  // Overlay when using real BlurComponent
  glassBlurOverlay: {
    backgroundColor: 'rgba(20, 20, 30, 0.3)',
  },
  // Liquid Glass theme: Enhanced multi-layer frost effect
  // Layer 1: Base frost for diffusion
  glassFrostLayer1: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  // Layer 2: Saturation boost - cool tone enhancement (simulates CSS saturate)
  glassFrostLayer2: {
    backgroundColor: Platform.select({
      ios: 'rgba(100, 120, 255, 0.035)', // Cool blue tint for color vibrancy
      android: 'rgba(100, 120, 255, 0.03)',
    }),
  },
  // Layer 3: Additional white frost for depth
  glassFrostLayer3: {
    backgroundColor: Platform.select({
      ios: 'rgba(255, 255, 255, 0.03)',
      android: 'rgba(255, 255, 255, 0.025)',
    }),
  },
  // Layer 2: Specular Highlight - top edge light catch (Apple's signature detail)
  glassSpecularHighlight: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 1.5,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  tabContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabSpecial: {
    flex: 1.2,
  },
  tabDisabled: {
    opacity: 0.4,
  },
  // Wrapper for icon + glow
  iconWrapper: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  // Glow effect on press - centered behind icon
  glowEffect: {
    position: 'absolute',
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  // Active indicator dot/pill
  activeIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 2,
  },
  activeIndicatorGlass: {
    width: 20,
    height: 3,
    borderRadius: 1.5,
    marginTop: 4,
  },
  activeIndicatorNoLabel: {
    marginTop: 1,
  },
  iconContainer: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainerSpecial: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: DEFAULT_COLORS.gold,
    marginBottom: 4,
  },
  label: {
    ...DEFAULT_TYPOGRAPHY.ui.small,
    color: DEFAULT_COLORS.textSecondary,
    fontSize: 11,
    marginTop: 2,
  },
  labelActive: {
    color: DEFAULT_COLORS.goldText,
    fontWeight: '600',
  },
  labelSpecial: {
    color: DEFAULT_COLORS.midnightBlue,
    fontWeight: '600',
  },
});