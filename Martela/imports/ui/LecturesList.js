
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import Avatar from 'material-ui/Avatar';
import Grid from 'material-ui/Grid';
import {Lectures} from '../api/lectures';
import {Tracker} from 'meteor/tracker';
import {createContainer} from 'meteor/react-meteor-data';
import {browserHistory} from 'react-router';
import {Session} from 'meteor/session';
import {UserData} from '../api/userdata';


import PrivateHeader from './PrivateHeader';
import InfoBar from './InfoBar';
import FlatButtonMenu from './FlatButtonMenu';
//Meteor.call('userdata.insert');//such call should be always on server why?
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
  handleChangePage = (event,lecturename) => {
  browserHistory.replace(`/lecture/${lecturename}`)

// browserHistory.replace("/dflkdjf")
  }
  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    //const currentIndex = this.props.selectedlectures.indexOf(value);
    if (currentIndex === -1) {
      newChecked.push(value);
      this.props.call('userdata.update.lecture',value);
      // Session.set('selectedLectures',newChecked)
    } else {
    this.props.call('userdata.remove.lecture',value);
    newChecked.splice(currentIndex, 1);
    // Session.set('selectedLectures',newChecked)
    }
    this.setState({
      checked: newChecked,
    });
  };

componentWillReceiveProps(nextProps) {

  nextProps.selectedlectures && this.setState({checked:nextProps.selectedlectures})

}

componentDidMount() {

  this.props.selectedlectures && this.setState({checked:this.props.selectedlectures})
}
componentDidUpdate(prevProps, prevState) {

}
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
              {this.props.alllectures && this.props.alllectures.map(doc => (

                <ListItem  onClick={(e)=>this.handleChangePage(e,doc.lecturename)} key={doc._id} dense button className={classes.listItem}>
                  {/* <Avatar alt="Remy Sharp" src="beny.jpg" /> */}
                  <ListItemText primary={`${doc.lecturename}`} />

                  <ListItemSecondaryAction>
                    <Checkbox
                      onChange={this.handleToggle(doc.lecturename)}
                       checked={this.state.checked.indexOf(doc.lecturename) !== -1}

                    />
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
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
  Meteor.subscribe('alllectures');
  //because here it say if there is not record for user in collection insert one. When executing this at f

  return {
    alllectures: Lectures.find({}).fetch(),
    Session,
    call:Meteor.call,
    //userdataarray:UserData.findOne({userId:Meteor.userId()}),
    //userselectedlectures:UserData.find({userId:Meteor.userId()})
    selectedlectures:UserData.findOne({userId:Meteor.userId()}) && [1,...UserData.findOne({userId:Meteor.userId()}, {
                      sort: {
                        updatedAt: -1
                      }
                    }).lectures.map((item, elem)=> {

                      if(item.selectedAndShown){
                        return item.lectureName
                      }
                    }).filter((item)=>{return item})],
                    //filter to remove the undefined items



  };
},withStyles(styles)(CheckboxListSecondary))





// Tracker.autorun(() => {
//   let userselection = UserData.findOne({userId:Meteor.userId()}) && [1,...UserData.findOne({userId:Meteor.userId()}, {
//                     sort: {
//                       updatedAt: -1
//                     }
//                   }).lectures.map((item, elem)=> {
//
//                     if(item.selectedAndShown){
//                       return item.lectureName
//                     }
//                   }).filter((item)=>{return item})]
//   Session.set('selectedLectures', userselection || []);
//
// });
