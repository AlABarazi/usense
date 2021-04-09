//import injectTapEventPlugin from 'react-tap-event-plugin';
//injectTapEventPlugin();
import React from 'react';

import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import {FormControl, FormLabel, FormControlLabel} from 'material-ui/Form';
import Radio, {RadioGroup} from 'material-ui/Radio';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import List, {ListItem, ListItemAvatar, ListItemIcon, ListItemSecondaryAction, ListItemText} from 'material-ui/List';

const styles = theme => ({
  root: {
    flexGrow: 1,
    paddingTop:16
  },
  back: {
    position: "relative",
    top: 0,
    left: 0,
    width:"100%",
    height:"72px",
    zIndex:1
  },
  front: {
    position: "absolute",

    width:"72px",
    height:"72px",
    zIndex:2
  },
  right:{
    position: "absolute",
    right: 0,
    width:"72px",
    height:"72px",
    zIndex:1
  }
});

class Raindeer extends React.Component {
  state = {
    win: true,
    leftpercentage:"86%"
  };

  // handleChangeBodyState = (param) => {
  //   this.setState(() => ({body: param}));
  // }

// componentWillReceiveProps(nextProps) {
//   if(this.props.points !=nextProps.points){
//     nextProps.points>=100?this.setState((leftpercentage)=>{"86%"}):this.setState((leftpercentage)=>{`${nextProps.points*86/100}%`})
//   }
// }
// componentDidMount() {
//   this.props
// }
  render() {
    const {classes} = this.props;
    return (
      <Grid container className={classes.root} >
        {
      this.props.points>=0 &&    this.props.points >= this.props.hundredpoints
            ? <Grid xs={12} item>
              <img  src="points_head.png" className = {
                classes.right}  alt=""/>
                <img src="points_diamond.png" alt=""  className = {
              classes.back
            }/>

              </Grid>
            : <Grid xs={12} item>
              <img  src="points_head.png" style={{    left: `${this.props.points*100/this.props.hundredpoints*86/100}%`}} className = {
                classes.front}  alt=""/>
                <img src="points_diamond.png" alt=""  className = {
              classes.back
            }/>
            <img src="diamond.png" alt=""  className = {
          classes.right
        }/>

              </Grid>
        }

    </Grid>)
  }
}

Raindeer.propTypes = {
  classes: PropTypes.object.isRequired,
  points: PropTypes.number.isRequired,


};
Raindeer.defaultProps = {
  points:0,
  hundredpoints:17
};
export default withStyles(styles)(Raindeer); // export default () => {
