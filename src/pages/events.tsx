import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import MenuAside from "../components/menu-aside";
import api from "../services/api";
import styles from "../styles/events.module.scss";

interface Tickets {
  comission: string;
  description: string;
  endDate: string;
  id: string;
  price: string;
  qtd: number;
  startDate: string;
  type: string;
}

interface Events {
  event: {
    id: string;
    banner: string;
    dateInit: string;
    title: string;
    address: string;
    name: string;
    location: string;
  };
  ticket: Tickets[];
}

interface User {
  name: string;
  email: string;
  avatar_url: string;
}

export default function Events() {
  const [user, setUser] = useState<User>(null);
  const [events, setEvents] = useState<Events[]>();

  console.log("=> ", events)

  useEffect(() => {
    api.get("/User/Me").then((response) => {
      try {
        setUser(response.data.model);
      } catch (error) {
        console.log("Error", error);
      }
    });
  }, []);

  useEffect(() => {
    api.get("/events").then((response) => {
      try {
        setEvents(response.data.model);
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
            <h1>Events</h1>

            <div className={styles.containerInput}>
              <input type="text" placeholder="Find your favorites events" />
              <button />
            </div>

            <div className={styles.containerCards}>
              {events
                ? events?.map((e) => {
                    let location = "Online";
                    console.log(e.event.location, e.event.address);

                    if (e.event.location === "presencial" && e.event.address) {
                      let address = e.event.address?.split(", ");

                      if (address.length === 1) {
                        address = e.event.address.split(" - ");
                      }

                      let city = address[address.length - 2];

                      if (city?.length <= 2) {
                        city = address[address.length - 3];
                      } else {
                        city = address[address.length - 2];
                      }

                      location = city;
                    } else if (e.event.location === "presencial") {
                      location = "Not Defined";
                    }

                    let prices = e.ticket
                      .map((t) => Number(t.comission || "0"))
                      .filter((t) => t);
                    let comission = "0";

                    if (prices.length > 0) {
                      let min = Math.min(...prices);
                      let max = Math.max(...prices);

                      if (min !== max) {
                        comission = `${min} - ${max}`;
                      } else {
                        comission = `${max}`;
                      }
                    }

                    return (
                      <a key={e.event.id} href={`/event/${e.event.id}`}>
                        <div className={styles.containerCard}>
                          <>
                            <img
                              src={e.event.banner}
                              alt="Event"
                              className={styles.Image}
                            />

                            <footer>
                              <div className={styles.contentLeft}>
                                <h2>
                                  {new Date(
                                    e.event.dateInit
                                  ).toLocaleDateString("en-US", {
                                    weekday: "short",
                                    month: "short",
                                    day: "2-digit",
                                  })}
                                </h2>
                                <h1>{e.event.title}</h1>
                                <div className={styles.contentLocation}>
                                  <img src="/images/location.svg" alt="" />
                                  <span>{location}</span>
                                </div>
                              </div>

                              <div className={styles.contentRight}>
                                <div className={styles.contentImage}>
                                  <img src="/images/share.svg" alt="Share" />
                                </div>
                                <div className={styles.contentComission}>
                                  <h2>Comission</h2>
                                  <h1>£ {comission}</h1>
                                </div>
                              </div>
                            </footer>
                          </>
                        </div>
                      </a>
                    );
                  })
                : null}
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
