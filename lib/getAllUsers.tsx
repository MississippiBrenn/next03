import React from 'react';

export default async function getAllUsers() {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');

  //if we recieved good response
  if (!res.ok) throw new Error('failed to fetch data');

  return res.json();
}
