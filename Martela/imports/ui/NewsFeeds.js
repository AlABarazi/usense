import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import List, {ListItem, ListItemSecondaryAction, ListItemText} from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import Avatar from 'material-ui/Avatar';
import Grid from 'material-ui/Grid';
import {Rooms} from '../api/rooms';
import {Tracker} from 'meteor/tracker';
import {withTracker} from 'meteor/react-meteor-data';
import {browserHistory} from 'react-router';
import {Session} from 'meteor/session';
import {Tags} from '../api/tags';
import {UserData} from '../api/userdata';
import PrivateHeader from './PrivateHeader';
import InfoBar from './InfoBar';
import FlatButtonMenu from './FlatButtonMenu';
import {selectavator} from './Avatars';
import IconButton from '@material-ui/core/IconButton';
import ArrowDownwardIcon from 'material-ui-icons/ArrowDownward';
import ArrowUpwardIcon from 'material-ui-icons/ArrowUpward';
const styles = theme => ({
  root: {
    width: '100%',
    //maxWidth: 360,
    background: theme.palette.background.paper
  }
});

class CheckboxListSecondary extends React.Component {
  state = {
    checked: [1]
  };
  handleChangePage = (event, icon, URL, pitch, yaw) => {
    if (icon == "true") {
      browserHistory.push(`${URL}/feedback/${pitch}/${yaw}`)
    } else {
      browserHistory.push(`${URL}`)
    }

    // browserHistory.go(`/dashboard/room/${roomname}`);
  }
  handleToggle = value => () => {};
  componentWillReceiveProps(nextProps) {
    //this.setState({checked:nextProps.selectedrooms}); in this case alone if you referesh then you will get error of undefiend
    // nextProps.selectedrooms && this.setState({checked:nextProps.selectedrooms})
  }
  componentDidMount() {

    // this.props.selectedrooms && this.setState({checked:this.props.selectedrooms})
  } //if you are using session down in checked  then you don't need this
  render() {
    const {classes} = this.props;

    return (<div className={classes.root}>

      <Grid container="container">
        <Grid item="item" xs={12}>
          <List>
            {
              this.props.listExists && this.props.tagslist.map(doc => (<ListItem onClick={(e) => {
                  this.handleChangePage(e, doc.icon, doc.URL, doc.pitch, doc.yaw)
                }} key={doc._id} dense="dense" button="button" className={classes.listItem}>
                <Avatar alt="Remy Sharp" src={this.props.userdatalist_exist && this.props.userdatalist.find((userdoc) => {
                    console.log(userdoc.userId, doc.userId);
                    return userdoc.userId === doc.userId
                  }).avatar}/>
                <ListItemText primary={`${doc.text}`}/>
                <ListItemSecondaryAction>
                  <IconButton aria-label="Comments">

                    <ArrowUpwardIcon color="primary"/>
                  </IconButton>

                  <IconButton aria-label="Comments">

                    <ArrowDownwardIcon color="error"/>
                  </IconButton>
                  <IconButton aria-label="Comments">
                    <Avatar>0</Avatar>

                  </IconButton>
                </ListItemSecondaryAction>

              </ListItem>))
            }
          </List>
        </Grid>
      </Grid>
      <br/>
      <br/>
    </div>);
  }
}

CheckboxListSecondary.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withTracker(props => {

  const tags = Meteor.subscribe('alltags');
  const userdatasub = Meteor.subscribe('userdata');
  const userdatasub_notready = !userdatasub.ready();
  const userdatalist = UserData.find().fetch();
  const userdatalist_exist = !userdatasub_notready && !!userdatalist;
  const loading = !tags.ready();
  const tagslist = Tags.find({
    status: "unresolved"
  }, {
    limit: 5,
    sort: {
      updatedAt: -1
    }
  }).fetch();
  const listExists = !loading && !!tagslist;

  return {meteorCall: Meteor.call, tagslist, listExists, userdatalist, userdatalist_exist};
})(withStyles(styles)(CheckboxListSecondary));
