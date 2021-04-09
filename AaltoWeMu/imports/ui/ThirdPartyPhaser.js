import React,{Component} from 'react';
import PropTypes from 'prop-types';

export default class PhaserComp extends Component {
  state = {
    options: []}

  handleDeleteOptions=()=> {
    this.setState(() => ({ options: [] }));
  };
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
componentDidMount() {


  var game = new Phaser.Game(window.innerWidth, 600, Phaser.CANVAS , document.getElementById("phaser-example"), { preload: preload, create: create });
  function preload() {

      game.load.image('TheEnd', 'Bounty_Hunter_by_Anathematixs_Desire.png');
      game.load.image('BountyHunter', 'Anarchy_Road_by_Max_Blazer.png');

  }

  var pic;

  function create() {

      pic = game.add.sprite(game.world.centerX, game.world.centerY, 'TheEnd');
      pic.alpha = 0.5;
      pic.anchor.set(0.5);
      pic.scale.set(0.6);

      game.add.text(16, 16, "tap or double-tap the image", { font: "32px Arial", fill: "#ffffff" });
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

   //have the game centered horizontally

   this.scale.pageAlignHorizontally = true;

   this.scale.pageAlignVertically = true;

   //screen size will be set automatically

   this.scale.updateLayout(true);
      game.input.onTap.add(onTap, this);

  }

  function onTap(pointer, doubleTap) {

      if (doubleTap)
      {
          //  They double-tapped, so swap the image
          if (pic.key === 'TheEnd')
          {
              pic.loadTexture('BountyHunter');
          }
          else
          {
              pic.loadTexture('TheEnd');
          }
      }
      else
      {
          //  A single tap (tap duration was < game.input.tapRate) so change alpha
          pic.alpha = (pic.alpha === 0.5) ? 1 : 0.5;
      }

  }






}


  render() {

    return (
      <div id='phaser-example' ref='phaserr' ></div>
    );
  }
}
