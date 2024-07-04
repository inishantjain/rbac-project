import { useEffect, useState } from "react";
import UserList from "./UserList";
import { getUsersApi } from "../../services/api";
import { User } from "../../types/types";
import CreateEditUserModal from "./CreateEditUserModal";
import Spinner from "../../components/Spinner";
import { useSearchParams } from "react-router-dom";

function AdminPanel() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [createEditUserModalShow, setCreateEditUserModal] = useState<boolean>(false);
  const [, setSearchParams] = useSearchParams();

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

  async function editUserHandler(user: User) {
    setCreateEditUserModal(true);
    const { _id: userId, email, fname, lname } = user;
    setSearchParams({ userId, email, fname, lname }, { replace: true });
  }

  return (
    <>
      <div className="py-6 w-11/12 mx-auto">
        <h1 className="text=3xl text-bold my-5">Welcome to the Admin Panel</h1>
        <hr />
        <div className="mt-4">
          <button
            onClick={() => setCreateEditUserModal(true)}
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
          {users && users.length > 0 && (
            <UserList users={users} setUsers={setUsers} userPerPage={10} editUserHandler={editUserHandler} />
          )}
        </div>
      </div>

      {/* modal for creating or editing user  */}
      {createEditUserModalShow && (
        <CreateEditUserModal
          getUsers={getUsersHandler}
          setModal={(state: boolean) => {
            if (!state) setSearchParams({});
            setCreateEditUserModal(state);
          }}
        />
      )}
    </>
  );
}

export default AdminPanel;
