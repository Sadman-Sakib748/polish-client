import { useForm } from "react-hook-form";
import Lottie from "lottie-react";
import animationData from "../../../assets/register.json";
import useAuth from "../../../hooks/useAuth";

const Register = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const { createUser, updateUserProfile,googleSignIn } = useAuth();

  const onSubmit = (data) => {
    const { email, password, name, image } = data;

    createUser(email, password)
      .then(res => {
        updateUserProfile(name, image)
          .then(() => {
            console.log("User created and profile updated.");
            reset();
          })
          .catch(error => console.error("Profile update error:", error.message));
      })
      .catch(error => console.error("User creation error:", error.message));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 dark:from-gray-800 dark:to-gray-900 flex flex-col md:flex-row items-center justify-center p-6">
      
      {/* Lottie Animation */}
      <div className="w-full md:w-1/2 flex justify-center mb-10 md:mb-0">
        <div className="w-80 md:w-96">
          <Lottie animationData={animationData} loop />
        </div>
      </div>

      {/* Form Container */}
      <div className="w-full md:w-1/2 max-w-md bg-white/80 dark:bg-white/10 backdrop-blur-md rounded-xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">Create Account</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name */}
          <div className="relative">
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="peer w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-transparent placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-white"
              placeholder="Your Name"
            />
            <label className="absolute left-4 top-2 text-gray-500 text-sm peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 text-xs transition-all">
              Name
            </label>
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div className="relative">
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="peer w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-transparent placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-white"
              placeholder="Email"
            />
            <label className="absolute left-4 top-2 text-gray-500 text-sm peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 text-xs transition-all">
              Email
            </label>
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "At least 6 characters" }
              })}
              className="peer w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-transparent placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-white"
              placeholder="Password"
            />
            <label className="absolute left-4 top-2 text-gray-500 text-sm peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 text-xs transition-all">
              Password
            </label>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          {/* Image URL */}
          <div className="relative">
            <input
              type="text"
              {...register("image", { required: "Image URL is required" })}
              className="peer w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-transparent placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-white"
              placeholder="Image URL"
            />
            <label className="absolute left-4 top-2 text-gray-500 text-sm peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 text-xs transition-all">
              Image URL
            </label>
            {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition duration-300"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
