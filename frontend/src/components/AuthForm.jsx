import classes from './AuthForm.module.css';
import { Link, useSearchParams } from 'react-router-dom';

export function AuthForm() {

  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get(`mode`) === 'login';
  const rePassword = searchParams.get(`mode`) === 'signup';

  function submit() {

  }

  return (
    <>
      <form onSubmit={submit} className={classes.form}>
        <h1>{isLogin ? 'Log in' : 'Create a new user'}</h1>
        <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />
        </p>
        <p>
          <label htmlFor="image">Password</label>
          <input id="password" type="password" name="password" required />
        </p>
        {rePassword && <p>
          <label htmlFor="image">Repeat Password</label>
          <input id="rePassword" type="password" name="reRassword" required />
        </p>}
        <div className={classes.actions}>
          <Link to={`?mode=${isLogin ? 'signup' : 'login'}`}>
            {isLogin ? 'Create new user' : 'Login'}
          </Link>
          <button type="submit">{isLogin ? 'LOGIN' : "SAVE"}</button>
        </div>
      </form>
    </>
  );
}
