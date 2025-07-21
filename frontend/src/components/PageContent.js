import classes from './PageContent.module.css';

function PageContent({ title, children, subtitle }) {
  return (
    <div className={classes.content}>
      <div className={classes.hero}>
        <h1 className={classes.title}>{title}</h1>
        {subtitle && <p className={classes.subtitle}>{subtitle}</p>}
      </div>
      <div className={classes.children}>
        {children}
      </div>
    </div>
  );
}

export default PageContent;
