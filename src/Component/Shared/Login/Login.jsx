import { useForm } from "react-hook-form";
import Lottie from "lottie-react";
import loginAnimation from "../../../assets/login.json";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router";
import { useState } from "react";
import GoogleSignInButton from "../../Pages/GoogleSignInButton/GoogleSignInButton";
import toast from "react-hot-toast";

const Login = () => {
  const { signIn,googleSignIn,updateUserProfile } = useAuth();
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
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-r from-green-100 to-blue-100 p-6">
      {/* Lottie Animation */}
      <div className="w-full md:w-1/2 flex justify-center">
        <Lottie animationData={loginAnimation} loop className="w-full max-w-md" />
      </div>

      {/* Login Form */}
      <div className="w-full md:w-1/2 max-w-md bg-white shadow-xl p-8 rounded-xl mt-8 md:mt-0">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login to Your Account</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Email Address"
              {...register("email", { required: "Email is required" })}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "At least 6 characters" }
              })}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-500 underline">Register</a>
        </p>
        {/* Google Sign In Button */}
        <GoogleSignInButton handleGoogleSignIn={handleGoogleSignIn} loading={loading} error={error} />
      </div>

    </div>
  );
};

export default Login;
