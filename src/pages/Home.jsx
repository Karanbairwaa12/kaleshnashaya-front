import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSpinner, FaEnvelope, FaPaperPlane } from "react-icons/fa";
import { useUserStore } from "../store/userStore";
import { sendMail } from "../utils/allapi/mail";
import { getAppliedTemplate } from "../utils/allapi/template";

export const Home = () => {
  const [email, setEmail] = useState("");
  const [sendResume, setSendResume] = useState(true);
  const [templateLoading, setTemplateLoading] = useState(false);
  const [template, setTemplate] = useState(null);
  const { user, setLoading, isLoading } = useUserStore();
  const [error, setError] = useState();
  const [formData, setFormData] = useState({});

  // Keeping existing handlers and effects the same
  const handleSubmit = async () => {
    if (email) {
      let updatedSubject = template.subject;
      let updatedMail = template.mail;

      Object.keys(formData).forEach((key) => {
        const value = formData[key];
        const regex = new RegExp(`{${key}}`, "g");
        updatedSubject = updatedSubject.replace(regex, value);
        updatedMail = updatedMail.replace(regex, value);
      });
      
      const data = {
        subject: updatedSubject,
        mail: updatedMail,
      }

      const mail = await sendMail(
        { mail_id: email, isresume: sendResume, content: data },
        user?._id,
        setLoading
      );
      
      if (mail.status === 200) {
        alert("Email sent successfully");
      } else {
        setError(mail.data.message);
      }
    }
  };

  const handleInputChange = (e, key) => {
    setFormData({
      ...formData,
      [key]: e.target.value,
    });
  };

  useEffect(() => {
    const fetchAppliedTemplate = async () => {
      try {
        if (user) {
          setTemplateLoading(true);
          const { data, status } = await getAppliedTemplate(user.current_template_id);
          if (status === 200) {
            setTemplate(data);
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        setTemplateLoading(false);
      }
    };
    
    if (user?.current_template_id) {
      fetchAppliedTemplate();
    }
  }, [user]);

  useEffect(() => {
    if (template) {
      const extractVariables = (str) => {
        const regex = /{([^}]+)}/g;
        let matches;
        const variables = new Set();
        while ((matches = regex.exec(str)) !== null) {
          variables.add(matches[1]);
        }
        return variables;
      };

      const allVariables = new Set([
        ...extractVariables(template.subject),
        ...extractVariables(template.mail),
      ]);

      const initialFormData = {};
      Array.from(allVariables).forEach((variable) => {
        initialFormData[variable] = "";
      });
      setFormData(initialFormData);
    }
  }, [template]);

  useEffect(() => {
    setError(null);
  }, [email, sendResume]);

  return (
    <div className="flex-1 p-4 pt-12">
      <div className="max-w-4xl mx-auto">
        <div className="animate-slide-up">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">HR Email Submission</h2>
          
          <div className="bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* HR Email Input */}
              <div className="md:col-span-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  HR Email
                </label>
                <div className="relative shadow-sm">
                  <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-gray-300"
                    placeholder="Enter HR email"
                  />
                </div>
              </div>

              {/* Dynamic Input Fields */}
              {Object.keys(formData).map((key) => (
                <div key={key}>
                  <label htmlFor={key} className="block text-sm font-medium text-gray-700 mb-1">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </label>
                  <div className="shadow-sm">
                    <input
                      type="text"
                      id={key}
                      value={formData[key]}
                      onChange={(e) => handleInputChange(e, key)}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-gray-300"
                      placeholder={`Enter ${key}`}
                    />
                  </div>
                </div>
              ))}

              {/* Send Resume Checkbox */}
              <div className="md:col-span-2">
                <div className="shadow-sm border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-all">
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={sendResume}
                      onChange={(e) => setSendResume(e.target.checked)}
                      className="form-checkbox h-5 w-5 text-blue-600 rounded border-gray-300 shadow-sm"
                    />
                    <span className="ml-2 text-gray-700">Send resume with email</span>
                  </label>
                </div>
                {error && (
                  <div className="mt-2 p-3 bg-red-50 rounded-lg text-red-600 text-sm shadow-sm">
                    {error}
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-6">
              <button
                onClick={handleSubmit}
                className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex justify-center items-center">
                    <FaSpinner className="animate-spin text-white" size={20} />
                    <span className="ml-2">Sending...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <FaPaperPlane className="mr-2" />
                    <span>Send Email</span>
                  </div>
                )}
              </button>
            </div>
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
    </div>
  );
};

export default Home;