"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Rectangle} from "recharts"

interface OverviewProps {
  data: any[]
};

export const Overview: React.FC<OverviewProps> = ({
  data
}) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}         
          tickFormatter={(value) => `${value}`}
        />
        <Bar dataKey="varme" fill="#8800d8" activeBar={<Rectangle fill="pink" stroke="blue" />}/>
        <Bar dataKey="vand" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />}/>
        <Bar dataKey="el" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
      </BarChart>
    </ResponsiveContainer>
  )
};