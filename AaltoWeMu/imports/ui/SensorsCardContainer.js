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
import SensorsCard from './SensorsCard';

const sensorsIcons = {
  "av-rh":{"icon":"rh.svg","title":"Average Humidity","help":"100% RH is like being in steam Sauna"},
  "av-t":{"icon":"temp.svg","title":"Average Temperature","help":"The temperature in Finland rarely go beyond 30C outside"},
  "av-light":{"icon":"light.svg","title":"Average Light","help":"In supermarket the recommended lighting is 750 lux, in class rooms around 500 lux"},
  "av-co2":{"icon":"cotwo.svg","title":"Average CO2"},
"av-tvoc":{"icon":"VOC.png","title":"Average VOC"},
"av-nox":{"icon":"NOx.png","title":"Average NOx"},
"av-radon":{"icon":"Ra.png","title":"Average Radon"},
"av-sound":{"icon":"sound.svg","title":"Average Sound"},
"av-diff-p":{"icon":"Pdiff.png","title":"Average Pressure_Diff"},
"av-bar-p":{"icon":"P.png","title":"Average Bar._pressure"}};

//red pink purple deepPurple indigo blue lightBlue cyan teal green lightGreen lime yellow amber orange deepOrange brown grey blueGrey
//50 100 ->900 A100 A200 A400 A700
//red pink purple deepPurple indigo blue lightBlue cyan teal green lightGreen lime yellow amber orange deepOrange brown grey blueGrey
//50 100 ->900 A100 A200 A400 A700
const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: 0,

  },
});

class AchivementCard extends Component {
  state = {
    left: false,
    showmodal: false
  };

  // <AchivementCard
  //   key={option.icon}
  //   title={option.title}
  //   rank={option.rank}
  //   description={option.description}
  // />
  render() {

    const {classes} = this.props;
    return (<div >

        <Grid container className={classes.root} >
          {

          //   for (const key of Object.keys(obj)) {
          //     console.log(key, obj[key]);
          // }
          // ES2017 adds Object.entries() which avoids having to look up each value in the original object:
          //
          // Object.entries(obj).forEach(
          //     ([key, value]) => console.log(key, value)
          // );
                  Object.entries(sensorsIcons).map(  ([key,value]) => (
<SensorsCard
                key={key}
                name={value.title}
                icon={"/"+value.icon}
                currentValue={this.props.room[key]}
                avgWish={this.props.room[key]}
                category={key}
                roomname={this.props.room["roomname"]}
                help = {value.help}
                Light_wish={this.props.Light_wish}
                T_wish={this.props.T_wish}
                Rh_wish={this.props.Rh_wish}
                Light_avg={this.props.Light_avg}
                T_avg={this.props.T_avg}
                Rh_avg={this.props.Rh_avg}
              />
            ))
          }

        </Grid>
      </div>

      ); } }
AchivementCard.defaultProps = {bgcolor: "#58B3FF"};
AchivementCard.propTypes = {
        bgcolor: PropTypes.string.isRequired,
        classes: PropTypes.object.isRequired
      };
export default withStyles(styles)(AchivementCard);//component class name to export
