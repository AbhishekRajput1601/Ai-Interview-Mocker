import React from 'react'
import { UserPlus, FileSpreadsheet, Play, BookOpen, Camera, 
         MessageSquare, Square, FileCheck, CheckCircle, Trophy } from 'lucide-react'

function WorkFlow() {
  const steps = [
    { icon: <UserPlus className="w-6 h-6" />, title: "Create Account", description: "Sign up to get started with AI interviews" },
    { icon: <FileSpreadsheet className="w-6 h-6" />, title: "Add Interview Details", description: "Provide your job requirements and experience" },
    { icon: <h3lay className="w-6 h-6" />, title: "Start Interview", description: "Begin your AI-powered interview session" },
    { icon: <BookOpen className="w-6 h-6" />, title: "Read Instructions", description: "Review important guidelines before starting" },
    { icon: <Camera className="w-6 h-6" />, title: "Setup Devices", description: "Allow camera and microphone access" },
    { icon: <MessageSquare className="w-6 h-6" />, title: "Answer Questions", description: "Provide clear and concise responses" },
    { icon: <Square className="w-6 h-6" />, title: "End Interview", description: "Complete your interview session" },
    { icon: <FileCheck className="w-6 h-6" />, title: "Get Feedback", description: "Receive detailed performance analysis" },
    { icon: <CheckCircle className="w-6 h-6" />, title: "Review Answers", description: "Access correct answers for each question" },
    { icon: <Trophy className="w-6 h-6" />, title: "Improvement Tips", description: "Get personalized advice to enhance skills" }
  ]

  return (
    <div className="py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} 
                 className="relative p-6 bg-white rounded-xl shadow-sm border border-gray-100 
                          hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full 
                              bg-primary/10 text-primary">
                  {step.icon}
                </div>
                <div>
                  <span className="inline-block px-3 py-1 mb-2 text-xs font-semibold 
                                 text-primary bg-primary/10 rounded-full">
                    Step {index + 1}
                  </span>
                  <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                  <h3 className="text-gray-600 text-sm">{step.description}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default WorkFlow