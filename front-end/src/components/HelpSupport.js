import { useState } from "react";
import "./HelpSupport.css";

function HelpSupport() {
    const [expandedQuestion, setExpandedQuestion] = useState(null);

    const faqs = [
        {
            question: "How do I update my profile?",
            answer: "Navigate to Account Settings and edit desired information."
        },
        {
            question: "How do I reset my password?",
            answer: "Navigate to Account Settings and see at the bottom for reseting password."
        },
        {
            question: "How can I delete my account?",
            answer: "Please contact support at help@smartfridge.com to request account deletion."
        },
        {
            question: "How do I manage my dietary preferences?",
            answer: "Go to Settings > Dietary Preferences and customize your selections."
        },
        {
            question: "My questions are not here / I want to give feedback",
            answer: "Please contact support at help@smartfridge.com"
        }
    ];

    const toggleQuestion = (index) => {
        setExpandedQuestion(prev => prev === index ? null : index);
    };

    return (
        <div className="form-collector">
            <div className="header">
                <h1>Help & Support</h1>
                <p>Find answers to common questions and get help</p>
            </div>

            <div className="faq-list">
                {faqs.map((faq, index) => (
                    <div key={index} className="faq-item">
                        <button
                            className="faq-question"
                            onClick={() => toggleQuestion(index)}
                        >
                            {faq.question}
                            <span className="faq-icon">{expandedQuestion === index ? "-" : "+"}</span>
                        </button>
                        {expandedQuestion === index && (
                            <div className="faq-answer">
                                {faq.answer}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default HelpSupport;
