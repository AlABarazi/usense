import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import AccountCircle from 'material-ui-icons/AccountCircle';
import Switch from 'material-ui/Switch';
import { FormControlLabel, FormGroup } from 'material-ui/Form';
import Menu, { MenuItem } from 'material-ui/Menu';
import { Accounts } from 'meteor/accounts-base';
import {sideList} from './tileData';
import List, {ListItem, ListItemAvatar, ListItemIcon, ListItemSecondaryAction, ListItemText} from 'material-ui/List';
import Drawer from 'material-ui/Drawer';
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';
import MoodIcon from 'material-ui-icons/Mood';
import CardsContainer from './CardsContainer'
import PrivateHeader from './PrivateHeader';
import Grid from 'material-ui/Grid';
import Radio, {RadioGroup} from 'material-ui/Radio';
import Paper from 'material-ui/Paper';
import VoteCard from './VoteCard';
import InfoBar from './InfoBar';
import Avatar from 'material-ui/Avatar';
import AirlineSeatReclineNormalIcon from 'material-ui-icons/AirlineSeatReclineNormal';
import HomeIcon from 'material-ui-icons/Home';
import RowingIcon from 'material-ui-icons/Rowing';
import SettingsIcon from 'material-ui-icons/Settings';
import LocalMoviesIcon from 'material-ui-icons/LocalMovies';
import InfoOutlineIcon from 'material-ui-icons/InfoOutline';
import {browserHistory} from 'react-router';
const styles = {
  root: {
    width: '100%',
    marginBottom:8
  },
  flex: {
    flex: 1,
    cursor:"pointer"
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class MenuAppBar extends React.Component {
  state = {
    auth: true,
    anchorEl: null,
    left: false
  };
  toggleDrawer = (side, open) => () => {
      this.setState({[side]: open});
    };
  handleChange = (event, checked) => {
    this.setState({ auth: checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleLogout = () => {
    this.setState({ auth: false });
    Accounts.logout();

  };
handleChangeBodyState = (event,routename)=>{

browserHistory.replace(`/${routename}`)
}
  render() {
    const { classes } = this.props;//for stateless component const {classes} = props;
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className={classes.root}>
        {/* <FormGroup>
          <FormControlLabel
            control={
              <Switch checked={auth} onChange={this.handleChange} aria-label="LoginSwitch" />
            }
            label={auth ? 'Logout' : 'Login'}
          />
        </FormGroup> */}
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="contrast" aria-label="Menu"
              aria-owns={open ? 'menu-appbar' : null}
              aria-haspopup="true"
              onClick={this.toggleDrawer('left',true)}
              color="contrast" >
              <MenuIcon />
            </IconButton>
            <Typography onClick={(e)=>{this.handleChangeBodyState(e,'dashboard')}} type="title" color="inherit" className={classes.flex}>
              Dashboard
            </Typography>
            {auth && (
              <div>
                <IconButton
                  aria-owns={open ? 'left-menu-appbar' : null}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="contrast"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                  {/* <MenuItem onClick={this.handleRequestClose}>Profile</MenuItem>
                  <MenuItem onClick={this.handleRequestClose}>My account</MenuItem> */}
                  <MenuItem onClick={this.handleLogout}>{auth ? 'Logout' : 'Login'}</MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
        <div>
          <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
            <div
              tabIndex={0}
              role="button"
              onClick={this.toggleDrawer('left', false)}
              onKeyDown={this.toggleDrawer('left', false)}
            >
              <div style={{
                  width: 250
                }}>
                <List>
                  {/* <a href="/dashboard" style={{textDecoration: "none",color: '#FFFFFF'}}> */}
                    <ListItem button onClick={(e)=>{this.handleChangeBodyState(e,'dashboard')}}>
                        <ListItemAvatar>
                          <Avatar>
                            <HomeIcon/>
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Home"/>
                      </ListItem>
                    {/* </a> */}
                  </List>

                <List>
                        <ListItem button onClick={(e)=>{this.handleChangeBodyState(e,'myrooms')}}>
                        <ListItemAvatar>
                          <Avatar>
                            <AirlineSeatReclineNormalIcon/>
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="My Rooms"/>
                      </ListItem>

                  </List>
                  <List>
                          <ListItem button onClick={(e)=>{this.handleChangeBodyState(e,'mylectures')}}>
                          <ListItemAvatar>
                            <Avatar>
                              <LocalMoviesIcon/>
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText primary="My Courses"/>
                        </ListItem>

                    </List>
                    <List>
                            <ListItem button onClick={(e)=>{this.handleChangeBodyState(e,'happenings')}}>
                            <ListItemAvatar>
                              <Avatar>
                                <RowingIcon/>
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Happenings"/>
                          </ListItem>

                      </List>
                  <Divider/>
                  <List>


                    {/* <ListItem button onClick={(e)=>{this.handleChangeBodyState(e,'settings')}}>
                        <ListItemAvatar>
                          <Avatar>
                            <SettingsIcon/>
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Settings"/>
                      </ListItem> */}
                      {/* <ListItem button onClick={(e)=>{this.handleChangeBodyState(e,'info')}}>
                          <ListItemAvatar>
                            <Avatar>
                              <InfoOutlineIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText primary="Info"/>
                        </ListItem> */}

                    </List>
              </div>
            </div>
          </Drawer>
        </div>
      </div>
    );
  }
}

MenuAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuAppBar);



// import React from 'react';
// import { Accounts } from 'meteor/accounts-base';
// import
// const PrivateHeader = (props) => {
//   return (
//     <div className="header">
//       <div className="header__content">
//         <h1 className="header__title">{props.title}</h1>
//         <button className="button button--link-text" onClick={() => Accounts.logout()}>Logout</button>
//       </div>
//     </div>
//   );
// };
//
// PrivateHeader.propTypes = {
//   title: React.PropTypes.string.isRequired
// };
//
// export default PrivateHeader;
