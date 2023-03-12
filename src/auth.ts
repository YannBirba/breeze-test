import axios from "./lib/axios";

export const useAuth = () => {
  const csrf = () => axios.get("/sanctum/csrf-cookie");

  const register = async ({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) => {
    await csrf();

    axios
      .post("/register", {
        name,
        email,
        password,
        password_confirmation: password,
      })
      .then((response) => alert(JSON.stringify(response.data) || "all good"))
      .catch((error) => {
        console.error(error);
      });
  };

  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    await csrf();

    axios
      .post("/login", { email, password })
      .then((response) => alert(JSON.stringify(response.data) || "all good"))
      .catch((error) => {
        console.error(error);
      });
  };

  const forgotPassword = async (email: string) => {
    await csrf();

    axios
      .post("/forgot-password", { email })
      .then((response) => alert(JSON.stringify(response.data) || "all good"))
      .catch((error) => {
        console.error(error);
      });
  };

  const resetPassword = async ({
    token,
    email,
    password,
  }: {
    token: string;
    email: string;
    password: string;
  }) => {
    await csrf();

    axios
      .post("/reset-password", {
        token,
        email,
        password,
        password_confirmation: password,
      })
      .then((response) => alert(JSON.stringify(response.data) || "all good"))
      .catch((error) => {
        console.error(error);
      });
  };

  const resendEmailVerification = () => {
    axios
      .post("/email/verification-notification")
      .then((response) => alert(JSON.stringify(response.data) || "all good"));
  };

  const logout = async () => {
    await axios
      .post("/logout")
      .then((response) => alert(JSON.stringify(response.data) || "all good"));
  };

  // useEffect(() => {
  //   if (middleware === "guest" && redirectIfAuthenticated && user)
  //     router.push(redirectIfAuthenticated);
  //   if (window.location.pathname === "/verify-email" && user?.email_verified_at)
  //     router.push(redirectIfAuthenticated);
  //   if (middleware === "auth" && error) logout();
  // }, [user, error]);

  const getCurrentUser = async () => {
    await csrf();

    axios
      .get("/api/user")
      .then((response) => alert(JSON.stringify(response.data) || "all good"))
      .catch((error) => {
        console.error(error);
      });
  };

  return {
    register,
    login,
    forgotPassword,
    resetPassword,
    resendEmailVerification,
    logout,
    getCurrentUser,
  };
};
