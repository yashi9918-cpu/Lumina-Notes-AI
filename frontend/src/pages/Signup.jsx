import { Link } from "react-router-dom";

function Signup() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-100 to-pink-100 flex justify-center items-center">

      <div className="bg-white shadow-2xl rounded-2xl p-10 w-[420px]">

        <h1 className="text-4xl font-bold text-center text-purple-600">
          Create Account
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Join Lumina Notes AI today.
        </p>

        <form className="mt-8">

          <label className="font-semibold">Full Name</label>

          <input
            type="text"
            placeholder="Enter your full name"
            className="w-full border rounded-lg p-3 mt-2 mb-5"
          />

          <label className="font-semibold">Email</label>

          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border rounded-lg p-3 mt-2 mb-5"
          />

          <label className="font-semibold">Password</label>

          <input
            type="password"
            placeholder="Create password"
            className="w-full border rounded-lg p-3 mt-2"
          />

          <button
            className="w-full bg-purple-600 text-white py-3 rounded-lg mt-8 hover:bg-purple-700 transition"
          >
            Sign Up
          </button>

        </form>

        <p className="text-center mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-600 font-semibold">
            Login
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Signup;