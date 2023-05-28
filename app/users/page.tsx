import type { Metadata } from 'next';
import getAllUsers from '@/lib/getAllUsers';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Users',
};

import React from 'react';

//server component
//requests as it builds the website
//requests during build
export default async function UsersPage() {
  const usersData: Promise<User[]> = getAllUsers();

  const users = await usersData;

  console.log('Hello ');

  const content = (
    <section>
      <h2>
        <Link href='/'>Back to Home</Link>
      </h2>
      {/* //map over data */}
      <br />
      {users.map((user) => {
        return (
          <>
            <p key={user.id}>
              {/* //link to user dynamic page */}
              <Link href={`/users/${user.id}`}>{user.name}</Link>
            </p>
            <br />
          </>
        );
      })}
    </section>
  );

  return content;
}
