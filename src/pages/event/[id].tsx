import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import api from "../../services/api";
import styles from "../../styles/event.module.scss";

interface User {
  name?: string;
  email?: string;
  avatar_url?: string;
}

interface Events {
  event: {
    id: string;
    banner: string;
    dateInit: string;
    title: string;
    address: string;
    name: string;
    tags: [];
    user: {
      avatar_url: string;
    };
  };
  ticket: {
    comission: string;
  }[];
}

function Event() {
  const [user, setUser] = useState<User>(null);
  const [events, setEvents] = useState<Events>();
  const [comissions, setComissions] = useState({ min: 0, max: 0 });
  const router = useRouter();
  const { id } = router.query;
  console.log("events", events);

  useEffect(() => {
    api.get("/User/Me").then((response) => {
      try {
        setUser(response.data.model);
      } catch (error) {
        console.log(error);
      }
    });
  }, []);

  useEffect(() => {
    api.get(`/events/${id}`).then((response) => {
      try {
        setEvents(response.data.model);
      } catch (error) {
        console.log("Error", error);
      }
    });
  }, []);

  useEffect(() => {
    let min = 0;
    let max = 0;

    const emptyFilteredCommission = events?.ticket.map((c) =>
      c.comission.replace("", "0")
    );
    const comissionParseInt = emptyFilteredCommission?.map((c) =>
      parseInt(c, 10)
    );

    min = Math.min.apply(null, comissionParseInt);
    max = Math.max.apply(null, comissionParseInt);

    setComissions({ min, max });
  }, [events]);

  const formattedDate = new Date(events?.event.dateInit).toLocaleDateString(
    "en-US",
    {
      weekday: "short",
      month: "short",
      day: "2-digit",
    }
  );

  return (
    <div className={styles.container}>
      <header className={styles.containerTopNav}>
        <img src="/images/logo-enjoy.svg" alt="" />
        <input type="text" placeholder="Find your favorites events" />
        <div>
          <nav>
            <a href="">My Earnings</a>
            <a href="">Tickets</a>
            <a href="">Create Event</a>
          </nav>
          {user?.avatar_url ? (
            <img
              className={styles.containerAvatar}
              src={user?.avatar_url}
              alt=""
            />
          ) : null}
          <img src="/images/united-kingdom.svg" alt="" />
          <h1>UK</h1>
        </div>
      </header>

      <div className={styles.containerHeroImage}>
        {/* <img src={events?.event.banner} alt="Banner Event" className={styles.BannerEvent} /> */}
        <div className={styles.containerHeroInfo}>
          {/* <div className={styles.containerColumnLeftIcons}>
            <img src="/images/elvis.jpg" alt="" />
            <img src="/images/elvis.jpg" alt="" />
          </div> */}

          <div className={styles.containerColumnMiddle}>
            <h2>{formattedDate}</h2>
            <h1>{events?.event.title}</h1>
            <span>by Brian Rodrigues</span>
          </div>

          <div className={styles.containerColumnRight}>
            <h1>
              Tickets{" "}
              <span>
                £ {comissions?.min} — £ {comissions?.max}
              </span>
            </h1>
            <button>Tickets</button>
          </div>
        </div>
      </div>

      <div className={styles.containerContent}>
        <div className={styles.containerColumnLeft}>
          <h1>Summary</h1>
          <p>
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor
            <br /> incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud
            <br /> exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute
            <br /> irure dolor in reprehenderit in voluptate velit esse cillum
            dolore eu fugiat nulla
            <br /> pariatur. Excepteur sint occaecat cupidatat non proident,
            sunt in culpa qui officia
            <br /> deserunt mollit anim id est laborum."
          </p>

          <div className={styles.containerTags}>
            <h2>Tags</h2>
          </div>

          <div className={styles.containerCardFooter}>
            <img src={events?.event.user.avatar_url} alt="" />
            <div className={styles.containerCardContentRight}>
              <span>ORGANISER</span>
              <h1>Brian Rodrigues</h1>
              <h3>contact me</h3>
              <p>
                "Lorem ipsum dolor sit amet, consectetur adipiscing
                <br /> elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua..."
              </p>
            </div>
          </div>
        </div>

        <div className={styles.containerContentRight}>
          <div className={styles.containerCard}>
            <h1>Comission</h1>
            <h2>£3.50 for ticket</h2>
            <p>
              Let your friends know where
              <br /> you are going by sharing
              <br />
              this event.
            </p>
            <div></div>
            <input type="text" />
          </div>

          <div>
            <h1>Local</h1>
            <p>Jazz Café — 5 Parkway London</p>
            <span>View map</span>
          </div>

          <div>
            <h1>Date</h1>
            <p>Monday 28th Oct at 23:45</p>
            <span>Add calendar</span>
          </div>

          <div>
            <h1>Refund Policy</h1>
            <p>No Refunds</p>
          </div>
        </div>
      </div>

      <footer className={styles.containerFooter}>
        <div>
          <h1>CUSTOMER</h1>
          <a href="">My tickets</a>
          <a href="">Events</a>
          <a href="">FAQ</a>
        </div>
        <div>
          <h1>ORGANISER</h1>
          <a href="">How it works?</a>
          <a href="">Create your event</a>
          <a href="">Organiser App</a>
          <a href="">FAQ</a>
        </div>
        <div>
          <h1>INFLUENCER</h1>
          <a href="">How it works?</a>
          <a href="">Influencer Program</a>
          <a href="">FAQ</a>
        </div>
        <div>
          <h1>COMPANY</h1>
          <a href="">About us</a>
          <a href="">Privacy</a>
          <a href="">Terms</a>
          <a href="">Contact us</a>
        </div>
      </footer>
    </div>
  );
}

export default Event;

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
