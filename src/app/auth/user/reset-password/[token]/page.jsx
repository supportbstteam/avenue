"use client";

import { useState, use} from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function ResetPassword({ params }) {
  const router = useRouter();
  const { token } = use(params);

  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  async function submit(e) {
    e.preventDefault();
    const res = await axios.post(`/api/auth/user/reset-password/${token}`, {
      password,
    });

    setMsg(res.data.message);

    if (res.data.success) {
      setTimeout(() => router.push("/auth/user/login"), 2000);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
      <h1 className="text-xl font-bold mb-4">Reset Password</h1>

      <form onSubmit={submit} className="space-y-3">
        <input
          type="password"
          className="border p-2 w-full"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-blue-600 text-white p-2 rounded">
          Reset
        </button>
      </form>

      {msg && <p className="mt-4 text-green-600">{msg}</p>}
    </div>
  );
}
