import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../store/userStore";
import { updateUserProfile } from "../utils/allapi/profile";
import { FaSpinner } from "react-icons/fa";
import ConfirmationModal from "./ConfirmationModal";

export const ProfileUpdate = ({ setUpdateProfile }) => {
	const navigate = useNavigate();
	const { user, setError, setLoading, setUser } = useUserStore();
	const [pdfFile, setPdfFile] = useState(null);
	const [showUpdateModal, setShowUpdateModal] = useState(false);
	const [modalMessage, setModalMessage] = useState("");

	useEffect(() => {
		if (user) {
			formik.setValues({
				name: user.name || "",
				email: user.email || "",
				email_two_step_password: "",
				phone_number: user.phone_number || "",
				password: "",
			});
		}
	}, [user]);

	const formik = useFormik({
		initialValues: {
			name: "",
			email: "",
			email_two_step_password: "",
			phone_number: "",
			password: "",
		},
		onSubmit: async (values, { setSubmitting, setErrors }) => {
			setSubmitting(true);
			setShowUpdateModal(false);
			const formData = new FormData();
			Object.entries(values).forEach(([key, value]) => {
				if (value) formData.append(key, value);
			});
			if (pdfFile) formData.append("pdf", pdfFile);

			try {
				const data = await updateUserProfile(formData, user?._id);
				if (data.status === 200) {
					setUser(data.data);
					setTimeout(() => {
						setUpdateProfile(false);
					}, [1000]);

					// navigate("/profile");
				}
			} catch (error) {
				setErrors({ submit: "Error updating profile. Please try again." });
			} finally {
				setSubmitting(false);
			}
		},
	});

	const handleOpenModal = () => {
		setModalMessage(`Are you sure you want to update?`);
		setShowUpdateModal(true);
	};

	return (
		<div className="bg-gray-100 h-full flex items-center justify-center p-8 felx-col gap-6">
			<div className="bg-white/80 backdrop-blur-xl p-8 rounded-2xl shadow-xl max-w-3xl w-full border border-gray-300">
				<h2 className="text-3xl font-semibold text-gray-800 mb-6">
					Update Profile
				</h2>
				<form onSubmit={formik.handleSubmit} className="space-y-6">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{/* Name Field */}
						<div>
							<label
								htmlFor="name"
								className="block text-sm font-medium text-gray-700 mb-2">
								Name
							</label>
							<input
								type="text"
								id="name"
								name="name"
								value={formik.values.name}
								onChange={formik.handleChange}
								className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
							/>
						</div>

						{/* Email Field */}
						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium text-gray-700 mb-2">
								Email
							</label>
							<input
								type="email"
								id="email"
								name="email"
								value={formik.values.email}
								onChange={formik.handleChange}
								className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
							/>
						</div>

						{/* Google 2-Factor Password */}
						<div>
							<label
								htmlFor="email_two_step_password"
								className="block text-sm font-medium text-gray-700 mb-2">
								Google Mail App Password
							</label>
							<input
								type="password"
								id="email_two_step_password"
								name="email_two_step_password"
								value={formik.values.email_two_step_password}
								onChange={formik.handleChange}
								className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
							/>
						</div>

						{/* Phone Number */}
						<div>
							<label
								htmlFor="phone_number"
								className="block text-sm font-medium text-gray-700 mb-2">
								Phone Number
							</label>
							<input
								type="tel"
								id="phone_number"
								name="phone_number"
								value={formik.values.phone_number}
								onChange={formik.handleChange}
								className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
							/>
						</div>

						{/* PDF Upload */}
						<div>
							<label
								htmlFor="pdf"
								className="block text-sm font-medium text-gray-700 mb-2">
								Upload PDF
							</label>
							<input
								type="file"
								id="pdf"
								name="pdf"
								accept="application/pdf"
								onChange={(e) => setPdfFile(e.target.files[0])}
								className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
							/>
						</div>

						{/* Password */}
						<div>
							<label
								htmlFor="password"
								className="block text-sm font-medium text-gray-700 mb-2">
								Password
							</label>
							<input
								type="password"
								id="password"
								name="password"
								value={formik.values.password}
								onChange={formik.handleChange}
								className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
							/>
						</div>
					</div>

					{/* Submit Button */}
					<div className="flex justify-end">
						<button
							type="button"
							onClick={handleOpenModal}
							className="bg-blue-500 text-white py-3 px-8 rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition">
							{formik.isSubmitting ? (
								<div className="flex items-center">
									<FaSpinner className="animate-spin text-white mr-2" />
									Updating...
								</div>
							) : (
								"Update Profile"
							)}
						</button>
					</div>
				</form>
			</div>
			<ConfirmationModal
				isOpen={showUpdateModal}
				onConfirm={formik.handleSubmit}
				onCancel={() => setShowUpdateModal(false)}
				message={modalMessage}
			/>
		</div>
	);
};
