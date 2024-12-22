import React from "react";

const ConfirmationModal = ({ isOpen, onConfirm, onCancel, message }) => {
	if (!isOpen) return null;

	return (
		<div
			className={`fixed inset-0 flex items-center justify-center z-50 ${
				isOpen ? "animate-modal-backdrop" : ""
			}`}>
			
			{/* Backdrop with blur */}
			<div
				className="absolute inset-0 bg-black/20 backdrop-blur-sm"
				onClick={onCancel}
			/>

			{/* Modal */}
			<div
				className={`
          relative bg-white backdrop-blur-xl
          rounded-xl shadow-2xl w-[28rem]
          border border-white/20
          ${isOpen ? "animate-modal-content" : ""}
        `}>
				<style jsx>{`
					@keyframes modalBackdrop {
						from {
							opacity: 0;
						}
						to {
							opacity: 1;
						}
					}

					@keyframes modalContent {
						from {
							opacity: 0;
							transform: scale(0.95) translateY(10px);
						}
						to {
							opacity: 1;
							transform: scale(1) translateY(0);
						}
					}

					.animate-modal-backdrop {
						animation: modalBackdrop 200ms ease-out forwards;
					}

					.animate-modal-content {
						animation: modalContent 300ms cubic-bezier(0.2, 0.8, 0.2, 1)
							forwards;
					}
				`}</style>

				<div className="p-6">
					{/* Icon Container */}
					<div className="flex justify-center mb-4">
						<div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center">
							<svg
								className="w-8 h-8 text-blue-500"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
						</div>
					</div>

					{/* Content */}
					<div className="text-center mb-6">
						<h3 className="text-lg font-semibold text-gray-900 mb-2">
							Are you sure?
						</h3>
						<p className="text-gray-600">{message}</p>
					</div>

					{/* Buttons */}
					<div className="flex justify-center gap-3">
						<button
							onClick={onCancel}
							className="px-5 py-2 rounded-lg
                       text-gray-700 font-medium
                       bg-gray-100 hover:bg-gray-200
                       border border-gray-200
                       transition-colors duration-200">
							Cancel
						</button>
						<button
							onClick={onConfirm}
							className="px-5 py-2 rounded-lg
                       text-white font-medium
                       bg-blue-500 hover:bg-blue-600
                       transition-colors duration-200">
							Confirm
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ConfirmationModal;
