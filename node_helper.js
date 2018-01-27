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
        console.log((new Date(Date.now())).toLocaleTimeString() + ': Getting feed for module ' + this.name);
        var opt = {
            uri: 'http://api.krisinformation.se/v1/capmessage?format=json',
            //uri: 'http://api.krisinformation.se/v1/feed',
            qs : {
            },
            json: true
        };
        console.log('Calling '+opt.uri);
        request(opt)
            .then(function(resp) {
                var feeds = self.filterFeed(resp);
                console.log((new Date(Date.now())).toLocaleTimeString() 
                    + ": "+ this.name +" - Sending NEW_FEED count: "+feeds.length + " Org: " + resp.length);
                self.sendSocketNotification('NEW_FEED', feeds); // Send feed to module
            })
            .catch(function(err) {
                console.log('Problems with '+ this.name +': '+err);
                self.sendSocketNotification('SERVICE_FAILURE', {resp: {StatusCode: 600, Message: err}}); 
            });
    },

    // --------------------------------------- Filter feeds according to config
    filterFeed: function(resp) {
        if (this.config.areas === undefined || this.config.areas.length < 1) return resp;
        var feeds = [];
        for (var ix = 0; ix < resp.length; ix++) {
            var inc = false;
            var feed = resp[ix];
            var areas = feed.InfoData[0].Area;
            //console.log("Looking at "+ feed.Identifier);
            if (areas === undefined || areas === null) inc = true; // Always include iof there's no area defined
            else {
                for (var ia = 0; ia < areas.length; ia++) {
                    for (var iad = 0; iad < this.config.areas.length; iad++) {
                        if (areas[ia].AreaDesc == this.config.areas[iad]) inc = true;
                    }
                    if (this.config.alwaysNational && areas[ia].AreaDesc == "Sverige") inc = true;
                }
            }
            if (inc) feeds.push(feed);
        }
        return feeds;
    },

    // --------------------------------------- Handle notifications
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
