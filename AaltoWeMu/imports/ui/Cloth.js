//import injectTapEventPlugin from 'react-tap-event-plugin';
//injectTapEventPlugin();
import React from 'react';
import CardsContainer from './CardsContainer'
import PrivateHeader from './PrivateHeader';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import {FormControl, FormLabel, FormControlLabel} from 'material-ui/Form';
import Radio, {RadioGroup} from 'material-ui/Radio';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import List, {ListItem, ListItemAvatar, ListItemIcon, ListItemSecondaryAction, ListItemText} from 'material-ui/List';
// import {createContainer} from 'meteor/react-meteor-data';
import {UserData} from '../api/userdata';
import { withTracker } from 'meteor/react-meteor-data';
const styles = theme => ({
  root: {
    flexGrow: 1,
    background:theme.palette.primary[50]
  },
  choices:{
    background:theme.palette.primary[100],
    // padding:2,
    margin:1,
  },
  button:{
    width:"100%",
    height: "100%",
    textTransform: 'none'
    // padding: 10,
  },
  wraptex:{
    wordWrap: "break-all",
    // maxWidth:"20rem",
    marginLeft:"1rem",
    width:"100%"

  },
  highlight:{
    background: "rgba(192,192,192,0.7)",
    width:"100%",
    height: "100%",
    textTransform: 'none'
  }
});

class Cloth extends React.Component {
  state = {
  };

  handleChangeBodyState = (param) => {
    this.setState(() => ({body: param}));
  }
  // whatever=()=>{
  //   console.log("this.props.clothselection[0]",this.props.clothselection && this.props.clothselection[0]);
  // }
  render() {
    const {classes} = this.props;
    return (

    <Grid container className={classes.root} >
      <Grid xs={12} item>
        <Typography   type="body1" gutterBottom align="left">
        How do you compare with other Aalto species, when it come to indoor cloth preferance now?
        </Typography>
      </Grid>
      <Button className={this.props.listExists && this.props.clothselection.resultcategory === "naked"? classes.highlight:classes.button}  onClick={(e)=>{
        this.props.meteorCall('userdata.update.cloth',"cloth","naked")
      }}>
      {/* {
        this.whatever()
      } */}

      <Grid container  alignItems='center' className={classes.choices} spacing={8}>
        <Grid xs={2}   item >
          <img   src="naked.jpg"  alt=""/>
        </Grid>
        <Grid  xs={10}  item>
          <Typography  className={classes.wraptex}  gutterBottom align="left" >
          Why to carry extra weight with me?Like T-shirt or shirt.
          </Typography>
        </Grid>
      </Grid>
      </Button>
      <Button className={this.props.listExists && this.props.clothselection.resultcategory === "normal"? classes.highlight:classes.button}  onClick={(e)=>{
        this.props.meteorCall('userdata.update.cloth',"cloth","normal")
      }}>
      <Grid container  alignItems='center' className={classes.choices} spacing={8}>
        <Grid  xs={2}  item >
          <img src="normal.png"  alt=""/>
        </Grid>
        <Grid xs={10} item>
          <Typography className={classes.wraptex}  gutterBottom align="left">
          I do not want to look weired. Sweater?
          </Typography>
        </Grid>
      </Grid>
      </Button>
      <Button className={this.props.listExists && this.props.clothselection.resultcategory === "desert"? classes.highlight:classes.button}   onClick={(e)=>{
        this.props.meteorCall('userdata.update.cloth',"cloth","desert")
      }}>
      <Grid container  alignItems='center' className={classes.choices} spacing={8}>
        <Grid xs={2}   item >
          <img src="desert.png"  alt=""/>
        </Grid>
        <Grid xs={10}  item>
          <Typography  className={classes.wraptex}  gutterBottom align="left">
          But you never know it may get extremly cold outside. Sweater and thermal cloths.
        </Typography>
        </Grid>
      </Grid>
    </Button>



    </Grid>
    )}}

Cloth.propTypes = {classes: PropTypes.object.isRequired};

// export default createContainer(params => {
//   Meteor.subscribe('userdata');
//   return {
//     meteorCall: Meteor.call,
//     clothselection: UserData.findOne({userId:Meteor.userId()}) && UserData.findOne({userId:Meteor.userId()}).answeredquestions.find((doc)=>{
//       return doc.questionName === 'cloth'})
//
//
//
//     //then inside component onClick={()=>{props.meteorCall('notes.insert')}}
//   };
// },withStyles(styles)(Cloth))

export default withTracker(props => {
  const userdata = Meteor.subscribe('userdata');
  const loading = !userdata.ready();
  const clothselection =   UserData.findOne({userId:Meteor.userId()}) &&    UserData.findOne({userId:Meteor.userId()}).answeredquestions.find((doc)=>{
         return doc.questionName === 'cloth'});
  const listExists = !loading && !!clothselection;

  return {
    meteorCall: Meteor.call,
    clothselection,
    listExists,
  };
})(withStyles(styles)(Cloth));


// export default ListPageContainer = withTracker(({ id }) => {
//   const todosHandle = Meteor.subscribe('todos.inList', id);
//   const loading = !todosHandle.ready();
//   const list = Lists.findOne(id);
//   const listExists = !loading && !!list;
//   return {
//     loading,
//     list,
//     listExists,
//     todos: listExists ? list.todos().fetch() : [],
//   };
// })(ListPage);
//
// <ListPageContainer id={7}/>
