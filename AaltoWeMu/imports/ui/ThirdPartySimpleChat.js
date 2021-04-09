import React,{Component} from 'react';
import PropTypes from 'prop-types';
export default class ThirdPartyPlayCanvas extends Component {
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
  const script2 = document.createElement("script");
  script2.src = "s-chat-support.js";
  script2.async = true;
  document.body.appendChild(script2);
  // const script3 = document.createElement("script");
  // script3.src = "s-chat-configration.js";
  // script3.async = true;
  // document.body.appendChild(script3);

}
  render() {

    return (
      <div></div>
    );
  }
}
