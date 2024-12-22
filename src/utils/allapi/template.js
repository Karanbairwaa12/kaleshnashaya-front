import api from "../api";

export const getTemplates = async (id) => {
	try {
		const response = await api.get(`/template/${id}`);
        console.log(response?.data, "response")
		return {...response?.data, status: response.status};
	} catch (error) {
		return error.response;
	}
};

export const createTemplate = async (obj,id) => {
	try {
		const response = await api.post(`/template/${id}`, obj);
        console.log(response?.data, "response")
		return {...response?.data, status: response.status};
	} catch (error) {
		return error.response;
	}
};

export const applyTemplate = async (user_id, template_id) => {
	try {
		const response = await api.patch(`template/apply/${user_id}/${template_id}`);
        console.log(response?.data, "response")
		return {...response?.data, status: response.status};
	} catch (error) {
		return error.response;
	}
};



export const deleteTemplate = async (template_id) => {
	try {
		const response = await api.delete(`template/${template_id}`);
        console.log(response?.data, "response")
		return {...response?.data, status: response.status};
	} catch (error) {
		return error.response;
	}
};