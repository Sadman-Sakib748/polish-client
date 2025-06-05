import React from "react";

const GoogleIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 533.5 544.3"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill="#4285F4"
      d="M533.5 278.4c0-17.4-1.5-34.3-4.6-50.7H272v95.9h146.9c-6.3 34-25.3 62.8-54.1 82v67h87.4c51.1-47 80.3-116.3 80.3-194.2z"
    />
    <path
      fill="#34A853"
      d="M272 544.3c73.6 0 135.5-24.4 180.7-66.2l-87.4-67c-24 16.1-54.8 25.6-93.3 25.6-71.7 0-132.4-48.4-154.2-113.2h-90v70.8c45.3 89 137.8 150.9 244.2 150.9z"
    />
    <path
      fill="#FBBC05"
      d="M117.8 327.5c-10.9-32.7-10.9-67.8 0-100.5v-70.8h-90c-38.7 75.3-38.7 165.1 0 240.4l90-69.1z"
    />
    <path
      fill="#EA4335"
      d="M272 107.7c39.9 0 75.9 13.7 104.1 40.4l78.1-78.1C405.6 24 344 0 272 0 165.6 0 73.1 61.9 28 150.9l90 69.1c21.8-64.8 82.5-113.2 154-113.2z"
    />
  </svg>
);

const GoogleSignInButton = ({ handleGoogleSignIn, loading, error }) => {
  return (
    <div className="flex flex-col items-center">
      <button
        onClick={handleGoogleSignIn}
        disabled={loading}
        className="flex items-center gap-2 px-5 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <GoogleIcon />
        {loading ? "Signing in..." : "Sign in with Google"}
      </button>
      {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
    </div>
  );
};

export default GoogleSignInButton;
