import React, { useEffect, useState } from 'react';
import { geminiGenerateContent } from '../lib/gemini';

const QuizPage: React.FC = () => {
  const [quiz, setQuiz] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fileText = sessionStorage.getItem('uploadedFileText') || '';
    const prompt = `You are an expert quiz generator. For the following text, create 5 multiple-choice questions with 4 options each, mark the correct answer, and provide a brief explanation for each. Format clearly.\n\n${fileText}`;
    geminiGenerateContent(prompt)
      .then((result) => {
        setQuiz(result);
        setLoading(false);
      })
      .catch(() => {
        setQuiz('Could not generate quiz.');
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-12">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-blue-600 mb-6 flex items-center">📝 Take Test</h1>
        <div className="mb-6 whitespace-pre-line text-left text-lg">
          {loading ? 'Generating quiz...' : quiz}
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
