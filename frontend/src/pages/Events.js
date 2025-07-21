import { Suspense } from 'react';
import { useLoaderData, json, defer, Await } from 'react-router-dom';

import EventsList from '../components/EventsList';
import LoadingIcon from '../util/LoadingIcon';
function EventsPage() {
  const { events } = useLoaderData();

  return (
    <Suspense fallback={<LoadingIcon/>}>
      <Await resolve={events}>
        {(loadedEvents) => <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>
  );
}

export default EventsPage;

async function loadEvents() {
  //await new Promise((resolve) => setTimeout(resolve, 2000)); // 2 second delay
  const response = await fetch('http://localhost:8080/events');
  
  if (!response.ok) {
    // return { isError: true, message: 'Could not fetch events.' };
    // throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {
    //   status: 500,
    // });
    throw json(
      { message: 'Could not fetch events.' },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData.events;
  }
}

export async function loader() {
  return defer({
    events: loadEvents(), // This returns a promise, not the resolved data
  });
}
