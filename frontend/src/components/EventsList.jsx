import { Link } from 'react-router-dom';
import classes from './EventsList.module.css';
import { useEffect, useState } from 'react';

export function EventsList() {

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async function () {
      try {
        const response = await fetch('http://localhost:8080/events');
        const data = await response.json();

        setEvents(data.events);

      } catch (error) {
        throw new Error(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return <>
    {loading && <h1 className={classes.events} >Loading...</h1>}
    {!loading &&
      <div className={classes.events}>
        <h1>All Events</h1>
        <ul className={classes.list}>
          {events.map((event) => (
            <li key={event.id} className={classes.item}>
              <Link to={event.id}>
                <img src={event.image} alt={event.title} />
                <div className={classes.content}>
                  <h2>{event.title}</h2>
                  <time>{event.date}</time>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    }
  </>
}


