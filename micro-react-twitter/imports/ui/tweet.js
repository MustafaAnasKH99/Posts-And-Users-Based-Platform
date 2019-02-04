import React, { Component } from 'react'
import Tweeters from '../api/tweeters'
import Tweets from '../api/tweets'
// import UsersCollection from '../api/users'

export default class Tweet extends Component {
  constructor(props){
    super(props)
    this.LikeClicked = this.LikeClicked.bind(this)
    this.DislikeClicked = this.DislikeClicked.bind(this)
    this.FollowClicked = this.FollowClicked.bind(this)
  }
  state = {
    Liked: false,
    Disliked: false,
  }

  FollowClicked(tweet){
    Meteor.call('tweeters.updateFollowing', tweet)
  }

  LikeClicked(tweet){
    Meteor.call('tweets.updateLikers', tweet)
    this.setState({Liked: !this.state.Liked})
    console.log(this.state.Liked)
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
    if(Meteor.userId()){
      if (tweet.owner === Meteor.userId() || tweet.status == 'Public' || (tweet.status == 'Followers' && Object.values(Tweeters.find({id: Meteor.userId()}).fetch()[0].following).includes(tweet.owner))){
      return (
        <div key={tweet._id}>
          <i>{tweet.username}</i>
          { 
            Object.values(Tweeters.find({id: Meteor.userId()}).fetch()[0].following).includes(tweet.owner) ? 
            <button onClick={() => this.FollowClicked(tweet)}>Unfollow</button> 
            : 
            <button onClick={() => this.FollowClicked(tweet)}>Follow</button> 
          }
          <p>{tweet.text}</p>  
  
          <span>
          {tweet.likersIds.includes(Meteor.userId()) ?  
          <button onClick={() => this.LikeClicked(tweet)}>Liked </button> 
          :
          <button onClick={() => this.LikeClicked(tweet)}>Like </button>}
          {tweet.likersIds.length} 
          </span>
          
          <span>
          {tweet.dislikersIds.includes(Meteor.userId()) ?
          <button onClick={() =>this.DislikeClicked(tweet)} >Disliked </button>
          :
          <button onClick={() =>this.DislikeClicked(tweet)} >Dislike </button>}
          {tweet.dislikersIds.length}
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
    } else if (tweet.status === 'Public'){
      return (
        <div key={tweet._id}>
          <i>{tweet.username}</i>
          <p>{tweet.text}</p>  

          <span>
          <button onClick={() => this.LikeClicked(tweet)}>Like</button>
          {tweet.likersIds.length} 
          </span>
          
          <span>
          <button onClick={() =>this.DislikeClicked(tweet)}>Dislike</button>
          {tweet.dislikersIds.length}
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