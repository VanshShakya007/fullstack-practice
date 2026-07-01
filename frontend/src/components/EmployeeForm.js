import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const EmployeeForm = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const createEmployee = async (data) => {
    try {
      // Create a fallback avatar URL using the employee's name
      const employeeData = {
        ...data,
        image: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(data.name)}`
      };

      const savedUserResponse = await fetch(
        `${process.env.REACT_APP_BASE_URL}/createUser`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(employeeData),
        }
      );

      // CRITICAL: Check if the HTTP response status is between 200-299
      if (!savedUserResponse.ok) {
        const errorData = await savedUserResponse.json();
        throw new Error(errorData.message || "Server responded with an error status code.");
      }

      const result = await savedUserResponse.json();
      console.log("FORM SUCCESS RESPONSE......", result);

      // Only redirect if the backend actually saved the user successfully!
      navigate("/");

    } catch (error) {
      console.error("FAILED TO CREATE EMPLOYEE:", error.message);
      alert(`Error: ${error.message}. Look at your backend console!`);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(createEmployee)} className="mt-8">
        <div className="space-y-5">
          <div>
            <label htmlFor="name" className="text-base font-medium text-gray-900 dark:text-gray-200">
              Employee Name
            </label>
            <div className="mt-2.5">
              <input
                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                type="text"
                placeholder="Enter Your Full Name"
                required
                {...register("name")}
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="text-base font-medium text-gray-900 dark:text-gray-200">
              Employee Email Id
            </label>
            <div className="mt-2.5">
              <input
                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                type="email"
                placeholder="Enter Your Email"
                required
                {...register("email")}
              />
            </div>
          </div>

          <div>
            <label htmlFor="title" className="text-base font-medium text-gray-900 dark:text-gray-200">
              Employee Title
            </label>
            <div className="mt-2.5">
              <input
                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                type="text"
                placeholder="Enter Your Employee Title"
                required
                {...register("title")}
              />
            </div>
          </div>

          <div>
            <label htmlFor="department" className="text-base font-medium text-gray-900 dark:text-gray-200">
              Employee Department
            </label>
            <div className="mt-2.5">
              <input
                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                type="text"
                placeholder="Enter Your Employee Department"
                required
                {...register("department")}
              />
            </div>
          </div>

          <div>
            <label htmlFor="role" className="text-base font-medium text-gray-900 dark:text-gray-200">
              Employee Role
            </label>
            <div className="mt-2.5">
              <input
                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                type="text"
                placeholder="Enter Your Employee Role"
                required
                {...register("role")}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-3.5 py-2.5 text-base font-semibold leading-7 text-white hover:bg-indigo-500"
            >
              Create Employeee
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="ml-2 h-4 w-4"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
              </svg>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;