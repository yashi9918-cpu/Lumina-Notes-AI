import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="bg-gradient-to-r from-blue-50 via-white to-cyan-50 py-24">
      <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-12 items-center">

        {/* Left Side */}
        <div>

          <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
            🚀 AI Powered Study Assistant
          </span>

          <h1 className="text-6xl font-extrabold text-gray-800 leading-tight mt-6">
            Learn Smarter with
            <span className="text-blue-600"> Lumina Notes AI AI</span>
          </h1>

          <p className="mt-6 text-xl text-gray-600 leading-8">
            Upload your notes, generate AI summaries, create quizzes,
            chat with your PDFs, and revise faster using intelligent
            flashcards—all in one place.
          </p>

          <div className="mt-10 flex gap-5">

            <Link to="/dashboard">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl shadow-lg transition">
                🚀 Get Started
              </button>
            </Link>

            <a href="#features">
              <button className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-xl hover:bg-blue-100 transition">
                Learn More
              </button>
            </a>

          </div>

        </div>

        {/* Right Side */}
        <div className="flex justify-center">

          <div className="bg-white rounded-3xl shadow-2xl p-8 w-96">

            <h2 className="text-2xl font-bold text-blue-600">
              📄 AI Study Assistant
            </h2>

            <div className="mt-6 space-y-4">

              <div className="bg-blue-100 p-4 rounded-xl">
                📑 AI Summary
              </div>

              <div className="bg-green-100 p-4 rounded-xl">
                💬 Chat with PDF
              </div>

              <div className="bg-purple-100 p-4 rounded-xl">
                📝 Quiz Generator
              </div>

              <div className="bg-orange-100 p-4 rounded-xl">
                🗂 Flashcards
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Hero;