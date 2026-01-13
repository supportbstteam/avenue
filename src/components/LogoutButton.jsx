"use client";

import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function LogoutButton() {
  const { data: session } = useSession();

  // Default callback
  let callbackUrl = "/";

  if (session?.user?.role === "admin") {
    callbackUrl = "/auth/admin/login";
  } else if (session?.user) {
    callbackUrl = "/auth/user/login";
  }

  return (
    <Button
      variant="destructive"
      onClick={() => signOut({ callbackUrl })}
    >
      Logout
    </Button>
  );
}
