import React, { Component } from 'react'
import Tweets from '../api/tweets'

export default class Tweet extends Component {
  constructor(props){
    super(props)
    this.LikeClicked = this.LikeClicked.bind(this)
    this.DislikeClicked = this.DislikeClicked.bind(this)
  }
  state = {
    Liked: false,
    Disliked: false,
  }

  LikeClicked(tweet){
    Meteor.call('tweets.updateLikers', tweet)
    this.setState({Liked: !this.state.Liked})
  }

  DislikeClicked(tweet){
    Meteor.call('tweets.updateDislikers', tweet)
    this.setState({Disliked: !this.state.Disliked})
  }

  render() {
    const tweets = this.props.tweets.map(
      tweet => this.createTweet(tweet)
    )

    return (
      <div>
          <strong>Tweets</strong>
          <div>{ tweets }</div>
      </div>
    );
  }

  createTweet(tweet){
    console.log(this.state.Liked)
    console.log(this.state.Disliked)
    if (tweet.owner === Meteor.userId() || tweet.status == 'Public' || tweet.status == 'Followers') {
    return (
      <div key={tweet._id}>
        <i>{tweet.username}</i>
        <p>{tweet.text}</p>  

        <span>
        {this.state.Liked ?  
        <button onClick={() => this.LikeClicked(tweet)}>Liked </button> 
        :
        <button onClick={() => this.LikeClicked(tweet)}>Like </button>}
        {tweet.like} 
        </span>
        
        <span>
        {this.state.Disliked ?
        <button onClick={() =>this.DislikeClicked(tweet)} >Disliked </button>
        :
        <button onClick={() =>this.DislikeClicked(tweet)} >Dislike </button>}
        {tweet.dislike}
        </span>

        <span><button onClick={() => Meteor.call('tweets.updateStatus', tweet)}>Status: </button>{tweet.status}</span>
        <span>Chars: {tweet.chars}</span>
        <button className="deleteTweet" onClick={() => Meteor.call('tweets.remove', tweet)}>X</button>
        <hr
          style={{
              color: 'black',
              backgroundColor: 'black',
              height: 1,
              width: '30%',
              marginTop: '10px'
          }}
        />
      </div>
      )
    }
  }
}

// export default tweetsContainer = withTracker(() => {
//   Meteor.subscribe('tweets')
//   return {
//     tweets: Tweets.find({}, { sort: { createdAt: -1 }}).fetch(),
//     currentUser: Meteor.user()
//   }
// })(Tweet)