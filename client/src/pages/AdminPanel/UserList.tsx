import { Table, Tr, Th, Td, Tbody, Thead } from "react-super-responsive-table";
import { User } from "../../types/types";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { deleteUserByIdApi } from "../../services/api";
import { Dispatch, SetStateAction } from "react";

type PropType = {
  users: User[];
  setUsers: Dispatch<SetStateAction<User[]>>;
  page?: number; //FIXME: pagination is not implemented yet
  userPerPage?: number;
  editUserHandler: (user: User) => Promise<void>;
};

const UserList: React.FC<PropType> = ({ users, page = 1, userPerPage = 10, setUsers, editUserHandler }) => {
  async function deleteHandler(userId: string) {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      const response = await deleteUserByIdApi(userId);
      if (response.ok) {
        setUsers((prev) => prev.filter((user) => user._id !== userId));
      } //TODO: handle else part
    } catch (error: any) {
      console.error("Error deleting user:", error);
    }
  }

  return (
    <>
      <Table className="">
        <Thead className=" text-gray-700 uppercase bg-gray-50">
          <Tr>
            <Th className="py-5">s.no</Th>
            <Th>name</Th>
            <Th>email</Th>
            <Th>actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map((user, idx) => (
            <Tr key={user._id} class="bg-white border-b ">
              <Td>{idx + 1 + userPerPage * (page - 1)}</Td>
              <Td className="capitalize">{user.fname + " " + user.lname}</Td>
              <Td>{user.email}</Td>
              <Th>
                <button
                  onClick={() => editUserHandler(user)}
                  className="px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                >
                  Edit
                </button>
                &nbsp;
                <button
                  onClick={() => deleteHandler(user._id)}
                  className="px-3 py-2 text-sm font-medium text-center  focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 rounded-lg"
                >
                  delete
                </button>
              </Th>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  );
};

export default UserList;
