import React, { useState } from "react";
import {
	Github,
	Linkedin,
	Instagram,
	Mail,
	Phone,
	Edit2,
	LogOut,
	ChevronLeft,
} from "lucide-react";
import { ProfileUpdate } from "../components/ProfileUpdate";
import { useUserStore } from "../store/userStore";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const Profile = () => {
	const [updateProfile, setUpdateProfile] = useState(false);
	const { user, setUser, setError } = useUserStore();
	const navigate = useNavigate();

	const handleLogout = () => {
		alert("Logged out successfully");
		localStorage.removeItem("authToken");
		setUser(null);
		setError(null);
		navigate("/login");
	};

	return (
		<>
			<div className="profile-container flex-1 p-8 pt-16 overflow-y-auto">
				<div className="max-w-4xl mx-auto">
					{updateProfile ? (
						<div className="profile-animate-slide-up">
							<button
								onClick={() => setUpdateProfile(false)}
								className="flex items-center text-gray-600 hover:text-gray-900 transition-colors px-8">
								<ChevronLeft className="w-5 h-5 mr-1" />
								Back to Profile
							</button>
							<ProfileUpdate setUpdateProfile={setUpdateProfile} />
						</div>
					) : (
						<div className="space-y-6 profile-animate-fade-in">
							{/* Header Section */}
							<div className="flex justify-between items-center">
								<h1 className="text-2xl font-medium text-gray-900">Profile</h1>
								<div className="flex gap-3">
									<button
										onClick={() => setUpdateProfile(true)}
										className="flex items-center px-4 py-2 rounded-lg
                             bg-blue-500 text-white
                             hover:bg-blue-600 transition-colors">
										<Edit2 className="w-4 h-4 mr-2" />
										Edit Profile
									</button>
									<button
										onClick={handleLogout}
										className="flex items-center px-4 py-2 rounded-lg
                             bg-gray-100 text-gray-700
                             hover:bg-gray-200 transition-colors">
										<LogOut className="w-4 h-4 mr-2" />
										Logout
									</button>
								</div>
							</div>

							{/* Main Profile Card */}
							<div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20">
								{/* Profile Header */}
								<div className="p-8 text-center border-b border-gray-100">
									<div className="relative inline-block">
										<div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white text-4xl font-medium mb-4">
											{user?.name?.charAt(0)}
										</div>
									</div>
									<h2 className="text-2xl font-semibold text-gray-900">
										{user?.name}
									</h2>
									{/* <p className="text-gray-500 mt-1">Software Developer</p> */}
								</div>

								{/* Profile Content */}
								<div className="p-8">
									<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
										{/* Contact Information */}
										<div className="space-y-6">
											<h3 className="text-lg font-medium text-gray-900 mb-4">
												Contact Information
											</h3>
											<div className="space-y-4">
												<div className="flex items-center space-x-3 text-gray-600">
													<Mail className="w-5 h-5 text-gray-400" />
													<span>{user?.email}</span>
												</div>
												<div className="flex items-center space-x-3 text-gray-600">
													<Phone className="w-5 h-5 text-gray-400" />
													<span>{user?.phone_number}</span>
												</div>
											</div>
										</div>

										{/* Social Links */}
										<div className="space-y-6">
											<h3 className="text-lg font-medium text-gray-900 mb-4">
												Social Profiles
											</h3>
											<div className="space-y-4">
												<div className="flex items-center space-x-3">
													<Github className="w-5 h-5 text-gray-400" />
													<a
														href={user?.github}
														className="text-blue-500 hover:text-blue-600 transition-colors">
														GitHub Profile
													</a>
												</div>
												<div className="flex items-center space-x-3">
													<Linkedin className="w-5 h-5 text-gray-400" />
													<a
														href={user?.linkedin}
														className="text-blue-500 hover:text-blue-600 transition-colors">
														LinkedIn Profile
													</a>
												</div>
												<div className="flex items-center space-x-3">
													<Instagram className="w-5 h-5 text-gray-400" />
													<a
														href={user?.instagram}
														className="text-blue-500 hover:text-blue-600 transition-colors">
														Instagram Profile
													</a>
												</div>
											</div>
										</div>
									</div>

									{/* Activity Section */}
									{/* <div className="mt-8">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
                    <div className="bg-gray-50 rounded-xl p-6">
                      <div className="space-y-4">
                        {[1, 2, 3].map((_, index) => (
                          <div key={index} className="flex items-center space-x-4">
                            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                            <p className="text-gray-600">Last active {index + 1} day{index !== 0 ? 's' : ''} ago</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div> */}
								</div>
							</div>
						</div>
					)}
				</div>
			</div>

			<style jsx>{`
				.profile-container .animate-slide-up {
					animation: slideUp 0.3s ease-out forwards;
				}

				.profile-container .animate-fade-in {
					animation: fadeIn 0.3s ease-out forwards;
				}

				@keyframes slideUp {
					from {
						opacity: 0;
						transform: translateY(20px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}

				@keyframes fadeIn {
					from {
						opacity: 0;
					}
					to {
						opacity: 1;
					}
				}
			`}</style>
		</>
	);
};

export default Profile;
