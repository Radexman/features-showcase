type ChartOneProduct = {
	name: 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';
	companyOne: number;
	companyTwo: number;
};

type ChartTwoProduct = {
	name: 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';
	revenue: number;
	profit: number;
};

export type ChartOneTypes = ChartOneProduct[];
export type ChartTwoTypes = ChartTwoProduct[];
