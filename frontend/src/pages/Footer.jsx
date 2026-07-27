function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10 mt-20">
      <div className="max-w-7xl mx-auto px-8 text-center">

        <h2 className="text-3xl font-bold text-blue-400">
          📚 Lumina Notes AI
        </h2>

        <p className="mt-4 text-gray-300">
          Learn smarter with AI.
          Upload notes, generate quizzes, and study efficiently.
        </p>

        <div className="flex justify-center gap-8 mt-6">
          <a href="#" className="hover:text-blue-400">
            Home
          </a>

          <a href="#" className="hover:text-blue-400">
            Features
          </a>

          <a href="#" className="hover:text-blue-400">
            Contact
          </a>
        </div>

        <hr className="my-8 border-gray-700" />

        <p className="text-gray-400 text-sm">
          © 2026 Lumina Notes AI. Made by Siya Singh ❤️
        </p>

      </div>
    </footer>
  );
}

export default Footer;