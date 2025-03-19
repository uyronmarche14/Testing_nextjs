"use client";
import React from "react";
import { useState, useEffect } from "react";

const Page = () => {
  const [loading, setLoading] = useState(true);
  const [registration, setRegistration] = useState([]);
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: e.target.name.value,
          email: e.target.email.value,
          password: e.target.password.value,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Registration failed");
      }

      const data = await response.json();
      // Refresh the registration list
      fetchRegistrations();
      e.target.reset();
    } catch (error) {
      setSubmitError(
        error.message || "Failed to connect to server. Please try again.",
      );
      console.error("Registration error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const fetchRegistrations = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/auth/register");
      const data = await response.json();
      setRegistration(data.registrations);
    } catch (error) {
      console.error("Error fetching registrations:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-semibold text-gray-900 mb-8 text-center">
          Registered Users
        </h1>
        <div className="space-y-4">
          {registration.map((user) => (
            <div
              key={user.id}
              className="bg-white rounded-lg shadow-sm p-6 transition-all hover:shadow-md"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="text-sm text-gray-500">ID</div>
                <div className="text-sm font-medium text-gray-900">
                  {user.id}
                </div>
                <div className="text-sm text-gray-500">Name</div>
                <div className="text-sm font-medium text-gray-900">
                  {user.name}
                </div>
                <div className="text-sm text-gray-500">Email</div>
                <div className="text-sm font-medium text-gray-900">
                  {user.email}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
