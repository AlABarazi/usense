import React from 'react';
import PrivateHeader from './PrivateHeader';
import InfoBar from './InfoBar';
import FlatButtonMenu from './FlatButtonMenu';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import {FormControl, FormLabel, FormControlLabel} from 'material-ui/Form';
import Radio, {RadioGroup} from 'material-ui/Radio';
import Paper from 'material-ui/Paper';
import VoteCard from './VoteCard';
import Avatar from 'material-ui/Avatar';
import List, {ListItem, ListItemAvatar, ListItemIcon, ListItemSecondaryAction, ListItemText} from 'material-ui/List';
import {Contents} from '../api/contents';
import {UserData} from '../api/userdata';
import { withTracker } from 'meteor/react-meteor-data';
// import ThirdPartySimpleChat from './ThirdPartySimpleChat';
const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: 5,
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  demo: {
    marginTop: 5,
    // background: theme.palette.background.paper,
    background: theme.palette.primary[50],
    //background: theme.palette.primary["A100"],
    //  background:"#E1F5FE",
  },
  image: {
    width: "75%",
    height: "75%",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto"
  }
});

class AutoGrid extends React.Component {
  state = {
    left: false,
    showmodal: false
  };
  HideModal = () => {

    this.setState(() => ({showmodal: false}));
    this.props.meteorCall('userdata.scene.off');
  }
  ShowModal = () => {
    this.setState(() => ({showmodal: true}));
  }

  componentDidUpdate(prevProps, prevState) {
    this.props.userdata && (this.props.userdata.show != this.state.showmodal) && this.setState(() => ({showmodal: this.props.userdata.show}));
  }
  render() {
    const {classes} = this.props;

    return (<div className={classes.root} onClick={this.state.left
        ? this.toggleDrawer('left', false)
        : undefined}>
      {Session.get('currentPagePrivacy') === "auth" && <PrivateHeader/>}
      {Session.get('currentPagePrivacy') === "auth" && <InfoBar/>}
      {Session.get('currentPagePrivacy') === "auth" && <FlatButtonMenu/>}
      <Grid container="container">

        {/* <Grid key={10} item xs={12}>
        <Paper className={classes.paper}>xs</Paper>
      </Grid> */
        }

        <Grid container="container">
          <Grid item="item" xs={12}>
            <List>
              {
                this.props.listExists && this.props.userdata.map(doc => (<ListItem
                   key={doc._id} dense="dense" button="button" className={classes.listItem}>
                  <Avatar alt="Remy Sharp" src={doc.avatar}/>
                  <ListItemText primary={`${doc.points}`}/>
                </ListItem>))
              }
            </List>
          </Grid>
        </Grid>

      </Grid>
      {/* <ThirdPartySimpleChat/> */}

    </div>);
  }
}

AutoGrid.propTypes = {
  classes: PropTypes.object.isRequired
};


export default withTracker(props => {
const userdatasub = Meteor.subscribe('userdata');
const loading = !userdatasub.ready();
const userdata =  UserData.find({},{limit : 5,sort: {points: -1}}).fetch();
const listExists = !loading && !!userdata;

return {
  meteorCall: Meteor.call,
  userdata,
  listExists,
};
})(withStyles(styles)(AutoGrid));

// export default () => {
//   return (
//     <div>
//       <PrivateHeader title="Dashboard"/>
//       <div className="page-content">
//         Dashboard page content.
//       </div>
//     </div>
//   );
// };
