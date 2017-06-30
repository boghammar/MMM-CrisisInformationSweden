/* MMM-CrisisInformationSweden.js
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
Module.register("MMM-CrisisInformationSweden", {
    // --------------------------------------- Define module defaults
    defaults: {
        alwaysNational: true,           // Optional, Regardless of other settings always show national info. Not implemented yet
        distance: -1,                   // Optional. Only info within a radius of distance km. Not implemented yet.
        updateInterval: 10*60*1000,     // Optional. Number of ms between API updates. Not implemented yet.
        uiUpdateInterval: 10*1000,      // Optional. Number of ms between changing to next announcement. Not implemented yet.
    },
    
    // --------------------------------------- Start the module
    start: function() {
        Log.info("Starting module: " + this.name);
    },

    // --------------------------------------- Generate dom for module
    getDom: function() {
        var wrapper = document.createElement("div");

        return wrapper;
    },

    // --------------------------------------- Handle socketnotifications
    socketNotificationReceived: function(notification, payload) {
    },

})
