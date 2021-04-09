import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import FlatButtonMenu from './FlatButtonMenu'
const styles = theme => ({

  button: {
    bottom: 0,
    right: 0,
    position: 'absolute',
    bottom: 0,
    zIndex: 2,
    opacity: 0.8
  }
});

class FloatingActionButtons extends React.Component {
  state = {
  };

  render() {
    const {classes} = this.props;
    return (<span>
      <Button fab="fab" color="accent" aria-label="add" className={classes.button}>
        <AddIcon/>
      </Button>
      <FlatButtonMenu/>
    </span>);
  }
}

FloatingActionButtons.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FloatingActionButtons);
