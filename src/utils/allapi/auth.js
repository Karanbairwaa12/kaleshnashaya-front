import api from "../api";

export const loginApi = async (email, password, setError, setLoading) => {
    try {
      setLoading(true);

      const response = await api.post('/auth/login', { email, password });
      
        if(response.status === 200) {
            setError(null);
            setLoading(false);
            localStorage.setItem("authToken",response.data.data.accessToken); // Assuming the API returns user data
        }
        return response.status
    } catch (error) {
        setError(error.response.data.message);
        return error.response.status
    }finally{
        setLoading(false);
    }
  };

  export const signUpApi = async (obj, setLoading, setError) => {
    try {
      setLoading(true);
      const response = await api.post('/auth/signup', obj);
      return response
    } catch (error) {
        setError(error.response.data.message);
        return error.response.status
    }finally{
        setLoading(false);
    }
  };

  export const getUserDataByToken = async () => {
    try {
      const response = await api.get('/user/loggedUser');
      const data = { data: response.data.data, status: response.status };
      return data; // Assuming the API returns user data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'An error occurred while fetching user data');
    }
  };

