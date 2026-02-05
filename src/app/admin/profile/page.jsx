"use client";

import { useEffect, useState } from "react";
import { useClientAdmin } from "@/lib/getClientUser";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminProfile, updateAdminProfile } from "@/store/adminSlice";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UserCircle, Lock, Mail, Save, XCircle, Pencil } from "lucide-react";

export default function AdminProfilePage() {
  const dispatch = useDispatch();

  const clientAdmin = useClientAdmin();

  const { name, email, id, loading } = useSelector((state) => state.admin);

  const [editMode, setEditMode] = useState(false);

  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    dispatch(fetchAdminProfile());
  }, [dispatch]);

  useEffect(() => {
    if (email) {
      setFormValues({
        id: id,
        name: name,
        email: email,
        password: "",
      });
    }
  }, [email]);

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    await dispatch(updateAdminProfile(formValues));
    setEditMode(false);
  };

  if (loading || !email) {
    return <p className="p-6 text-gray-600 text-lg">Loading profile...</p>;
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-200 mt-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <UserCircle size={50} className="text-blue-600" />
        <h2 className="text-3xl font-bold tracking-tight text-gray-800">
          Admin Profile
        </h2>
      </div>

      {/* Form Fields */}
      <div className="space-y-6">
        {/* Name Field */}
        <div className="flex flex-col space-y-2">
          <label className="text-gray-700 font-medium flex items-center gap-2">
            <UserCircle size={18} /> Full Name
          </label>
          <Input
            name="name"
            value={formValues.name}
            onChange={handleChange}
            disabled={!editMode}
            className={`${
              editMode ? "focus:ring-2 focus:ring-blue-400" : "bg-gray-100"
            }`}
          />
        </div>

        {/* Email Field */}
        <div className="flex flex-col space-y-2">
          <label className="text-gray-700 font-medium flex items-center gap-2">
            <Mail size={18} /> Email Address
          </label>
          <Input
            name="email"
            type="email"
            value={formValues.email}
            onChange={handleChange}
            disabled={!editMode}
            className={`${
              editMode ? "focus:ring-2 focus:ring-blue-400" : "bg-gray-100"
            }`}
          />
        </div>

        {/* Password Field */}
        <div className="flex flex-col space-y-2">
          <label className="text-gray-700 font-medium flex items-center gap-2">
            <Lock size={18} /> Password
          </label>

          <Input
            name="password"
            type="password"
            placeholder="••••••••"
            value={formValues.password}
            onChange={handleChange}
            disabled={!editMode}
            className={`${
              editMode ? "focus:ring-2 focus:ring-blue-400" : "bg-gray-100"
            }`}
          />

          <p className="text-xs text-gray-500">
            Leave blank if you do not want to change the password.
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-end mt-10">
        {!editMode ? (
          <Button
            className="flex items-center gap-2 bg-[#ae0001] hover:bg-[#811b1b] text-white shadow px-4 py-2"
            onClick={() => setEditMode(true)}
          >
            <Pencil size={18} />
            Edit Profile
          </Button>
        ) : (
          <>
            <Button
              variant="outline"
              className="flex items-center gap-2 px-4 py-2 border-gray-400"
              onClick={() => {
                setEditMode(false);
                setFormValues({
                  name: name,
                  email: email,
                  password: "",
                });
              }}
            >
              <XCircle size={18} />
              Cancel
            </Button>

            <Button
              className="flex items-center gap-2 bg-teal-700 hover:bg-teal-800 text-white shadow px-4 py-2"
              onClick={handleSave}
              disabled={loading}
            >
              <Save size={18} />
              Save Changes
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
