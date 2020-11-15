import React, { FC, useEffect, useRef, useCallback } from 'react';
import * as d3 from 'd3';

import { DonutProps } from '../../../interfaces/IDonutProps';
import {
  donutChartSize,
  donutInnerRadius,
  donutOuterRadius,
  donutChartTransform,
  HOVER_ONE_SIDE_SIZE,
} from '../../../utils/chart-utils';
import { DonutChartData } from '../../../interfaces/IDonutChartData';

const EMPTY_CHART_DATA: DonutChartData[] = [
  { value: 1, name: 'No data', color: '#CCC' },
];

const D3DonutChart: FC<DonutProps> = (props: DonutProps) => {
  const { data: donutData, count, legend = true } = props;

  const ref = useRef(null);
  const legendRef = useRef(null);

  const donut: any = d3
    .pie()
    .value((d: any) => d.value)
    .sort(null);

  const arc: any = d3
    .arc()
    .innerRadius(donutInnerRadius)
    .outerRadius(donutOuterRadius);

  const hoverArc: any = d3
    .arc()
    .innerRadius(donutInnerRadius)
    .outerRadius(donutOuterRadius + HOVER_ONE_SIDE_SIZE);

  const buildLegend = useCallback((): void => {
    const legendWrapper = d3.select(legendRef.current);
    donutData.forEach((item: DonutChartData, index: number) => {
      legendWrapper
        .append('circle')
        .attr('cx', 10)
        .attr('cy', donutChartSize / donutData.length + index * 20)
        .attr('r', 6)
        .style('fill', item.color);
      legendWrapper
        .append('text')
        .attr('x', 20)
        .attr('y', donutChartSize / donutData.length + index * 20)
        .text(item.name || 'Undefined')
        .style('font-size', '15px')
        .attr('alignment-baseline', 'middle');
    });
  }, [donutData]);

  const initDonutChart = useCallback(
    (customData?: DonutChartData[]) => {
      return d3
        .select(ref.current)
        .selectAll('path')
        .data(donut(customData || donutData));
    },
    [donutData, donut],
  );

  const buildArc = useCallback(
    (donutChart) => {
      donutChart
        .enter()
        .append('path')
        .attr('d', arc)
        .attr('fill', (d: any) => {
          return d.data.color;
        })
        .on('mouseover', function() {
          // @ts-ignore
          d3.select(this)
            .transition()
            .duration(100)
            .attr('d', hoverArc);
        })
        .on('mouseout', function() {
          // @ts-ignore
          d3.select(this)
            .transition()
            .duration(100)
            .attr('d', arc);
        });
    },
    [arc, hoverArc],
  );

  const appendTextLabels = useCallback(
    (donutChart) => {
      donutChart
        .enter()
        .append('text')
        .attr('text-anchor', 'middle')
        .attr('alignment-baseline', 'middle')
        .attr('transform', (d: any) => `translate(${arc.centroid(d)})`)
        .style('fill', 'white')
        .style('font-size', 12)
        .text((d: any) => d.value);
    },
    [arc],
  );

  const appendCenterCounter = useCallback(
    (donutChart, customMessage?: string) => {
      donutChart
        .enter()
        .append('text')
        .attr('text-anchor', 'middle')
        .attr('alignment-baseline', 'middle')
        .style('fill', 'black')
        .style('font-size', 18)
        .text(customMessage || count);
    },
    [count],
  );

  useEffect(() => {
    // creating base donut chart
    if (donutData && donutData.length > 0) {
      const donutChart = initDonutChart();

      buildArc(donutChart);
      // appending text labels
      appendTextLabels(donutChart);
      // appending count at the center
      appendCenterCounter(donutChart);
      // append legend
      if (legend) {
        buildLegend();
      }
    } else {
      const emptyChart = initDonutChart(EMPTY_CHART_DATA);
      buildArc(emptyChart);
      appendCenterCounter(emptyChart, 'No data');
    }
    // building arc
  }, [
    donutData,
    legend,
    initDonutChart,
    buildArc,
    appendTextLabels,
    appendCenterCounter,
    buildLegend,
  ]);

  return (
    <div className="container">
      <svg key="chart-container" width={donutChartSize} height={donutChartSize}>
        <g
          ref={ref}
          transform={`translate(${donutChartTransform} ${donutChartTransform})`}
        />
      </svg>
      <svg key="legend-container" ref={legendRef} />
    </div>
  );
};

export default D3DonutChart;
