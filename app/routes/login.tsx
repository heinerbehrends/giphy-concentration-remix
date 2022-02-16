import React from 'react';
import { Form, json, useActionData, useSearchParams } from 'remix';
import type { LinksFunction, ActionFunction } from 'remix';
import styles from '~/styles/login.css';
import { db } from '~/utils/db.server';
import { formatServerError } from '@remix-run/node';

export const links: LinksFunction = () => [
  {
    rel: 'stylesheet',
    href: styles,
  },
];

function validateUsername(username: string) {
  if (typeof username !== 'string' || username.length < 3) {
    return 'Username must be at least 3 characters long';
  }
}

function validatePassword(username: string) {
  if (typeof username !== 'string' || username.length < 6) {
    return 'Password must be at least 6 characters long';
  }
}

type ActionData = {
  formError?: string;
  fieldErrors?: {
    username: string | undefined;
    password: string | undefined;
  };
  fields?: {
    loginType: string;
    username: string;
    password: string;
  };
};

function badRequest(data: ActionData) {
  return json(data, { status: 400 });
}

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const loginType = form.get('loginType');
  const username = form.get('username');
  const password = form.get('password');
  const redirect = form.get('redirect') || '/';
  if (
    typeof loginType !== 'string' ||
    typeof username !== 'string' ||
    typeof password !== 'string' ||
    typeof redirect !== 'string'
  ) {
    return badRequest({
      formError: 'Form not submitted correctly',
    });
  }
  const fields = { loginType, username, password };
  const fieldErrors = {
    username: validateUsername(username),
    password: validatePassword(password),
  };
  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({ fieldErrors, fields });
  }
  switch (loginType) {
    case 'login': {
      // login to get the user
      // if there's no user, return the fields and a formError
      // if there is a user, create their session and redirect to /
      return badRequest({ fields, formError: 'Not yet implemented' });
    }
    case 'register': {
      const userExists = await db.user.findFirst({ where: { username } });
      if (userExists) {
        return badRequest({
          fields,
          formError: `User with username ${username} already exists`,
        });
      }
      // create the user
      // create their session and redirect to /jokes
      return badRequest({ fields, formError: 'Not yet implemented' });
    }
    default: {
      return badRequest({ fields, formError: 'Login type not recognized' });
    }
  }
};

export default function Login() {
  const actionData = useActionData<ActionData>();
  const [searchParams] = useSearchParams();
  return (
    <main className="container">
      <h1>Login</h1>
      <Form
        aria-describedby={
          actionData?.formError ? 'form-error-message' : undefined
        }
      >
        <input
          type="hidden"
          name="redirectTo"
          value={searchParams.get('redirectTo') ?? undefined}
        />
        <fieldset>
          <legend className="sr-only">Login or register?</legend>
          <label>
            <input type="radio" name="loginType" value="login" defaultChecked />{' '}
            Login
          </label>
          <label>
            <input type="radio" name="loginType" value="register" /> Register
          </label>
        </fieldset>
        <div>
          <label htmlFor="username-input">Username</label>
          <input
            type="text"
            name="username"
            id="username-input"
            autoComplete="username"
            defaultValue={actionData?.fields?.username}
            aria-invalid={Boolean(actionData?.fieldErrors?.username)}
            aria-describedby={
              actionData?.fieldErrors?.username
                ? 'username-error-message'
                : undefined
            }
          />
        </div>
        <div>
          <label htmlFor="password-input">Password</label>
          <input
            type="password"
            name="password"
            id="password-input"
            autoComplete="current-password"
          />
        </div>
        <input type="submit" value="Login" />
      </Form>
    </main>
  );
}
