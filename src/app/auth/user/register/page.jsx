"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Loader2 } from "lucide-react";

export default function UserRegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post("/api/auth/user/register", form);

      if (res.data.success) {
        router.push("/auth/user/login");
      } else {
        setError(res.data.message || "Registration failed");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200 p-4">

      <Card className="w-full max-w-md shadow-lg border border-gray-200 bg-white">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-800 tracking-wide">
            Create an Account
          </CardTitle>
          <p className="text-gray-500 text-sm mt-1">
            Register to continue
          </p>
        </CardHeader>

        <CardContent>

          {error && (
            <p className="text-red-500 text-center text-sm mb-3">{error}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Name */}
            <div>
              <Label className="text-gray-700 mb-2">Full Name</Label>
              <Input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your full name"
                required
                className="bg-gray-100 border-gray-300 text-gray-900"
              />
            </div>

            {/* Email */}
            <div>
              <Label className="text-gray-700 mb-2">Email Address</Label>
              <Input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                className="bg-gray-100 border-gray-300 text-gray-900"
              />
            </div>

            {/* Password */}
            <div>
              <Label className="text-gray-700 mb-2">Password</Label>
              <div className="relative">
                <Input
                  name="password"
                  type={showPass ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter a strong password"
                  required
                  className="bg-gray-100 border-gray-300 text-gray-900"
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

            {/* Register Button */}
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 transition-all text-white flex items-center justify-center gap-2"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Creating account...
                </>
              ) : (
                "Register"
              )}
            </Button>

            {/* Login Link */}
            <p className="text-center text-sm text-gray-700">
              Already have an account?{" "}
              <a
                href="/auth/user/login"
                className="text-blue-600 hover:underline"
              >
                Login
              </a>
            </p>

          </form>

        </CardContent>
      </Card>
    </div>
  );
}
