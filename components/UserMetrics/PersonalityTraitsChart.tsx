import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

type PersonalityTraitsChartProps = {
  personalityTraits: PersonalityTraits;
  expanded?: boolean;
};

const PersonalityTraitsChart = ({ personalityTraits, expanded }: PersonalityTraitsChartProps) => {
  const data = [
    { trait: 'Openness', score: personalityTraits.openness },
    { trait: 'Conscientiousness', score: personalityTraits.conscientiousness },
    { trait: 'Extraversion', score: personalityTraits.extraversion },
    { trait: 'Agreeableness', score: personalityTraits.agreeableness },
    { trait: 'Neuroticism', score: personalityTraits.neuroticism },
  ];

  return expanded ? (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="trait" />
        <YAxis domain={[0, 1]} />
        <Tooltip />
        <Bar dataKey="score" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  ) : (
    <div>
      {data.map((item) => (
        <div key={item.trait} style={{ marginBottom: '8px' }}>
          <span style={{ display: 'block', marginBottom: '4px' }}>{item.trait}: {(item.score * 100).toFixed(0)}%</span>
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

export default PersonalityTraitsChart;