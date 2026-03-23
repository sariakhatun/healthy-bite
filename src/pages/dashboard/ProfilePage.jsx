/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { updateProfile } from "firebase/auth";
import { auth } from "../../firebase/firebase.init";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export default function ProfilePage() {
  const { user } = useAuth();

  const [showModal, setShowModal] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Update modal fields only when modal is opened
  const openModal = () => {
    setDisplayName(user?.displayName || "");
    setPhotoURL(user?.photoURL || "");
    setShowModal(true);
  };

  const handleUpdateProfile = async () => {
    if (!user) return;
    setLoading(true);
    try {
      await updateProfile(auth.currentUser, { displayName, photoURL });

      Swal.fire({
        icon: "success",
        title: "Profile Updated!",
        text: "Your profile has been updated successfully.",
        timer: 2000,
        showConfirmButton: false,
      });

      setShowModal(false);
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "There was an error updating your profile.",
      });
    }
    setLoading(false);
  };

  return (
    <div className="p-6">
      {/* Welcome Card */}
      <div className="bg-lime-100 mt-20 rounded-2xl p-6 flex flex-col items-center gap-4 shadow-md">
        <div className="relative">
          {user?.photoURL ? (
            <img
              src={user.photoURL}
              alt="User Avatar"
              className="w-24 h-24 rounded-full border-4 border-[#77be0dee]"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-3xl text-white">
              {user?.displayName?.charAt(0) || "U"}
            </div>
          )}
          <span className="absolute bottom-0 right-0 w-6 h-6 bg-white rounded-full flex items-center justify-center text-xs text-green-500 border border-green-200">
            🥗
          </span>
        </div>

        <h2 className="text-2xl font-bold text-gray-800">
          Welcome back, {user?.displayName || "User"}!
        </h2>
        <p className="text-gray-600 text-center">
          Here’s a quick overview of your health profile.
        </p>
        <p className="text-gray-500 text-sm flex items-center gap-2">
          <span>📧</span> {user?.email || "No email available"}
        </p>

        {/* Update Profile Button */}
        <button
          onClick={openModal}
          className="mt-4 px-4 py-2 bg-[#77be0dee] text-white rounded-lg hover:bg-[#65a10bee] transition"
        >
          Update Profile
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <div className="bg-white rounded-xl shadow p-4 text-center">
          <p className="text-gray-500 text-sm">BMI</p>
          <p className="text-2xl font-bold text-green-500">22.5</p>
        </div>
        <div className="bg-white rounded-xl shadow p-4 text-center">
          <p className="text-gray-500 text-sm">Calories Today</p>
          <p className="text-2xl font-bold text-yellow-500">1,800</p>
        </div>
        <div className="bg-white rounded-xl shadow p-4 text-center">
          <p className="text-gray-500 text-sm">Recommended Protein</p>
          <p className="text-2xl font-bold text-blue-500">60g</p>
        </div>
        <div className="bg-white rounded-xl shadow p-4 text-center">
          <p className="text-gray-500 text-sm">Favorites</p>
          <p className="text-2xl font-bold text-pink-500">4</p>
        </div>
      </div>

      {/* Update Profile Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-96 relative">
            <h2 className="text-xl font-bold mb-4">Update Profile</h2>
            <label className="block mb-2 text-gray-700">Display Name</label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full border rounded px-3 py-2 mb-4"
            />
            <label className="block mb-2 text-gray-700">Photo URL</label>
            <input
              type="text"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              className="w-full border rounded px-3 py-2 mb-4"
            />
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateProfile}
                className="px-4 py-2 rounded bg-[#77be0dee] text-white hover:bg-[#65a10bee] transition"
                disabled={loading}
              >
                {loading ? "Updating..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}