const BASE_URL = import.meta.env.VITE_BASE_URL;

export async function loginApi(email: string, password: string) {
  const res = await fetch(new URL("login", BASE_URL), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return res;
}

export async function registerApi(fname: string, lname: string, email: string, password: string, isAdmin?: boolean) {
  const res = await fetch(new URL("register", BASE_URL), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fname, lname, email, password, isAdmin }),
  });
  return res;
}

export async function editUserApi(userId: string, fname: string, lname: string, email: string, password: string) {
  const res = await fetch(new URL("editUser", BASE_URL), {
    method: "PATCH",
    headers: { authorization: `Bearer ${localStorage.getItem("access_token")!}`, "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ userId, fname, lname, email, password }),
  });
  return res;
}

export async function getUserStateApi() {
  const res = await fetch(new URL("getUser", BASE_URL), {
    headers: { authorization: `Bearer ${localStorage.getItem("access_token")!}`, "Content-Type": "application/json" },
    credentials: "include",
  });
  const jsonRes = await res.json();

  if (res.ok) return jsonRes.user;
  else localStorage.removeItem("access_token");
  return null;
}

export async function getUsersApi() {
  // console.log(localStorage.getItem("access_token"));
  const res = await fetch(new URL("getAllUsers", BASE_URL), {
    headers: { authorization: `Bearer ${localStorage.getItem("access_token")!}`, "Content-Type": "application/json" },
    credentials: "include",
  });
  return res;
}

export async function deleteUserByIdApi(userId: string) {
  const res = await fetch(new URL(`deleteUser/${userId}`, BASE_URL), {
    method: "DELETE",
    headers: { authorization: `Bearer ${localStorage.getItem("access_token")!}`, "Content-Type": "application/json" },
    credentials: "include",
  });
  return res;
}
