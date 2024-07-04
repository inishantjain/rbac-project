import { useState } from "react";
import UserList from "./UserList";
import { getUsersApi } from "../../services/api";
import { User } from "../../types/types";
import CreateUserModal from "../../components/CreateUserModal";
import Spinner from "../../components/Spinner";

function AdminPanel() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [createUserModalShow, setCreateUserModalShow] = useState<boolean>(false);

  async function getUsersHandler() {
    setLoading(true);
    try {
      const response: Response = await getUsersApi();
      if (response.ok) {
        const users = (await response.json()).users;
        console.log(users);
        setUsers(users);
        setError(null);
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      setError("An unexpected error occurred");
    }
    setLoading(false);
  }

  return (
    <>
      <div className="py-6 w-11/12 mx-auto">
        <h1 className="text=3xl text-bold my-5">Welcome to the Admin Panel</h1>
        <hr />
        <div className="mt-4">
          <button
            onClick={() => setCreateUserModalShow(true)}
            className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Create User
          </button>
          <button
            disabled={loading}
            onClick={getUsersHandler}
            className="px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
          >
            {loading ? <Spinner /> : "Get all Users"}
          </button>
        </div>
        {error && <p className="text-center lowercase text-red-600">{error}</p>}
        <div className="mt-8">
          {users && users.length > 0 && <UserList users={users} setUsers={setUsers} userPerPage={10} />}
        </div>
      </div>
      {createUserModalShow && <CreateUserModal getUsers={getUsersHandler} setModal={setCreateUserModalShow} />}
    </>
  );
}

export default AdminPanel;
