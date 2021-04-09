import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Helmet} from "react-helmet";
import {Meteor} from 'meteor/meteor';

export default class ThirdPartyWoofjs extends Component {
  state = {
    options: []
  }

  handleDeleteOptions = () => {
    this.setState(() => ({options: []}));
  };
  handleAddspot = (e) => {
    console.log("hi", Meteor.absoluteUrl("/ultrahack.jpg"));
    this.viewer.addHotSpot({"pitch": this.viewer.getPitch(), "yaw": this.viewer.getYaw(), "type": "info", "text": this.name.value, "URL": "https://artbma.org/"})
  }
  shouldComponentUpdate(nextProps, nextState) {
    return false;
    //if your newe state of props recieved don't go with re render
  }
  componentWillReceiveProps(nextProps) {
    //it will not update but when you recive props do something like
    //    this.cube.addComponent('model', {
    //         type: 'box'
    //     });
    // in the parent component where this one will be called like <ThirdParty something={this.state.var1}/>
    //when setState is called in the parent toset var1 the nextporps will be sent to ThirdParty

  }

  componentWillMount() {}
  componentDidMount() {

    this.viewer = pannellum.viewer('panorama', {

      "default": {
        "firstScene": "circle",
        "author": "Smart Floors Plans",
        "sceneFadeDuration": 1000,
        "compass": true,
        "autoLoad":true
      },

      "scenes": {
        "circle": {
          "title": "Ultra Hack",
          "hfov": 110,
          "pitch": -3,
          "yaw": 117,
          "type": "equirectangular",
          "panorama": "/hackspace.jpg",
          "hotSpots": [
            {
              "pitch": -2.1,
              "yaw": 132.9,
              "type": "scene",
              "text": "Spring House or Dairy",
              "sceneId": "house"
            }
          ]
        },

        "house": {
          "title": "Spring House or Dairy",
          "hfov": 110,
          "yaw": 5,
          "type": "equirectangular",
          "panorama": "https://pannellum.org/images/alma.jpg",
          "hotSpots": [
            {
              "pitch": -0.6,
              "yaw": 37.1,
              "type": "scene",
              "text": "Mason Circle",
              "sceneId": "circle",
              "targetYaw": -23,
              "targetPitch": 2
            }, {
              "pitch": 14.1,
              "yaw": 1.5,
              "type": "info",
              "text": "Smart Building Aalto",
              "URL": "https://artbma.org/"
            }, {
              "pitch": -9.4,
              "yaw": 222.6,
              "type": "info",
              "text": "Art Museum Drive"
            }, {
              "pitch": -0.9,
              "yaw": 144.4,
              "type": "info",
              "text": "North Charles Street"
            }

          ]

        }
      }

    });

  }

  render() {

    return (<div >

      <button type="button" onClick={(e) => {
          this.handleAddspot(e, 'spot Something')
        }} style={{
          right: "0px",
          top: "0px",
          zIndex: "9999999999999"
        }}>
        Add Hotspot
      </button>
      <input type="text" ref={(input) => this.name = input}/>
       <div id='panorama' style={{
          margin: 0,
          overflow: "hidden",
          width: window.innerWidth,
          height: window.innerHeight-20,
          position: "relative"
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
