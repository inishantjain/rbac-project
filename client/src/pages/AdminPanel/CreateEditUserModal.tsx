import { useState } from "react";
import Spinner from "../../components/Spinner";
import { RegisterFormType } from "../../types/types";
import { editUserApi, registerApi } from "../../services/api";
import { useSearchParams } from "react-router-dom";

interface UserModalProps {
  setModal: (state: boolean) => void;
  getUsers: () => Promise<void>; //for refreshing new users
}

function CreateEditUserModal({ setModal, getUsers }: UserModalProps) {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");
  const modalType: "create" | "edit" = !userId ? "create" : "edit";

  const [form, setForm] = useState<RegisterFormType>({
    email: searchParams.get("email") || "",
    password: "",
    fname: searchParams.get("fname") || "",
    lname: searchParams.get("lname") || "",
    isAdmin: false,
  });

  const [loading, setLoading] = useState<boolean>();
  const [error, setError] = useState<null | string>(null);

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    setForm({
      ...form,
      [evt.target.name]: value,
    });
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { fname, lname, email, password } = form;
      let response;

      if (modalType === "create") response = await registerApi(fname, lname, email, password);
      else response = await editUserApi(userId!, fname, lname, email, password);

      if (response.ok) {
        getUsers();
        alert(`user ${modalType} success!`);
        setModal(false);
        setError(null);
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error: any) {
      console.error(`Error ${modalType === "create" ? "Creating" : "Editing"} user:`, error);
      setError("An unexpected error occurred." + error?.message);
    }
    setLoading(false);
  };

  return (
    <>
      <div
        onClick={() => setModal(false)}
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        aria-hidden="true"
      ></div>

      <div className="fixed inset-0 max-w-screen-md mx-auto">
        <div className="p-5 min-h-80 bg-white mt-20 rounded relative">
          <form onSubmit={handleFormSubmit} id="create-user-form">
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
                  Password
                </label>
              </div>

              <input
                type="password"
                name="password"
                id="password"
                value={form.password}
                onChange={handleChange}
                placeholder="User's password"
                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg  focus:border-blue-400  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>

            {error && <p className="text-center lowercase text-red-600">{error}</p>}
          </form>

          <div className="mt-6 flex justify-end">
            <button
              onClick={() => setModal(false)}
              className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Cancel
            </button>
            <button
              disabled={loading}
              form="create-user-form"
              className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300  shadow-lg shadow-blue-500/50  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 "
            >
              {loading ? <Spinner /> : "Create User"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateEditUserModal;
