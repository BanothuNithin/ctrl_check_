import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Mail,
  Lock,
  ArrowRight,
  Github,
  CheckSquare,
  ArrowLeft,
} from "lucide-react";
import { Button, Input, Card } from "../components/ui/design-system";

const AuthPage = () => {
  const [searchParams] = useSearchParams();
  const isSignup = searchParams.get("mode") === "signup";
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate auth
    setTimeout(() => {
      localStorage.setItem("isAuthenticated", "true");
      navigate("/dashboard");
    }, 1000);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-slate-50">
      {/* Left Pane - Visual */}
      <div className="hidden lg:flex flex-col justify-between bg-slate-900 p-12 text-white relative overflow-hidden">
        <div className="z-10">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm font-medium">Back</span>
          </button>
          <div className="flex items-center gap-2 mb-8">
            <img
              src="../assets/add-logo.png"
              alt="CtrlCheck Logo"
              className="h-8 w-8"
            />
            <span className="font-bold text-lg tracking-tight">CtrlCheck</span>
          </div>
          <h2 className="text-5xl font-bold leading-tight mb-6">
            Automate your work <br /> with intelligent agents.
          </h2>
          <p className="text-slate-400 text-lg max-w-md">
            Join thousands of developers and agencies building the next
            generation of AI workflows.
          </p>
        </div>

        {/* Abstract shapes */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-3xl" />

        <div className="z-10">
          <blockquote className="text-lg italic text-slate-300">
            "CtrlCheck transformed how we handle customer support. We reduced
            response times by 80% in the first week."
          </blockquote>
          <div className="mt-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-slate-700" />
            <div>
              <p className="font-semibold">Alex Chen</p>
              <p className="text-sm text-slate-500">CTO at TechStart</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Pane - Form */}
      <div className="flex items-center justify-center p-6">
        <Card className="w-full max-w-md p-8 border-none shadow-none bg-transparent">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm font-medium">Back</span>
          </button>
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-slate-900 mb-2">
              {isSignup ? "Create an account" : "Welcome back"}
            </h1>
            <p className="text-slate-500 text-sm">
              {isSignup
                ? "Enter your details to get started."
                : "Please enter your details to sign in."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignup && (
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">
                  Full Name
                </label>
                <Input placeholder="John Doe" required />
              </div>
            )}

            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  type="email"
                  placeholder="name@example.com"
                  className="pl-9"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  type="password"
                  placeholder="••••••••"
                  className="pl-9"
                  required
                />
              </div>
            </div>

            <Button className="w-full h-11" type="submit" disabled={loading}>
              {loading ? (
                <span className="animate-pulse">Processing...</span>
              ) : (
                <span className="flex items-center">
                  {isSignup ? "Sign Up" : "Sign In"}{" "}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </span>
              )}
            </Button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-slate-50 px-2 text-slate-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" type="button">
              <Github className="mr-2 h-4 w-4" /> Github
            </Button>
            <Button variant="outline" type="button">
              Google
            </Button>
          </div>

          <p className="mt-8 text-center text-sm text-slate-500">
            {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              type="button"
              onClick={() => navigate(isSignup ? "/auth" : "/auth?mode=signup")}
              className="font-medium text-slate-900 hover:underline"
            >
              {isSignup ? "Sign in" : "Sign up"}
            </button>
          </p>
        </Card>
      </div>
    </div>
  );
};

export default AuthPage;
