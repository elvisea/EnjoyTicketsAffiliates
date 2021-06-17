import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { FormEvent, useCallback, useEffect, useState } from "react";
import MenuAside from "../components/menu-aside";
import api from "../services/api";
import styles from "../styles/profile.module.scss";

interface User {
  name?: string;
  email?: string;
  avatar_url?: string;
}

export default function Profile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [lastname, setLastname] = useState("");
  const [gender, setGender] = useState("");
  const [user, setUser] = useState<User>(null);
  const [mobileNumber, setMobileNumber] = useState("");
  const [country, setCountry] = useState("");
  const [dateBirth, setDateBirth] = useState("");
  const [city, setCity] = useState("");

  useEffect(() => {
    api.get("/User/Me").then((response) => {
      try {
        setUser(response.data.model);
      } catch (error) {
        console.log(error);
      }
    });
  }, []);

  const router = useRouter();

  const handleUpdateUser = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      try {
        e.preventDefault();

        api
          .put("/User", {
            name,
            lastname,
            email,
            mobileNumber,
            country,
            city,
            dateBirth,
            gender,
          })
          .then(() => {
            setName("");
            setLastname("");
            setEmail("");
            setMobileNumber("");
            setCountry("");
            setCity("");
            setDateBirth("");
            setGender("");
            alert("Updated Successfully");
          });
      } catch (error) {
        router.push("/profile");
        alert("Error");
      }
    },
    [
      name,
      lastname,
      email,
      mobileNumber,
      country,
      city,
      dateBirth,
      gender,
      router,
    ]
  );

  return (
    <>
      <div className={styles.container}>
        <MenuAside
          name={user?.name}
          avatar_url={user?.avatar_url}
          email={user?.email}
        />

        <div className={styles.containerRight}>
          <div className={styles.content}>
            <main className={styles.containerMain}>
              <h1>My Influencer Profile</h1>
              <span>Create your profile</span>
              <h2>Informations</h2>

              <form
                onSubmit={handleUpdateUser}
                className={styles.containerForm}
              >
                <div className={styles.inputGroup}>
                  <div>
                    <label>First Name</label>
                    <br />
                    <input
                      required
                      type="text"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <br />
                  </div>

                  <div>
                    <label>Last Name</label>
                    <br />
                    <input
                      required
                      type="text"
                      name="lastname"
                      value={lastname}
                      onChange={(e) => setLastname(e.target.value)}
                    />
                    <br />
                  </div>
                </div>

                <label>E-mail</label>
                <br />
                <input
                  required
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <br />

                <label>Phone Number</label>
                <br />
                <input
                  required
                  type="text"
                  name="mobileNumber"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                />
                <br />

                <div className={styles.inputGroup}>
                  <div>
                    <label>Country</label>
                    <br />
                    <input
                      required
                      type="text"
                      name="country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                    />
                    <br />
                  </div>

                  <div>
                    <label>City</label>
                    <br />
                    <input
                      required
                      type="text"
                      name="city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                    <br />
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <div>
                    <label>Date of birth</label>
                    <br />
                    <input
                      required
                      type="date"
                      name="dateBirth"
                      value={dateBirth}
                      onChange={(e) => setDateBirth(e.target.value)}
                    />
                    <br />
                  </div>

                  <div>
                    <label>Gender</label>
                    <br />
                    <select
                      required
                      name="gender"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                    >
                      <option value="" disabled selected hidden>
                        Select
                      </option>
                      <option key="male" value="male">
                        Male
                      </option>
                      <option key="female" value="female">
                        Female
                      </option>
                    </select>
                  </div>
                </div>

                <button>Save Changes</button>
              </form>
            </main>

            <div className={styles.containerAvatar}>
              {user?.avatar_url ? (
                <>
                  <h1>Avatar</h1>
                  <img src={user?.avatar_url} alt="Avatar" />
                </>
              ) : null}
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
