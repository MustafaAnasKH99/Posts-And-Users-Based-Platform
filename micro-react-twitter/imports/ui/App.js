import React from 'react';
import ReactDOM from 'react-dom'
import Tweet from './tweet.js'
import Tweets from '../api/tweets'
import AccountsWrapper from './AccountWrapper'
import tweetsContainer from './tweet.js'
import { withTracker } from 'meteor/react-meteor-data'

class App extends React.Component{
  handleSubmit(e){
    e.preventDefault();
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim()
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
    Meteor.call('tweets.insert', text)
  }

  componentDidUpdate(){
    
  }

  render(){
    return(
      <div>
        <AccountsWrapper />
        {
          this.props.currentUser ? 
            <form onSubmit = {this.handleSubmit.bind(this)}>
              <input 
                type="text"
                ref="textInput"
                placeholder="Add a New Tweet"
              />
            </form>
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
  return {
    tweets: Tweets.find({}, { sort: { createdAt: -1 }}).fetch(),
    currentUser: Meteor.user()
  }
})(App)
