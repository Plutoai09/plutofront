import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Lock, Mail, HeadphonesIcon, Loader2 } from "lucide-react";
import OnboardingFlow from './OnboardingFlow';


const Login = () => {
  const { bookName } = useParams();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const checkEmailInAPI = async (inputEmail) => {
    const proxyURL = "https://contractus.co.in/api/customers";
  
    try {
      const response = await fetch(proxyURL);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
  
      return data.items.some((item) => item.email === inputEmail);
    } catch (error) {
      console.error("Error while checking email:", error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const correctPassword = "5545";

    // Reset errors
    setError({ email: "", password: "" });
    setIsSubmitting(true);

    try {
      // Validate email using the API
      const isEmailValid = await checkEmailInAPI(email);

      if (!isEmailValid) {
        setError((prev) => ({ ...prev, email: "Email not found in the system" }));
        setIsSubmitting(false);
        return;
      }

      // Validate password
      if (password !== correctPassword) {
        setError((prev) => ({ ...prev, password: "Incorrect password" }));
        setPassword("");
        setIsSubmitting(false);
        return;
      }

      localStorage.setItem("authCode", "pluto_success");
      localStorage.setItem("plutoemail", email);

      // Set loading state and navigate to loading screen
      setIsLoading(true);
    } catch (error) {
      console.error("Submission error:", error);
      setIsSubmitting(false);
    }
  };

  const handleSupportClick = () => {
    window.location.href = "https://wa.link/i0frpz";
  };

  // Loading screen component


  // Render login form or loading screen
  if (isLoading) {
    return <OnboardingFlow />;;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4 space-y-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2">LOGIN TO PLUTO</h1>
          <p className="text-gray-600">Enter your email and password to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter email address"
              />
            </div>
            {error.email && (
              <p className="mt-2 text-sm text-red-600">{error.email}</p>
            )}
          </div>

          <div>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter password to continue"
              />
            </div>
            {error.password && (
              <p className="mt-2 text-sm text-red-600">{error.password}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Logging In...
              </>
            ) : (
              <>
                <Lock className="w-5 h-5" />
                Log In
              </>
            )}
          </button>
        </form>

        <p className="text-sm text-maroon-600 text-center mt-4" style={{ color: '#800000' }}>
          Passcode has been sent to your email address by sender : pluto@plutoai.co.in
        </p>
      </div>

      <button
        onClick={handleSupportClick}
        className="w-1/2 max-w-[200px] bg-blue-600 text-white py-2 rounded-full hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
      >
        <HeadphonesIcon className="w-5 h-5" />
        Support
      </button>
    </div>
  );
};

export default Login;