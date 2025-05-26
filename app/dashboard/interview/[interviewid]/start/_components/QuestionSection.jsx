import { Lightbulb, Volume2 } from 'lucide-react'
import React, { useState } from 'react'

function QuestionSection({mockInterviewQuestion, activeQuestionIndex}) {
  
  const [isSpeaking, setIsSpeaking] = useState(false);
  const speechSynthesis = window.speechSynthesis;

  const textToSpeech = (text) => {
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        speechSynthesis.cancel();
        setIsSpeaking(false);
      } else {
        const speech = new SpeechSynthesisUtterance(text);
        speech.onend = () => setIsSpeaking(false);
        speechSynthesis.speak(speech);
        setIsSpeaking(true);
      }
    } else {
      alert("Sorry, Your browser does not support text to speech");
    }
  }

  return mockInterviewQuestion && (
    <div className='p-5 border rounded-lg my-5'>
      <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-5'>
        {mockInterviewQuestion && mockInterviewQuestion.map((question, index) => (
          <h2 className={
            `p-3 w-40 bg-secondary rounded-full text-xs md:text-sm text-center cursor-pointer
            ${activeQuestionIndex == index && 'bg-blue-400'}`} key={index}>Question #{index + 1}</h2>
        ))}
      </div>
      <h2 className='my-5 text-md md:text-lg '>{mockInterviewQuestion[activeQuestionIndex]?.question}</h2>
      <Volume2 className='cursor-pointer' onClick={() => textToSpeech(mockInterviewQuestion[activeQuestionIndex]?.question)} />

      <div className='border rounded-lg p-5 bg-blue-100 mt-20'>
        <h2 className='flex gap-2 items-center text-primary'>
          <Lightbulb />
          <strong>Note:</strong>
        </h2>
        <h2 className='text-sm text-primary my-2'>
          {process.env.NEXT_PUBLIC_QUESTION_NOTE}
        </h2>
      </div>
    </div>
  )
}

export default QuestionSection