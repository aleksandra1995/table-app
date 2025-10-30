import React from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../store";
import { setValue } from "../store/configSlice";

const TableConfig: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const { value } = useSelector((state: RootState) => state.config);
	const { disableSlider, disablePage1 } = useSelector(
		(state: RootState) => state.featureFlags
	);

	if (disablePage1) {
		return (
			<div className='text-red-600 font-bold text-lg'>
				Page 1 is disabled by admin
			</div>
		);
	}

	return (
		<div className='max-w-2xl mx-auto p-6 bg-white shadow rounded-lg space-y-6'>
			<h1 className='text-3xl font-bold text-gray-800'>Table Configuration</h1>

			<div className='flex items-center space-x-4'>
				<label className='font-medium text-gray-700'>Slider:</label>
				<input
					type='range'
					min={1}
					max={10}
					value={value}
					disabled={disableSlider}
					onChange={(e) => dispatch(setValue(Number(e.target.value)))}
					className='w-full h-2 bg-gray-200 rounded-lg accent-blue-500'
				/>
				<span className='w-8 text-center font-semibold'>{value}</span>
			</div>

			<div className='flex items-center space-x-4'>
				<label className='font-medium text-gray-700'>Number Input:</label>
				<input
					type='number'
					min={1}
					max={10}
					value={value}
					onChange={(e) => {
						let val = Number(e.target.value);

						if (val > 10) {
							val = 10;
							window.alert(
								"You tried selecting a value that is higher than the allowed 10"
							);
						}

						dispatch(setValue(val));
					}}
					onFocus={(e) => e.target.select()}
					className='w-20 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400'
				/>
			</div>
		</div>
	);
};

export default TableConfig;
