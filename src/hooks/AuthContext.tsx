import { createContext, ReactNode } from "react";
import { useRouter } from "next/router";
import { destroyCookie, setCookie } from "nookies";
import api from "../services/api";

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextData {
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): Promise<void>;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post("/Account/Token", {
        email,
        password,
      });

      const { token } = response.data.model;

      setCookie(undefined, "enjoy.token", token, {
        maxAge: 60 * 60 * 24 * 30, //30 days
        path: "/",
      });

      api.defaults.headers["Authorization"] = `Bearer ${token}`;

      router.push("/dashboard");
    } catch (error) {
      console.log(error);
      destroyCookie(undefined, "enjoy.token");
    }
  }

  async function signOut() {
    destroyCookie(undefined, "enjoy.token");
    router.push("/");
  }

  return (
    <AuthContext.Provider value={{ signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
