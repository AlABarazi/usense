
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import Avatar from 'material-ui/Avatar';
import Grid from 'material-ui/Grid';
import {Rooms} from '../api/rooms';
import {Tracker} from 'meteor/tracker';
import {createContainer} from 'meteor/react-meteor-data';
import {browserHistory} from 'react-router';
import {Session} from 'meteor/session';
import {UserData} from '../api/userdata';
import PrivateHeader from './PrivateHeader';
import InfoBar from './InfoBar';
import FlatButtonMenu from './FlatButtonMenu';
const styles = theme => ({
  root: {
    width: '100%',
    //maxWidth: 360,
    background: theme.palette.background.paper,
  },
});

class CheckboxListSecondary extends React.Component {
  state = {
    checked: [1],
  };
handleChangePage = (event,roomname) => {
  browserHistory.replace(`/room/${roomname}`)
// browserHistory.go(`/dashboard/room/${roomname}`);
}
  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    //const currentIndex = this.props.selectedlectures.indexOf(value);
    if (currentIndex === -1) {
      newChecked.push(value);
      this.props.call('userdata.update.room',value);
      // Session.set('selectedLectures',newChecked)
    } else {
    this.props.call('userdata.remove.room',value);
    newChecked.splice(currentIndex, 1);
    // Session.set('selectedLectures',newChecked)
    }
    this.setState({
      checked: newChecked,
    });

  };
componentWillReceiveProps(nextProps) {
    //this.setState({checked:nextProps.selectedrooms}); in this case alone if you referesh then you will get error of undefiend
    nextProps.selectedrooms && this.setState({checked:nextProps.selectedrooms})
}
componentDidMount() {

  this.props.selectedrooms && this.setState({checked:this.props.selectedrooms})
}//if you are using session down in checked  then you don't need this
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        {Session.get('currentPagePrivacy')==="auth" && <PrivateHeader/>}
        {Session.get('currentPagePrivacy')==="auth" && <InfoBar/>}
        {Session.get('currentPagePrivacy')==="auth" && <FlatButtonMenu/>}
        <Grid container>
          <Grid item xs={12}>
            <List>
              {this.props.rooms.map(doc => (

                <ListItem onClick={(e)=>this.handleChangePage(e,doc.roomname)} key={doc._id} dense button className={classes.listItem}>
                  {/* <Avatar alt="Remy Sharp" src="beny.jpg" /> */}
                  <ListItemText primary={`${doc.roomname}`} />

                  <ListItemSecondaryAction>
                    <Checkbox
                      onChange={this.handleToggle(doc.roomname)}
                      // checked={this.props.Session.get('selectedRooms').indexOf(doc.roomname) !== -1}
                      checked={this.state.checked.indexOf(doc.roomname) !== -1}

                    />
                  </ListItemSecondaryAction>
                </ListItem>
              )

            )}
            </List>
            </Grid>
          </Grid>
      </div>
    );
  }
}

CheckboxListSecondary.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default createContainer(params => {
  Meteor.subscribe('allrooms');
  // Meteor.subscribe('userdata');
  return {
    rooms: Rooms.find({}).fetch(),
    Session,
    call:Meteor.call,
    selectedrooms:UserData.findOne({userId:Meteor.userId()}) && [1,...UserData.findOne({userId:Meteor.userId()}, {
                      sort: {
                        updatedAt: -1
                      }
                    }).rooms.map((item, elem)=> {

                      if(item.selectedAndShown){
                        return item.roomName
                      }
                    }).filter((item)=>{return item})],
  };
},withStyles(styles)(CheckboxListSecondary))
