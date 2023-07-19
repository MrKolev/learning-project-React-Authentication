import { useState } from 'react';
import classes from './AuthForm.module.css';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

export function AuthForm() {

  const [searchParams] = useSearchParams();
  const [errorData, setErrorData] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();

  const mode = searchParams.get(`mode`);
  const isLogin = mode === 'login';
  const rePassword = mode === 'signup';

  async function submit(e) {
    e.preventDefault();
    setIsSubmit(true);
    const dataForm = new FormData(e.target);
    const authData = {
      email: dataForm.get('email'),
      password: dataForm.get('password')
    };

    const rePass = dataForm.get('reRassword');


    if (rePass && rePass !== authData.password) {
      e.target.reset()
      setIsSubmit(false);
      return setErrorData({ message: 'The password is incorrect! Try again.' });
    }

    try {
      const response = await fetch('http://localhost:8080/' + mode, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(authData)
      });

      const resData = await response.json();

      if (response.status === 422 || response.status === 401) {
        setIsSubmit(false);
        return setErrorData(resData);
      }

      if (!response.ok) {
        throw response
      }
      const token = resData.token
      localStorage.setItem('token', token);
      setIsSubmit(false);
      navigate("/");
      
    } catch (error) {
      setIsSubmit(false);
      throw error
    }

  }

  return (
    <>
      <form onSubmit={submit} className={classes.form}>
        <h1>{isLogin ? 'Log in' : 'Create a new user'}</h1>

        {errorData.errors &&
          <ul>
            {Object.values(errorData.errors)
              .map(err => <li className={classes.err} key={err} >{err}</li>)}
          </ul>}
        {errorData.message && <p className={classes.err}>{errorData.message}</p>}

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
          <button disabled={isSubmit} type="submit">{isLogin ? 'LOGIN' : isSubmit ? "Submiting ..." : "SAVE"}</button>
        </div>
      </form>
    </>
  );
}

AuthForm.defaultProps = {}
