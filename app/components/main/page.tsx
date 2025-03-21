"use client";
import { error } from "console";
import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

const Page = () => {
  const [loading, setLoading] = useState(true);
  const [registration, setRegistration] = useState([]);
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [updateForm, setUpdateForm] = useState({ name: "", email: "" });
  const [update, setUpdate] = useState({});
  const params = useParams();

  const API_URL = "http://localhost:8080/api/auth/register";
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch(API_URL, {
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
    } catch (error: any) {
      setSubmitError(
        error.message || "Failed to connect to server. Please try again.",
      );
      console.error("Registration error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    fetch(`http://localhost:3000/api/auth/register/${params._id}`)
      .then((res) => res.json())
      .then((data) => setUpdateForm(data));
  }, [params]);

  const handleUpdate = (e: any) => {
    e.preventDefault();

    fetch(`http://localhost:3000/api/auth/register/${params._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: e.target.name.value,
        email: e.target.email.value,
      }),
    });
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
          {registration.map((user, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm p-6 transition-all hover:shadow-md"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="text-sm text-gray-500">ID</div>
                <div className="text-sm font-medium text-gray-900">
                  {user._id}
                </div>

                <div className="text-sm text-gray-500">Name</div>
                {editingId === user._id ? (
                  <input
                    type="text"
                    value={updateForm.name}
                    onChange={(e) =>
                      setUpdateForm({ ...updateForm, name: e.target.value })
                    }
                    className="text-sm font-medium text-gray-900 border rounded px-2 py-1"
                  />
                ) : (
                  <div className="text-sm font-medium text-gray-900">
                    {user.name}
                  </div>
                )}

                <div className="text-sm text-gray-500">Email</div>
                {editingId === user._id ? (
                  <input
                    type="email"
                    value={updateForm.email}
                    onChange={(e) =>
                      setUpdateForm({ ...updateForm, email: e.target.value })
                    }
                    className="text-sm font-medium text-gray-900 border rounded px-2 py-1"
                  />
                ) : (
                  <div className="text-sm font-medium text-gray-900">
                    {user.email}
                  </div>
                )}

                <div className="col-span-2 flex justify-end space-x-2 mt-4">
                  {editingId === user._id ? (
                    <>
                      <button
                        onClick={() => {
                          console.log("Update functionality not implemented");
                          setEditingId(null);
                        }}
                        className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="bg-gray-500 text-white px-4 py-1 rounded hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          setEditingId(user._id);
                        }}
                        className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                      >
                        Update
                      </button>
                      <button
                        onClick={() =>
                          console.log("Delete functionality not implemented")
                        }
                        className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </>
                  )}
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
