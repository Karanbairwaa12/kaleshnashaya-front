import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../store/userStore";
import {
	applyTemplate,
	deleteTemplate,
	getTemplates,
} from "../utils/allapi/template";
import { FaSpinner } from "react-icons/fa";
import ConfirmationModal from "../components/ConfirmationModal";

const Templates = () => {
	const navigate = useNavigate();
	const { user, setLoading, setUser, isLoading } = useUserStore();
	const [error, setError] = useState();

	const [templates, setTemplates] = useState([]);
	const [loadingTemplateId, setLoadingTemplateId] = useState(null);
	const [showApplyModal, setShowApplyModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [templateToApply, setTemplateToApply] = useState(null);
	const [templateToDelete, setTemplateToDelete] = useState(null);
	const [modalMessage, setModalMessage] = useState("");

	useEffect(() => {
		const fetchUserData = async () => {
			if (user) {
				const { data, status } = await getTemplates(user._id);
				if (status === 200) {
					setTemplates(data);
				}
			}
		};

		fetchUserData();
	}, [user?._id]);

	const handleDelete = async () => {
		try {
			setLoadingTemplateId(templateToDelete);
			const response = await deleteTemplate(templateToDelete);
			if (response?.status !== 200) {
				setError(response?.data?.message);
			} else {
				setTemplates(response?.data);
			}
		} catch (err) {
			setError("An error occurred while deleting the template.");
		} finally {
			setLoadingTemplateId(null);
			setShowDeleteModal(false);
		}
	};

	const handleApply = async () => {
		try {
			setLoadingTemplateId(templateToApply);
			const response = await applyTemplate(user?._id, templateToApply);
			if (response?.status !== 200) {
				setError(response?.data?.message);
			} else {
				setUser(response?.data);
			}
		} catch (err) {
			setError("An error occurred while applying template.");
		} finally {
			setLoadingTemplateId(null);
			setShowApplyModal(false);
		}
	};

	const handleShowApplyModal = (template) => {
		setTemplateToApply(template._id);
		setModalMessage(
			`Are you sure you want to apply the template titled "${template.subject}"?`
		);
		setShowApplyModal(true);
	};

	const handleShowDeleteModal = (template) => {
		setTemplateToDelete(template._id);
		setModalMessage(
			`Are you sure you want to delete the template titled "${template.subject}"?`
		);
		setShowDeleteModal(true);
	};

	return (
		<>
			<div className="flex-1 bg-gray-100 p-8 overflow-hidden">
				<div className="flex justify-end mb-6">
					<button
						className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
						onClick={() => navigate("/create-template")}>
						Create Template
					</button>
				</div>

				<div className="h-[calc(100vh-140px)] overflow-y-auto">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{templates?.map((template) => (
							<div
								key={template?._id}
								className="relative bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
								<div className="text-md text-gray-500 mb-4 min-h-6">
									{template.template_name}
								</div>
								<div className="text-xl font-semibold text-gray-800 mb-4 min-h-14">
									{template.subject}
								</div>
								<div
									className="text-sm text-gray-600 mb-4 line-clamp-6 overflow-hidden min-h-32"
									dangerouslySetInnerHTML={{ __html: template.mail }}
								/>
								<div className="absolute left-0 bottom-0 w-full bg-white p-4 rounded-b-lg z-10 flex justify-between gap-2 border-t border-gray-200">
									<button
										onClick={() => handleShowDeleteModal(template)}
										// disabled={template?._id === user?.current_template_id}
										// ${
										// 	template?._id === user?.current_template_id
										// 		? "opacity-50 cursor-not-allowed"
										// 		: ""
										// }
										className={`flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-300 `}>
										Delete
									</button>

									<button
										onClick={() => handleShowApplyModal(template)}
										disabled={
											loadingTemplateId === template?._id ||
											template?._id === user?.current_template_id
										}
										className={`flex-1 ${
											template?._id === user?.current_template_id
												? "bg-green-500"
												: "bg-yellow-500"
										} text-white py-2 rounded-lg hover:bg-green-600 transition duration-300 ${
											loadingTemplateId === template?._id ||
											template?._id === user?.current_template_id
												? "opacity-50 cursor-not-allowed"
												: ""
										}`}>
										{loadingTemplateId === template?._id ? (
											<div className="flex justify-center items-center">
												<FaSpinner className="animate-spin text-white" />
											</div>
										) : template?._id === user?.current_template_id ? (
											"Applied"
										) : (
											"Apply"
										)}
									</button>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			<ConfirmationModal
				isOpen={showApplyModal}
				onConfirm={handleApply}
				onCancel={() => setShowApplyModal(false)}
				message={modalMessage}
			/>

			<ConfirmationModal
				isOpen={showDeleteModal}
				onConfirm={handleDelete}
				onCancel={() => setShowDeleteModal(false)}
				message={modalMessage}
			/>
		</>
	);
};

export default Templates;
