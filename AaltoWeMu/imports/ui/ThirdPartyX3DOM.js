

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
import {createContainer} from 'meteor/react-meteor-data';
const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  x3d:{
    display: "block",
    // marginLeft: "auto",
    // marginRight: "auto",
    width:"100%",

  }
});

class X3DOM extends React.Component {
  state = {
    currentSelection:"room_envrionment"
    // "subject, courses,thermal comfrot"
  };

  handleSomething = (param) => {
    console.log("this.refs",this.refs);
    this.refs.box1.setAttribute('diffuseColor', '1 0 0');
  }
  render() {
    const {classes} = this.props;
    return (
    <Grid container className={classes.root}             alignItems='stretch'>
      <Grid xs={12}  item>
        <x3d   is="x3d"    width={window.innerWidth} height={window.outerHeight}       >
          <scene is="x3d">
             <navigationInfo type='"walk" "any"' id="navType"></navigationInfo>
            <inline  url="building.x3d" />
                {/* <transform is="x3d" translation='-3 0 0'>
                <shape is="x3d" onClick={(e)=>{console.log("hi")}}>
                    <appearance is="x3d">
                    <material is="x3d" diffuseColor='0 1 0'></material>
                    </appearance>
                    <box is="x3d" onClick={(e)=>{console.log("hi")}}></box>
                </shape>
                </transform> */}
      </scene>
     </x3d>
       </Grid>
     </Grid>
    )}}

X3DOM.propTypes = {classes: PropTypes.object.isRequired};

export default createContainer(params => {
  return {
    Session,
  };
},withStyles(styles)(X3DOM))
