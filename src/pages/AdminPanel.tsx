import React from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../store";
import { setDisablePage1, setDisableSlider } from "../store/featureFlagSlice";

const AdminPanel: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const { disablePage1, disableSlider } = useSelector(
		(state: RootState) => state.featureFlags
	);

	return (
		<div className='max-w-xl mx-auto p-6 bg-white shadow rounded-lg space-y-6'>
			<h1 className='text-3xl font-bold text-gray-800'>Admin Panel</h1>

			<div className='flex items-center justify-between p-4 bg-gray-100 rounded'>
				<span className='font-medium text-gray-700'>
					Disable Page 1 entirely
				</span>
				<input
					type='checkbox'
					checked={disablePage1}
					onChange={(e) => dispatch(setDisablePage1(e.target.checked))}
					className='h-5 w-5 accent-blue-500'
				/>
			</div>

			<div className='flex items-center justify-between p-4 bg-gray-100 rounded'>
				<span className='font-medium text-gray-700'>
					Disable slider on Page 1
				</span>
				<input
					type='checkbox'
					checked={disableSlider}
					onChange={(e) => dispatch(setDisableSlider(e.target.checked))}
					className='h-5 w-5 accent-blue-500'
				/>
			</div>
		</div>
	);
};

export default AdminPanel;
