/* beesfud - a reddit-like parody of BuzzFeed.
  Copyright (C) 2016 Connor Hudson

  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program.  If not, see <http://www.gnu.org/licenses/>. */


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
    <BuzzList/>
    <AddBuzz/>
  </div>,
  document.getElementById('app'));
