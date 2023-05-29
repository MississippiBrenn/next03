import React from 'react';
import getUser from '@/lib/getUser';
import getUserPosts from '@/lib/getUserPosts';
import getAllUsers from '@/lib/getAllUsers';
import { Suspense } from 'react';
import UserPosts from './components/UserPosts';
import type { Metadata } from 'next';

//when trying to get a dynamic page that doesn't exist
import { notFound } from 'next/navigation';

//dynamic route
//from url
type Params = {
  params: {
    userId: string;
  };
};

export async function generateMetadata({
  params: { userId },
}: Params): Promise<Metadata> {
  //request data where you need it because next will automatically de duplicate these requests
  const userData: Promise<User> = getUser(userId);
  const user: User = await userData;

  //metadata for not found page
  if (!user.name) {
    return {
      title: 'User Not Found',
    };
  }
  return {
    title: user.name,
    description: `This is the page of ${user.name}`,
  };
}

//going to fetch data in parallel to not create waterfall
//specify params inside functional component
// params: Type
export default async function UserPage({ params: { userId } }: Params) {
  const userData: Promise<User> = getUser(userId);
  const userPostsData: Promise<Post[]> = getUserPosts(userId);

  //const [user, userPosts] = await Promise.all([userData, userPostsData]);

  const user = await userData;

  if (!user.name) return notFound();

  return (
    <>
      <h2>{user.name}</h2>
      <br />
      <Suspense fallback={<h2>Loading...</h2>}>
        {/* @ts-expect-error Server Component */}
        <UserPosts promise={userPostsData} />
      </Suspense>
    </>
  );
}

//generate serverside rendering
export async function generateStaticParams() {
  //next js de duplicates requests
  const usersData: Promise<User[]> = getAllUsers();
  const users = await usersData;

  //can statically generate pages in advance without server side rendering
  return users.map((user) => ({ userId: user.id.toString() }));
}
