'use client';

import { useRef, ReactNode } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import AreaChartComponent from './components/AreaChartComponent';
import BarChartComponent from './components/BarChartComponent';
import LineChartComponent from './components/LineChartComponent';

gsap.registerPlugin(useGSAP);

export default function Home() {
	const imageWrapperRef = useRef(null);
	const headingRef = useRef(null);
	const gridItemRefs = useRef<HTMLDivElement[]>([]);

	// Populate refs safely
	gridItemRefs.current = [];

	const addToRefs = (el: HTMLDivElement) => {
		if (el && !gridItemRefs.current.includes(el)) {
			gridItemRefs.current.push(el);
		}
	};

	useGSAP(() => {
		const timeline = gsap.timeline();

		timeline
			.from(imageWrapperRef.current, {
				y: 50,
				opacity: 0,
				duration: 0.6,
				ease: 'power3.out',
			})
			.from(
				headingRef.current,
				{
					y: 40,
					opacity: 0,
					duration: 0.6,
					ease: 'power3.out',
				},
				'-=0.2'
			)
			.from(
				gridItemRefs.current,
				{
					y: 60,
					opacity: 0,
					duration: 0.6,
					stagger: 0.2,
					ease: 'power3.out',
				},
				'-=0.2'
			);
	}, []);

	return (
		<main className='flex min-h-screen flex-col items-center justify-center px-4 md:px-8 xl:px-10 space-y-5'>
			<div ref={imageWrapperRef}>
				<Image
					src='/jointhubs.svg'
					width={100}
					height={100}
					alt='Jointhubs logo'
				/>
			</div>
			<h1
				ref={headingRef}
				className='heading text-4xl font-bold text-white mb-12'
			>
				Features Showcase
			</h1>
			<div className='grid grid-cols-1 xl:grid-cols-2 gap-10 w-full max-w-[1400px]'>
				<div
					ref={addToRefs}
					className='xl:col-span-2'
				>
					<GridItem title='Sentiment Area Chart'>
						<AreaChartComponent />
					</GridItem>
				</div>

				<div ref={addToRefs}>
					<GridItem title='Price Bar Chart'>
						<BarChartComponent />
					</GridItem>
				</div>

				<div ref={addToRefs}>
					<GridItem title='Price Line Chart'>
						<LineChartComponent />
					</GridItem>
				</div>
			</div>
		</main>
	);
}

type GridItemProps = {
	title: string;
	children: ReactNode;
};

function GridItem({ title, children }: GridItemProps) {
	return (
		<div className='flex flex-col items-center  justify-center p-4 border border-slate-900 bg-slate-900/50 rounded-xl h-[400px]'>
			<h2 className='text-2xl font-semibold text-white mb-4'>{title}</h2>
			{children}
		</div>
	);
}
