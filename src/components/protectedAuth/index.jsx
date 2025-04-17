"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAccessToken } from "../../utils/token";
import { useSelector } from 'react-redux';

const ProtectedAuth = ({ children }) => {
  const router = useRouter();
  const token = getAccessToken();

  useEffect(() => {
    if (token) {
      router.replace("/"); // Redirect to home page if already logged in
    }
  }, [token]);

  if (token) return null; // Prevent rendering login/registration

  return children;
};

export const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const token = getAccessToken();
  const user = useSelector((state)=>state.auth.user)

  useEffect(() => {
    if (!token && !user) {
      router.replace("/"); // Redirect to home page if already logged in
    }
  }, [token]);

  if (!token && !user) return null; // Prevent rendering login/registration

  return children;
};

export default ProtectedAuth;
