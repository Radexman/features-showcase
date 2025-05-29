'use client';

import { useState } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

import { ChartThreeTypes } from '../types/productTypes';

const COLORS = ['#06dba0', '#4d96ff', '#ff6b6b'];

const sentimentData: ChartThreeTypes = [
	{
		name: 'positive',
		value: 32,
	},
	{
		name: 'neutral',
		value: 10,
	},
	{
		name: 'negative',
		value: 8,
	},
];

const PieChartComponent = () => {
	const [categoryData] = useState(sentimentData);

	return (
		<ResponsiveContainer
			width='100%'
			height='100%'
		>
			<PieChart
				width={500}
				height={300}
				margin={{ right: 30 }}
			>
				<Pie
					data={categoryData}
					dataKey='value'
					nameKey='name'
					cx='50%'
					cy='50%'
					outerRadius={70}
					fill='#3b82fb'
					label={({ name, value }) => `${name}: ${value}`}
					labelLine={false}
				>
					{categoryData.map((entry, index) => (
						<Cell
							key={`cell-${index}`}
							fill={COLORS[index % COLORS.length]}
						/>
					))}
				</Pie>
				<Tooltip
					contentStyle={{
						backgroundColor: 'rgba(31, 41, 55, 0.8)',
						borderBlock: '#4b5563',
						borderRadius: '8px',
						padding: '8px',
						fontSize: '12px',
					}}
					itemStyle={{ color: 'e5e7eb' }}
				/>
				<Legend
					iconType='circle'
					layout='horizontal'
					align='center'
					wrapperStyle={{ fontSize: 12 }}
				/>
			</PieChart>
		</ResponsiveContainer>
	);
};

export default PieChartComponent;
