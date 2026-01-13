"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Loader2 } from "lucide-react";

export default function UserLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (res?.error) {
      setError("Invalid email or password");
      return;
    }

    router.push("/user"); // redirect to user dashboard or homepage
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200 p-4">

      <Card className="w-full max-w-md shadow-lg border border-gray-200 bg-white">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold tracking-wide text-gray-800">
            User Login
          </CardTitle>
          <p className="text-sm text-gray-500 mt-1">Access your account</p>
        </CardHeader>

        <CardContent>

          {error && (
            <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
          )}

          <form className="space-y-5" onSubmit={submit}>

            {/* Email */}
            <div>
              <Label className="text-gray-700 mb-2">Email</Label>
              <Input
                type="email"
                className="bg-gray-100 border-gray-300 text-gray-900"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div>
              <Label className="text-gray-700 mb-2">Password</Label>
              <div className="relative">
                <Input
                  type={showPass ? "text" : "password"}
                  className="bg-gray-100 border-gray-300 text-gray-900"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
                >
                  {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <a
                href="/auth/user/forgot-password"
                className="text-blue-600 text-sm hover:underline"
              >
                Forgot Password?
              </a>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 transition-all flex items-center justify-center gap-2 text-white"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </Button>

            {/* Register Link */}
            <p className="text-sm text-center text-gray-700">
              Don't have an account?{" "}
              <a href="/auth/user/register" className="text-blue-600 hover:underline">
                Register
              </a>
            </p>

          </form>

        </CardContent>
      </Card>
    </div>
  );
}
