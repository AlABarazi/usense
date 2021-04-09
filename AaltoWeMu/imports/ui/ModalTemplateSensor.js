import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  withMobileDialog,
} from 'material-ui/Dialog';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import {withStyles} from 'material-ui/styles';
import {createContainer} from 'meteor/react-meteor-data';
import {Session} from 'meteor/session';
const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    container:{
      marginTop:5,
    }
});
class ResponsiveDialog extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    // console.log("userdata.update.environment",this.props.roomname,this.props.category,parseFloat(this.props.userinput),
    // Session.get("RoomsThermalVotes").find((doc)=>{
    //   return doc.room === this.props.roomname})
    //  );
    this.props.meteorCall("userdata.update.environment",this.props.roomname,this.props.category,parseFloat(this.props.userinput),this.props.currentValue);
    this.props.HideModal();


    // this.setState({ open: false });
  };

  render() {
    const { fullScreen } = this.props;
    const {classes} = this.props;
    return (
      <div className={classes.root}        >
        <Dialog
          fullScreen={fullScreen}
          open={!!this.props.showmodal}
          onClose={this.props.HideModal}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle disableTypography id="responsive-dialog-title"><Typography type="title" gutterBottom align="left">{this.props.title}</Typography></DialogTitle>
          <DialogContent>
            <DialogContentText>
            </DialogContentText>
              {this.props.children}
          </DialogContent>
          <DialogActions>
            <Button onClick={(e)=>{this.handleClose('dashboard')}}>

              Close
            </Button>
          </DialogActions>
          {/* <br/>
          <br/>
          <br/> */}
        </Dialog>
      </div>
    );
  }
}

ResponsiveDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
};
export default createContainer(params => {
  return {
    meteorCall: Meteor.call
    //then inside component onClick={()=>{props.meteorCall('notes.insert')}}
  };
},withMobileDialog()(withStyles(styles)(ResponsiveDialog)));
