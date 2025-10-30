import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import {
	createColumnHelper,
	useReactTable,
	getCoreRowModel,
	flexRender,
} from "@tanstack/react-table";
import type { RootState } from "../store";

interface Post {
	id: number;
	title: string;
	body: string;
}

const DataTable: React.FC = () => {
	const { value } = useSelector((state: RootState) => state.config);

	const { data, isLoading } = useQuery<Post[]>({
		queryKey: ["posts"],
		queryFn: async () => {
			const res = await fetch("https://jsonplaceholder.typicode.com/posts");
			if (!res.ok) throw new Error("Network error");
			return res.json();
		},
	});

	const limitedData = useMemo(() => data?.slice(0, value) || [], [data, value]);

	const columnHelper = createColumnHelper<Post>();

	const columns = useMemo(
		() => [
			columnHelper.accessor("id", { header: "ID" }),
			columnHelper.accessor("title", { header: "Title" }),
			columnHelper.accessor("body", { header: "Body" }),
		],
		[columnHelper]
	);

	const table = useReactTable({
		data: limitedData,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	if (isLoading) return <p className='text-gray-600'>Loading...</p>;

	return (
		<div className='overflow-x-auto'>
			<table className='min-w-full bg-white shadow rounded-lg'>
				<thead className='bg-gray-100 text-gray-700'>
					{table.getHeaderGroups().map((headerGroup) => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<th key={header.id} className='px-4 py-2 text-left'>
									{flexRender(
										header.column.columnDef.header,
										header.getContext()
									)}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody>
					{table.getRowModel().rows.map((row) => (
						<tr
							key={row.id}
							className='border-b last:border-none hover:bg-gray-50'
						>
							{row.getVisibleCells().map((cell) => (
								<td key={cell.id} className='px-4 py-2'>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default DataTable;
