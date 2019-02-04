import React from 'react';
import ReactDOM from 'react-dom'
import Tweet from './tweet.js'
import Tweets from '../api/tweets'
import Tweeters from '../api/tweeters'
import AccountsWrapper from './AccountWrapper'
import tweetsContainer from './tweet.js'
import { withTracker } from 'meteor/react-meteor-data'
import '../../client/main.css'

class App extends React.Component{
  constructor(props){
    super(props);
    // this.allowMoreText = this.allowMoreText.bind(this)
    this.handleMore = this.handleMore.bind(this)
  }
  handleSubmit(e){
    e.preventDefault();
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim()
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
    Meteor.call('tweets.insert', text)
  }

  handleMore(e){
    maxLength = 30;
  }

  render(){
    let maxLength = 20;
    return(
      <div className="container">
        <AccountsWrapper />
        { 
          this.props.currentUser ? 
          <div>
            <form onSubmit = {this.handleSubmit.bind(this)}>
              <input 
                type="text"
                ref="textInput"
                placeholder="Add a New Tweet"
                maxLength = {maxLength}
                id="login-buttons"
              />             
            </form>
            <div className="moreButton"></div>
          </div>
          :
           ''
        }
        <Tweet tweets={this.props.tweets}/>
      </div>
    )
  }
}

export default usersContainer = withTracker(() => {
  Meteor.subscribe('tweets')
  Meteor.subscribe('tweeters')
  return {
    tweets: Tweets.find({}, { sort: { createdAt: -1 }}).fetch(),
    currentUser: Meteor.user(),
    tweeters: Tweeters.find({}).fetch(),
  }
})(App)
