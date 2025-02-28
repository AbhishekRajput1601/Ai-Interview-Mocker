"use client"
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { useUser } from '@clerk/nextjs'
import { desc, eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import InterviewItemCard from './InterviewItemCard';

function InterviewList() {

    const user = useUser();
    const [interviewList, setInterviewList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        if(user?.user?.primaryEmailAddress?.emailAddress) {
            GetInterviewList();
        }
    },[user?.user?.primaryEmailAddress?.emailAddress])

    const GetInterviewList = async()=>{
        setLoading(true);
        const userEmail = user?.user?.primaryEmailAddress?.emailAddress;
        if(!userEmail) {
            return;
        }

        const result = await db.select().from(MockInterview)
        .where(eq(MockInterview.createdBy, userEmail))
        .orderBy(desc(MockInterview.id));
         console.log(result);
         
        setInterviewList(result);
        setLoading(false);
    }

  return (
    <div>
     <h2 className='text-2xl font-bold'> Previous Interviews List </h2>
     <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5'>
        {loading ? (
          <>
            {[1,2,3].map((item) => (
              <div key={item} className="border rounded-lg p-4 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              </div>
            ))}
          </>
        ) : (
          interviewList && interviewList.map((interview,index)=>(
            <InterviewItemCard key={index} interview = {interview} />
          ))
        )}
     </div>
    </div>
  )
}

export default InterviewList