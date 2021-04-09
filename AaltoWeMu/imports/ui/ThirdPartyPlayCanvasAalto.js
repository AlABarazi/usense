import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {createContainer} from 'meteor/react-meteor-data';
const findColor = function(percentage) {
  let color = [];
  (percentage <= 100 && percentage >= 80)
    ? color = [0.184, 0.459, 0.231, 1]
    : (percentage < 80 && percentage >= 60)
      ? color = [0.388, 0.584, 0.188, 1]
      : (percentage < 60 && percentage >= 40)
        ? color = [0.592, 0.714, 0.145, 1]
        : (percentage < 40 && percentage >= 20)
          ? color = [1, 0.973, 0.059, 1]
          : (percentage <= 20 )?color = [1, 0, 0, 1]:color=[1,1,1,1]

  return color
}
class ThirdPartyPlayCanvas extends Component {
  state = {
    options: {},
    mode: "TC"
  };
  handleChangeState = (mode) => {
    this.setState({mode})
  }

  handleShit = () => {
    // console.log("this.state.options.app.root.children",this.state.options && this.state.options.app.root.children);
    //     return {roomname: room,happyRoomsVote,sadRoomsVote, totalRoomVotes,percentageRoomHappy,percentageRoomSad,
    //     sadThermalVote,totalthermalVotes,happyThermalVote,percentageThermalHappy,percentageThermalSad}
    //   })
    //
    // Session.set('RoomsVotes',listRoomsDocs);

    // console.log("this.playcanvas.app.root.children", this.playcanvasvars.app.root.findByTag("room"));

    this.playcanvasvars.app.root.findByTag("room").forEach((itemnodegraph, index, array)=> {
      let roomname = itemnodegraph.name;
      console.log("roomname",roomname);
      var roomdoc = this.props.roomvotes && this.props.roomvotes.find((doc)=>{return doc.roomname === roomname});
      console.log("roomdoc",roomdoc);
      if (roomdoc){
        if (this.state.mode == "TC") {
          var percentage_happy =  roomdoc["percentageThermalHappy"]
        } else if (this.state.mode == "IEQ") {
          var percentage_happy = roomdoc["percentageRoomHappy"]
        }
      }
      else{
        var percentage_happy = undefined
      }
      console.log("itemnodegraph.model.meshInstance", itemnodegraph.model.meshInstances[0].material.diffuse.data = findColor(percentage_happy));
      itemnodegraph.model.meshInstances[0].material.update()

    }
  );

  //   const eater = (cookie, callback) => {
  //     if (!cookie) {
  //       callback({ reason: 'Need a cookie to eat!' });
  //     } else {
  //       console.log("cookies",cookie);
  //
  //       callback(null, `Such a delicious ${cookie} cookie!`);
  //     }
  //   };
  //
  //   const eatTheCookie = (cookie) => {
  //     return new Promise((resolve, reject) => {
  //       eater(cookie, (error, response) => {
  //         if (error) {
  //           reject(error);
  //         } else {
  //           resolve(response);
  //         }
  //       });
  //     });
  //   };
  //
  //   eatTheCookie(this.state.options.app.root.children)
  //   .then((response) => {
  //     console.log(response);
  //     return eatTheCookie('peanut butter');
  //   })
  //   .then((response) => {
  //     console.log(response);
  //     return eatTheCookie('sugar');
  //   })
  //   .then((response) => {
  //     console.log(response);
  //   })
  //   .catch((error) => {
  //     console.warn(error.reason);
  //   });
  //
  //   async function findFuckinChildren() {
  //   await console.log(this.state.options.app.root.children);
  // }
}

shouldComponentUpdate(nextProps, nextState) {

  if (nextState.options != this.state.options) {
    // this.setState({options: nextState.options})
    setTimeout(() => {
      this.handleShit()
    }, 3000);
  }
  // console.log('nextState.options', nextState.options);
  // console.log('this.state.options', this.state.option);
  setTimeout(() => {
    this.handleShit()
  }, 3000);

  return true;
  //if falseif your newe state of props recieved don't go with re render
}
componentWillReceiveProps(nextProps) {
  //it will not update but when you recive props do something like
  //    this.cube.addComponent('model', {
  //         type: 'box'
  //     });
  // in the parent component where this one will be called like <ThirdParty something={this.state.var1}/>
  //when setState is called in the parent toset var1 the nextporps will be sent to ThirdParty

}

componentDidMount() {
  //expose playcanvas main variables like app and canvas to react class
  //javascript is not like python you can't return many vars at once
  // the idea is to put all in playcanvasvars
  this.playcanvasvars = {};
  (this.playcanvasvars = function() {
    var CANVAS_ID = 'application-canvas';

    var canvas,
      devices,
      app;

    var createCanvas = function() {
      canvas = document.createElement('canvas');
      canvas.setAttribute('id', CANVAS_ID);
      canvas.setAttribute('tabindex', 0);
      // canvas.style.visibility = 'hidden';

      // Disable I-bar cursor on click+drag
      canvas.onselectstart = function() {
        return false;
      };

      document.body.appendChild(canvas);

      return canvas;
    };

    var createInputDevices = function(canvas) {
      var devices = {
        elementInput: new pc.ElementInput(canvas),
        keyboard: new pc.Keyboard(window),
        mouse: new pc.Mouse(canvas),
        gamepads: new pc.GamePads()
      };
      if ('ontouchstart' in window) {
        devices.touch = new pc.TouchDevice(canvas);
      }

      return devices;
    };

    var configureCss = function(fillMode, width, height) {
      // Configure resolution and resize event
      if (canvas.classList) {
        canvas.classList.add('fill-mode-' + fillMode);
      }

      // css media query for aspect ratio changes
      var css = "@media screen and (min-aspect-ratio: " + width + "/" + height + ") {";
      css += "    #application-canvas.fill-mode-KEEP_ASPECT {";
      css += "        width: auto;";
      css += "        height: 100%;";
      css += "        margin: 0 auto;";
      css += "    }";
      css += "}";

      // append css to style
      if (document.head.querySelector) {
        document.head.querySelector('style').innerHTML += css;
      }
    };

    var reflow = function() {
      var size = app.resizeCanvas(canvas.width, canvas.height);
      canvas.style.width = '';
      canvas.style.height = '';

      var fillMode = app._fillMode;

      if (fillMode == pc.FILLMODE_NONE || fillMode == pc.FILLMODE_KEEP_ASPECT) {
        if ((fillMode == pc.FILLMODE_NONE && canvas.clientHeight < window.innerHeight) || (canvas.clientWidth / canvas.clientHeight >= window.innerWidth / window.innerHeight)) {
          canvas.style.marginTop = Math.floor((window.innerHeight - canvas.clientHeight) / 2) + 'px';
        } else {
          canvas.style.marginTop = '';
        }
      }
    };

    var displayError = function(html) {
      var div = document.createElement('div');

      div.innerHTML = [
        '<table style="background-color: #8CE; width: 100%; height: 100%;">', '  <tr>', '      <td align="center">', '          <div style="display: table-cell; vertical-align: middle;">', '              <div style="">' + html + '</div>',
        '          </div>',
        '      </td>',
        '  </tr>',
        '</table>'
      ].join('\n');

      document.body.appendChild(div);
    };

    canvas = createCanvas();
    devices = createInputDevices(canvas);

    try {
      app = new pc.Application(canvas, {
        elementInput: devices.elementInput,
        keyboard: devices.keyboard,
        mouse: devices.mouse,
        gamepads: devices.gamepads,
        touch: devices.touch,
        graphicsDeviceOptions: window.CONTEXT_OPTIONS,
        assetPrefix: window.ASSET_PREFIX || "",
        scriptPrefix: window.SCRIPT_PREFIX || "",
        scriptsOrder: window.SCRIPTS || []
      });
    } catch (e) {
      if (e instanceof pc.UnsupportedBrowserError) {
        displayError('This page requires a browser that supports WebGL.<br/>' + '<a href="http://get.webgl.org">Click here to find out more.</a>');
      } else if (e instanceof pc.ContextCreationError) {
        displayError("It doesn't appear your computer can support WebGL.<br/>" + '<a href="http://get.webgl.org/troubleshooting/">Click here for more information.</a>');
      } else {
        displayError('Could not initialize application. Error: ' + e);
      }

      return;
    }

    app.configure(CONFIG_FILENAME, function(err) {
      if (err) {
        console.error(err);
      }

      configureCss(app._fillMode, app._width, app._height);
      reflow();

      window.addEventListener('resize', reflow, false);
      window.addEventListener('orientationchange', reflow, false);

      app.preload(function(err) {
        if (err) {
          console.error(err);
        }

        app.loadScene(SCENE_PATH, function(err, scene) {
          if (err) {
            console.error(err);
          }

          app.start();
        });
      });
    });
    //now assging the main variable to component var so they can be reached from componet functions
    // setTimeout(() => {
    //   app.root.findByTag("room").forEach(function(itemnodegraph, index, array) {
    //
    //     itemnodegraph.setPosition(0, 0, 0)
    //
    //   })
    //   app.scene.update()
    // },
    // 1000)

    return ({canvas: canvas, devices: devices, app: app})
  }());

  //loadingfile
  pc.script.createLoadingScreen(function(app) {
    var showSplash = function() {
      // splash wrapper
      var wrapper = document.createElement('div');
      wrapper.id = 'application-splash-wrapper';
      document.body.appendChild(wrapper);

      // splash
      var splash = document.createElement('div');
      splash.id = 'application-splash';
      wrapper.appendChild(splash);
      splash.style.display = 'none';

      var logo = document.createElement('img');
      logo.src = ASSET_PREFIX + 'logo.png';
      splash.appendChild(logo);
      logo.onload = function() {
        splash.style.display = 'block';
      };

      var container = document.createElement('div');
      container.id = 'progress-bar-container';
      splash.appendChild(container);

      var bar = document.createElement('div');
      bar.id = 'progress-bar';
      container.appendChild(bar);

    };

    var hideSplash = function() {
      var splash = document.getElementById('application-splash-wrapper');
      splash.parentElement.removeChild(splash);
    };

    var setProgress = function(value) {
      var bar = document.getElementById('progress-bar');
      if (bar) {
        value = Math.min(1, Math.max(0, value));
        bar.style.width = value * 100 + '%';
      }
    };

    var createCss = function() {
      var css = [
        'body {',
        '    background-color: #283538;',
        '}',

        '#application-splash-wrapper {',
        '    position: absolute;',
        '    top: 0;',
        '    left: 0;',
        '    height: 100%;',
        '    width: 100%;',
        '    background-color: #283538;',
        '}',

        '#application-splash {',
        '    position: absolute;',
        '    top: calc(50% - 28px);',
        '    width: 264px;',
        '    left: calc(50% - 132px);',
        '}',

        '#application-splash img {',
        '    width: 100%;',
        '}',

        '#progress-bar-container {',
        '    margin: 20px auto 0 auto;',
        '    height: 2px;',
        '    width: 100%;',
        '    background-color: #1d292c;',
        '}',

        '#progress-bar {',
        '    width: 0%;',
        '    height: 100%;',
        '    background-color: #f60;',
        '}',
        '@media (max-width: 480px) {',
        '    #application-splash {',
        '        width: 170px;',
        '        left: calc(50% - 85px);',
        '    }',
        '}'

      ].join('\n');

      var style = document.createElement('style');
      style.type = 'text/css';
      if (style.styleSheet) {
        style.styleSheet.cssText = css;
      } else {
        style.appendChild(document.createTextNode(css));
      }

      document.head.appendChild(style);
    };

    createCss();

    showSplash();

    app.on('preload:end', function() {
      app.off('preload:progress');
    });
    app.on('preload:progress', setProgress);
    app.on('start', hideSplash);
  });

  // this.setState({options: this.playcanvasvars})
  setTimeout(() => {
    this.handleShit()
  }, 10000);

}

render() {

  return (<div>
    {
      this.state.mode == "TC"
        ? ([<div>
          <button style={{
              position: "fixed",
              bottom: "1rem",
              left: "1rem",
              zIndex: "9999999999999",
              fontSize: "30",
              background: "#6495ed"

            }} type="button" onClick={(e) => {
              this.handleChangeState("TC")
            }}>Thermal Comfort
          </button>
          <button style={{
              position: "fixed",
              bottom: "3rem",
              left: "1rem",
              zIndex: "9999999999999",
              fontSize: "30"
            }} type="button" onClick={(e) => {
              this.handleChangeState("IEQ")
            }}>Indoor Environmnet</button>
        </div>
          ])
        : ([<div>
          <button style={{
              position: "fixed",
              bottom: "1rem",
              left: "1rem",
              zIndex: "9999999999999",
              fontSize: "30"

            }} type="button" onClick={(e) => {
              this.handleChangeState("TC")
            }}>Thermal Comfort
          </button>
          <button style={{
              position: "fixed",
              bottom: "3rem",
              left: "1rem",
              zIndex: "9999999999999",
              fontSize: "30",
              background: "#6495ed"

            }} type="button" onClick={(e) => {
              this.handleChangeState("IEQ")
            }}>Indoor Environmnet</button>
        </div>
          ])
    }
  </div>);
}
}
export default createContainer(params => {

return {
  roomvotes:Session.get('RoomsVotes')
  //then inside component onClick={()=>{props.meteorCall('notes.insert')}}
};
}, ThirdPartyPlayCanvas)
