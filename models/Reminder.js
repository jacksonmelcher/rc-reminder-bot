/*
You can use setTimeout() and keep all the work inside your server, but for a large number of users, 
you would not necessarily want to set a timeout for every single user. All you really need is a single 
timeout for the next user that needs to be notified. When that timer fires, you then set a timer for the 
next user that needs to be notified and so on.

This can be done with an array of objects that you sort by the notification time. Each time you add something 
to the array, you cancel your current timer, add the new notification to the array, sort the array and set a 
timer for the earliest notification.

When a timer fires, you remove that item from the array and schedule the next one.

And, since you likely want this to survive a server restart, you save the notification array (probably in JSON format) 
to a file or to a database each time you modify it so you can reload that data upon a server restart.

FYI, there are scheduling modules for node.js that already offer this type of functionality if you'd prefer to 
pick up code someone else has already written.

https://stackoverflow.com/questions/36803497/call-nodejs-function-at-a-specific-moment-in-time
*/

import moment from 'moment';

class Reminder {
    constructor() {
        this._id = null;
        this._creator = null;
        this._timeCreated = null;
        this._notificationTime = null;
        this._reminderText = null;
        this._reminded = false;
        this._duration = null;
    }

    /**
     * @returns {any}
     */
    get creator() {
        return this._creator;
    }
    get id() {
        return this._id;
    }
    get timeCreated() {
        return this._timeCreated;
    }
    get notificationTime() {
        return this._notificationTime;
    }
    get reminderText() {
        return this._reminderText;
    }
    get duration() {
        return this._duration;
    }
    get reminded() {
        return this._reminded;
    }

    set id(updatedId) {
        this._id = updatedId;
    }
    set creator(updatedCreator) {
        this._creator = updatedCreator;
    }
    set timeCreated(updatedTimeCreated) {
        this._timeCreated = updatedTimeCreated;
    }
    set reminderText(updatedReminderText) {
        this._reminderText = updatedReminderText;
    }
    set notificationTime(updatedNotificationtime) {
        if (moment() < updatedNotificationtime) {
            this._notificationTime = updatedNotificationtime;
        } else {
            this._notificationTime = 'PAST';
        }
    }
    set duration(updatedDuration) {
        this._duration = updatedDuration;
    }
    set reminded(updatedReminded) {
        this._reminded = updatedReminded;
    }
}

export default Reminder;
