import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
const styles = theme => ({

  responsive: {
    display:"flex",
    },
      iframe: {
        flexGrow:1,
      }
});
class RenJsComponent extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }
  componentDidMount() {
    // this.map = new google.maps.Map(this.refs.map, {
    //       center: {lat: this.props.lat, lng: .this.props.lng},
    //       zoom: 8
    //     });
    // const script1 = document.createElement("script");
    // script1.src = "libs/phaser.min.js";
    // script1.async = true;
    // document.body.appendChild(script1);
    const script2 = document.createElement("script");
    script2.src = "RenJS/RenJSBootstrap.js";
    script2.async = true;
    document.body.appendChild(script2);

  }
  componentWillReceiveProps(nextProps) {//nextProps nexProps are equivalant to this.props
    // this.map.panTo({lat:nextProps.lat,lng:nextProps.lng});
    //app component has a button that change the state of lat and lng there then those
    //get sent here
  }
  state = {
    options: []}

  handleDeleteOptions=()=> {
    this.setState(() => ({ options: [] }));
  };

  render() {
    const {classes} = this.props;
    return (
      // <div id='map' ref='map'/>
      <div className={classes.responsive}>
        <div id="RenJS" className={classes.iframe} >
        </div>
      </div>

    );
  }
}


export default withStyles(styles)(RenJsComponent);//component class name to export
