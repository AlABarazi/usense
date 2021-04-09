import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import {LinearProgress} from 'material-ui/Progress';
import Grid from 'material-ui/Grid';
import IconButton from 'material-ui/IconButton';
import grey from 'material-ui/colors/grey';
import yellow from 'material-ui/colors/yellow';
import red from 'material-ui/colors/red';
import Typography from 'material-ui/Typography';
import MoodIcon from 'material-ui-icons/Mood';
import FavoriteBorderIcon from 'material-ui-icons/FavoriteBorder';
import DeleteForeverIcon from 'material-ui-icons/DeleteForever';
import MoodBadIcon from 'material-ui-icons/MoodBad';
import {UserData} from '../api/userdata';
import {createContainer} from 'meteor/react-meteor-data';
import {Meteor} from 'meteor/meteor';
import {Session} from 'meteor/session';
const styles = theme => ({
  root: {
    flexGrow: 1,
    // width: '100%',
    //marginTop: 30,
    background: theme.palette.primary[50],
    margin: 0,
    //paddingLeft:20
  }
});

class LinearDeterminate extends React.Component {
  state = {
    completed: 0,
    happy: false,
    sad: false
  };

  componentDidMount() {
    //this.timer = setInterval(this.progress, 500);
    this.props.rate === "happy"
      ? this.setState({happy: true})
      : this.props.rate === "sad" ? this.setState({sad: true}): this.setState({happy: false,sad:false})
  }

  componentWillUnmount() {
    //clearInterval(this.timer);
  }
  // timer: number;
  //
  //   progress = () => {
  //     const {completed} = this.state;
  //     if (completed > 100) {
  //       this.setState({completed: 0});
  //     } else {
  //       //const diff = Math.random() * 10;
  //       this.setState({
  //         completed: completed + 1
  //       });
  //     }
  //   };
  // componentWillReceiveProps(nextProps) {
  //   nextProps.rate && nextProps.rate === "happy"
  //     ? this.setState({happy: true})
  //     : this.setState({happy: false});
  //   nextProps.rate && nextProps.rate === "sad"
  //     ? this.setState({sad: true})
  //     : this.setState({sad: false});
  //   nextProps.rate && nextProps.rate === "notRated"
  //     ? this.setState({sad: false})
  //     : this.setState({happy: false});
  // }


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
    // handleVoteTypePositive = (classes, ratetype,type, category,item) => {
    //   console.log("classes, ratetype, type, category,item",classes, ratetype, type, category,item);
    //   if (ratetype === "happysad") {
    //     return ([<div>
    //       <IconButton aria-label="Happy" disabled={type === "total" && true} onClick={type === "nottotal"
    //           ? (e,category,item)=> {this.handleChangeHappy(category,item)}
    //
    //           : null} style={this.state.happy
    //           ? {
    //             background: yellow['A100'],
    //             float: "right"
    //           }
    //           : {
    //             float: "right"
    //           }}>
    //         <MoodIcon/>
    //       </IconButton>
    //
    //     </div>
    //       ])
    //   } else {
    //     return ([<div>
    //       <IconButton aria-label="Happy" disabled={type === "total" && true} onClick={ type === "nottotal"
    //           ? (e,category,item)=> {this.handleChangeHappy(category,item)}
    //           : null} style={this.state.happy
    //           ? {
    //             background: red['A100'],
    //             float: "right"
    //           }
    //           : {
    //             float: "right"
    //           }}>
    //         <FavoriteBorderIcon/>
    //       </IconButton>
    //
    //     </div>
    //       ])
    //   }
    // }

    // handleVoteTypeNegative = (classes, ratetype, type, category,item) => {
    //   if (ratetype === "happysad") {
    //     return ([<div>
    //
    //       <IconButton aria-label="Sad" disabled={type === "total" && true} onClick={type === "nottotal"
    //           ? (e,category,item)=> {this.handleChangeSad(category,item)}
    //           : null} style={this.state.sad
    //           ? {
    //             background: yellow['A100'],
    //             float: "right"
    //           }
    //           : {
    //             float: "right"
    //           }}>
    //         <MoodBadIcon/>
    //       </IconButton>
    //     </div>
    //       ])
    //   } else {
    //     return ([<div>
    //       <IconButton aria-label="Sad" disabled={type === "total" && true} onClick={type === "nottotal"
    //           ? (e,category,item)=> {this.handleChangeSad(category,item)}
    //           : null} style={this.state.sad
    //           ? {
    //             background: grey[700],
    //             float: "right"
    //           }
    //           : {
    //             float: "right"
    //           }}>
    //         <DeleteForeverIcon/>
    //       </IconButton>
    //     </div>
    //       ])
    //   }
    // }

