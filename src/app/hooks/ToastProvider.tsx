"use client";

import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/**
 * One toast container for the whole app, mounted once here instead of
 * duplicated (with the same position/props) at the bottom of ~10 individual
 * pages. `toast.success()` / `toast.error()` calls from anywhere render into
 * whichever container is mounted — there only needs to be one.
 *
 * bottom-right, not top-center: a toast shouldn't cover the page title or the
 * form the user is looking at.
 */
export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <>
    {children}
    <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar />
  </>
);
