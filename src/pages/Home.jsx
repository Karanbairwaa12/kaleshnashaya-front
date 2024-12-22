import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { sendMail } from "../utils/allapi/mail";
import { useUserStore } from "../store/userStore";
import { FaSpinner } from "react-icons/fa"; // Import the spinner icon

export const Home = () => {
  const [email, setEmail] = useState("");
  const [sendResume, setSendResume] = useState(true);
  const { user, setLoading, isLoading } = useUserStore();
  const [error, setError] = useState();

  const handleSubmit = async () => {
    console.log("Email:", email);
    console.log("Send Resume:", sendResume);

    if (email) {
      const mail = await sendMail(
        { mail_id: email, isresume: sendResume },
        user?._id,
        setLoading
      );
      console.log("mail", mail);
      if (mail.status === 200) {
        alert("Email sent successfully");
      } else {
        setError(mail.data.message);
      }
    }
  };

  useEffect(() => {
    setError(null);
  }, [email, sendResume]);

  return (
    <>
      
      {/* Main Content */}
      <div className="flex-1 p-8 pt-16 overflow-y-auto">
        <div className="max-w-2xl mx-auto space-y-8">
          
          <div className="animate-slide-up">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">HR Email Submission</h2>
            <p className="text-gray-600 text-lg mb-6">
              Enter the HR email below and choose if you want to send your resume.
            </p>
            
            {/* Email Input Section */}
            <div className="bg-white/80 backdrop-blur-xl rounded-xl shadow-lg border border-white/20 p-8">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                HR Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter HR email"
              />
            </div>

            {/* Send Resume Checkbox */}
            <div className="bg-white/80 backdrop-blur-xl rounded-xl shadow-lg border border-white/20 p-8 mt-6">
              <label className="inline-flex items-center text-lg">
                <input
                  type="checkbox"
                  checked={sendResume}
                  onChange={(e) => setSendResume(e.target.checked)}
                  className="form-checkbox h-6 w-6 text-blue-600"
                />
                <span className="ml-3 text-gray-700">Do you want to send your resume?</span>
              </label>
			  {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>

            {/* Redesigned Submit Button */}
            <div className="mt-6 flex justify-center">
              <button
                onClick={handleSubmit}
                className="w-full sm:w-auto bg-blue-500 text-white py-2 px-6 rounded-md shadow-md hover:bg-blue-600 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                disabled={isLoading} // Disable the button when loading
              >
                {isLoading ? (
                  <div className="flex justify-center items-center">
                    <FaSpinner className="animate-spin text-white" size={20} />
                    <span className="ml-3">Sending...</span>
                  </div>
                ) : (
                  "Send Email"
                )}
              </button>
            </div>

            {/* Error Message */}
            
          </div>

        </div>
      </div>

      <style jsx>{`
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

        .animate-slide-up {
          animation: slideUp 0.3s ease-out forwards;
        }
      `}</style>
    </>
  );
};
