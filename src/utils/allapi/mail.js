import api from "../api";

export const sendMail = async (obj,id, setLoading) => {
    try {
      setLoading(true)
      const response = await api.post(`/user/${id}`, obj);
     
      return response
    } catch (error) {
        return error.response
    }finally{
        setLoading(false)
    }
  };