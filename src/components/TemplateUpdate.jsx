import React, { useState } from "react";

const QuestionInput = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [finalAnswers, setFinalAnswers] = useState({});
  const [edit, setEdit] = useState(false)
    const [questions, setQuestions] = useState([
        {
            question:
                "What specific challenges does Shutterfly face in managing and personalizing marketing campaigns that are not addressed by current solutions?",
            sample_answer: {
                text: "Shutterfly faces several specific challenges in managing and personalizing marketing campaigns that are not adequately addressed by current solutions. Firstly, the reliance on manual processes results in a significant delay in campaign execution, with an average time lag of {average_time_lag} days from conception to deployment. This inefficiency is compounded by the lack of automation tools, which limits the ability to scale campaigns effectively, reducing potential reach by {reduced_reach_percentage}%. Additionally, fragmented customer data leads to incomplete customer profiles, affecting personalization accuracy by {personalization_accuracy_loss}%. Poor integration across channels further exacerbates these issues, resulting in a {channel_integration_loss}% loss in cross-channel synergy, ultimately impacting conversion rates by {conversion_rate_impact}%. Addressing these challenges requires a comprehensive solution that enhances data integration, automates processes, and improves personalization capabilities.",
                parameters: [
                    { name: "average_time_lag", value: "" },
                    { name: "reduced_reach_percentage", value: "" },
                    { name: "personalization_accuracy_loss", value: "" },
                    { name: "channel_integration_loss", value: "" },
                    { name: "conversion_rate_impact", value: "" },
                ],
            },
        },{
            question:
                "What specific challenges does Shutterfly face in managing and personalizing marketing campaigns that are not addressed by current solutions?",
            sample_answer: {
                text: "Shutterfly faces several specific challenges in managing and personalizing marketing campaigns that are not adequately addressed by current solutions. Firstly, the reliance on manual processes results in a significant delay in campaign execution, with an average time lag of {average_time_lag} days from conception to deployment. This inefficiency is compounded by the lack of automation tools, which limits the ability to scale campaigns effectively, reducing potential reach by {reduced_reach_percentage}%. Additionally, fragmented customer data leads to incomplete customer profiles, affecting personalization accuracy by {personalization_accuracy_loss}%. Poor integration across channels further exacerbates these issues, resulting in a {channel_integration_loss}% loss in cross-channel synergy, ultimately impacting conversion rates by {conversion_rate_impact}%. Addressing these challenges requires a comprehensive solution that enhances data integration, automates processes, and improves personalization capabilities.",
                parameters: [
                    { name: "average_time_lag", value: "" },
                    { name: "reduced_reach_percentage", value: "" },
                    { name: "personalization_accuracy_loss", value: "" },
                    { name: "channel_integration_loss", value: "" },
                    { name: "conversion_rate_impact", value: "" },
                ],
            },
        }
    ]);

    const updateParameterValue = (parameterName, newValue) => {
        setQuestions((prevQuestions) => {
            const newQuestions = [...prevQuestions];
            const parameters = newQuestions[currentQuestion].sample_answer.parameters;
            const paramIndex = parameters.findIndex((p) => p.name === parameterName);
            if (paramIndex !== -1) {
                parameters[paramIndex] = { ...parameters[paramIndex], value: newValue };
            }
            return newQuestions;
        });
    };

    const handleTextChange = (newText) => {
        setQuestions((prevQuestions) => {
            const newQuestions = [...prevQuestions];
            const currentQ = newQuestions[currentQuestion];

            // Get current parameters from text
            const regex = /\{([^}]+)\}/g;
            const matches = [...newText.matchAll(regex)];
            const newParams = matches.map((match) => {
                const paramName = match[1];
                const existingParam = currentQ.sample_answer.parameters.find(
                    (p) => p.name === paramName
                );
                return existingParam || { name: paramName, value: "" };
            });

            currentQ.sample_answer.text = newText;
            currentQ.sample_answer.parameters = newParams;

            return newQuestions;
        });
    };

    const renderText = (text, parameters) => {
        const parts = [];
        let lastIndex = 0;

        parameters.forEach((param, index) => {
            const placeholder = `{${param.name}}`;
            const placeholderIndex = text.indexOf(placeholder, lastIndex);

            if (placeholderIndex !== -1) {
                parts.push(text.substring(lastIndex, placeholderIndex));
                const displayValue = param.value || param.name;
                parts.push(
                    <span key={index} className={param.value ? "text-green-600" : ""}>
                        {`{${displayValue}}`}
                    </span>
                );
                lastIndex = placeholderIndex + placeholder.length;
            }
        });

        parts.push(text.substring(lastIndex));
        return <>{parts}</>;
    };

    const getPlainText = () => {
    debugger
        let text = questions[currentQuestion].sample_answer.text;
        questions[currentQuestion].sample_answer.parameters.forEach((param) => {
            const value = param.value;
            if (value !== "") {
                text = text.replace(`{${param.name}}`, value);
            }
        });
        return text;
    };

    const handleNext = () => {
        setFinalAnswers((prev) => ({ ...prev, [currentQuestion]: getPlainText() }));
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion((prev) => prev + 1);
        }
    };

    const handleBack = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion((prev) => prev - 1);
        }
    };

    const handleSave = () => {
        const finalState = { ...finalAnswers, [currentQuestion]: getPlainText() };
        console.log("Final Answers:", finalState);
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <div className="mb-4 font-semibold text-lg">
                {questions[currentQuestion].question}
            </div>
{
  edit ? (<div className="mb-4 p-4 bg-white rounded-lg shadow">
    <textarea
      className="w-full p-2 border rounded"
      value={questions[currentQuestion].sample_answer.text}
      onChange={(e) => handleTextChange(e.target.value)}
      rows={8}
    />
  </div>):(<div className="mb-4 p-4 bg-white rounded-lg shadow">
                {renderText(
                    questions[currentQuestion].sample_answer.text,
                    questions[currentQuestion].sample_answer.parameters
                )}
            </div>)
}
            

            
      <button onClick={() => setEdit(!edit)} className="bg-red-500 p-4 m-2">
        {edit ? "save": "edit"}
      </button>

            <div className="bg-green-100 p-4 rounded-lg">
                <div className="text-lg font-medium mb-4">
                    Please replace placeholders with actual values:
                </div>
                <div className="grid grid-cols-2 gap-4">
                    {questions[currentQuestion].sample_answer.parameters.map((param) => (
                        <div key={param.name} className="bg-green-50 p-2 rounded">
                            <input
                                type="text"
                                className="w-full p-2 border rounded"
                                placeholder={param.name}
                                value={param.value}
                                onChange={(e) =>
                                    updateParameterValue(param.name, e.target.value)
                                }
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-between mt-4">
                <button
                    onClick={handleBack}
                    disabled={currentQuestion === 0}
                    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50">
                    Back
                </button>

                {currentQuestion === questions.length - 1 ? (
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-green-500 text-white rounded">
                        Save
                    </button>
                ) : (
                    <button
                        onClick={handleNext}
                        className="px-4 py-2 bg-blue-500 text-white rounded">
                        Next
                    </button>
                )}
            </div>
        </div>
    );
};

export default QuestionInput;
