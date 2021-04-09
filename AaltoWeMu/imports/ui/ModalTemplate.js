import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  withMobileDialog,
} from 'material-ui/Dialog';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import {withStyles} from 'material-ui/styles';
import {Session} from 'meteor/session';
const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    container:{
      marginTop:5,
    }
});
class ResponsiveDialog extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { fullScreen } = this.props;
    const {classes} = this.props;
    return (
      <div className={classes.root}        >
        <Dialog
          fullScreen={fullScreen}
          open={!!this.props.showmodal}
          onClose={this.props.HideModal}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle disableTypography id="responsive-dialog-title">
            <Typography type="title" gutterBottom align="left">{this.props.carddata.title}
            </Typography></DialogTitle>
          <DialogContent>
            <DialogContentText>
            </DialogContentText>
            <Grid container  className={classes.container}                  alignItems="center"
            direction="column"
            justify="center" spacing={8}>
            <Grid container             alignItems="center"
            direction="row"
            spacing={16}
            justify="flex-start" >
            <Grid item xs={2}>
            {this.props.children}
            </Grid>
              <Grid item xs={10}>

                </Grid>
          </Grid>
                  <Grid item xs={12}>
                    <Typography  gutterBottom >
                      {this.props.carddata.category=="cloth"|| this.props.carddata.category=="bmi"?`Your specie prevelance is ${Session.get('Prevalence')[this.props.carddata.result]}%
                      out of ${this.props.carddata.total} creatures participated`:undefined}

      </Typography>
                    <Typography type="body2" gutterBottom align="left">
                      {this.props.carddata.description}
                  </Typography>
                    </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.HideModal}  color="primary" autoFocus>
              Close
            </Button>

          </DialogActions>

        </Dialog>
      </div>
    );
  }
}

ResponsiveDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
};

export default withMobileDialog()(withStyles(styles)(ResponsiveDialog));
