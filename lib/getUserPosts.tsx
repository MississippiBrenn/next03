export default async function getUserPosts(userId: string) {
  // repace id with template literal
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?userId=${userId}`,
    //cache:'force-cache'
    //never cache, always dynamic 'no-store'
    //incremental static regeneration next: '{revalidate: inSecondsbeforecheckfornewdata}
    { next: { revalidate: 60 } }
  );

  if (!res.ok) return undefined;

  return res.json();
}
