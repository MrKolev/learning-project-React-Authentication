import { useNavigate, useParams } from 'react-router-dom';

import classes from './EventForm.module.css';
import { useState } from 'react';

export function EventForm({ event }) {

  const [isSubmitted, setIsSubmitted] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  function cancelHandler() {
    const proceed = window.confirm('Are you sure you want to Cancel');
    if (proceed) {
      navigate("..")
    }
  }

  async function submitHandler(e) {
    e.preventDefault();
    setIsSubmitted(true);
    let url = `http://localhost:8080/events`
    let method = 'POST'
    const data = new FormData(e.target);

    const eventData = {
      title: data.get(`title`),
      image: data.get(`image`),
      date: data.get(`date`),
      description: data.get(`description`)
    }

    if (event) {
      url += `/${id}`;
      method = "PATCH";

    }

    try {
      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventData)
      });
      if (response.status === 422) {
        const data = await response.json()
        alert(data.message);
        throw new Error(response.message)
      }
      const data = await response.json()
      const eventId = data.event.id;

      navigate(`/events/${eventId}`);

    } catch (error) {
      throw new Error(error);
    }
  }

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <p>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          required
          defaultValue={event ? event.title : ''} />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input
          id="image"
          type="url"
          name="image"
          required
          defaultValue={event ? event.image : ''} />
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          name="date"
          required
          defaultValue={event ? event.date : ''} />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows="5"
          required
          defaultValue={event ? event.description : ''} />
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler} disabled={isSubmitted}>
          Cancel
        </button>
        <button type="submit" disabled={isSubmitted} >{isSubmitted ? 'Submitting...' : 'Save'}</button>
      </div>
    </form>
  );
}


