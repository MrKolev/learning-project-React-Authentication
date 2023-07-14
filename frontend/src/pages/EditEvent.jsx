import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { EventForm } from "../components/EventForm";

export const EditEventPage = () => {
    const { id } = useParams();
    const [event, setEvent] = useState([]);
    const [loading, setLoading] = useState(true);


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

    return <>
        {loading && <h1>Loading...</h1>}
        {!loading && <EventForm event={event} />}
    </>
}