import { useState, useRef } from "react";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import {
  updateProfile,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";

// ── Icons ─────────────────────────────────────────────────────────
const UserIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const LockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0110 0v4" />
  </svg>
);

const TrashIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
    <path d="M10 11v6M14 11v6" />
    <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
  </svg>
);

const CameraIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
    <circle cx="12" cy="13" r="4" />
  </svg>
);

const EyeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
    <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

// ── Section wrapper ───────────────────────────────────────────────
function Section({ icon, title, subtitle, children }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
      <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-100">
        <div className="w-9 h-9 rounded-xl bg-[#eaf3de] flex items-center justify-center text-[#77be0d]">
          {icon}
        </div>
        <div>
          <h3 className="font-black text-slate-800 text-base">{title}</h3>
          {subtitle && <p className="text-xs text-slate-400">{subtitle}</p>}
        </div>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

// ── Input field ───────────────────────────────────────────────────
function Field({ label, type = "text", value, onChange, placeholder, disabled, rightEl }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5">
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full px-4 py-3 rounded-xl border-2 text-slate-800 text-sm transition-colors focus:outline-none ${
            disabled
              ? "bg-slate-50 border-slate-100 text-slate-400 cursor-not-allowed"
              : "border-slate-200 focus:border-[#77be0d] bg-white"
          } ${rightEl ? "pr-11" : ""}`}
        />
        {rightEl && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">{rightEl}</div>
        )}
      </div>
    </div>
  );
}

// ── Password field with toggle ────────────────────────────────────
function PasswordField({ label, value, onChange, placeholder }) {
  const [show, setShow] = useState(false);
  return (
    <Field
      label={label}
      type={show ? "text" : "password"}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rightEl={
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="text-slate-400 hover:text-slate-600 transition-colors"
        >
          {show ? <EyeOffIcon /> : <EyeIcon />}
        </button>
      }
    />
  );
}

// ── Toast helper ──────────────────────────────────────────────────
const toast = (title, icon = "success") =>
  Swal.fire({ title, icon, timer: 2000, showConfirmButton: false });

// ── 1. Profile Section ────────────────────────────────────────────
function ProfileSettings({ user }) {
  const [name, setName]       = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [preview, setPreview]   = useState(user?.photoURL || "");
  const [loading, setLoading]   = useState(false);
  const fileRef = useRef();

  const handleImageFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
      setPhotoURL(reader.result); // base64 — swap with upload URL in production
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    if (!name.trim()) return toast("Name cannot be empty.", "error");
    setLoading(true);
    try {
      await updateProfile(user, { displayName: name.trim(), photoURL });
      toast("Profile updated successfully!");
    } catch (err) {
      toast(err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Section icon={<UserIcon />} title="Profile Information" subtitle="Update your name and profile photo">
      <div className="flex flex-col sm:flex-row gap-6 items-start">
        {/* Avatar */}
        <div className="flex flex-col items-center gap-2 flex-shrink-0">
          <div className="relative">
            <div className="w-24 h-24 rounded-2xl overflow-hidden bg-slate-100 border-2 border-slate-200">
              {preview ? (
                <img src={preview} alt="avatar" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400">
                  <UserIcon />
                </div>
              )}
            </div>
            <button
              onClick={() => fileRef.current.click()}
              className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-[#77be0d] text-white flex items-center justify-center shadow-md hover:bg-[#65a10b] transition-colors"
            >
              <CameraIcon />
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageFile}
            />
          </div>
          <p className="text-xs text-slate-400">Click camera to change</p>
        </div>

        {/* Fields */}
        <div className="flex-1 space-y-4 w-full">
          <Field
            label="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your full name"
          />
          <Field
            label="Email Address"
            value={user?.email || ""}
            disabled
          />
          <Field
            label="Photo URL (optional)"
            value={photoURL}
            onChange={(e) => { setPhotoURL(e.target.value); setPreview(e.target.value); }}
            placeholder="https://example.com/photo.jpg"
          />

          <button
            onClick={handleSave}
            disabled={loading}
            className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-[#b2f351] to-[#77be0d] text-white font-bold disabled:opacity-50 hover:-translate-y-0.5 hover:shadow-lg transition-all"
          >
            {loading ? "Saving..." : "Save Profile"}
          </button>
        </div>
      </div>
    </Section>
  );
}

// ── 2. Password Section ───────────────────────────────────────────
function PasswordSettings({ user }) {
  const [current, setCurrent]   = useState("");
  const [newPass, setNewPass]   = useState("");
  const [confirm, setConfirm]   = useState("");
  const [loading, setLoading]   = useState(false);

  const isGoogleUser = user?.providerData?.[0]?.providerId === "google.com";

  const handleChange = async () => {
    if (!current || !newPass || !confirm) return toast("Please fill all fields.", "error");
    if (newPass !== confirm) return toast("New passwords do not match.", "error");
    if (newPass.length < 6) return toast("Password must be at least 6 characters.", "error");

    setLoading(true);
    try {
      const credential = EmailAuthProvider.credential(user.email, current);
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPass);
      toast("Password changed successfully!");
      setCurrent(""); setNewPass(""); setConfirm("");
    } catch (err) {
      const msg = err.code === "auth/wrong-password"
        ? "Current password is incorrect."
        : err.message;
      toast(msg, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Section icon={<LockIcon />} title="Change Password" subtitle="Keep your account secure with a strong password">
      {isGoogleUser ? (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-700">
          ℹ️ You signed in with Google. Password change is not available for Google accounts.
        </div>
      ) : (
        <div className="space-y-4 max-w-md">
          <PasswordField
            label="Current Password"
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
            placeholder="Enter current password"
          />
          <PasswordField
            label="New Password"
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
            placeholder="Minimum 6 characters"
          />
          <PasswordField
            label="Confirm New Password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="Re-enter new password"
          />

          {/* Password strength */}
          {newPass && (
            <div className="space-y-1">
              {[
                { label: "At least 6 characters", ok: newPass.length >= 6 },
                { label: "Contains a number",     ok: /\d/.test(newPass) },
                { label: "Contains uppercase",    ok: /[A-Z]/.test(newPass) },
              ].map((r) => (
                <div key={r.label} className={`flex items-center gap-2 text-xs font-medium ${r.ok ? "text-emerald-600" : "text-slate-400"}`}>
                  <span className={`w-4 h-4 rounded-full flex items-center justify-center ${r.ok ? "bg-emerald-100 text-emerald-600" : "bg-slate-100"}`}>
                    {r.ok && <CheckIcon />}
                  </span>
                  {r.label}
                </div>
              ))}
            </div>
          )}

          <button
            onClick={handleChange}
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#b2f351] to-[#77be0d] text-white font-bold disabled:opacity-50 hover:-translate-y-0.5 hover:shadow-lg transition-all"
          >
            {loading ? "Changing..." : "Change Password"}
          </button>
        </div>
      )}
    </Section>
  );
}

// ── 3. Danger Zone ────────────────────────────────────────────────
// function DangerZone({ user }) {
//   const [loading, setLoading] = useState(false);

//   const handleDeleteAccount = async () => {
//     const { value: password } = await Swal.fire({
//       title: "Delete Account?",
//       html: `
//         <p class="text-sm text-gray-500 mb-3">This action is <strong>permanent</strong> and cannot be undone. All your data will be deleted.</p>
//         <input id="swal-pw" type="password" placeholder="Enter your password to confirm" class="swal2-input" />
//       `,
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#ef4444",
//       confirmButtonText: "Delete My Account",
//       cancelButtonText: "Cancel",
//       preConfirm: () => {
//         const pw = document.getElementById("swal-pw").value;
//         if (!pw) {
//           Swal.showValidationMessage("Please enter your password.");
//           return false;
//         }
//         return pw;
//       },
//     });

//     if (!password) return;
//     setLoading(true);
//     try {
//       const credential = EmailAuthProvider.credential(user.email, password);
//       await reauthenticateWithCredential(user, credential);
//       await deleteUser(user);
//       Swal.fire("Account Deleted", "Your account has been permanently deleted.", "success");
//     } catch (err) {
//       const msg = err.code === "auth/wrong-password"
//         ? "Incorrect password. Account was not deleted."
//         : err.message;
//       toast(msg, "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-white rounded-2xl border-2 border-red-200 overflow-hidden">
//       <div className="flex items-center gap-3 px-6 py-4 border-b border-red-100 bg-red-50">
//         <div className="w-9 h-9 rounded-xl bg-red-100 flex items-center justify-center text-red-500">
//           <TrashIcon />
//         </div>
//         <div>
//           <h3 className="font-black text-red-700 text-base">Danger Zone</h3>
//           <p className="text-xs text-red-400">These actions are permanent and cannot be undone</p>
//         </div>
//       </div>
//       <div className="p-6">
//         <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl border border-red-100 bg-red-50/50">
//           <div>
//             <p className="font-bold text-slate-800 text-sm">Delete Account</p>
//             <p className="text-xs text-slate-500 mt-0.5">
//               Permanently delete your account and all associated data including bookings and health records.
//             </p>
//           </div>
//           <button
//             onClick={handleDeleteAccount}
//             disabled={loading}
//             className="flex-shrink-0 px-5 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-bold disabled:opacity-50 transition-colors"
//           >
//             {loading ? "Deleting..." : "Delete Account"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// ── Main Settings Component ───────────────────────────────────────
export default function Settings() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="space-y-6 mt-16">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-[#eaf3de] flex items-center justify-center text-[#77be0d]">
          <UserIcon />
        </div>
        <div>
          <h2 className="text-xl font-black text-slate-800">Settings</h2>
          <p className="text-sm text-slate-500">Manage your account and preferences</p>
        </div>
      </div>

      {/* Sections */}
      <ProfileSettings user={user} />
      <PasswordSettings user={user} />
      {/* <DangerZone user={user} /> */}
    </div>
  );
}