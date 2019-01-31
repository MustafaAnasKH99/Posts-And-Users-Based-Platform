import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import { check } from 'meteor/check'

export default Tweets = new Mongo.Collection('tweets');

Meteor.methods({
    // create a tweet - missing logged-in checking
    'tweets.insert'(text){
        check(text, String);
        Tweets.insert({
        text: text,
        status: 'Public',
        chars: text.length,
        createdAt: new Date(),
        owner: Meteor.userId(),
        username: Meteor.user().username,
        likersIds: [],
        dislikersIds: []
        })
    },

    // remove the post
    'tweets.remove'(tweet){
        if (!this.userId){
            alert('You need to be logged in!')
            throw new Meteor.Error('not-authorized')
        }   else if (tweet.owner !== Meteor.userId())    {
            alert('YOU ARE NOT AUTHORIZED!')
            throw new Meteor.Error('not-authorized')
        }   else    {
            Tweets.remove(tweet._id)
        }
    },

    // update the privacy of the tweet
    'tweets.updateStatus'(tweet){
        if(tweet.owner == Meteor.userId()){
            if (!this.userId){
                alert('You need to be logged in!')
                throw new Meteor.Error('not-authorized')
            }
            if(tweet.status === 'Private'){
                Tweets.update(tweet._id, { $set: { status: 'Public'} })
            } else if (tweet.status === 'Public'){
                Tweets.update(tweet._id, { $set: { status: 'Followers'} })
            } else if (tweet.status === 'Followers'){
                Tweets.update(tweet._id, { $set: { status: 'Private'} })
            }
        } else {
            alert('YOU ARE NOT AUTHORIZED!')
            throw new Meteor.Error('not-authorized')
        }
    },
    // push/pull the id of the user in the tweet's likersIds Array
    'tweets.updateLikers'(tweet){
        if (!this.userId){
            alert('You need to be logged in!')
            throw new Meteor.Error('not-authorized')
        } else {
        if (tweet.likersIds.includes(Meteor.userId())){
            Tweets.update(tweet._id, { $pull: { likersIds: Meteor.userId() } })
        } else {
            Tweets.update(tweet._id, { $push: { likersIds: Meteor.userId() } })
        }
        }
    },
    // push/pull the id of the user in the tweet's dislikersIds Array
    'tweets.updateDislikers'(tweet){
        if (!this.userId){
            alert('You need to be logged in!')
            throw new Meteor.Error('not-authorized')
        } else {
            if (tweet.dislikersIds.includes(Meteor.userId())){
                Tweets.update(tweet._id, { $pull: { dislikersIds: Meteor.userId() } })
            } else {
                Tweets.update(tweet._id, { $push: { dislikersIds: Meteor.userId() } })
            }
        }
    }
})

// publish the collection if Meteor is run on the server (isServer)
if(Meteor.isServer){
    Meteor.publish('tweets', function tweetsPublication(){
        return Tweets.find()
    });
}