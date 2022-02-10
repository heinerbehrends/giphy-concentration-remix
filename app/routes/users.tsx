import React from 'react';
import { Form, LoaderFunction, useLoaderData } from 'remix';
import type { User } from '@prisma/client';
import { db } from '../utils/db.server';
import styles from '~/styles/users.css';

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

type LoaderData = User[];

export const loader: LoaderFunction = async () => {
  const users: LoaderData = await db.user.findMany();
  return users;
};
export default function ShowUsers() {
  const users = useLoaderData<LoaderData>();
  return (
    <div className="user-container">
      <ul>
        {users.map((user) => (
          <li key={user.id}>{`${user.name}: ${user.email}`}</li>
        ))}
      </ul>
    </div>
  );
}
