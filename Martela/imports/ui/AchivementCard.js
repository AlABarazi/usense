import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import green from 'material-ui/colors/green';
import Button from 'material-ui/Button';
import cyan from 'material-ui/colors/cyan';
import ModalTemplate from './ModalTemplate';
//red pink purple deepPurple indigo blue lightBlue cyan teal green lightGreen lime yellow amber orange deepOrange brown grey blueGrey
//50 100 ->900 A100 A200 A400 A700
//red pink purple deepPurple indigo blue lightBlue cyan teal green lightGreen lime yellow amber orange deepOrange brown grey blueGrey
//50 100 ->900 A100 A200 A400 A700
const styles = theme => ({
    root: {
      flexGrow: 1,
      textAlign:"center",
      marginTop:0

    },
    button:{
      width:"100%",
      height: "100%",
      padding: 10,
      fontSize: 32,
      background:cyan[50],
    },
    image:{
      width:72,
      height:72
    }
});

class AchivementCard extends Component {
  state = {
    left: false,
    showmodal:false
  };
  HideModal = ()=>{

    this.setState(() => ({ showmodal: false }));
  }
  ShowModal = ()=>{
    this.setState(() => ({ showmodal: true }));
  }


  // <AchivementCard
  //   key={option.icon}
  //   title={option.title}
  //   rank={option.rank}
  //   description={option.description}
  // />
  render() {
    const { classes } = this.props;
      return(
        <div className={classes.root}>
          <Button className={classes.button} onClick={this.ShowModal}>
            <img src={this.props.icon} className={classes.image}        alt="" />

          </Button>
          <ModalTemplate HideModal={this.HideModal}  showmodal = {this.state.showmodal} carddata={this.props}>
<img src={this.props.icon} className={classes.image}        alt="" />
            </ModalTemplate>
        </div>

      );
  }
}
AchivementCard.defaultProps = {
  bgcolor: "#58B3FF"
};
AchivementCard.propTypes = {
  bgcolor:PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(AchivementCard);//component class name to export
