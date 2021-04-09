import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Helmet} from "react-helmet";
import {Meteor} from 'meteor/meteor';
import {browserHistory} from 'react-router';
import { withTracker } from 'meteor/react-meteor-data';
import {Session} from 'meteor/session';
import {Tags} from '../api/tags';
import {concentration_space,chillout_space} from './scenes';


class Pannelum extends Component {

  state = {
    reply:false,icon:true
  }
  resize = () => this.forceUpdate()
  updateDimensions=()=>{
    var w = window,
      d = document,
      documentElement = d.documentElement,
      body = d.getElementsByTagName('body')[0],
      width = w.innerWidth || documentElement.clientWidth || body.clientWidth,
      height = w.innerHeight|| documentElement.clientHeight|| body.clientHeight;
      this.setState({width: width, height: height});
  };
  handleDeleteOptions = () => {
    this.setState(() => ({options: []}));
  };
  handleAddspot = (e) => {
    e.preventDefault();

    console.log(e.target.category.value,e.target.comment.value);
    if(e.target.icon.value){
      this.props.meteorCall('tags.insert',this.props.Session.get('selectedRooms').slice(-1).pop(),this.viewer.getPitch(),
      this.viewer.getYaw(),"info",e.target.comment.value,
      `/room/${this.props.Session.get('selectedRooms').slice(-1).pop()}`,`${Meteor.absoluteUrl()}room/${this.props.Session.get('selectedRooms').slice(-1).pop()}/feedback/${parseFloat(this.viewer.getPitch())}/${parseFloat(this.viewer.getYaw())}`
      ,e.target.category.value,e.target.icon.value,e.target.reply.value,"unresolved")
    }
    else{
      this.props.meteorCall('tags.insert',this.props.Session.get('selectedRooms').slice(-1).pop(),this.viewer.getPitch(),
      this.viewer.getYaw(),"info",e.target.comment.value,
      `/room/${this.props.Session.get('selectedRooms').slice(-1).pop()}`,""
      ,e.target.category.value,e.target.icon.value,e.target.reply.value,"unresolved")
    }


    // this.viewer.addHotSpot({"pitch": this.viewer.getPitch(), "yaw": this.viewer.getYaw(), "type": "info", "text": e.target.comment.value, "URL":`/room/${this.props.Session.get('selectedRooms').slice(-1).pop()}` })

    e.target.comment.value =""
  }
  handleChecktoggleIcon = (e)=>{
    this.setState({icon:!this.state.icon})
  }
  handleChecktoggleReply = (e)=>{
    this.setState({reply:!this.state.reply})

  }
  shouldComponentUpdate(nextProps, nextState) {

    return true;
    //if your newe state of props recieved don't go with re render
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
    window.removeEventListener('resize', this.resize)
  }
  componentWillReceiveProps(nextProps) {
    //it will not update but when you recive props do something like
    //    this.cube.addComponent('model', {
    //         type: 'box'
    //     });
    // in the parent component where this one will be called like <ThirdParty something={this.state.var1}/>
    //when setState is called in the parent toset var1 the nextporps will be sent to ThirdParty
    // this.props.listExists && this.props.tagslist.forEach((item , index, array) =>{
    //   this.viewer.addHotSpot({"pitch": item.pitch, "yaw": item.yaw
    //   , "type": "info", "text": item.text,
    //    "URL":item.URL })
    //
    // });
  }

  componentWillMount() {
    this.updateDimensions();

  }
  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
    window.addEventListener('resize', this.resize)
    this.viewer = pannellum.viewer('panorama', concentration_space);
    if(this.props.params.pitch ){
      console.log(this.props.params.pitch,this.props.params.yaw);
      this.viewer.lookAt(parseFloat(this.props.params.pitch),parseFloat(this.props.params.yaw));
    }



  }

  render() {

    return (<div style={{display:"flex", flexDirection:"column" ,width:this.state.width,height:this.state.height}}>
{    this.props.listExists && this.props.tagslist.forEach((item , index, array) =>{
      this.viewer.addHotSpot({"pitch": item.pitch, "yaw": item.yaw
      , "type": "info", "text": item.text,
       "URL":item.URL })

    })}

<form onSubmit={this.handleAddspot} style={{margin:"auto", height:"2rem",zIndex: "9999999999999",lineHeight: "2rem", fontSize:"1rem"}}>

    <input  type="text"  name="comment"/>

      <select name="category" style={{marginLeft:"1rem"}}>
        <option value="suggestion">Suggestion</option>
        <option value="complaint">Complaint</option>

      </select>
      <button type="submit"  style={{
        marginLeft:"1rem",
          right: "0px",
          top: "0px",
          zIndex: "9999999999999",
          height:"1rem",
          width:"1.5rem"
        }}>
        Add
      </button>
      <div>
        <span style={{marginRight:"0.2rem"}}>
          <input style={{width:"1rem",height:"1rem",marginRight:"0.2rem"}} type="checkbox"
            id="replyTo" name="reply" value={this.state.reply} defaultChecked = {this.state.reply}
            onChange={(e)=>{this.handleChecktoggleReply(e)}}//event and variable
          // or onClick={this.handleChangeBodyState}
          //don't forget this.props.handleChangeBodyState if needed
        />
          <label style={{fonstSize:"0.2rem"}} htmlFor="replyTo">I want reply</label>
        </span>
        <span >
          <input style={{width:"1rem",height:"1rem",marginRight:"0.2rem"}}
            type="checkbox" id="showIcon" name="icon" value={this.state.icon} defaultChecked = {this.state.icon}
            onChange={(e)=>{this.handleChecktoggleIcon(e)}}/>
          <label style={{fonstSize:"0.2rem"}} htmlFor="showIcon">Place icon</label>
        </span>
      </div>



</form>

       <div id='panorama' style={{


          overflow: "hidden",
          position: "relative",
          flexGrow:1,

          // background:"green"
        }}>
        <div style={{
          position: "absolute",
          top: "50%",
          width:"1rem",
          height: "1rem",
          marginTop: "-25px",
          left: "50%",
          background:"yellow",
          zIndex:"99999",
          opacity:"0.3"


          }}></div>
      </div>
      {/* <div style={{
          display: "flex",
          position:"absolute",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: window.innerHeight-20,
          background:"red"
        }}>

        <div style={{
            height: "1rem",
            width: "1rem",
            background:"blue",
            opacity:  "0.1",


          }}></div>
      </div> */}
    </div>);
  }
}

  //import { withTracker } from 'meteor/react-meteor-data';
export default withTracker(props => {
const tags = Meteor.subscribe('alltags');
const loading = !tags.ready();
const tagslist =   Tags.find({room:Session.get('selectedRooms').slice(-1).pop(),icon:"true",status:"unresolved"}).fetch()
const listExists = !loading && !!tagslist;

return {
  meteorCall: Meteor.call,
  tagslist,
  listExists,
  Session
};
})(Pannelum);
