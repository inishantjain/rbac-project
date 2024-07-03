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
};

const UserList: React.FC<PropType> = ({ users, page = 1, userPerPage = 10, setUsers }) => {
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
      <Table>
        <Thead>
          <Tr>
            <Th>S.no</Th>
            <Th>Name</Th>
            <Th>email</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map((user, idx) => (
            <Tr key={user._id}>
              <Td>{idx + 1 + userPerPage * (page - 1)}</Td>
              <Td>{user.fname + " " + user.lname}</Td>
              <Td>P{user.email}</Td>
              <Th>
                <button className="text-blue-500 underline">Edit</button>
                &nbsp;
                <button onClick={() => deleteHandler(user._id)} className="text-red-400 underline">
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
