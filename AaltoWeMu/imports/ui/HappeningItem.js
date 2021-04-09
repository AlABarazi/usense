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

const styles = theme => ({
  root: {
    width: '100%',
    flexGrow: 1

  },
  heading: {
    fontSize: theme.typography.pxToRem(15),

  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,

  },
  details: {
    alignItems: 'center',
  },
  highlight:{
    background: "rgba(255,0,0,0.1)",
    width:"100%",
    height: "100%",
    textTransform: 'none'
  }
});

function DetailedExpansionPanel(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <ExpansionPanel className={props.styleprops?classes.highlight:""}        >
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <div >
            <Typography className={classes.heading}>{props.happening.summary}</Typography>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
          {props.children}
        </ExpansionPanelDetails>
        {props.happening.action1 ?      <span>
          <Divider />
                  <ExpansionPanelActions>
                    <Button dense>{props.happening.action1}</Button>
                    <Button dense color="primary">
                      {props.happening.action2}
                    </Button>
                  </ExpansionPanelActions>
        </span>   : <span></span>}

      </ExpansionPanel>
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
