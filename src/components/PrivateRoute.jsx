import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getUserDataByToken } from "../utils/allapi/auth";
import { useUserStore } from "../store/userStore";

const PrivateRoute = () => {
    const {user, setUser} = useUserStore();
    const [isLoading, setLoading] = useState(true);
    const authToken = localStorage.getItem("authToken");

    useEffect(() => {
        const fetchUserData = async () => {
            if (authToken && !user) {
                try {
                    const { data } = await getUserDataByToken(authToken);
                    setUser(data);
                } catch (err) {
                    localStorage.removeItem("authToken");
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (isLoading) {
        return <div className="w-full min-h-lvh flex justify-center items-center">Loading...</div>;
    }

    if (!authToken) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default PrivateRoute;