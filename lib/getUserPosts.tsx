export default async function getUserPosts(userId: string) {
  // repace id with template literal
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
  );

  if (!res.ok) throw new Error('failed to fetch user');

  return res.json();
}