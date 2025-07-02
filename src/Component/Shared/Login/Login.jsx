import { useForm } from "react-hook-form";
import Lottie from "lottie-react";
import loginAnimation from "../../../assets/login.json";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router";
import { useState } from "react";
import GoogleSignInButton from "../../Pages/GoogleSignInButton/GoogleSignInButton";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";

const Login = () => {
  const { signIn, googleSignIn, updateUserProfile } = useAuth();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = (data) => {
    const { email, password } = data;

    signIn(email, password)
      .then(res => {
        console.log("User logged in:", res.user);
        reset(); // Reset the form
        navigate('/')
      })
      .catch(error => {
        console.error("Login failed:", error.message);
      });
  };
  const handleGoogleSignIn = () => {
    setError("");
    setLoading(true);
    googleSignIn()
      .then((result) => {
        const user = result.user;
        return updateUserProfile(user?.displayName, user?.photoURL);
      })
      .then(() => {
        toast.success("Signed in and profile updated with Google!");
        navigate('/')
      })
      .catch(err => {
        setError(err.message);
        console.error("Google Sign-In Error:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 dark:from-gray-800 dark:to-gray-900 flex flex-col md:flex-row items-center justify-center p-6">
      <Helmet>
        <title>Books | Login</title>
      </Helmet>

      {/* Lottie Animation */}
      <div className="w-full md:w-1/2 flex justify-center mb-10 md:mb-0">
        <div className="w-80 md:w-96">
          <Lottie animationData={loginAnimation} loop />
        </div>
      </div>

      {/* Login Form Container */}
      <div className="w-full md:w-1/2 max-w-md bg-white/80 dark:bg-white/10 backdrop-blur-md rounded-xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
          Login to Your Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email */}
          <div className="relative">
            <input
              type="email"
              placeholder=" "
              {...register("email", { required: "Email is required" })}
              className="peer w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-white"
            />
            <label className="absolute left-4 top-2 text-gray-500 text-xs peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-xs transition-all">
              Email Address
            </label>
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type="password"
              placeholder=" "
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "At least 6 characters" }
              })}
              className="peer w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-white"
            />
            <label className="absolute left-4 top-2 text-gray-500 text-xs peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-xs transition-all">
              Password
            </label>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          {/* Error Message */}
          {error && <p className="text-red-600 text-center mb-2">{error}</p>}

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition duration-300"
          >
            Login
          </button>

          {/* Google Sign In */}
          <GoogleSignInButton handleGoogleSignIn={handleGoogleSignIn} loading={loading} error={error} />

          {/* Switch to Register */}
          <p className="text-center text-sm mt-6 text-gray-700 dark:text-gray-300">
            Don't have an account?{" "}
            <a href="/signUp" className="text-green-600 font-medium underline">Register</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
