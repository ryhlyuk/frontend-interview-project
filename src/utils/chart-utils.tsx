const INNER_RADIUS = 40;
const OUTER_RADIUS = INNER_RADIUS + 20;

export const HOVER_ONE_SIDE_SIZE = 10;

export const donutChartSize: number =
  OUTER_RADIUS * 2 + HOVER_ONE_SIDE_SIZE * 4;
export const donutInnerRadius: number = INNER_RADIUS;
export const donutOuterRadius: number = OUTER_RADIUS;
export const donutChartTransform: number =
  OUTER_RADIUS + HOVER_ONE_SIDE_SIZE * 2; // 2 projection
