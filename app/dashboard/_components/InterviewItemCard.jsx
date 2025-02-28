import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'

function InterviewItemCard({interview}) {

    const router = useRouter();

    const ViewFeedback = ()=>{
        router.push(`/dashboard/interview/${interview?.mockId}/feedback`)
    }

    const StartInterview = ()=>{
        router.push(`/dashboard/interview/${interview?.mockId}`)
    }


  return (
        <div className="shadow-lg rounded-xl p-5 border border-gray-200 bg-secondary my-3 w-96">
        <h2 className="text-xl font-semibold text-primary mb-1">
            {interview?.jobPosition}
        </h2>
        <h2 className="text-sm text-gray-700">
            {interview?.jobExperience} Years of Experience
        </h2>
        <h2 className="text-sm text-gray-600 mt-1">
            Description : {interview?.jobDes}
        </h2>
        <div className="mt-2 flex items-center justify-between">
            <span className="text-gray-500 text-sm">Attend by: {interview?.createdBy}</span>
        </div>
        <div className='flex justify-between mt-3 gap-4'>
            <Button className="w-full" size="sm" variant = "outline"
            onClick = {ViewFeedback}
            > View Feedback </Button>
            <Button className="w-full" size="sm"
            onClick = {StartInterview}
            > Start Interview </Button>
        </div>
        </div>
  )
}

export default InterviewItemCard