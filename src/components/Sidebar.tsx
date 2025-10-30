import { Link } from "@tanstack/react-router";
import { useSelector } from "react-redux";
import type { RootState } from "../store";

export const Sidebar = () => {
	const { disablePage1 } = useSelector(
		(state: RootState) => state.featureFlags
	);
	return (
		<div className='hidden md:flex flex-col w-60 bg-gray-800 text-gray-100 min-h-screen p-6 space-y-6'>
			<h2 className='text-2xl font-bold mb-4 border-b border-gray-700 pb-2'>
				Menu
			</h2>
			<nav className='flex flex-col space-y-3'>
				{!disablePage1 && (
					<Link
						to='/table-config'
						className='px-4 py-2 rounded hover:bg-gray-700 transition-colors'
					>
						Table Config
					</Link>
				)}
				<Link
					to='/data-table'
					className='px-4 py-2 rounded hover:bg-gray-700 transition-colors'
				>
					Data Table
				</Link>
				<Link
					to='/admin'
					className='px-4 py-2 rounded hover:bg-gray-700 transition-colors'
				>
					Admin Panel
				</Link>
			</nav>
		</div>
	);
};
