import React from 'react'
import { Meteor } from 'meteor/meteor'
import { render } from 'react-dom'

// import '../imports/ui/routes'
import '../imports/startup/accounts-config.js'
import App from '../imports/ui/App'

// render App on startup
Meteor.startup(() => {
    render(<App/>, document.getElementById('react-target'))
})