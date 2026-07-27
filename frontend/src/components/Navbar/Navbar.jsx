import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-5">

        {/* Logo */}
        <Link to="/">
          <h1 className="text-3xl font-extrabold text-blue-600 tracking-wide hover:scale-105 transition">
            📚 StudyGenie AI
          </h1>
        </Link>

        {/* Menu */}
        <ul className="hidden md:flex items-center gap-8 text-gray-700 font-semibold">

          <li>
            <Link to="/" className="hover:text-blue-600 transition">
              Home
            </Link>
          </li>

          <li>
            <a href="#features" className="hover:text-blue-600 transition">
              Features
            </a>
          </li>

          <li>
            <Link to="/signup" className="hover:text-blue-600 transition">
              Sign Up
            </Link>
          </li>

        </ul>

        <div className="flex gap-3">

          <Link to="/login">
            <button className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-5 py-2 rounded-lg font-semibold transition">
              Login
            </button>
          </Link>

          <Link to="/dashboard">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold shadow-md transition">
              Get Started
            </button>
          </Link>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;