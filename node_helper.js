/* node_helper.js
 *
 * Magic Mirror module - News feed from the Swedish Government Crisis Information (Krisinformation.se). 
 * 
 * Magic Mirror
 * Module: MMM-CrisisInformationSweden
 * 
 * Magic Mirror By Michael Teeuw http://michaelteeuw.nl
 * MIT Licensed.
 * 
 * Module MMM-CrisisInformationSweden By Anders Boghammar
 */
const NodeHelper = require("node_helper");
const request = require("request-promise");

module.exports = NodeHelper.create({
    // --------------------------------------- Start the helper
    start: function() {
        console.log('Starting helper: '+ this.name);
        this.started = false;
    },

    // --------------------------------------- Schedule a feed update
    scheduleUpdate: function() {
        var self = this;
        this.updatetimer = setInterval(function() { // This timer is saved in uitimer so that we can cancel it
            self.getFeed();
        }, self.config.updateInterval);
    },

    // --------------------------------------- Retrive new feed
    getFeed: function() {
        var self = this;
        console.log((new Date(Date.now())).toLocaleTimeString() + ': Getting feed ' + this.name);
        var opt = {
            uri: 'http://api.krisinformation.se/v1/feed',
            qs : {
            },
            json: true
        };
        console.log('Calling '+opt.uri);
        request(opt)
            .then(function(resp) {
                var feeds = resp;
                console.log((new Date(Date.now())).toLocaleTimeString() + ": Sending NEW_FEED "+feeds + " num: "+feeds.length);
                self.sendSocketNotification('NEW_FEED', feeds); // Send feed to module
            })
            .catch(function(err) {
                console.log('Problems: '+err);
                self.sendSocketNotification('SERVICE_FAILURE', {resp: {StatusCode: 600, Message: err}}); 
            });
    },

    // --------------------------------------- Handle notifocations
    socketNotificationReceived: function(notification, payload) {
        const self = this;
        if (notification === 'CONFIG' && this.started == false) {
		    this.config = payload;	     
		    this.started = true;
		    self.scheduleUpdate();
            self.getFeed(); // Get it first time
        };
    }

});
