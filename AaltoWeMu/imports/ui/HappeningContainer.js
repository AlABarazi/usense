import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import ExpansionPanel, {
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  ExpansionPanelActions,
} from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import Chip from 'material-ui/Chip';
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';
import HappeningItem from './HappeningItem';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
const styles = theme => ({
  root: {
    width: '100%',
  },
});

function DetailedExpansionPanel(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      {

          props.happenings.map((option,index) => (
          <Grid item xs={12}>
            <HappeningItem happening={option}>
              <p> {option.contentfile}</p>

            </HappeningItem>
          </Grid>
        ))
      }
    </div>
  );
}

DetailedExpansionPanel.propTypes = {
  classes: PropTypes.object.isRequired,
};
DetailedExpansionPanel.defaultProps = {
  summary:"Some summary for the question"
}
export default withStyles(styles)(DetailedExpansionPanel);
