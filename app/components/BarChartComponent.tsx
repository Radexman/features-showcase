'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import { ChartTwoTypes } from '../types/productTypes';

const salesData: ChartTwoTypes = [
	{
		name: 'Mon',
		revenue: 4000,
		profit: 2400,
	},
	{
		name: 'Tue',
		revenue: 4250,
		profit: 2670,
	},
	{
		name: 'Wed',
		revenue: 3200,
		profit: 4120,
	},
	{
		name: 'Thu',
		revenue: 2950,
		profit: 3412,
	},
	{
		name: 'Fri',
		revenue: 2230,
		profit: 1856,
	},
	{
		name: 'Sat',
		revenue: 4529,
		profit: 5630,
	},
	{
		name: 'Sun',
		revenue: 3450,
		profit: 3019,
	},
];

const BarChartComponent = () => {
	return (
		<ResponsiveContainer
			width='100%'
			height='100%'
		>
			<BarChart
				width={500}
				height={300}
				data={salesData}
				margin={{ right: 30 }}
			>
				<CartesianGrid strokeDasharray='3 3' />
				<XAxis dataKey='name' />
				<YAxis />
				<Tooltip content={<CustomTooltip />} />
				<Legend
					formatter={(value) => {
						if (value === 'profit') return 'Profit';
						if (value === 'revenue') return 'Revenue';
					}}
				/>
				<Bar
					dataKey='revenue'
					fill='#2563eb'
				/>
				<Bar
					dataKey='profit'
					fill='#8b5cf6'
				/>
			</BarChart>
		</ResponsiveContainer>
	);
};

type PayloadItem = {
	value: number;
	dataKey: string;
};

type CustomTooltipTypes = {
	active?: boolean;
	payload?: PayloadItem[];
	label?: string;
};

const CustomTooltip = ({ active, payload, label }: CustomTooltipTypes) => {
	if (active && payload && payload.length) {
		return (
			<div className='p-4 bg-slate-900 flex flex-col gap-4 rounded-md'>
				<p className='text-medium text-lg'>{label}</p>
				{payload.map((entry, index) => {
					let name = '';
					switch (entry.dataKey) {
						case 'revenue':
							name = 'Revenue';
							break;
						case 'profit':
							name = 'Profit';
							break;
						default:
							name = entry.dataKey || '';
					}

					return (
						<p key={index}>
							{name}:<span className='ml-2'>${entry.value}</span>
						</p>
					);
				})}
			</div>
		);
	}
	return null;
};

export default BarChartComponent;
