import React from 'react';
import $ from 'jquery';
var data = [{
 id: 1,
  content: "This is the first"
},
 {
 id: 2,
 content: "This is the Second"}
];

var PostWrapper = React.createClass({
  loadPosts: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadPosts();
    setInterval(this.loadPosts, this.props.pollInterval);
  },
  render: function(){
    return ( 
      <div className="posts-wrapper">
      <h1>I am a post wrapper</h1>
        <Posts data={this.state.data} />
      </div>
      );
  }
});
var Posts = React.createClass({
  render: function() {
    var postsData = this.props.data.map(function(post) {
    return (
      <div className="{post.id}">
        {post.title}
      </div>
      );
});
    return(
      <div className="posts">
        {postsData}
        </div>
      );
  }
});
function MainBox () {
  return (
    <PostWrapper url="http://jsonplaceholder.typicode.com/posts" pollInterval={2000} />
  );
}

export default MainBox;