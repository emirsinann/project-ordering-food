// Notification.js
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Notification = () => {
  return (
    <ToastContainer position="bottom-right" autoClose={2000} hideProgressBar />
  );
};

export const notify = (message) => {
  toast.success(message);
};

export default Notification;