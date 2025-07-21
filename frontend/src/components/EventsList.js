import { Link } from 'react-router-dom';
import classes from './EventsList.module.css';

function EventsList({ events }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const isEventPast = (dateString) => {
    return new Date(dateString) < new Date();
  };

  return (
    <section className={classes.eventsSection}>
      <div className={classes.header}>
        <h1 className={classes.title}>Discover Amazing Events</h1>
        <p className={classes.subtitle}>
          Join thousands of others in unforgettable experiences
        </p>
      </div>
      
      <div className={classes.eventsGrid}>
        {events.length === 0 ? (
          <div className={classes.emptyState}>
            <span className={classes.emptyIcon}>🎪</span>
            <h3>No Events Yet</h3>
            <p>Be the first to create an amazing event!</p>
          </div>
        ) : (
          events.map((event) => (
            <article key={event.id} className={classes.eventCard}>
              <Link to={`/events/${event.id}`} className={classes.cardLink}>
                <div className={classes.imageContainer}>
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className={classes.eventImage}
                  />
                  <div className={classes.imageOverlay}>
                    <span className={classes.viewMore}>View Details</span>
                  </div>
                  {isEventPast(event.date) && (
                    <div className={classes.pastEventBadge}>Past Event</div>
                  )}
                </div>
                
                <div className={classes.cardContent}>
                  <div className={classes.dateContainer}>
                    <time className={classes.eventDate}>
                      📅 {formatDate(event.date)}
                    </time>
                  </div>
                  
                  <h2 className={classes.eventTitle}>{event.title}</h2>
                  
                  <p className={classes.eventDescription}>
                    {event.description.length > 120
                      ? `${event.description.substring(0, 120)}...`
                      : event.description}
                  </p>
                  
                  <div className={classes.cardFooter}>
                    <span className={classes.readMore}>
                      Read More →
                    </span>
                  </div>
                </div>
              </Link>
            </article>
          ))
        )}
      </div>
    </section>
  );
}

export default EventsList;
