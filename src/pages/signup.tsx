import { FormEvent, useCallback, useState } from "react";
import { useRouter } from "next/router";

import api from "../services/api";
import styles from "../styles/signup.module.scss";

export default function Signup() {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleCreateUser = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      try {
        e.preventDefault();

        api
          .post("Account", {
            name,
            lastname,
            email,
            password,
          })
          .then(() => {
            alert("User Created Successfully");
            router.push("/");
          });
      } catch (error) {
        router.push("/signup");
        console.log("error", error);
      }
    },
    [name, lastname, email, password, router]
  );

  async function SignIn() {
    router.push("/");
  }
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <img src="/images/logo-enjoy.svg" alt="" />
        <h1>Share and earning</h1>
        <span>
          Please provide us with the following information to get started.
        </span>

        <form onSubmit={handleCreateUser}>
          <div className={styles.inputGroup}>
            <div>
              <label>First Name</label> <br />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                name="name"
                required
              />
              <br />
            </div>

            <div>
              <label>Last Name</label>
              <br />
              <input
                type="text"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                name="last-name"
                required
              />
              <br />
            </div>
          </div>
          <label htmlFor="email">Email</label> <br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            required
          />
          <br />
          {/* <label htmlFor="choose-password">Choose Password</label> <br />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            name="password"
            required
          /><br /> */}
          <label htmlFor="choose-password">Confirm Password</label> <br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            required
          />
          <br />
          <button type="submit">Apply</button>
        </form>
      </div>

      <div className={styles.contentRight}>
        <button onClick={SignIn}>Login</button>

        <h1>
          Do you have friends or followers that like events and shows?
          <br />
          Now you can get paid referring your friends to our evets
        </h1>

        <ul>
          <div>
            <img src="/images/enjoy-logo-icon.svg" alt="" />
            <h1>Earn commission for ticket sales using your link</h1>
          </div>

          <div>
            <img src="/images/enjoy-logo-icon.svg" alt="" />
            <h1>Easy commission payments directly to your bank </h1>
          </div>

          <div>
            <img src="/images/enjoy-logo-icon.svg" alt="" />
            <h1>Get a unique link for each event to share</h1>
          </div>

          <div>
            <img src="/images/enjoy-logo-icon.svg" alt="" />
            <h1>Track every sale through your own dashboard</h1>
          </div>
        </ul>

        <h1>
          We are growing fast and it is because our costumers are spreading the
          <br />
          word. Now we want to return the favor to everyone that has helped us.
          <br />
          Start sharing and getting paid today! <a href="">Sing up now!</a>
        </h1>
      </div>
    </div>
  );
}
