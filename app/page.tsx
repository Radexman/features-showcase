'use client';

import { useRef, useEffect, ReactNode } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { createSwapy } from 'swapy';
import type { Swapy } from 'swapy';

import AreaChartComponent from './components/AreaChartComponent';
import BarChartComponent from './components/BarChartComponent';
import LineChartComponent from './components/LineChartComponent';
import PieChartComponent from './components/PieChartComponent';

gsap.registerPlugin(useGSAP);

export default function Home() {
	const imageWrapperRef = useRef(null);
	const headingRef = useRef(null);
	const gridItemRefs = useRef<HTMLDivElement[]>([]);
	const swapy = useRef<Swapy | null>(null);
	const container = useRef(null);

	useEffect(() => {
		if (container.current) {
			swapy.current = createSwapy(container.current, {
				enabled: true,
			});
		}

		swapy.current!.onSwap((event) => {
			console.log('swap', event);
		});

		return () => {
			swapy.current?.destroy();
		};
	}, []);

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
					duration: 0.4,
					stagger: 0.2,
					ease: 'power3.out',
				},
				'-=0.15'
			);
	}, []);

	return (
		<main className='flex min-h-screen flex-col items-center justify-center py-12 px-4 md:px-8 xl:px-10 space-y-5'>
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
				className='heading text-center text-4xl font-bold text-white mb-12'
			>
				Features Showcase
			</h1>
			<div
				ref={container}
				className='grid grid-cols-1 xl:grid-cols-4 xl:grid-rows-[minmax(300px,_auto)_minmax(400px,_auto)_minmax(400px,_auto)] gap-6 w-full max-w-[1400px]'
			>
				<div
					ref={addToRefs}
					data-swapy-slot='a'
				>
					<GridItem
						title='Company Preview'
						item='a'
					/>
				</div>
				<div
					ref={addToRefs}
					data-swapy-slot='b'
				>
					<GridItem
						title='Sentiment Pie Chart'
						item='b'
					>
						<PieChartComponent />
					</GridItem>
				</div>
				<div
					ref={addToRefs}
					className='xl:col-span-2'
					data-swapy-slot='c'
				>
					<GridItem
						title='Article Title'
						item='c'
					/>
				</div>
				<div
					ref={addToRefs}
					className='xl:col-span-3'
					data-swapy-slot='d'
				>
					<GridItem
						title='Sentiment Area Chart'
						item='d'
					>
						<AreaChartComponent />
					</GridItem>
				</div>

				<div
					ref={addToRefs}
					className='xl:row-span-2'
					data-swapy-slot='e'
				>
					<GridItem
						title='Select Company'
						item='e'
					/>
				</div>

				<div
					ref={addToRefs}
					data-swapy-slot='f'
				>
					<GridItem
						title='Price Bar Chart'
						item='f'
					>
						<BarChartComponent />
					</GridItem>
				</div>

				<div
					ref={addToRefs}
					className='xl:col-span-2'
					data-swapy-slot='g'
				>
					<GridItem
						title='Price Line Chart'
						item='g'
					>
						<LineChartComponent />
					</GridItem>
				</div>
			</div>
		</main>
	);
}

type GridItemProps = {
	title: string;
	item: string;
	children?: ReactNode;
};

function GridItem({ title, item, children }: GridItemProps) {
	return (
		<div
			className='flex flex-col items-center justify-center p-4 border border-slate-900 bg-[#161C31] rounded-xl min-h-[300px] h-full shadow-md shadow-gray-900'
			data-swapy-item={item}
		>
			<h2 className='text-2xl font-semibold text-white mb-4'>{title}</h2>
			{children}
		</div>
	);
}
