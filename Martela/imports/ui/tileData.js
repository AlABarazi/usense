import React from 'react';
import CardsContainer from './CardsContainer'
import PrivateHeader from './PrivateHeader';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import {FormControl, FormLabel, FormControlLabel} from 'material-ui/Form';
import Radio, {RadioGroup} from 'material-ui/Radio';
import Paper from 'material-ui/Paper';
import VoteCard from './VoteCard';
import InfoBar from './InfoBar'
import FlatButton from './FlatButton'
import Avatar from 'material-ui/Avatar';
import List, {ListItem, ListItemAvatar, ListItemIcon, ListItemSecondaryAction, ListItemText} from 'material-ui/List';
import Drawer from 'material-ui/Drawer';
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';
import MoodIcon from 'material-ui-icons/Mood';
import AirlineSeatReclineNormalIcon from 'material-ui-icons/AirlineSeatReclineNormal';
import HomeIcon from 'material-ui-icons/Home';
import SettingsIcon from 'material-ui-icons/Settings';

const sideList = (<div style={{
    width: 250
  }}>
  <List>{
    <a href="/dashboard" style={{textDecoration: "none",color: '#FFFFFF'}}>

      <ListItem button>
          <ListItemAvatar>
            <Avatar>
              <HomeIcon/>
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Home"/>
        </ListItem>
      </a>
    }</List>

  <List>{
          <a href="/rooms" style={{textDecoration: "none",color: '#FFFFFF'}}>
      <ListItem button>
          <ListItemAvatar>
            <Avatar>
              <AirlineSeatReclineNormalIcon/>
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Rooms"/>
        </ListItem>
        </a>
    }</List>
    <Divider/>
    <List>{
      <a href="/Settings" style={{textDecoration: "none",color: '#FFFFFF'}}>
      <ListItem button>
          <ListItemAvatar>
            <Avatar>
              <SettingsIcon/>
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Settings"/>
        </ListItem>
    </a>

      }</List>
</div>);

export {sideList};
