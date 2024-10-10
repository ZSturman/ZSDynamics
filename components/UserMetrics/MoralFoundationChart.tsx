import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

type MoralFoundationChartProps = {
  moralFoundationScores: MoralFoundationScores;
  expanded?: boolean;
};

const MoralFoundationChart = ({ moralFoundationScores, expanded }: MoralFoundationChartProps) => {
  const data = [
    { foundation: 'Harm', score: moralFoundationScores.Harm },
    { foundation: 'Fairness', score: moralFoundationScores.Fairness },
    { foundation: 'Ingroup', score: moralFoundationScores.Ingroup },
    { foundation: 'Authority', score: moralFoundationScores.Authority },
    { foundation: 'Purity', score: moralFoundationScores.Purity },
  ];

  return expanded ? (
    <ResponsiveContainer width="100%" height={300}>
      <RadarChart data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="foundation" />
        <PolarRadiusAxis domain={[0, 1]} />
        <Radar name="Score" dataKey="score" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
      </RadarChart>
    </ResponsiveContainer>
  ) : (
    <div>
      {data.map((item) => (
        <div key={item.foundation} style={{ marginBottom: '8px' }}>
          <span style={{ display: 'block', marginBottom: '4px' }}>{item.foundation}: {(item.score * 100).toFixed(0)}%</span>
          <div style={{ background: '#eee', borderRadius: '4px', overflow: 'hidden' }}>
            <div
              style={{
                width: `${item.score * 100}%`,
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

export default MoralFoundationChart;