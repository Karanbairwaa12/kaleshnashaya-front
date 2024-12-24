import React, { memo, useState } from "react";
import { Menu, X } from "lucide-react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const LayoutWithSidebar = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	return (
		<div className="flex h-screen bg-[#f5f5f7]">
			{/* Hamburger button - visible only on mobile */}
			{!isSidebarOpen && (
				<button
					onClick={toggleSidebar}
					className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-md hover:bg-gray-100"
					aria-label="Toggle Sidebar">
					<Menu className="h-6 w-6" />
				</button>
			)}

			<div className="fixed inset-auto h-auto bottom-0 right-0 p-8 font-bold text-base text-[#edeff1] z-10">
				<div>कृष्णाय वासुदेवाय हरये परमात्मने ।</div>
				<div>प्रणतः क्लेशनाशाय गोविंदाय नमो नमः।।</div>
			</div>

			{/* Sidebar with responsive behavior */}
			<div
				className={`fixed lg:relative lg:flex ${
					isSidebarOpen ? "flex" : "hidden"
				} z-40`}>
				<Sidebar setIsSidebarOpen={setIsSidebarOpen} />
			</div>

			{/* Overlay for mobile - only shown when sidebar is open */}
			{isSidebarOpen && (
				<div
					className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
					onClick={() => setIsSidebarOpen(false)}
				/>
			)}

			{/* Main content */}
			<div className="flex-1 overflow-auto relative z-20">
				<Outlet />
			</div>
		</div>
	);
};

export default memo(LayoutWithSidebar);
