import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

/**Component */
function Profile() {
  const { user } = useAuth();
  if (!user) return <Navigate to={"/login"} />;

  return (
    <div className="w-11/12 max-w-screen-2xl mx-auto p-20">
      <div className="py-8 px-8 mr-auto bg-white rounded-xl shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
        <img
          className="block mx-auto h-24 rounded-full sm:mx-0 sm:shrink-0"
          src={user?.imgUrl || "https://placehold.co/500"}
          alt="placeholder"
        />
        <div className="flex-1 flex justify-between items-start text-center space-y-2 sm:text-left">
          <div className="space-y-0.5">
            <div className="flex gap-4 items-center">
              <p className="text-lg text-black font-semibold">{user.fname + " " + user.lname}</p>
            </div>
            <p className="text-slate-500 font-medium text-sm">{user.email}</p>
          </div>
          <button className="px-4 py-1 text-sm text-blue-600 font-semibold focus:ring-offset-2">button</button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
