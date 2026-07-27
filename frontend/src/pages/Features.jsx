function Features() {
  return (
    <section
      id="features"
      className="py-24 bg-gradient-to-b from-white to-blue-50"
    >
      <div className="max-w-7xl mx-auto px-8">

        <h2 className="text-5xl font-bold text-center text-gray-800">
          Everything You Need to Study Smarter
        </h2>

        <p className="text-center text-gray-600 mt-5 text-lg max-w-3xl mx-auto">
          Lumina Notes AI combines powerful AI tools into one platform to help you
          understand, revise, and remember your study material faster.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">

          {/* Upload */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300">
            <div className="text-6xl">📄</div>

            <h3 className="text-2xl font-bold mt-6">
              Upload Notes
            </h3>

            <p className="text-gray-600 mt-3">
              Upload PDF notes securely and access them whenever you need.
            </p>
          </div>

          {/* Summary */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300">
            <div className="text-6xl">📝</div>

            <h3 className="text-2xl font-bold mt-6">
              AI Summary
            </h3>

            <p className="text-gray-600 mt-3">
              Convert lengthy notes into concise and easy-to-understand summaries.
            </p>
          </div>

          {/* Chat */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300">
            <div className="text-6xl">🤖</div>

            <h3 className="text-2xl font-bold mt-6">
              AI Chat
            </h3>

            <p className="text-gray-600 mt-3">
              Ask questions from your uploaded PDF and get instant answers.
            </p>
          </div>

          {/* Quiz */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300">
            <div className="text-6xl">❓</div>

            <h3 className="text-2xl font-bold mt-6">
              Quiz Generator
            </h3>

            <p className="text-gray-600 mt-3">
              Test yourself with AI-generated MCQs based on your notes.
            </p>
          </div>

          {/* Flashcards */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300">
            <div className="text-6xl">🗂</div>

            <h3 className="text-2xl font-bold mt-6">
              Flashcards
            </h3>

            <p className="text-gray-600 mt-3">
              Revise important concepts quickly using AI-generated flashcards.
            </p>
          </div>

          {/* Fast & Secure */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300">
            <div className="text-6xl">⚡</div>

            <h3 className="text-2xl font-bold mt-6">
              Fast & Secure
            </h3>

            <p className="text-gray-600 mt-3">
              Process your study material quickly with a clean and secure AI-powered workflow.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}

export default Features;