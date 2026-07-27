import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-indigo-100 flex justify-center items-center">

      <div className="bg-white shadow-2xl rounded-2xl p-10 w-[400px]">

        <h1 className="text-4xl font-bold text-center text-blue-600">
          Welcome Back 👋
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Login to continue your study journey.
        </p>

        <form className="mt-8">

          <label className="font-semibold">Email</label>

          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border rounded-lg p-3 mt-2 mb-5 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label className="font-semibold">Password</label>

          <input
            type="password"
            placeholder="Enter your password"
            className="w-full border rounded-lg p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg mt-8 hover:bg-blue-700 transition"
          >
            Login
          </button>

        </form>

        <p className="text-center mt-6">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 font-semibold">
            Create Account
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Login;