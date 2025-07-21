import { Form, NavLink, useRouteLoaderData } from 'react-router-dom';

import classes from './MainNavigation.module.css';

function MainNavigation() {
  const token = useRouteLoaderData('root');

  return (
    <header className={classes.navbar}>
      <div className={classes.container}>
        <div className={classes.brand}>
          <h1 className={classes.logo}>EventHub</h1>
        </div>

        <nav className={classes.nav}>
          <div className={classes.navLinks}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${classes.navLink} ${isActive ? classes.active : ''}`
              }
              end
            >
              <span className={classes.icon}>🏠</span>
              Home
            </NavLink>

            <NavLink
              to="/events"
              className={({ isActive }) =>
                `${classes.navLink} ${isActive ? classes.active : ''}`
              }
            >
              <span className={classes.icon}>🎉</span>
              Events
            </NavLink>

            {!token && (
              <NavLink
                to="/auth?mode=login"
                className={({ isActive }) =>
                  `${classes.navLink} ${isActive ? classes.active : ''}`
                }
              >
                <span className={classes.icon}>🔐</span>
                Login
              </NavLink>
            )}

            {token && (
              <Form action="/logout" method="post" className={classes.logoutForm}>
                <button type="submit" className={classes.logoutBtn}>
                  <span className={classes.icon}>👋</span>
                  Logout
                </button>
              </Form>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}

export default MainNavigation;
