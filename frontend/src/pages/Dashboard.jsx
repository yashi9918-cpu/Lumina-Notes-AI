import { useState } from "react";
import api from "../api";
import { jsPDF } from "jspdf";
function Dashboard() {
    const [file, setFile] = useState(null);
    const [summary, setSummary] = useState("");
    const [loadingSummary, setLoadingSummary] = useState(false);
    const [loadingChat, setLoadingChat] = useState(false);
    const [loadingQuiz, setLoadingQuiz] = useState(false);
    const [uploadedFileName, setUploadedFileName] = useState("");
    const [displayFileName, setDisplayFileName] = useState("");
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [quiz, setQuiz] = useState("");
    const [flashcards, setFlashcards] = useState("");
    const [loadingFlashcards, setLoadingFlashcards] = useState(false);
    const [activeSection, setActiveSection] = useState("");
    const handleFileChange = (e) => {
      setFile(e.target.files[0]);
};

    const handleUpload = async () => {
  if (!file) {
    alert("Please select a PDF first.");
    return;
}

  const formData = new FormData();
  formData.append("pdf", file);

  try {
    const response = await api.post("/upload", formData);

    setUploadedFileName(response.data.file);
    setDisplayFileName(file.name);
    setSummary("");
setAnswer("");
setQuiz("");
setFlashcards("");
setQuestion("");
setActiveSection("");
alert(response.data.message);
  } catch (error) {
  console.log(error);
  console.log(error.response);
  console.log(error.response?.data);

  alert(
    error.response?.data?.error ||
    error.message ||
    "Upload failed!"
  );
}
};
const handleSummary = async () => {
  if (!uploadedFileName) {
    alert("Please upload a PDF first.");
    return;
  }

  setLoadingSummary(true);

  try {
    const response = await api.post("/ai/summary", {
  filename: uploadedFileName,
});

    setSummary(response.data.summary);
  } catch (error) {
    console.error(error);
    alert(error.response?.data?.error || "Failed to generate summary.");
  } finally {
    setLoadingSummary(false);
  }
};
const handleChat = async () => {
  if (!uploadedFileName) {
    alert("Please upload a PDF first.");
    return;
  }

  if (!question.trim()) {
    alert("Please enter a question.");
    return;
  }

  setLoadingChat(true);

  try {
    const response = await api.post("/ai/chat", {
  filename: uploadedFileName,
  question,
});

    setAnswer(response.data.answer);
  } catch (error) {
    console.error(error);
    alert(error.response?.data?.error || "Chat failed.");
  } finally {
    setLoadingChat(false);
  }
};
const handleQuiz = async () => {
  if (!uploadedFileName) {
    alert("Please upload a PDF first.");
    return;
  }
  setLoadingQuiz(true);

  try {
    const response = await api.post("/ai/quiz", {
  filename: uploadedFileName,
});

    setQuiz(response.data.quiz);
  } catch (error) {
    console.error(error);
    alert(error.response?.data?.error || "Quiz generation failed.");
  } finally {
    setLoadingQuiz(false);
  }
};
const handleFlashcards = async () => {
  if (!uploadedFileName) {
    alert("Please upload a PDF first.");
    return;
  }

  setLoadingFlashcards(true);

  try {
    const response = await api.post("/ai/flashcards", {
  filename: uploadedFileName,
});

    setFlashcards(response.data.flashcards);
  } catch (error) {
    console.error(error);
    alert(error.response?.data?.error || "Flashcard generation failed.");
  } finally {
    setLoadingFlashcards(false);
  }
};
const downloadSummary = () => {
  if (!summary) {
    alert("Generate a summary first.");
    return;
  }

  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Lumina Notes AI Summary", 20, 20);

  doc.setFontSize(12);

  const lines = doc.splitTextToSize(summary, 170);
  doc.text(lines, 20, 35);

  doc.save("Lumina_Notes_AI_Summary.pdf");
};
  return (
    <div className="min-h-screen bg-slate-100 p-10">

      {/* Hero section */}

<div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 rounded-3xl p-10 shadow-xl text-white">

  <div className="flex justify-between items-start">

    <div>
      <h1 className="text-5xl font-extrabold">
        📚 Lumina Notes
AI Study Assistant
      </h1>

      <p className="mt-4 text-lg text-blue-100 max-w-2xl">
        Upload notes, generate summaries, chat with your PDF,
        create quizzes and flashcards—all powered by AI.
      </p>
    </div>

    <button
  onClick={() => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }}
  className="bg-white text-blue-700 px-5 py-2 rounded-xl font-semibold hover:bg-gray-200 transition duration-300"
>
  Logout
</button>

  </div>

  <div className="mt-6 flex gap-4 flex-wrap">

    <div className="bg-white/20 px-5 py-2 rounded-full">
      🚀 AI Powered
    </div>

    <div className="bg-white/20 px-5 py-2 rounded-full">
      📄 PDF Learning
    </div>

    <div className="bg-white/20 px-5 py-2 rounded-full">
      ⚡ Instant Revision
    </div>

  </div>

</div>
        {/* Statistics Cards */}

<div className="grid md:grid-cols-4 gap-6 mt-8">

  <div className="bg-white rounded-xl shadow p-6 text-center">
    <h2 className="text-4xl">📄</h2>
    <p className="font-bold mt-3">PDF Uploaded</p>
    <p className="text-blue-600 mt-1">
      {displayFileName || "No PDF"}
    </p>
  </div>

  <div className="bg-white rounded-xl shadow p-6 text-center">
    <h2 className="text-4xl">📝</h2>
    <p className="font-bold mt-3">Summary</p>
    <p className="text-blue-600 mt-1">
      {summary ? "Ready" : "Pending"}
    </p>
  </div>

  <div className="bg-white rounded-xl shadow p-6 text-center">
    <h2 className="text-4xl">❓</h2>
    <p className="font-bold mt-3">Quiz</p>
    <p className="text-blue-600 mt-1">
      {quiz ? "Ready" : "Pending"}
    </p>
  </div>

  <div className="bg-white rounded-xl shadow p-6 text-center">
    <h2 className="text-4xl">🗂</h2>
    <p className="font-bold mt-3">Flashcards</p>
    <p className="text-blue-600 mt-1">
      {flashcards ? "Ready" : "Pending"}
    </p>
  </div>
  </div>  
  
    {/* Welcome Section */}

<div className="bg-white rounded-2xl shadow-md p-6 mt-8 flex justify-between items-center">

  <div>
    <h2 className="text-2xl font-bold">
      👋 Welcome 
    </h2>

    <p className="text-gray-500 mt-2">
      Upload your study notes and generate summaries, quizzes, flashcards and AI chat instantly.
    </p>
  </div>

  <div className="text-6xl">
    🎓
  </div>

</div>


      {/* Upload Notes */}
      <div className="bg-white mt-8 p-8 rounded-2xl shadow-lg">

  <h2 className="text-2xl font-bold">
    📂 Upload Notes
  </h2>

  <div className="flex items-center gap-4 mt-4">

  <input
    type="file"
    id="pdfUpload"
    accept=".pdf"
    onChange={handleFileChange}
    className="hidden"
  />

  <label
    htmlFor="pdfUpload"
    className="bg-gray-200 px-5 py-2 rounded-lg cursor-pointer hover:bg-gray-300"
  >
    📂 Choose File
  </label>

  {displayFileName && (
    <span className="font-medium text-gray-700">
      Selected File: {displayFileName}
    </span>
  )}

  <button
    onClick={handleUpload}
    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl"
  >
    📤 Upload PDF
  </button>

</div>

  {displayFileName && (
    <div className="mt-4 bg-green-100 border border-green-300 text-green-800 p-3 rounded-lg">
      ✅ Uploaded File:
      <br />
      <span className="font-semibold">
        {displayFileName}
      </span>
    </div>
  )}

</div>

  <div className="grid md:grid-cols-2 gap-6 mt-10">

  {/* Summary Card */}
  <div
    onClick={() => uploadedFileName && setActiveSection("summary")}
    className={`cursor-pointer p-6 rounded-2xl transition-all duration-300 border-2
    ${
      activeSection === "summary"
        ? "bg-purple-600 text-white border-purple-600 scale-105 shadow-2xl"
        : "bg-white border-gray-200 hover:shadow-2xl hover:-translate-y-2"
    }
    ${!uploadedFileName ? "opacity-50 cursor-not-allowed" : ""}
    `}
  >
    <h2 className="text-3xl">📝</h2>
    <h3 className="text-2xl font-bold mt-3">AI Summary</h3>
    <p className="mt-2">
      Generate easy-to-read summaries from your PDF.
    </p>
  </div>

  {/* Chat Card */}
  <div
    onClick={() => uploadedFileName && setActiveSection("chat")}
    className={`cursor-pointer p-6 rounded-2xl transition-all duration-300 border-2
    ${
      activeSection === "chat"
        ? "bg-green-600 text-white border-green-600 scale-105 shadow-2xl"
        : "bg-white border-gray-200 hover:shadow-2xl hover:-translate-y-2"
    }
    ${!uploadedFileName ? "opacity-50 cursor-not-allowed" : ""}
    `}
  >
    <h2 className="text-3xl">🤖</h2>
    <h3 className="text-2xl font-bold mt-3">AI Chat</h3>
    <p className="mt-2">
      Ask questions directly from your notes.
    </p>
  </div>

  {/* Quiz Card */}
  <div
    onClick={() => uploadedFileName && setActiveSection("quiz")}
    className={`cursor-pointer p-6 rounded-2xl transition-all duration-300 border-2
    ${
      activeSection === "quiz"
        ? "bg-blue-600 text-white border-blue-600 scale-105 shadow-2xl"
        : "bg-white border-gray-200 hover:shadow-2xl hover:-translate-y-2"
    }
    ${!uploadedFileName ? "opacity-50 cursor-not-allowed" : ""}
    `}
  >
    <h2 className="text-3xl">❓</h2>
    <h3 className="text-2xl font-bold mt-3">Quiz Generator</h3>
    <p className="mt-2">
      Generate MCQs instantly for revision.
    </p>
  </div>

  {/* Flashcards Card */}
  <div
    onClick={() => uploadedFileName && setActiveSection("flashcards")}
    className={`cursor-pointer p-6 rounded-2xl transition-all duration-300 border-2
    ${
      activeSection === "flashcards"
        ? "bg-orange-500 text-white border-orange-500 scale-105 shadow-2xl"
        : "bg-white border-gray-200 hover:shadow-2xl hover:-translate-y-2"
    }
    ${!uploadedFileName ? "opacity-50 cursor-not-allowed" : ""}
    `}
  >
    <h2 className="text-3xl">🗂</h2>
    <h3 className="text-2xl font-bold mt-3">Flashcards</h3>
    <p className="mt-2">
      Learn faster with AI-generated flashcards.
    </p>
  </div>

</div>


      {/*AI Summary*/}
      {activeSection === "summary" && (

        <div className="bg-white mt-8 p-6 rounded-xl shadow">
      
        <h2 className="text-2xl font-bold mb-4">
        📝 AI Summary
        </h2>

        <div className="bg-slate-50 rounded-xl p-6">
         <p className="text-gray-700">
           Upload your notes and click Generate Summary.
         </p>

         <button
  onClick={handleSummary}
  disabled={loadingSummary}
  className="bg-purple-600 text-white px-6 py-2 rounded-lg mt-4 disabled:bg-gray-400"
>
  {loadingSummary ? "Generating Summary..." : "Generate Summary"}
</button>
   {summary && (
  <div className="mt-6 p-6 bg-white rounded-xl shadow-md border">
    <h3 className="font-bold text-lg mb-2">
      Summary
    </h3>

    <p className="whitespace-pre-line">
      {summary}
    </p>

    <button
      onClick={downloadSummary}
      className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
    >
      📥 Download PDF
    </button>
  </div>
)}    </div>

      </div>
)}

      {/* AI Chat */}

      {activeSection === "chat" && (

<div className="bg-white mt-8 p-6 rounded-xl shadow">

        <h2 className="text-2xl font-bold">
          🤖 AI Chat
        </h2>

        <input
  type="text"
  placeholder="Ask anything from your PDF..."
  value={question}
  onChange={(e) => setQuestion(e.target.value)}
  className="w-full border rounded-lg p-3 mt-4 focus:ring-2 focus:ring-green-500 outline-none"
/>

        <button
  onClick={handleChat}
  disabled={loadingChat}
  className="bg-green-600 text-white px-6 py-2 rounded-lg mt-4 disabled:bg-gray-400"
>
          {loadingChat ? "Thinking..." : "Send"}
        </button>
        {answer && (
  <div className="mt-4 p-4 bg-gray-100 rounded-lg">
    <h3 className="font-bold mb-2">
      🤖 AI Response
    </h3>

    <p className="whitespace-pre-line">
      {answer}
    </p>
  </div>
)}
      </div>
)}

      {/* Quiz */}

      {activeSection === "quiz" && (

<div className="bg-white mt-8 p-6 rounded-xl shadow">

        <h2 className="text-2xl font-bold">
          📝 Quiz Generator
        </h2>

        <button
  onClick={handleQuiz}
  disabled={loadingQuiz}
  className="bg-purple-600 text-white px-6 py-2 rounded-lg mt-4 disabled:bg-gray-400"
>
          {loadingQuiz ? "Generating Quiz..." : "Generate Quiz"}
        </button>
        {quiz && (
  <div className="mt-4 p-4 bg-gray-100 rounded-lg">
    <h3 className="font-bold text-lg mb-2">
      Quiz Questions
    </h3>

    <div className="whitespace-pre-line">
      {quiz}
    </div>
  </div>
)}
      </div>
      )}
      {/*Flashcards*/}
      {activeSection === "flashcards" && (

<div className="bg-white mt-8 p-6 rounded-xl shadow">

        <h2 className="text-2xl font-bold">
          🗂 AI Flashcards
        </h2>

        <button
          onClick={handleFlashcards}
          disabled={loadingFlashcards}
          className="bg-orange-600 text-white px-6 py-2 rounded-lg mt-4 disabled:bg-gray-400"
        >
          {loadingFlashcards
            ? "Generating Flashcards..."
            : "Generate Flashcards"}
        </button>

        {flashcards && (
          <div className="mt-4 p-4 bg-gray-100 rounded-lg whitespace-pre-line">
            <h3 className="font-bold text-lg mb-2">
              Flashcards
            </h3>

            {flashcards}
          </div>
        )}

      </div>
      )}
      {/* Footer */}

<footer className="mt-16 text-center text-gray-600 border-t pt-6">

  <p className="font-semibold">
    © 2026 Lumina Notes AI
  </p>

  <p className="mt-2 text-sm">
    Built with ❤️ using React, Node.js, Express and Gemini AI
  </p>

</footer>
    </div>
  );
}

export default Dashboard;