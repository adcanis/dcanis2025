export const BREAKPOINTS = {
  large: 1920,
  medium: 1440,
  small: 1100,
  xsmall: 480,
  xxsmall: 360,
} as const;

export const media = {
  largeUp: `(min-width: ${BREAKPOINTS.large}px)`,
  mediumUp: `(min-width: ${BREAKPOINTS.medium}px)`,
  smallUp: `(min-width: ${BREAKPOINTS.small}px)`,

  largeDown: `(max-width: ${BREAKPOINTS.large - 1}px)`,
  mediumDown: `(max-width: ${BREAKPOINTS.medium - 1}px)`,
  smallDown: `(max-width: ${BREAKPOINTS.small - 1}px)`,

  xsmallDown: `(max-width: ${BREAKPOINTS.xsmall - 1}px)`,
  xxsmallDown: `(max-width: ${BREAKPOINTS.xxsmall - 1}px)`,
} as const;
