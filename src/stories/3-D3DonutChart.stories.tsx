import React from 'react';

import D3DonutChart from '../components/d3/d3-donut-chart';

export const regular: React.FC = () => (
  <div>
    <D3DonutChart
      count="10"
      data={[
        { value: 100, color: '#FF9430', name: 'Test1' },
        { value: 400, color: '#46DB75', name: 'Test2' },
        { value: 159, color: '#00A9FF', name: 'Test3' },
        { value: 290, color: '#D53341', name: 'Test4' },
      ]}
    />
    <D3DonutChart
      count="1"
      legend={false}
      data={[
        { value: 2, color: '#FF9430', name: 'Test1' },
        { value: 2, color: '#46DB75', name: 'Test2' },
        { value: 56, color: '#00A9FF', name: 'Test3' },
        { value: 40, color: '#D53341', name: 'Test4' },
      ]}
    />
    <D3DonutChart
      count="345"
      legend={false}
      data={[
        { value: 50, color: '#FF9430', name: 'Test1' },
        { value: 10, color: '#46DB75', name: 'Test2' },
        { value: 30, color: '#00A9FF', name: 'Test3' },
        { value: 10, color: '#D53341', name: 'Test4' },
      ]}
    />
    <D3DonutChart count="0" data={[]} />
  </div>
);

export default {
  title: 'D3 Chart',
};
