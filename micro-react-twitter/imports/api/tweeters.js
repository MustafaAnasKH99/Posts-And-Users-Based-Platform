import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'

export default Tweeters = new Mongo.Collection('tweeters')

Meteor.methods({
    'tweeters.updateFollowing'(tweet){
        if (!this.userId)
        {   console.log('You need to be logged in!')
            throw new Meteor.Error('not-authorized')    } 
        else if (tweet.owner == Meteor.userId())
        {   console.log('you cannot follow yourself')   }
        else if (Object.values(Tweeters.find({id: Meteor.userId()}).fetch()[0].following).includes(tweet.owner))
        // he is a follower already - unfollow
        {   Tweeters.update({id : Meteor.userId() }, {$pull: { following: tweet.owner }})
            Tweeters.update({id: tweet.owner}, {$pull: {followers: Meteor.userId()}})   }
        // follow
        else 
        {  Tweeters.update({id: Meteor.userId()}, {$push: {following: tweet.owner}})
           Tweeters.update({id: tweet.owner}, {$push: {followers: Meteor.userId()}})  }  
    }
})  

if(Meteor.isServer){
    Meteor.publish('tweeters', function tweetersPublication(){
        return Tweeters.find()
    })
}

// export default tweetersContainer = withTracker(() => {
//     Meteor.subscribe('tweeters')
//     return {
//       currentUser: Meteor.user(),
//       tweeters: Tweeters.find({}).fetch(),
//     }
//   })(Tweeters)
  