"use client"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { use, useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic } from 'lucide-react'
import { toast } from 'sonner'
import { chatSession } from '@/utils/GeminiAiModel'
import { useUser } from '@clerk/nextjs'
import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import moment from 'moment'

function RecordAnsSection({mockInterviewQuestion,activeQuestionIndex,interviewData}) {
    
    const [userAnswer, setUserAnswer] = useState('');
    const [loading, setLoading] = useState(false);
    const {user} = useUser();


    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
        setResults,
      } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
      });


      useEffect(()=>{
         results.map((result)=>(
            setUserAnswer(prevAns => prevAns+result?.transcript)
         ))
      },[results])

      useEffect(()=>{
         if(!isRecording && userAnswer.length>10){
            UpdateUserAnswer();
         }
         
      },[userAnswer])

    const StartStopRecording = async()=>{
        if(isRecording){   
            stopSpeechToText();       
        }else{                    
            startSpeechToText();
        }
    }

    const UpdateUserAnswer = async()=>{
        console.log(userAnswer);
        setLoading(true);
        const feedbackPrompt = 
        "Question:"+mockInterviewQuestion[activeQuestionIndex]?.question+", User Answer:"+userAnswer+
        ",Depends on question and user Answer for the given interview question,"+
        "please give us rating for answer and feedback as area of improvement if any"+
        "in just 3 to 5 lines to improve it in JSON format with rating field and feedback field";
        
        const result = await chatSession.sendMessage(feedbackPrompt);
        const MockJsonResp = (result.response.text()).replace('```json','').replace('```','');              
        const jsonFeedbackRes = JSON.parse(MockJsonResp);
        console.log(jsonFeedbackRes);
        

        const response = await db.insert(UserAnswer).values({
            mockIdRef : interviewData?.mockId,
            question : mockInterviewQuestion[activeQuestionIndex]?.question,
            correctAns : mockInterviewQuestion[activeQuestionIndex]?.answer,
            userAns : userAnswer,
            feedback : jsonFeedbackRes?.feedback,
            rating : jsonFeedbackRes?.rating,
            userEmail : user?.primaryEmailAddress?.emailAddress,
            createdAt :  moment().format(),
        })

        if(response){
            toast('User answer recorded sucessfully');
            setUserAnswer('');
            setResults([]);
        }
        setResults([]);
        setLoading(false);
    }

  return (
    <div className='flex flex-col justify-center items-center'>
        <div className='flex flex-col items-center justify-center border rounded-lg bg-black my-5'>
            <Image src={'/webcam-bg.png'}  width={200} height={200} alt='webcam image' className='absolute ml-5 my-5'/>
            { <Webcam
            mirrored = {true}

            style = {{
                    height : 400,
                    width :  400,
                    zIndex : 10
                }}
            /> }
        </div>
            <Button disabled={loading} variant="outline" className='font-bold'
             onClick = {StartStopRecording}
            > 
             {isRecording? <h2 className='text-red-500 flex gap2'> <Mic/> Stop Recording </h2>: 'Record Answers'}
             </Button>

    </div>
  )
}


export default RecordAnsSection