"use client"
import { Button } from '@/components/ui/button';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { Lightbulb, WebcamIcon } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, use, useState } from 'react'
import Webcam from 'react-webcam';
import Loader from '@/components/ui/Loader';

function Interview({params}) {
    const unwrappedParams = use(params);

    const [interviewData, setInterviewData] = useState();
    const [webCamEnabled, setWebCamEnabled] = useState(false);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        if (unwrappedParams && unwrappedParams.interviewid) {
            getInterviewDetails();
        }
    }, [unwrappedParams]);

    const getInterviewDetails = async()=> {
        setLoading(true);
        const result = await db.select().from(MockInterview)
        .where(eq(MockInterview.mockId, unwrappedParams.interviewid))
           
        setInterviewData(result[0]);
        setLoading(false);
    };

    if (loading) return <Loader />;

    return (
        <div className='my-10 flex justify-center flex-col items-center overflow-hidden scrollbar-hide'>
            <h2 className='font-bold text-3xl text-blue-600 mb-5'>Let's Get Started</h2>
            
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
                {interviewData && (
                    <div className='flex flex-col my-7 gap-5 mr-8 ml-10'>
                        <div className='flex flex-col gap-5 rounded-lg border p-8 bg-secondary shadow-lg'>
                            <h2 className='text-lg'><strong>Job Role/Position:</strong> {interviewData.jobPosition}</h2>
                            <h2 className='text-lg'><strong>Job Description:</strong> {interviewData.jobDes}</h2>
                            <h2 className='text-lg'><strong>Years Of Experience:</strong> {interviewData.jobExperience} years</h2>
                        </div>
                        <div className='h-64 w-full p-10 border rounded-lg border-yellow-300 bg-yellow-100 shadow-lg'>
                            <h2 className='flex gap-2 items-center text-red-600'><Lightbulb/><strong> Information </strong></h2>
                            <h2>{process.env.NEXT_PUBLIC_INFORMATION}</h2>
                            <h2><strong>Enable Your Webcam & Microphone before starting the interview.</strong></h2>
                        </div>
                    </div>      
                )}
                <div className='overflow-hidden mr-48 mt-7 flex flex-col items-center'>
                    {webCamEnabled ? 
                        <Webcam
                            onUserMedia={() => setWebCamEnabled(true)}
                            onUserMediaError={() => setWebCamEnabled(false)}
                            mirrored={true}
                            style={{
                                height: 300,
                                width: 400,
                                borderRadius: '10px',
                                border: '2px solid #ccc',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                            }}      
                        /> 
                    : 
                    <>
                        <WebcamIcon className='h-72 w-96 my-7 p-20 bg-secondary rounded-lg border overflow-hidden '/>
                        <Button className=" bg-green-200" variant="ghost" onClick={() => setWebCamEnabled(true)}>Enable Webcam And Microphone</Button>
                    </>
                    }
                    <div className='mt-5'>
                        <Link href={`/dashboard/interview/${unwrappedParams.interviewid}/start`}>
                            <Button className='mt-3 bg-blue-500 text-white'>Start Interview</Button>
                        </Link>
                    </div>
                </div> 
            </div>
        </div>
    )
}

export default Interview