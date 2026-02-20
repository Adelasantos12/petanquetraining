'use client';

import {
  Radar,
  RadarChart as RechartsRadar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';

interface RadarChartProps {
  data: {
    subject: string;
    A: number;
    fullMark: number;
  }[];
}

const RadarChart = ({ data }: RadarChartProps) => {
  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsRadar cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="#EAE4E1" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: '#8E8889', fontSize: 12, fontWeight: 500 }}
          />
          <PolarRadiusAxis
            angle={30}
            domain={[0, 5]}
            tick={false}
            axisLine={false}
          />
          <Radar
            name="MERCI"
            dataKey="A"
            stroke="#D75E3E"
            fill="#D75E3E"
            fillOpacity={0.5}
          />
        </RechartsRadar>
      </ResponsiveContainer>
    </div>
  );
};

export default RadarChart;
