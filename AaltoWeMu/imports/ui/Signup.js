import { Accounts } from 'meteor/accounts-base';
import React from 'react';
import { Link } from 'react-router';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
const styles = theme => (
  {
    button: {
  margin: theme.spacing.unit,
},
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection:"column",
    alignItems:"center",
    justifyContent:"center"
  },
  formControl: {
  margin: theme.spacing.unit,
},
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: "15rem",
    transition: theme.transitions.create(['border-color', 'box-shadow']),
'&:focus': {
  borderColor: '#80bdff',
  boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
}
  }
});

class Login extends React.Component {
  state = {
    error: undefined
  };
  onSubmit =(e)=> {
    e.preventDefault();
    let email = e.target.email.value.trim();
    let password = e.target.password.value.trim();
    if (password.length < 3) {
      return this.setState({error: 'Password must be more than 2 characters long'});
    }
    Accounts.createUser({email, password}, (err) => {
      if (err) {
        this.setState({error: err.reason});
      } else {
        this.setState({error: ''});
      }
    });
  }


render(){

  const { classes } = this.props;
  return (
    <div className={classes.formControl}>



      <form onSubmit={(e)=>{this.onSubmit(e)}} className={classes.container} noValidate autoComplete="off">
      {/* <form  className={classes.container} noValidate autoComplete="off"> */}
        <img src="lovol.png" alt="" />
        {this.state.error ? <p style={{color:'red', fontSize:"0.5rem"}}>{this.state.error}</p> : undefined}
        <TextField
          InputLabelProps={{
           shrink: true,
         }}
          type="email" name="email"
          label="Email"
          id="email"
          // defaultValue="Email"
          className={classes.textField}
          helperText="Input your email"
          margin="normal"
          fullWidth
        />
      <TextField
        InputLabelProps={{
           shrink: true,
         }}
        type="password" name="password"
        label="Password"
        id="password"
        // defaultValue="Password"
        className={classes.textField}
        helperText="Input your password"
        margin="normal"
        fullWidth
      />
      <Button type="submit" variant="raised" color="primary" className={classes.button}>
    Register
  </Button>
  <Button  className={classes.button}>
    <Link to="/"><Typography type="caption" gutterBottom align="left">
    Go to Login</Typography></Link>
  </Button>
    </form>


    </div>
  );
}

};

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);
