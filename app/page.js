import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 mt-6">
      <div className="mx-auto w-3/4 px-4 py-16">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-6">
            InterviewMe<span className="text-blue-600">.</span>
          </h1>
          
          <h3 className="text-gray-600 text-xl md:text-2xl max-w-2xl mb-8 font-bold">
            Master your next tech interview with AI-powered practice sessions and real-time feedback.
          </h3>

          <div className="grid md:grid-cols-3 gap-8 mt-12 text-center w-full">
            <div className="bg-white shadow-lg p-6 rounded-lg">
              <h3 className="text-blue-600 text-xl font-bold mb-3">Smart Practice</h3>
              <h3 className="text-gray-600">Personalized interview questions based on your experience level and target role.</h3>
            </div>

            <div className="bg-white shadow-lg p-6 rounded-lg">
              <h3 className="text-blue-600 text-xl font-bold mb-3">Real-time Feedback</h3>
              <h3 className="text-gray-600">Get instant feedback on your answers and improve your interview skills.</h3>
            </div>

            <div className="bg-white shadow-lg p-6 rounded-lg">
              <h3 className="text-blue-600 text-xl font-bold mb-3">Interview Analytics</h3>
              <h3 className="text-gray-600">Track your progress and identify areas for improvement.</h3>
            </div>
          </div>

          <Link href="/dashboard">
            <button className="mt-12 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-8 rounded-full transition-all shadow-lg">
              Start Practicing
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
