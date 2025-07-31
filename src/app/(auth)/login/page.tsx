import { redirect } from "next/navigation";
import { isAuthenticated } from "../../../lib/auth";
import LoginForm from "./components/LoginForm";

async function checkAuth() {
  const authenticated = await isAuthenticated();

  if (authenticated) {
    redirect("/admin");
  }
}

const LoginPage = async () => {
  await checkAuth();

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Admin Login</h2>
          <p className="mt-2 text-center text-sm text-gray-600">Enter your admin password to access the dashboard</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
