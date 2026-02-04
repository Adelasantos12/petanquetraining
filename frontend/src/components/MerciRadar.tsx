'use client';

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

interface MerciRadarProps {
  data: {
    motricity: number;
    emotions: number;
    relationships: number;
    fiveSenses: number;
    intelligence: number;
  };
  size?: number;
}

const MerciRadar = ({ data, size = 300 }: MerciRadarProps) => {
  const chartData = [
    { subject: 'Motricity', A: data.motricity, fullMark: 30 },
    { subject: 'Emotions', A: data.emotions, fullMark: 30 },
    { subject: 'Relationships', A: data.relationships, fullMark: 30 },
    { subject: 'Five Senses', A: data.fiveSenses, fullMark: 30 },
    { subject: 'Intelligence', A: data.intelligence, fullMark: 30 },
  ];

  return (
    <div style={{ width: '100%', height: size }}>
      <ResponsiveContainer>
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis angle={30} domain={[0, 30]} />
          <Radar
            name="MERCI"
            dataKey="A"
            stroke="#0d9488"
            fill="#0d9488"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MerciRadar;
