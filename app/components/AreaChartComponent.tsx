'use client';

import { useState } from 'react';
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

import { ChartOneTypes } from '../types/productTypes';

const productSales: ChartOneTypes = [
	{
		name: 'Mon',
		companyOne: 4000,
		companyTwo: 2400,
	},
	{
		name: 'Tue',
		companyOne: 3000,
		companyTwo: 2210,
	},
	{
		name: 'Wed',
		companyOne: 2000,
		companyTwo: 2290,
	},
	{
		name: 'Thu',
		companyOne: 3000,
		companyTwo: 2210,
	},
	{
		name: 'Fri',
		companyOne: 2780,
		companyTwo: 2000,
	},
	{
		name: 'Sat',
		companyOne: 1890,
		companyTwo: 2181,
	},
	{
		name: 'Sun',
		companyOne: 2540,
		companyTwo: 1950,
	},
];

const AreaChartComponent = () => {
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
				<AreaChart
					width={500}
					height={450}
					data={productSales}
					margin={{ right: 30 }}
				>
					<YAxis />
					<XAxis dataKey='name' />
					<CartesianGrid strokeDasharray='5 5' />
					<Tooltip content={<CustomTooltip />} />
					<Legend
						formatter={(value) => {
							if (value === 'companyOne') return 'Company One';
							if (value === 'companyTwo') return 'Company Two';
						}}
					/>
					<Area
						type={`${isMonotone ? 'monotone' : 'linear'}`}
						dataKey='companyOne'
						stroke='#2563eb'
						fill='#3b82f6'
						stackId='1'
					/>
					<Area
						type={`${isMonotone ? 'monotone' : 'linear'}`}
						dataKey='companyTwo'
						stroke='#7c3aed'
						fill='#8b5cf6'
						stackId='1'
					/>
				</AreaChart>
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
						case 'companyOne':
							name = 'Company One';
							break;
						case 'companyTwo':
							name = 'Company Two';
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

export default AreaChartComponent;
