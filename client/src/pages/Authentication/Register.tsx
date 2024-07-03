import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import Spinner from "../../components/Spinner";
import { RegisterFormType } from "../../types/types";

const Register = () => {
  const { register, loading, error } = useAuth();
  const [form, setForm] = useState<RegisterFormType>({ fname: "", lname: "", email: "", password: "", isAdmin: false });

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    setForm({
      ...form,
      [evt.target.name]: value,
    });
  };

  const handleFormSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    try {
      //TODO: validate form
      await register(form);
    } catch (error) {
      alert("some error occurred");
      console.error(error);
    }
  };

  return (
    <div className="bg-white">
      <div className="flex min-h-screen items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
        <div className="flex-1">
          <div className="text-center">
            <div className="flex justify-center mx-auto">
              <img className="w-auto h-7 sm:h-8" src="https://merakiui.com/images/logo.svg" alt="" />
            </div>

            <p className="mt-3 text-gray-500 ">Sign in to access your account</p>
          </div>

          <div className="mt-8">
            <form onSubmit={handleFormSubmit}>
              <div>
                <label htmlFor="fname" className="block mb-2 text-sm text-gray-600 ">
                  First Name
                </label>
                <input
                  type="text"
                  name="fname"
                  id="fname"
                  value={form.fname}
                  onChange={handleChange}
                  placeholder="John"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg  focus:border-blue-400  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
              <div>
                <label htmlFor="lname" className="block mb-2 text-sm text-gray-600 ">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lname"
                  id="lname"
                  value={form.lname}
                  onChange={handleChange}
                  placeholder="Smith"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm text-gray-600">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  id="email"
                  placeholder="example@example.com"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label htmlFor="password" className="text-sm text-gray-600 ">
                    password
                  </label>
                </div>

                <input
                  type="password"
                  name="password"
                  id="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Your password"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg  focus:border-blue-400  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
              <div className="flex items-center mt-2">
                <input
                  checked={form.isAdmin}
                  onChange={(e) => {
                    setForm((prev) => ({ ...prev, isAdmin: e.target.checked }));
                  }}
                  id="isAdmin"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  focus:ring-2 "
                />
                <label htmlFor="isAdmin" className="ms-2 text-sm font-medium text-gray-900 ">
                  Register as Admin
                </label>
              </div>

              <div className="mt-6">
                <button
                  disabled={loading}
                  className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                >
                  {loading ? <Spinner /> : "Register"}
                </button>
              </div>
              {error?.type === "register" && <p className="text-center lowercase text-red-600">{error.message}</p>}
            </form>

            <p className="mt-6 text-sm text-center text-gray-400">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500 focus:outline-none focus:underline hover:underline">
                Login
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
