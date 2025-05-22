'use client';

import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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

const LineChartComponent = () => {
	const [isMonotone, setIsMonotone] = useState(false);

	return (
		<>
			<div className='flex items-center justify-center gap-3 mb-3'>
				<label
					htmlFor='isMonotone'
					className='block'
				>
					<span className={`${isMonotone && 'text-violet-500'}`}>Monotone</span> /{' '}
					<span className={`${isMonotone || 'text-violet-500'}`}>Linear</span>
				</label>
				<input
					type='checkbox'
					name='isMonotone'
					id='isMonotone'
					onChange={() => setIsMonotone((prevState) => !prevState)}
					className='checkbox'
				/>
			</div>
			<ResponsiveContainer
				width='100%'
				height='100%'
			>
				<LineChart
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
					<Line
						type={`${isMonotone ? 'monotone' : 'linear'}`}
						dataKey='revenue'
						stroke='#3b82fb'
					/>
					<Line
						type={`${isMonotone ? 'monotone' : 'linear'}`}
						dataKey='profit'
						stroke='#8b5cf6'
					/>
				</LineChart>
			</ResponsiveContainer>
		</>
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

export default LineChartComponent;
