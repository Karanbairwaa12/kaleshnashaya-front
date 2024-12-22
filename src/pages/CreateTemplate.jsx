import React, { useState } from "react";
import { createTemplate } from "../utils/allapi/template";
import { useUserStore } from "../store/userStore";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

// Validation schema using Yup
const validationSchema = Yup.object({
	templateName: Yup.string().required("Template Name is required"),
	subject: Yup.string().required("Subject is required"),
	inputText: Yup.string().required("Template Content is required"),
});

const CreateTemplate = () => {
	const { user, setLoading } = useUserStore();
    const [error, setError] = useState();
	const navigate = useNavigate();

	// Component to render the preview with exact line breaks
	const FormattedPreview = ({ text }) => {
		return (
			<div className="preview-content whitespace-pre-wrap font-mono">
				{text.split("\n").map((line, index) => (
					<React.Fragment key={index}>
						{line}
						{index < text.split("\n").length - 1 && <br />}
					</React.Fragment>
				))}
			</div>
		);
	};

	// Handle save action
	const handleSave = async (values) => {
		const lines = values.inputText.split("\n");
		const templateOutput =
			values.inputText !== ""
				? lines
						.map((line) => {
							return line === "" ? "<br />" : `<p>${line}</p>`;
						})
						.join("\n")
				: "";

		const output = {
			template_name: values.templateName,
			subject: values.subject,
			mail: templateOutput,
		};

		try {
			if (user) {
				// Call the API to create the template
				const response = await createTemplate(output, user?._id);
                console.log(response, "working")
				if (response?.status === 201) {
					navigate("/templates");
				} else {
					setError(response?.data?.message);
				}
			}
		} catch (error) {
			setError("An error occurred while creating the template");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-gray-100 flex items-center justify-center">
			<div className="w-full max-w-5xl bg-white p-8 rounded-lg shadow-lg">
				<h1 className="text-2xl font-bold mb-8 text-center">Create Template</h1>

				{/* Formik Form */}
				<Formik
					initialValues={{
						templateName: "",
						subject: "",
						inputText: "",
					}}
					validationSchema={validationSchema}
					onSubmit={handleSave}
				>
					{({ values, handleChange, handleBlur }) => (
						<Form>
							{/* Template Name and Subject Inputs */}
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
								<div>
									<label
										htmlFor="templateName"
										className="block text-sm text-gray-600 mb-2"
									>
										Template Name
									</label>
									<Field
										type="text"
										id="templateName"
										name="templateName"
										value={values.templateName}
										onChange={handleChange}
										onBlur={handleBlur}
										placeholder="Enter template name..."
										className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
									/>
									<ErrorMessage
										name="templateName"
										component="div"
										className="text-red-500 text-sm"
									/>
								</div>

								<div>
									<label htmlFor="subject" className="block text-sm text-gray-600 mb-2">
										Subject
									</label>
									<Field
										type="text"
										id="subject"
										name="subject"
										value={values.subject}
										onChange={handleChange}
										onBlur={handleBlur}
										placeholder="Enter subject..."
										className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
									/>
									<ErrorMessage
										name="subject"
										component="div"
										className="text-red-500 text-sm"
									/>
								</div>
							</div>

							{/* Main Content Section */}
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
								{/* Text Editor */}
								<div className="bg-white rounded-lg shadow-sm">
									<h2 className="text-xl font-semibold mb-4 text-center">
										Text Editor
									</h2>
									<Field
										as="textarea"
										id="inputText"
										name="inputText"
										value={values.inputText}
										onChange={handleChange}
										onBlur={handleBlur}
										placeholder="Enter your text here..."
										className="w-full h-64 p-4 border rounded-md font-mono resize-none"
									/>
									<ErrorMessage
										name="inputText"
										component="div"
										className="text-red-500 text-sm"
									/>
								</div>

								{/* Preview */}
								<div className="bg-white rounded-lg shadow-sm">
									<h2 className="text-xl font-semibold mb-4 text-center">Preview</h2>
									<div className="w-full h-64 p-4 border rounded-md overflow-auto">
										<FormattedPreview text={values.inputText} />
									</div>
								</div>
							</div>

							<div className="text-center">
								<button
									type="submit"
									className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
								>
									Save Template
								</button>
							</div>
                            {
                                error && (
                                    <div className="text-red-500 text-center mt-4">
                                        {error}
                                    </div>
                                )
                            }
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
};

export default CreateTemplate;
