import { fetchUserDetails, logoutUser, resetUser } from "@/store/userSlice";
import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import LogoutButton from "../LogoutButton";
import { LucideUser } from "lucide-react";

const HeaderUser = ({ hoveredDropdown }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  //   useEffect(() => {
  //     const fetchUser = async () => {
  //       await dispatch(fetchUserDetails());
  //     };
  //     fetchUser();
  //   });

  const handleLogOut = async () => {
    await dispatch(logoutUser());
    await dispatch(resetUser());
  };

  //   console.log("HeaderUser hoveredDropdown:", user);

  return (
    <div
      className={`absolute top-full right-0 mt-0 w-48 bg-white border border-slate-200 p-2 rounded shadow-lg transition-all duration-200 origin-top ${
        hoveredDropdown === "account"
          ? "opacity-100 visible scale-y-100"
          : "opacity-0 invisible scale-y-95"
      }`}
    >
      <Link
        href="/auth/user/login"
        className="block flex items-center px-4 py-3 hover:bg-slate-50 border-b border-slate-100 text-gray-700 font-medium text-lg"
      >

        <LucideUser size={30} />
        <div className="ml-1" > 
          {user?.firstName + " " + user?.lastName}
          <p className="text-xs text-gray-500 underline">
            Click to edit profile
          </p>
        </div>
      </Link>
      <LogoutButton className="w-full " />
    </div>
  );
};

export default HeaderUser;
