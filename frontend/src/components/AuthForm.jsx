import { useState } from 'react';

import classes from './AuthForm.module.css';

export function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);

  function switchAuthHandler() {
    setIsLogin((isCurrentlyLogin) => !isCurrentlyLogin);
  }

  return (
    <>
      <form onSubmit={switchAuthHandler} className={classes.form}>
        <h1>{isLogin ? 'Log in' : 'Create a new user'}</h1>
        <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />
        </p>
        <p>
          <label htmlFor="image">Password</label>
          <input id="password" type="password" name="password" required />
        </p>
        <div className={classes.actions}>
          <button type="submit">
            {isLogin ? 'Create new user' : 'Login'}
          </button>
          <button>Save</button>
        </div>
      </form>
    </>
  );
}