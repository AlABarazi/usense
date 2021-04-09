import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import green from 'material-ui/colors/green';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import cyan from 'material-ui/colors/cyan';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import ModalTemplateSensor from './ModalTemplateSensor';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';
import Snackbar from 'material-ui/Snackbar';

//red pink purple deepPurple indigo blue lightBlue cyan teal green lightGreen lime yellow amber orange deepOrange brown grey blueGrey
//50 100 ->900 A100 A200 A400 A700
//red pink purple deepPurple indigo blue lightBlue cyan teal green lightGreen lime yellow amber orange deepOrange brown grey blueGrey
//50 100 ->900 A100 A200 A400 A700

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  button: {
    width: "100%",
    height: "100%",
    // padding: 10,
    fontSize: 32,
    background: cyan[50]

  },
  image: {
    width: 44,
    height: 44,
    margin:'0 auto',
  }
  // close: {
  //   width: theme.spacing.unit * 4,
  //   height: theme.spacing.unit * 4,
  // },
});

class AchivementCard extends Component {
  state = {
    left: false,
    showmodal: false,
    value:'',
    open:false,
    message:"",
  };
  HideModal = () => {

      if (this.props.category === "av-t"){
        if(this.state.value <=17 || this.state.value >=30){
          this.handleClick(`${this.state.value}C is not possible, try again, be reasonable!`)
          return
        }
      }
      if (this.props.category === "av-rh"){
        if(this.state.value <=1 ||this.state.value >=70){
          this.handleClick(`${this.state.value} is not possible, try again, be reasonable!`)
          return
        }
      }
      if (this.props.category === "av-light"){
        if(this.state.value <=25 || this.state.value >=1000){
          this.handleClick(`${this.state.value} is not possible, try again, be reasonable!`)
          return
        }
      }
    this.setState(() => ({showmodal: false}));
  }
  ShowModal = () => {
    for (var a of ['av-t','av-rh','av-light']){
      a === this.props.category && this.setState(() => ({showmodal: true}));
    }

  }
  handleChange = name => event => {
    this.setState({['value']: event.target.value});
  };


  handleClick = (message) => {

    this.setState({ message: message });
    this.setState({ open: true });
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ open: false });
    this.setState({ message: "" });
  };
  handleSetStateValue = () => {
    if (this.props.category === 'av-t' ){
      // Light_wish={this.props.Light_wish}
      // T_wish={this.props.T_wish}
      // Rh_wish={this.props.Rh_wish}
      if(this.props.T_wish > 0){
        this.setState({ value: this.props.T_wish });
      }
      else{
        this.setState({ value: this.props.currentValue });
      }
    }
    else if (this.props.category === 'av-rh' ){
      if(this.props.Rh_wish > 0){
        this.setState({ value: this.props.Rh_wish });
      }
      else{
        this.setState({ value: this.props.currentValue });
      }
    }
    else if (this.props.category === 'av-light' ){
      if(this.props.Light_wish > 0){
        this.setState({ value: this.props.Light_wish });
      }
      else{
        this.setState({ value: this.props.currentValue });
      }
    }
  };
  // <AchivementCard
  //   key={option.icon}
  //   title={option.title}
  //   rank={option.rank}
  //   description={option.description}
  // />
  componentWillMount() {
    this.handleSetStateValue()
  }
  render() {
    state:{value:10};
    const {classes} = this.props;

    return (
      <Grid  item xs={4}>
      {/* alignItems='flex-start', 'center', 'flex-end', 'stretch'Default, 'baseline'
        direction='row' Default|'row-reverse' |'column' |'column-reverse'
        justify='flex-start'Default, 'center', 'flex-end', 'space-between', 'space-around'
        alignContent='stretch'Default, 'center', 'flex-start', 'flex-end', 'space-between', 'space-around' */
      }
      <Button className={classes.button}  onClick={this.ShowModal}>

        <Grid container className={classes.root} alignItems='center' justify='center' >
          <Grid xs={4} item>
            <Typography type="subheading"  gutterBottom align="center">
              {this.props.currentValue}
            </Typography>
          </Grid>
          <Grid xs={8} item>
            <img src={this.props.icon} className={classes.image} alt=""/>
          </Grid>

        </Grid>
      </Button>

      <ModalTemplateSensor HideModal={this.HideModal} showmodal={this.state.showmodal} title={this.props.name} category={this.props.category} roomname={this.props.roomname}
        userinput={this.state.value} currentValue={this.props.currentValue} >

        <Typography type="subheading" gutterBottom align="left">
          Others Think {this.props.name} Should be
        </Typography>
        <Grid container style={{width:"50%",background: cyan[50],margin: '0 auto'}}  className={classes.root} alignItems='center' justify='center'>

            <Grid xs={2}  item>
              <Typography  type="subheading"
                 gutterBottom align="center">
                {
                  this.props.category === "av-rh"? this.props.Rh_avg:this.props.category === "av-t"?
                  this.props.T_avg:this.props.category === "av-light"?this.props.Light_avg:undefined
                }
              </Typography>
            </Grid>
            <Grid xs={10} item >
              <img src={this.props.icon} style={{display:'flex', justify:'center'}} className={classes.image} alt=""/>
            </Grid>
          </Grid>
          <Grid xs={12} item>
            <Typography type="subheading" style={{
                background: 'white'
              }} gutterBottom align="left">
              And you? Share your preferance!?
            </Typography>
          </Grid>
          <Grid xs={12} item>
            <TextField style={{width:"100%",fontSize:"0.5rem"}} id="number"   label={"Enter Your Prefered "+this.props.name}

              value={this.state.value}

              onChange={this.handleChange(this.props.name)} type="number" className={classes.textField} InputLabelProps={{
                shrink: true
              }} margin="normal"/>
              <Typography type="caption" gutterBottom align="left">
                 {this.props.help}
              </Typography>
          </Grid>


      </ModalTemplateSensor>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={this.state.open}
        autoHideDuration={2000}
        onClose={this.handleClose}
        SnackbarContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{this.state.message}</span>}
        // action={[
        //   <Button key="undo" color="accent" dense onClick={this.handleClose}>
        //     Ok
        //   </Button>,
        //   <IconButton
        //     key="close"
        //     aria-label="Close"
        //     color="inherit"
        //     className={classes.close}
        //     onClick={this.handleClose}
        //   >
        //     <CloseIcon />
        //   </IconButton>,
        // ]}
      />

    </Grid>);
  }
}
AchivementCard.defaultProps = {
  bgcolor: "#58B3FF"
};
AchivementCard.propTypes = {
  bgcolor: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(AchivementCard); //component class name to export
