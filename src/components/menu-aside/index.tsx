import Link from 'next/link'
import { useContext } from 'react'
import { AuthContext } from '../../hooks/AuthContext'
import styles from './styles.module.scss'

interface UserProps {
  name?: string;
  email?: string;
  avatar_url?: string;
}

export default function MenuAside({ avatar_url, name, email }: UserProps) {
  const { signOut } = useContext(AuthContext)

  return (
    <aside className={styles.container}>
      <img src="/images/logo-enjoy.svg" alt="Logo" />
      <div className={styles.containerProfile}>

        {avatar_url
          ?
          <img src={avatar_url} alt="Avatar" />
          :
          null
        }

        {name || avatar_url
          ?
          <div className={styles.containerProfileData}>
            <h1>{name}</h1>
            <span>{email}</span>
          </div>
          :
          null
        }
      </div>

      <nav id="nav" className={styles.containerNav}>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/events">Events</Link>
        <Link href="/profile">MyProfile</Link>
        <a href="/" onClick={signOut}>Logout</a>
      </nav>
    </aside>
  )
}
