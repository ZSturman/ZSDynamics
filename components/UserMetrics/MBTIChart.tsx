import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

type MbtiChartProps = {
  mbti: MBTIMetrics;
  expanded?: boolean;
};

const MBTIChart = ({ mbti, expanded }: MbtiChartProps) => {
  const data = [
    { aspect: 'Introversion', value: mbti.introversion },
    { aspect: 'Intuition', value: mbti.intuition },
    { aspect: 'Thinking', value: mbti.thinking },
    { aspect: 'Judging', value: mbti.judging },
  ];


  return expanded ? (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="aspect"
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          label={({ index }) => data[index].aspect} // Display the aspect as the label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={['#0088FE', '#00C49F', '#FFBB28', '#FF8042'][index % 4]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  ) : (
    <div>
      <div style={{ marginBottom: '8px' }}>
        <span style={{ display: 'block', marginBottom: '4px' }}>MBTI Type: {mbti.type}</span>
      </div>
      {data.map((item) => (
        <div key={item.aspect} style={{ marginBottom: '8px' }}>
          <span style={{ display: 'block', marginBottom: '4px' }}>
            {item.aspect}: {(item.value * 100).toFixed(0)}%
          </span>
          <div style={{ background: '#eee', borderRadius: '4px', overflow: 'hidden' }}>
            <div
              style={{
                width: `${item.value * 100}%`,
                background: '#8884d8',
                height: '10px',
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default MBTIChart;