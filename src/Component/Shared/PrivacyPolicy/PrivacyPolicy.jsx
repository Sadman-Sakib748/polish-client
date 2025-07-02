import { ShieldCheck, FileText, Lock, CheckCircle } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen px-6 py-12 bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-white">
      <div className="max-w-4xl mx-auto bg-white dark:bg-white/10 backdrop-blur-lg p-10 rounded-2xl shadow-2xl space-y-8">
        {/* Title */}
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Last updated: <span className="font-medium">July 2025</span>
          </p>
        </div>

        {/* Intro */}
        <div className="space-y-3 border-b pb-6 border-gray-300 dark:border-gray-700">
          <p>
            We deeply value your trust and privacy. This Privacy Policy outlines how your data is collected, used, and protected while using our platform.
          </p>
        </div>

        {/* Section 1 */}
        <div className="space-y-3 border-b pb-6 border-gray-300 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <FileText className="text-indigo-500" />
            <h2 className="text-2xl font-semibold">Information Collection</h2>
          </div>
          <p>
            We collect only the information necessary to provide the best service, including your name, email address, and user activity data.
          </p>
        </div>

        {/* Section 2 */}
        <div className="space-y-3 border-b pb-6 border-gray-300 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <CheckCircle className="text-green-500" />
            <h2 className="text-2xl font-semibold">How We Use Your Data</h2>
          </div>
          <ul className="list-disc list-inside space-y-2">
            <li>Personalizing your user experience</li>
            <li>Improving our service and performance</li>
            <li>Sending important updates or support responses</li>
          </ul>
        </div>

        {/* Section 3 */}
        <div className="space-y-3 border-b pb-6 border-gray-300 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <Lock className="text-yellow-500" />
            <h2 className="text-2xl font-semibold">Data Protection</h2>
          </div>
          <p>
            Your personal data is encrypted and securely stored. We never sell or share your information with third parties without your consent.
          </p>
        </div>

        {/* Section 4 */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <ShieldCheck className="text-blue-600" />
            <h2 className="text-2xl font-semibold">Your Consent</h2>
          </div>
          <p>
            By using our website or services, you agree to this Privacy Policy and our terms for handling your personal data responsibly.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
