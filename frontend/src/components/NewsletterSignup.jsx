import classes from './NewsletterSignup.module.css';

export function NewsletterSignup() {

    async function submitData(e) {
        e.preventDefault();

        const data = new FormData(e.target);
        const email = data.get('email');
      
        // send to backend newsletter server ...
        console.log(email);
        // return { message: 'Signup successful!' };
      }

  return (
    <form onSubmit={submitData} className={classes.newsletter}>
      <input
        type="email"
        name='email'
        placeholder="Sign up for newsletter..."
        aria-label="Sign up for newsletter"
      />
      <button type="submit" >Sign up</button>
    </form>
  );
}