import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import Spinner from "../../components/Spinner";
import useForm from "../../hooks/useForm";

const Login = () => {
  const { login, error, loading } = useAuth();
  const requiredValidate = (val: string) => (val === "" ? "This field is required." : null);
  const passwordValidate = (val: string) =>
    val === "" ? "This field is required." : val.length < 6 ? "Password must be at least 6 characters" : null;

  const { values, handleChange, errors, handleSubmit } = useForm(
    { email: "", password: "" },
    { email: requiredValidate, password: passwordValidate }
  );

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
            <form onSubmit={handleSubmit(login)}>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm text-gray-600 ">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={values.email}
                  id="email"
                  onChange={handleChange}
                  placeholder="example@example.com"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg  focus:border-blue-400  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
                {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
              </div>

              <div className="mt-6">
                <div className="flex justify-between mb-2">
                  <label htmlFor="password" className="text-sm text-gray-600 ">
                    Password
                  </label>
                  <a href="#" className="text-sm text-gray-400 focus:text-blue-500 hover:text-blue-500 hover:underline">
                    Forgot password?
                  </a>
                </div>

                <input
                  type="password"
                  name="password"
                  id="password"
                  value={values.password}
                  placeholder="Your Password"
                  onChange={handleChange}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg  focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
                {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
              </div>

              <div className="mt-6">
                <button
                  disabled={loading}
                  className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                >
                  {loading ? <Spinner /> : "Login"}
                </button>
              </div>
              {error?.type === "login" && <p className="text-center lowercase text-red-600">{error.message}</p>}
            </form>

            <p className="mt-6 text-sm text-center text-gray-400">
              Don&#x27;t have an account yet?{" "}
              <Link to="/signup" className="text-blue-500 focus:outline-none focus:underline hover:underline">
                Sign up
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
