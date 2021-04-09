import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import List, {ListItem, ListItemAvatar, ListItemIcon, ListItemSecondaryAction, ListItemText} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import {FormGroup, FormControlLabel} from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import MoodIcon from 'material-ui-icons/Mood';
import FavoriteBorderIcon from 'material-ui-icons/FavoriteBorder';
import DeleteForeverIcon from 'material-ui-icons/DeleteForever';
import MoodBadIcon from 'material-ui-icons/MoodBad';
import yellow from 'material-ui/colors/yellow';
import green from 'material-ui/colors/green';
import grey from 'material-ui/colors/grey';
import red from 'material-ui/colors/red';
import {LinearProgress} from 'material-ui/Progress';
import {createContainer} from 'meteor/react-meteor-data';
import {browserHistory} from 'react-router';
//red pink purple deepPurple indigo blue lightBlue cyan teal green lightGreen lime yellow amber orange deepOrange brown grey blueGrey
//50 100 ->900 A100 A200 A400 A700
const styles = theme => ({
  root: {
    marginTop: 8
  },
  title: {
    margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`
  }
});

class InteractiveList extends React.Component {
  state = {
    secondary: false,
    answered: false,
    sad: false,
    happy: false
  };
  componentDidMount() {
    //this.timer = setInterval(this.progress, 500);
    this.props.rate === "happy"
      ? this.setState({happy: true})
      : this.props.rate === "sad" ? this.setState({sad: true}): this.setState({happy: false,sad:false})
  }
  componentDidUpdate(prevProps, prevState) {
    if(prevState.sad != this.state.sad){
      this.state['sad']
        && this.props.meteorCall('userdata.update.vote', this.props.category, this.props.item, "sad")
        if(this.state.sad===false && this.state.happy===false ){
this.props.meteorCall('userdata.update.vote', this.props.category, this.props.item, "notRated")
        }
    }
    if(prevState.happy != this.state.happy){
      this.state['happy']
        && this.props.meteorCall('userdata.update.vote', this.props.category, this.props.item, "happy")
        if(this.state.sad===false && this.state.happy===false ){
          this.props.meteorCall('userdata.update.vote', this.props.category, this.props.item, "notRated")

        }
    }


  }
  handleChangeHappy = () => {
      this.props.meteorCall('userdata.addpoint');
    if (this.state.sad) {
      this.setState({['sad']: false});
    }
    this.setState({
      ['happy']: !this.state['happy']
    });
  }
  handleChangeSad = () => {
      this.props.meteorCall('userdata.addpoint');
    if (this.state.happy) {
      this.setState({['happy']: false});
    }
    this.setState({
      ['sad']: !this.state['sad']
    });
  }
  // handleChange = (key, value) => {
  //   this.setState({
  //     [key]: !value
  //   });
  // }
  handleVoteType = (classes) => {
    if (this.props.ratetype === "happysad") {
      return ([<div key={Math.floor(Math.random()* 100000000000)} >
        <IconButton  aria-label="Happy" onClick={this.handleChangeHappy} style={this.state.happy
            ? {
              background: yellow['A100']
            }
            : {}}>
          <MoodIcon/>
        </IconButton>
        <IconButton  aria-label="Sad" onClick={this.handleChangeSad} style={this.state.sad
            ? {
              background: yellow['A100']
            }
            : {}}>
          <MoodBadIcon/>
        </IconButton>
      </div>
        ])
    } else {
      return ([<div key={Math.floor(Math.random()* 100000000000)} >
        <IconButton  aria-label="Happy" onClick={this.handleChangeHappy} style={this.state.happy
            ? {
              background: red['A100']
            }
            : {}}>
          <FavoriteBorderIcon/>
        </IconButton>
        <IconButton  aria-label="Sad" onClick={this.handleChangeSad} style={this.state.sad
            ? {
              background: grey[700]
            }
            : {}}>
          <DeleteForeverIcon/>
        </IconButton>
      </div>
        ])
    }
  }
  render() {
    const {classes} = this.props;
    const {dense, secondary} = this.state;

    return (<ListItem  className={classes.root} button onClick={(e)=>{(this.props.category === "thermal" || this.props.category === "room")?
    browserHistory.replace('/myrooms'):browserHistory.replace('/mylectures')}}>
      {/* <ListItemAvatar>
                      <Avatar>
                        <MoodIcon />
                      </Avatar>
                    </ListItemAvatar> */
      }
      <ListItemText primary={this.props.title} secondary={secondary
          ? 'Secondary text'
          : null}/>

      <ListItemSecondaryAction>
        {/* {this.props.ratetype === 'like'?"yes":"no"} */}
        {this.handleVoteType(classes)}
      </ListItemSecondaryAction>
    </ListItem>);
  }
}

InteractiveList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default createContainer(params => {

  return {
    meteorCall: Meteor.call
    //then inside component onClick={()=>{props.meteorCall('notes.insert')}}
  };
},withStyles(styles)(InteractiveList))
