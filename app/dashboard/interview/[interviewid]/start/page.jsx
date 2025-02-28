"use client"
import React from 'react'
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { useEffect, use, useState } from 'react'
import QuestionSection from './_components/QuestionSection';
import RecordAnsSection from './_components/RecordAnsSection';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Loader from '@/components/ui/Loader';

function StartInterview({params}) {

    const unwrappedParams = use(params);
    
    const [interviewData, setInterviewData] = useState();
    const [mockInterviewQuestion, setMockInterviewQuestion] = useState(); 
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
    const [loading, setLoading] = useState(true);

        
    useEffect(() => {
        if (unwrappedParams && unwrappedParams.interviewid) {
            console.log("Interview ID:", unwrappedParams.interviewid);
            getInterviewDetails();
        }
    }, [unwrappedParams]);
    
    const getInterviewDetails = async()=>{
        setLoading(true);
        const result = await db.select().from(MockInterview)
        .where(eq(MockInterview.mockId, unwrappedParams.interviewid))
         
        const jsomMockResponse = JSON.parse(result[0].jsonMockRep);
        console.log(jsomMockResponse);
        
        setMockInterviewQuestion(jsomMockResponse);
        setInterviewData(result[0]);
        setLoading(false);
    };

    if (loading) return <Loader />;

  return (
    <div> 
       <div className='grid grid-cols-1 md:grid-cols-2'>
             <QuestionSection 
                mockInterviewQuestion = {mockInterviewQuestion}
                activeQuestionIndex = {activeQuestionIndex}   
             />

             <RecordAnsSection
                mockInterviewQuestion = {mockInterviewQuestion}
                activeQuestionIndex = {activeQuestionIndex} 
                interviewData = {interviewData}
             />
       </div>

       <div className='flex justify-end items-end gap-2 mr-32'>
            {activeQuestionIndex>0 && 
            <Button onClick = {()=>setActiveQuestionIndex(activeQuestionIndex-1)}>Previous Question</Button>}
            {activeQuestionIndex != mockInterviewQuestion?.length-1 && 
            <Button onClick = {()=>setActiveQuestionIndex(activeQuestionIndex+1)}>Next Question</Button>}
            {activeQuestionIndex == mockInterviewQuestion?.length-1 && 
            <Link href={`/dashboard/interview/${interviewData?.mockId}/feedback`}>
            <Button variant='outline'>End Interview</Button>
            </Link>}
       </div>

    </div>
  )
}

export default StartInterview