    render() {
      const {classes} = this.props;
      const {ratetype, type, item, category} = this.props;
      return (

        <Grid  container className={classes.root} alignItems='center'
          direction='row' justify='center' alignContent='center'>
        <Grid xs={12} item>
          <Typography type="subheading" gutterBottom align="left">
            {this.props.title}
          </Typography>
        </Grid>
        <Grid xs={10} item>
          <div>
            <LinearProgress key={Math.floor(Math.random()* 10000000000)} style={{
                marginTop: 20,
                height: 20
              }} mode="determinate" value={this.props.positiveVote}/>

          </div>
          <br/> {/* <LinearProgress color="accent" mode="determinate" value={this.state.completed}/> */}

        </Grid>
        <Grid xs={2} item>
          {/* {this.handleVoteTypePositive(classes, ratetype,type, category,item)} */}
          {
            (ratetype === "happysad")
              ? ([<div key={Math.floor(Math.random()* 10000000000)}>
                <IconButton aria-label="Happy" disabled={type === "total" && true} onClick={type === "nottotal"
                    ? (e, category, item) => {
                      this.handleChangeHappy(category, item)
                    }

                    : null} style={this.state.happy
                    ? {
                      background: yellow['A100'],
                      float: "right"
                    }
                    : {
                      float: "right"
                    }}>
                  <MoodIcon/>
                </IconButton>

              </div>
                ])

              : ([<div key={Math.floor(Math.random()* 10000000000)}>
                <IconButton aria-label="Happy" disabled={type === "total" && true} onClick={type === "nottotal"
                    ? (e, category, item) => {
                      this.handleChangeHappy(category, item)
                    }
                    : null} style={this.state.happy
                    ? {
                      background: red['A100'],
                      float: "right"
                    }
                    : {
                      float: "right"
                    }}>
                  <FavoriteBorderIcon/>
                </IconButton>

              </div>
                ])

          }
        </Grid>
        {/* The sconed row Negative but is it happy/sad or like/dislike */}
        <Grid xs={10} item>

          <LinearProgress color="accent" style={{
              marginTop: 20,
              height: 20
            }} mode="determinate" value={100 - this.props.positiveVote}/>
          <br/>

        </Grid>

        <Grid xs={2} item>

          {
            (ratetype === "happysad")
              ? (<div key={Math.floor(Math.random()* 10000000000)}>

                <IconButton aria-label="Sad" disabled={type === "total" && true} onClick={type === "nottotal"
                    ? (e, category, item) => {
                      this.handleChangeSad(category, item)
                    }
                    : null} style={this.state.sad
                    ? {
                      background: yellow['A100'],
                      float: "right"
                    }
                    : {
                      float: "right"
                    }}>
                  <MoodBadIcon/>
                </IconButton>
              </div>)
              : (<div key={Math.floor(Math.random()* 10000000000)}>
                <IconButton aria-label="Sad" disabled={type === "total" && true} onClick={type === "nottotal"
                    ? (e, category, item) => {
                      this.handleChangeSad(category, item)
                    }
                    : null} style={this.state.sad
                    ? {
                      background: grey[700],
                      float: "right"
                    }
                    : {
                      float: "right"
                    }}>
                  <DeleteForeverIcon/>
                </IconButton>
              </div>)

          }
        </Grid>
      </Grid>);
    }
  }
  LinearDeterminate.propTypes = {
    classes: PropTypes.object.isRequired,
    // ratetype: PropTypes.string.isRequired
  };

  LinearDeterminate.defaultProps = {
    title: "Lectures: Total Satisfaction",
    ratetype: "happysad",
    type: "nottotal"
  }

  export default createContainer(params => {
    Meteor.subscribe('userdata');
    return {

      //userdata: Meteor.collection('userdata').find({})
      //userdata: UserData.find({}).fetch(),
      //name of the imported collection for example Notes
      //Notes is imported by import {Notes} from '../api/notes';
      // Session,
      // notes: Notes.find().fetch().map((note)=>{
      //       return {
      //         ...note,
      //         selected: note._id === selectedNoteId
      //       };
      //     }),
      meteorCall: Meteor.call
      //then inside component onClick={()=>{props.meteorCall('notes.insert')}}
    };
  }, withStyles(styles)(LinearDeterminate))
