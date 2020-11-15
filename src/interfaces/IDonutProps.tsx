import { DonutChartData } from './IDonutChartData';

export interface DonutProps {
  className?: string;
  count: string;
  data: Array<DonutChartData>;
  legend?: boolean;
}
