import { ScrollText, Shield, AlertTriangle } from "lucide-react";

const TermsOfService = () => {
  return (
    <div className="min-h-screen px-6 py-12 bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-white">
      <div className="max-w-4xl mx-auto bg-white dark:bg-white/10 backdrop-blur-lg p-10 rounded-2xl shadow-2xl space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2">Terms of Service</h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Please read these terms carefully before using our platform.
          </p>
        </div>

        {/* Introduction */}
        <div className="space-y-3 border-b pb-6 border-gray-300 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <ScrollText className="text-indigo-600" />
            <h2 className="text-2xl font-semibold">Acceptance of Terms</h2>
          </div>
          <p>
            By accessing or using our services, you agree to be bound by these Terms. If you do not agree, please do not use the platform.
          </p>
        </div>

        {/* Usage Policy */}
        <div className="space-y-3 border-b pb-6 border-gray-300 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <Shield className="text-green-600" />
            <h2 className="text-2xl font-semibold">Usage Guidelines</h2>
          </div>
          <ul className="list-disc list-inside space-y-2">
            <li>Do not misuse the platform or disrupt services.</li>
            <li>Respect others and intellectual property rights.</li>
            <li>Provide accurate information during registration.</li>
          </ul>
        </div>

        {/* Modifications */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <AlertTriangle className="text-yellow-500" />
            <h2 className="text-2xl font-semibold">Changes to Terms</h2>
          </div>
          <p>
            We reserve the right to modify these terms at any time. Continued use of the service implies your acceptance of the updated terms.
          </p>
        </div>

        <p className="text-sm mt-6 text-gray-600 dark:text-gray-400 text-center">
          Last updated: July 2025
        </p>
      </div>
    </div>
  );
};

export default TermsOfService;
