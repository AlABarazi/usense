//import injectTapEventPlugin from 'react-tap-event-plugin';
//injectTapEventPlugin();
import React from 'react';

import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import {FormControl, FormLabel, FormControlLabel} from 'material-ui/Form';
import Radio, {RadioGroup} from 'material-ui/Radio';
import Button from '@material-ui/core/Button';
import Paper from 'material-ui/Paper';
import Badge from '@material-ui/core/Badge';
import List, {ListItem, ListItemAvatar, ListItemIcon, ListItemSecondaryAction, ListItemText} from 'material-ui/List';
import ChipInput from 'material-ui-chip-input';
import {withStyles} from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';
import {ProsCons} from '../api/proscons';
import { withTracker } from 'meteor/react-meteor-data';
import {Session} from 'meteor/session';

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding:theme.spacing.unit
  },
  gridpro: {
    // background: "red",
    borderBottomStyle: "solid",
    borderColor: "green",
    borderWidth: '0.3rem',

  },
  gridcon: {
    // background: "red",
    borderBottomStyle: "solid",
    borderColor: "red",
    borderWidth: '0.3rem',

  },
  chip: {
    marginBottom: theme.spacing.unit,
    marginLeft: theme.spacing.unit
  }
});

class ProsConsChips extends React.Component {
  state = {};

  handleDelete = doc => () => {
    console.log(doc);
    this.props.meteorCall('proscons.delete',this.props.Session.get('selectedRooms').slice(-1).pop(),doc.type,doc.content)
  }

  handleClick = (type,content) => {
    console.log(type,content);
    alert(type,content); // eslint-disable-line no-alert
  }

  handleChange = (type, chips) => {
    // this.setState(() => ({body: param}));
    for (var chip of chips) {
      this.props.meteorCall('proscons.insert',this.props.Session.get('selectedRooms').slice(-1).pop(),type,chip)
    }


  }
  render() {
    const {classes} = this.props;
    return (
      <Grid container className={classes.root} >
      <Grid xs={6} item="item">
        <ChipInput  hintText='klsjflksdj lkjlkdjsf' fullWidth dataSource={["alaa"]} newChipKeyCodes={[13, 188, 32]} openOnFocus="true"  floatingLabelText='klsdjflksjdf' onChange={(chips) => this.handleChange("pros",chips)}/>
      </Grid>
      <Grid xs={6} item="item">
        <ChipInput  hintText='klsjflksdj lkjlkdjsf' fullWidth dataSource={["alaa"]} newChipKeyCodes={[13, 188, 32]} openOnFocus="true"  floatingLabelText='klsdjflksjdf' onChange={(chips) => this.handleChange("cons",chips)}/>
      </Grid>

      <Grid xs={6} className={classes.gridpro} item>

   {
  this.props.listExists &&  this.props.prosconslist.map((doc, index) => {
    if(doc.type=="pros" && doc.room == this.props.Session.get('selectedRooms').slice(-1).pop()){
      return (
        <Badge key ={doc.content} className={classes.margin} badgeContent={doc.count} color="primary">
          <Chip avatar={<Avatar src = "/avatars/girl.svg" />} label={doc.content} onDelete={this.handleDelete(doc)} onClick={(type,content) => this.handleClick("pros",content)} className={classes.chip}/>
        </Badge>

  )
    }




  })
}


      </Grid>
      <Grid xs={6} className={classes.gridcon} item>
        {
       this.props.listExists &&  this.props.prosconslist.map((doc, index) => {
         if(doc.type=="cons" && doc.room == this.props.Session.get('selectedRooms').slice(-1).pop()){
           return (
             <Badge  key ={doc.content} className={classes.margin} badgeContent={doc.count} color="primary">
               <Chip avatar={<Avatar src = "/avatars/girl.svg" />} label={doc.content} onDelete={this.handleDelete(doc)} className={classes.chip}/>
             </Badge>

       )
         }




       })
     }

      </Grid>
    </Grid>)
  }
}

ProsConsChips.propTypes = {
  classes: PropTypes.object.isRequired
};



export default withTracker(props => {
const prosconssub = Meteor.subscribe('allproscons');
const loading = !prosconssub.ready();
const prosconslist =  ProsCons.find().fetch()
const listExists = !loading && !!prosconslist;

return {
  meteorCall: Meteor.call,
  prosconslist,
  listExists,
  Session
};
})(withStyles(styles)(ProsConsChips));
