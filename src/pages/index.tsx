import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { FormEvent, useCallback, useContext, useState } from "react";
import { AuthContext } from "../hooks/AuthContext";
import styles from "./styles.module.scss";

export default function Signin() {
  const router = useRouter();
  const { signIn } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleCreateSession = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      try {
        e.preventDefault();

        await signIn({
          email,
          password,
        });
      } catch (error) {
        router.push("/signup");
      }
    },
    [email, password, router]
  );

  return (
    <div className={styles.container}>
      <nav className={styles.containerNav}>
        <img src="/images/logo-enjoy.svg" alt="" />
        <div>
          <img src="/images/united-kingdom.svg" alt="" />
          <h1>UK</h1>
        </div>
      </nav>

      <div className={styles.containerContent}>
        <div className={styles.containerContentMain}>
          <div className={styles.containerLeftContent}>
            <div>
              <img src="/images/head-bar.svg" alt="" />
              <span>
                From reggaeton and funk to seminars and
                <br />
                networking events. EnjoyTickets puts your
                <br />
                event in front of your customers.
              </span>
            </div>
          </div>

          <div className={styles.containerRightContent}>
            <img src="/images/logo-login-form.svg" alt="" />
            <h1>Login</h1>
            <div>
              <span>New User?</span>
              <Link href="/signup">Create a new account</Link>
            </div>

            <form onSubmit={handleCreateSession}>
              <input
                type="email"
                name="email"
                placeholder="E-mail address"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />

              <div>
                <span>Forgot password?</span>
                <a href="">Recover</a>
              </div>

              <button type="submit">Next</button>
            </form>

            <footer>
              <span>Connect by</span>
              <img src="/images/google-icon.svg" alt="" />
              <img src="/images/facebook-icon.svg" alt="" />
            </footer>
          </div>
        </div>

        <footer className={styles.containerFooter}>
          <img src="/images/head-bar.svg" alt="" />
          <span>
            By continuing you agree to EnjoyTickets
            <br />
            Terms & Conditions and have read the Privacy Policy
          </span>
        </footer>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = parseCookies(ctx);

  if (cookies["enjoy.token"]) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
