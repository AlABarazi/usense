import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import { FormLabel, FormControlLabel } from 'material-ui/Form';
import Radio, { RadioGroup } from 'material-ui/Radio';
import Paper from 'material-ui/Paper';
import AchivementCard from './AchivementCard'
import yellow from 'material-ui/colors/yellow';
import {Contents} from '../api/contents';
import {createContainer} from 'meteor/react-meteor-data';
import {UserData} from '../api/userdata';

//red pink purple deepPurple indigo blue lightBlue cyan teal green lightGreen lime yellow amber orange deepOrange brown grey blueGrey
//50 100 ->900 A100 A200 A400 A700
const styles = theme => ({
  root: {
    flexGrow: 1,marginTop:3
  }
});

class CardsContainer extends React.Component {
  state = {
    spacing: 0

  };

  handleChange = key => (event, value) => {
    this.setState({
      [key]: value,
    });
  };

  render() {
    const { classes } = this.props;
    const { spacing } = this.state;
    return (
      <Grid container  className={classes.root} alignment="stretch">


        <Grid  key={Math.floor(Math.random()* 100000000000)}  item xs={4}>
        <AchivementCard

          icon={(this.props.contents && this.props.userdata) && this.props.contents.find((doc)=>{
            return doc.contentname === "badge"})[this.props.userdata.badge].icon}
          title={this.props.contents && this.props.contents.find((doc)=>{
            return doc.contentname === "badge"})[this.props.userdata.badge].title}
          rank={"{contentdone.rank}"}
          description={this.props.contents && this.props.contents.find((doc)=>{
            return doc.contentname === "badge"})[this.props.userdata.badge].desc}

        />
        </Grid>

          {

        this.props.userdata && this.props.contents &&  this.props.userdata.answeredquestions.map((contentdone,index) => {
          let content = this.props.contents.find((doc)=>{
            return doc.contentname === contentdone.questionName})

          let contentresult = content[contentdone.resultcategory];

            return (
                <Grid key={index} item xs={4}>
                <AchivementCard
                  category={contentdone.questionName}
                  icon={contentresult.icon}
                  title={contentresult.title}
                  rank={this.props.Session.get('Prevalence')[contentdone.resultcategory]}
                  description={contentresult.desc}
                  total={contentdone.questionName==="cloth"?this.props.Session.get('Prevalence').totalClothVotes:this.props.Session.get('Prevalence').totalBMIVotes}
                  result={contentdone.resultcategory}
                />
                </Grid>
              )
        })
          }

      </Grid>
    );
  }
}

CardsContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CardsContainer)
