import { useEffect, useState } from "react";
import "./App.css";
import { useAuth } from "./auth";

function App() {
  const {
    forgotPassword,
    login,
    logout,
    register,
    resendEmailVerification,
    getCurrentUser,
    resetPassword,
  } = useAuth();
  const [form, setForm] = useState<{
    name: string;
    email: string;
    password: string;
  }>({ name: "", password: "", email: "" });

  const [token, setToken] = useState("");

  useEffect(() => {
    const url = new URL(window.location.href);
    const email = url.searchParams.get("email");
    if (email) {
      setForm((prev) => ({ ...prev, email }));
    }

    const token = url.pathname.split("/").pop();
    if (token) {
      setToken(token);
    }
  }, []);

  return (
    <div className="App">
      <input
        type="name"
        id="name"
        value={form.name}
        onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
      />
      <input
        type="email"
        id="email"
        value={form.email}
        onChange={(e) =>
          setForm((prev) => ({ ...prev, email: e.target.value }))
        }
      />
      <input
        type="password"
        id="password"
        value={form.password}
        onChange={(e) =>
          setForm((prev) => ({ ...prev, password: e.target.value }))
        }
      />
      <button onClick={() => register(form)}>S'inscrire</button>

      <button onClick={() => login(form)}>Se connecter</button>

      <button onClick={() => logout()}>Se déconnecter</button>

      <button onClick={() => forgotPassword(form.email)}>
        Mot de passe oublié
      </button>

      <button onClick={() => resendEmailVerification()}>
        Renvoyer le mail de vérification
      </button>

      <button onClick={() => getCurrentUser()}>
        Récupérer l'utilisateur courant
      </button>

      <button onClick={() => resetPassword({ token, ...form })}>
        Réinitialiser le mot de passe
      </button>
    </div>
  );
}

export default App;
