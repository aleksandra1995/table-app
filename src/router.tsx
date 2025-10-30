import {
	createRootRoute,
	createRoute,
	createRouter,
	Outlet,
	redirect,
} from "@tanstack/react-router";
import TableConfig from "./pages/TableConfig";
import TableData from "./pages/TableData";
import AdminPanel from "./pages/AdminPanel";
import { Sidebar } from "./components/Sidebar";
import { store } from "./store";

const rootRoute = createRootRoute({
	component: () => (
		<div className='flex min-h-screen'>
			<Sidebar />
			<div className='flex-1 p-4'>
				<Outlet />
			</div>
		</div>
	),
});

const homeRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/",
	component: TableConfig,
	beforeLoad: () => {
		const state = store.getState();
		if (state.featureFlags.disablePage1) {
			throw redirect({
				to: "/data-table",
			});
		}
	},
});

const tableConfigRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "table-config",
	component: TableConfig,
	beforeLoad: () => {
		const state = store.getState();
		if (state.featureFlags.disablePage1) {
			throw redirect({
				to: "/data-table",
			});
		}
	},
});

const dataRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "data-table",
	component: TableData,
});

const adminRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "admin",
	component: AdminPanel,
});

rootRoute.addChildren([tableConfigRoute, dataRoute, adminRoute, homeRoute]);

export const router = createRouter({
	routeTree: rootRoute,
});
