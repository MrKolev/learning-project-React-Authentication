import { Link, useNavigate, useParams, } from 'react-router-dom';
import classes from './EventItem.module.css';
import { useEffect, useState } from 'react';
import { gatAuthToken } from './util/auth';

export function EventItemDetails() {

  const { id } = useParams();
  const [event, setEvent] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  useEffect(() => {
    (async function () {
      try {
        const response = await fetch('http://localhost:8080/events/' + id);
        const data = await response.json();
        setEvent(data.event)
      } catch (error) {
        throw new Error(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);


  async function startDeleteHandler() {
    const proceed = window.confirm('Are you sure you want to delete');
    const token = gatAuthToken();

    if (proceed) {
      try {
        await fetch('http://localhost:8080/events/' + id, {
          method: "delete",
          headers:{
            'Authorization': 'Bearer ' + token
          }
        });
      } catch (error) {
        throw new Error(error)
      }finally{
        navigate('/events')
      }

    }
  }

  return <>
    {loading && <h1 className={classes.event} >Loading...</h1>}
    {!loading &&
      <article className={classes.event}>
        <img src={event.image} alt={event.title} />
        <h1>{event.title}</h1>
        <time>{event.date}</time>
        <p>{event.description}</p>
        <menu className={classes.actions}>
          <Link to="edit">Edit</Link>
          <button onClick={startDeleteHandler}>Delete</button>
        </menu>
      </article>}
  </>;
}


