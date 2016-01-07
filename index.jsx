var React = require('react');
var Buzz = require('./buzzfeed.js');

var BuzzList = React.createClass({
  mixins: [ReactFireMixin],
  render: function() {
    var items = this.state.items.map(
      function(item) {
        return(
          <div id="item">
            <Voter votes={item.votes} uuid={item['.key']} text={item.text}/>
            <div id="text">{item.text}</div>
          </div>
        );
      }
    );
    return <div id="list">{items}</div>;
  },
  componentWillMount: function() {
  var ref = new Firebase("https://beesfud.firebaseio.com/items");
  this.bindAsArray(ref, "items");
  /*this.firebaseRefs['items'].push({
        text: "These 41 Smart People Will Bring You To Tears.",
        votes: 0
      });*/
  }
});


var Voter = React.createClass({
  mixins: [ReactFireMixin],
  componentWillMount: function() {
    this.ref = new Firebase("https://beesfud.firebaseio.com/items/" + this.props.uuid);
    this.bindAsObject(this.ref, "item");
  },
  getInitialState: function(){
    return {
      uuid: this.props.uuid
    };
  },
  upvote: function(){
    if (this.ref.key() != this.props.uuid){
      this.setState({
        uuid: this.props.uuid
      });
      this.unbind("item");
      this.componentWillMount();
    }
    this.ref.setPriority((this.props.votes + 1)*-1);
    this.ref.update({
      text: this.props.text,
      votes: this.props.votes + 1
    });
  },
  render: function(){
    return (
      <div id="voter"><span id="up" onClick={this.upvote}>+</span>{this.props.votes}</div>
    );
  }
});
var AddBuzz = React.createClass({
  mixins: [ReactFireMixin],
  componentWillMount: function() {
    var ref = new Firebase("https://beesfud.firebaseio.com/items");
    this.bindAsArray(ref, "items");
  },
  add: function(){
    this.firebaseRefs.items.push({
      text: Buzz.feed(),
      votes: 0
    }).setPriority(0);
  },
  render: function(){
    return(
      <div><span id="add" onClick={this.add}>++</span></div>
    );
  }
});

React.render(
  <div>
  <AddBuzz/>
  <BuzzList/>
  </div>,
  document.getElementById('app'));
