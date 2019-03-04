import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import MenuButton from './menuItems';
import Button from '@material-ui/core/Button';
import { NavLink } from 'react-router-dom';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit,
    textAlign: 'right',
    color: theme.palette.text.secondary
  },
  link: {
      padding: 5
  }
});

function MenuNav(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Grid container-fluid="true">
        <Grid item xs={12}>
          <Paper className={classes.paper}>
          {/* <MenuButton/> */}
          {/* <Button color="inherit">Login</Button>
            <Button color="inherit">Login</Button>
            <Button color="inherit">Login</Button>
          <Link to='/events' color="secondary" variant="body1">link</Link> */}
          <NavLink to="/events" className={classes.link}>Events</NavLink>
          <NavLink to="/booking" className={classes.link}>Booking</NavLink>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

MenuNav.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuNav);
