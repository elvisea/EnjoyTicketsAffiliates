import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import MenuAside from "../components/menu-aside";
import api from "../services/api";
import styles from "../styles/dashboard.module.scss";

interface User {
  name: string;
  email: string;
  avatar_url: string;
}

export default function Dashboard() {
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    api.get("/User/Me").then((response) => {
      try {
        setUser(response.data.model);
      } catch (error) {
        console.log("Error", error);
      }
    });
  }, []);

  return (
    <>
      <div className={styles.container}>
        <MenuAside
          name={user?.name}
          avatar_url={user?.avatar_url}
          email={user?.email}
        />

        <div className={styles.containerRight}>
          <div className={styles.containerMain}>
            <div className={styles.containerMainHeader}>
              <h1>Dashboard</h1>
              <h2>Daily</h2>
            </div>

            <div className={styles.containerCards}>
              <div>
                <h1>Clicks</h1>
                <h2>2500</h2>
              </div>
              <div className={styles.separator}></div>
              <div>
                <h1>Tickets Sold</h1>
                <h2>1054</h2>
              </div>
              <div className={styles.separator}></div>
              <div>
                <h1>Earnings</h1>
                <h2>2500 £</h2>
              </div>
            </div>

            <input className={styles.containerInput} placeholder="Search" />

            <div className={styles.containerTable}>
              <table>
                <thead>
                  <tr>
                    <th>Events</th>
                    <th>Status</th>
                    <th>Tickets Solds</th>
                    <th>Comissions</th>
                    <th></th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td className={styles.fontPoppins}>Brazilian Music Show</td>
                    <td className={styles.fontLato}></td>
                    <td className={styles.fontLato}>80</td>
                    <td className={styles.fontLato}>60 £</td>
                    <td>...</td>
                  </tr>
                  <tr>
                    <td className={styles.fontPoppins}>Brazilian Music Show</td>
                    <td className={styles.fontLato}></td>
                    <td className={styles.fontLato}>80</td>
                    <td className={styles.fontLato}>180 £</td>
                    <td>...</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = parseCookies(ctx);

  if (!cookies["enjoy.token"]) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
