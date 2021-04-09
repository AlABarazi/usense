import React from 'react';
import Button from 'material-ui/Button';
import Menu, {MenuItem} from 'material-ui/Menu';
import {withStyles} from 'material-ui/styles';
import AddIcon from 'material-ui-icons/Add';
import PropTypes from 'prop-types';
import {browserHistory} from 'react-router';
import { withTracker } from 'meteor/react-meteor-data';
import {Session} from 'meteor/session'
const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    position: "fixed",
    bottom: 0,
    right: 10,
    margin: 3,
    opacity: 0.8,
    zIndex: 2,
    // bottom: 0,
    // right: 0,
    // position: 'absolute',
    // bottom: 0,
    //
    // opacity: 0.8
  }
});

class SimpleMenu extends React.Component {
  state = {
    anchorEl: null,
    open: false,
    flatbuttonmenu: [
      {
        text: 'Select Room',
        route: 'qr',
        selected: false
      }, {
        text: 'Feedback',
        route: `feedback`,
        selected: false
      }
    ]
  }
  handleClick = event => {

    console.log(this.props.Session.get('selectedRooms'));
    // browserHistory.replace(`/${option.route}`);
    if(this.props.Session.get('selectedRooms').length>1){
      this.setState({anchorEl: event.currentTarget, open: true});
    }
    else{
      browserHistory.replace("/qr");
    }

  };
  handleClose = () => {
    this.setState({open: false});
  };
  handleMenuClick = (event, option) => {
    console.log(option);
    option.route=="qr"?browserHistory.push(`/${option.route}`):browserHistory.push(`/room/${this.props.Session.get('selectedRooms').pop()}/${option.route}`)

  }
render() {
  const {classes} = this.props;
  return (<div>
    <span>
      <Button fab="fab" color="accent" aria-label="add" aria-owns={this.state.open
          ? 'simple-menu'
          : null} aria-haspopup="true" onClick={this.handleClick} className={classes.button}>
        <AddIcon/>
      </Button>
    </span>
    <Menu id="simple-menu" anchorEl={this.state.anchorEl} open={this.state.open} onClose={this.handleClose}>
      {

        this.state.flatbuttonmenu.map((option, index) => (<MenuItem selected={option.selected} key={index} onClick={(e) => {
            this.setState({open: false});
            // console.log(option,option.route,this.state.selected);
            this.handleMenuClick(e, option);

          }}>{option.text}</MenuItem>))
      }
    </Menu>
  </div>);
}
}



export default withTracker(props => {


return {
  Session
};
})(withStyles(styles)(SimpleMenu));
