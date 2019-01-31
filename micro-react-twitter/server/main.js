import { Meteor } from 'meteor/meteor';
import Tweets from '/imports/api/tweets';
import React from 'react'

function insertTweet(text, like, dislike, status, chars) {
  // Tweets.insert({ title, url, createdAt: new Date() });
  Tweets.insert({ text, chars, status, createdAt, owner, username, likersIds, dislikersIds  });
}

Meteor.startup(() => {
  // If the Links collection is empty, add some data.
  if (Tweets.find().count() === 0) {
    insertTweet(
      'this is the first tweet - its text',
      '0',
      'Public',
      new Date(),
      Meteor.userId(),
      Meteor.user().username,
      [],
      [],
    );
  }
})
