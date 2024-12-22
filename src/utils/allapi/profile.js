import api from "../api";
  export const getUserDataByToken = async () => {
    try {
      const response = await api.get('/user/loggedUser');
      
      const data = { data: response.data.data, status: response.status };
      console.log(response.data.data, data);
      return data; // Assuming the API returns user data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'An error occurred while fetching user data');
    }
  };


  export const updateUserProfile = async (obj,id) => {
    try {
      
      const response = await api.patch(`/user/${id}`, obj);
      return {data: response.data.data, status: response.status}
    } catch (error) {
        return error.response.status
    }finally{
    }
  };
  

