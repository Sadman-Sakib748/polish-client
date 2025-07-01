import React, { useState, useRef } from "react";
import { Helmet } from "react-helmet";
import { Mail, Phone, MapPin } from "lucide-react";
import toast from "react-hot-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [touched, setTouched] = useState({});
  const formRef = useRef(null);

  // Validation function
  const validate = (data) => {
    const errs = {};
    if (!data.name.trim()) {
      errs.name = "Name is required.";
    }
    if (!data.email.trim()) {
      errs.email = "Email is required.";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(data.email.trim())
    ) {
      errs.email = "Invalid email address.";
    }
    if (!data.message.trim()) {
      errs.message = "Message cannot be empty.";
    } else if (data.message.trim().length < 10) {
      errs.message = "Message should be at least 10 characters.";
    }
    return errs;
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setTouched((prev) => ({
      ...prev,
      [e.target.name]: true,
    }));

    // Validate on change
    setErrors(validate({ ...formData, [e.target.name]: e.target.value }));
  };

  const handleBlur = (e) => {
    setTouched((prev) => ({
      ...prev,
      [e.target.name]: true,
    }));

    setErrors(validate(formData));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate(formData);
    setErrors(validationErrors);
    setTouched({ name: true, email: true, message: true });

    if (Object.keys(validationErrors).length > 0) {
      // Scroll to form top for errors
      formRef.current?.scrollIntoView({ behavior: "smooth" });
      toast.error("Please fix the errors before submitting.");
      return;
    }

    setSubmitting(true);

    // Simulate async form submission (replace with real API call)
    setTimeout(() => {
      setSubmitting(false);
      toast.success("Thank you for reaching out! We will get back to you soon.");
      setFormData({ name: "", email: "", message: "" });
      setTouched({});
      setErrors({});
    }, 2000);
  };

  const isValid = Object.keys(errors).length === 0 && Object.keys(touched).length > 0;

  return (
    <div
      className="w-full min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300"
      ref={formRef}
    >
      <Helmet>
        <title>Contact Us | Book App</title>
      </Helmet>

      <div className="max-w-6xl mx-auto px-4 md:px-8 py-16">
        <div className="text-center mb-14">
          <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-700 dark:text-indigo-400 mb-4 drop-shadow-md">
            Get in Touch
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Have questions, feedback, or just want to say hello? We're here to
            help and would love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-gray-700 dark:text-gray-100 mb-20">
          {/* Email Card */}
          <div className="flex flex-col items-center text-center bg-white dark:bg-gray-800 border border-indigo-100 dark:border-gray-700 rounded-2xl shadow-md p-8 transition duration-300 hover:shadow-xl hover:-translate-y-1">
            <Mail className="w-12 h-12 text-indigo-500 mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Email</h2>
            <p className="text-base text-gray-600 dark:text-gray-300">
              support@bookapp.com
            </p>
          </div>

          {/* Phone Card */}
          <div className="flex flex-col items-center text-center bg-white dark:bg-gray-800 border border-indigo-100 dark:border-gray-700 rounded-2xl shadow-md p-8 transition duration-300 hover:shadow-xl hover:-translate-y-1">
            <Phone className="w-12 h-12 text-indigo-500 mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Phone</h2>
            <p className="text-base text-gray-600 dark:text-gray-300">
              +880 123456789
            </p>
          </div>

          {/* Address Card */}
          <div className="flex flex-col items-center text-center bg-white dark:bg-gray-800 border border-indigo-100 dark:border-gray-700 rounded-2xl shadow-md p-8 transition duration-300 hover:shadow-xl hover:-translate-y-1">
            <MapPin className="w-12 h-12 text-indigo-500 mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Address</h2>
            <p className="text-base text-gray-600 dark:text-gray-300">
              Dhaka, Bangladesh
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-2xl p-10 shadow-lg">
          <h2 className="text-3xl font-semibold text-indigo-700 dark:text-indigo-400 mb-6 text-center">
            Send Us a Message
          </h2>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
            noValidate
            aria-live="polite"
          >
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={errors.name ? "true" : "false"}
                aria-describedby="name-error"
                className={`w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 transition ${
                  errors.name && touched.name
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 dark:border-gray-600 focus:ring-indigo-500"
                } bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100`}
                placeholder="Your full name"
                disabled={submitting}
              />
              {errors.name && touched.name && (
                <p
                  id="name-error"
                  className="mt-1 text-sm text-red-600 dark:text-red-400"
                >
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={errors.email ? "true" : "false"}
                aria-describedby="email-error"
                className={`w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 transition ${
                  errors.email && touched.email
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 dark:border-gray-600 focus:ring-indigo-500"
                } bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100`}
                placeholder="you@example.com"
                disabled={submitting}
              />
              {errors.email && touched.email && (
                <p
                  id="email-error"
                  className="mt-1 text-sm text-red-600 dark:text-red-400"
                >
                  {errors.email}
                </p>
              )}
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows="5"
                value={formData.message}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={errors.message ? "true" : "false"}
                aria-describedby="message-error message-help"
                className={`w-full rounded-lg border px-4 py-3 resize-none focus:outline-none focus:ring-2 transition ${
                  errors.message && touched.message
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 dark:border-gray-600 focus:ring-indigo-500"
                } bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100`}
                placeholder="Write your message here..."
                disabled={submitting}
              />
              <p
                id="message-help"
                className="text-xs text-gray-400 dark:text-gray-500 mt-1"
              >
                Minimum 10 characters
              </p>
              {errors.message && touched.message && (
                <p
                  id="message-error"
                  className="mt-1 text-sm text-red-600 dark:text-red-400"
                >
                  {errors.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={submitting || !isValid}
              className={`flex items-center gap-2
            bg-blue-700 text-white
            px-4 py-2 rounded shadow-md
            hover:bg-blue-800
            dark:bg-blue-400 dark:text-gray-900
            dark:hover:bg-blue-500
            focus:outline-none focus:ring-2 focus:ring-blue-400
            dark:focus:ring-blue-300 focus:ring-offset-1
            duration-300 transform hover:translate-x-1 hover:shadow-lg
            dark:shadow-blue-600 ${
                submitting || !isValid
                  ? "bg-indigo-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {submitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
