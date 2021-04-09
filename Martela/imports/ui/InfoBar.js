import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import {Button} from 'material-ui';
import {FormLabel, FormControlLabel} from 'material-ui/Form';
import Radio, {RadioGroup} from 'material-ui/Radio';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import green from 'material-ui/colors/green';
import {Typography} from 'material-ui';
import yellow from 'material-ui';
import {browserHistory} from 'react-router';
import {createContainer} from 'meteor/react-meteor-data';
//red pink purple deepPurple indigo blue lightBlue cyan teal green lightGreen lime yellow amber orange deepOrange brown grey blueGrey
//50 100 ->900 A100 A200 A400 A700
const styles = theme => ({
  root: {
    flexGrow: 1
    // marginBottom: 8
  },
  button: {
    width: "100%",
    padding: 5,
    background: green['A100'],
    height: "100%",
    fontSize:"0.7rem"
  }
});

class GuttersGrid extends React.Component {
  state = {
    spacing: '0'
  };

  handleChange = key => (event, value) => {
    this.setState({[key]: value});
  };
  handleChangeBodyState = (event, routename) => {
    this.props.Session.set('newNews', false);
    browserHistory.replace(`/${routename}`);
  }
  render() {
    const {classes} = this.props;
    const {spacing} = this.state;

    return (
      <div className={classes.root}>
      {
      this.props.Session.get('newNews') && (
        <Grid container>

          <Grid className="blink_me" item xs={12}>
            <Button className={classes.button} onClick={(e) => {
                this.handleChangeBodyState(e, "happenings")
              }}>

              <Typography type="caption" align="center">There is fresh news, Check what is happening! 😁
              </Typography>
            </Button>
          </Grid>

        </Grid>
      )
    }
</div>
  );
  }
}

GuttersGrid.propTypes = {
  classes: PropTypes.object.isRequired
};

export default createContainer(params => {

  return {Session};
}, withStyles(styles)(GuttersGrid))
