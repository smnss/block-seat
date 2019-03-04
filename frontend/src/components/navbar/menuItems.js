import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

const styles = {
  root: {
    width: 200,
  },
};

class MenuButton extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <BottomNavigation
        value={value}
        onChange={this.handleChange}
        showLabels
        className={classes.root}
      >
        <BottomNavigationAction to="/events" label="Recents"/>
        <BottomNavigationAction label="Favorites"/>
        <BottomNavigationAction label="Nearby"/>
      </BottomNavigation>
    );
  }
}

MenuButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuButton);
