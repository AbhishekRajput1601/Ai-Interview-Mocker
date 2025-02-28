import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <section className="min-h-screen flex">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-300 via-blue-400 to-blue-900">
        <div className="m-auto px-16 text-white">
          <h1 className="text-5xl font-bold mb-6">Interview With AI</h1>
          <div className="space-y-4">
            <h2 className="text-2xl">👋 Welcome Back!</h2>
            <h3 className="text-lg opacity-80">
              Practice interviews with our AI and improve your skills
            </h3>
            <div className="space-y-2 mt-8">
              <div className="flex items-center space-x-3">
                <span className="bg-blue-500/20 p-2 rounded-full">✨</span>
                <h3>Real-time AI feedback</h3>
              </div>
              <div className="flex items-center space-x-3">
                <span className="bg-blue-500/20 p-2 rounded-full">🎯</span>
                <h3>Personalized questions</h3>
              </div>
              <div className="flex items-center space-x-3">
                <span className="bg-blue-500/20 p-2 rounded-full">📊</span>
                <h3>Detailed performance analytics</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="text-center lg:hidden mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back!</h2>
            <h3 className="text-gray-600">Sign in to continue your practice</h3>
          </div>
          <SignIn />
        </div>
      </div>
    </section>
  )
}