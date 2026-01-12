// Design System Constants
// Based on DESIGN_SYSTEM.md

export const COLORS = {
  // Primary Colors
  primary: '#007BFF',
  secondary: '#E6F2FF',
  
  // Status Colors
  success: '#28A745',
  danger: '#DC3545',
  warning: '#FFC107',
  
  // Background Colors
  backgroundLight: '#F8F8F8',
  backgroundSecondary: '#ECECEC',
  
  // Text Colors
  textPrimary: '#000000',
  textSecondary: '#666666',
} as const;

export const SPACING = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  '2xl': '48px',
  '3xl': '64px',
} as const;

export const BORDER_RADIUS = {
  sm: '4px',
  md: '8px',
  lg: '12px',
} as const;

export const ICON_SIZES = {
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
} as const;

export const FONT_FAMILY = 'Inter, system-ui, sans-serif';

// Species options for animals
export const SPECIES_OPTIONS = ['Dog', 'Cat', 'Bird', 'Other'] as const;

// User roles
export const USER_ROLES = ['admin', 'vet'] as const;
