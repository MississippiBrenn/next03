import Link from 'next/link';
import { Inter } from 'next/font/google';
import styles from './page.module.css';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main>
      <h1>Home Page</h1>
      <p>
        {/* inspect and mouse over users link you can see the prefetch */}
        <Link href='/users'>Users</Link>
      </p>
    </main>
  );
}
