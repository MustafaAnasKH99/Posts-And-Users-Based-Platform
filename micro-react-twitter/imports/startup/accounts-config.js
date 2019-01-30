import { Accounts } from 'meteor/accounts-base'

// signup using usernames instead of emails
Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY'
})