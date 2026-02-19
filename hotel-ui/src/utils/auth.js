export function logout(navigate) {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  navigate("/login");
}