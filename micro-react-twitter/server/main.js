import { Meteor } from 'meteor/meteor';
import Tweets from '/imports/api/tweets';
import Tweeters from '/imports/api/tweeters'
import React from 'react'
import { Accounts } from 'meteor/accounts-base';

Accounts.onCreateUser(function(options, user) {
  // user.followers = []
  // user.following = []
  // if (options.profile)
  //     user.profile = options.profile;
  // return user;
  console.log(user.id)
  Tweeters.insert({
    id: user._id,
    username: user.username,
    followers: [],
    following: []
  })
  return user
});

function insertTweet(text, like, dislike, status, chars) {
  Tweets.insert({ text, chars, status, owner, likersIds: [], dislikersIds: []  });
}

Meteor.startup(() => {
  if (Tweets.find().count() === 0) {
    insertTweet(
      'this is the first tweet - its text',
      '0',
      'Public',
      'userID',
      [],
      [],
    );
  }
})
