const SPACING_SIZES = [8, 16, 24, 32, 40, 48, 56, 64] as const;
export type SpacingSize = (typeof SPACING_SIZES)[number];
