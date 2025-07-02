import { Mail, MessageCircle, Phone } from "lucide-react";

const Support = () => {
  return (
    <div className="min-h-screen px-6 py-12 mt-6 bg-gradient-to-br from-green-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-white">
      <div className="max-w-4xl mx-auto text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">Support</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Need assistance? Our support team is here to help you 24/7. Feel free to reach out via the options below.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {/* Email Support */}
        <div className="bg-white dark:bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-md hover:shadow-lg transition">
          <div className="flex items-center justify-center mb-4">
            <Mail className="text-blue-600 dark:text-blue-400" size={36} />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-center">Email Us</h3>
          <p className="text-center text-gray-700 dark:text-gray-300">
            support@example.com
          </p>
        </div>

        {/* Live Chat */}
        <div className="bg-white dark:bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-md hover:shadow-lg transition">
          <div className="flex items-center justify-center mb-4">
            <MessageCircle className="text-green-600 dark:text-green-400" size={36} />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-center">Live Chat</h3>
          <p className="text-center text-gray-700 dark:text-gray-300">
            Chat with us directly from the bottom-right corner.
          </p>
        </div>

        {/* Phone */}
        <div className="bg-white dark:bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-md hover:shadow-lg transition">
          <div className="flex items-center justify-center mb-4">
            <Phone className="text-purple-600 dark:text-purple-400" size={36} />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-center">Call Us</h3>
          <p className="text-center text-gray-700 dark:text-gray-300">
            +880-123-456-7890
          </p>
        </div>
      </div>
    </div>
  );
};

export default Support;
