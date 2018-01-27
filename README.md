# MMM-CrisisInformationSweden
[Magic Mirror](https://magicmirror.builders/) Module - News feed from the Swedish Government Crisis Information 
[Krisinformation.se](https://www.krisinformation.se/engelska).

The current feed in json format can be obtained here [http://api.krisinformation.se/v1/capmessage?format=json](http://api.krisinformation.se/v1/capmessage?format=json)


## Install
1. Clone repository into ``../modules/`` inside your MagicMirror folder.
2. Run ``npm install`` inside ``../modules/MMM-CrisisInformationSweden/`` folder
3. Add the module to the MagicMirror config

## Update
1. Run ``git pull`` inside ``../modules/MMM-CrisisInformationSweden/`` folder.
2. Run ``npm install`` inside ``../modules/MMM-CrisisInformationSweden/`` folder

## Configuration
```
modules: [
    ...
    {
        module: 'MMM-CrisisInformationSweden',
        position: 'top_right',
        config: {
            updateInterval: 30*60*1000,     // Optional. Number of ms between API updates.
            uiUpdateInterval: 10*1000,      // Optional. Number of ms between changing to next announcement.
            alwaysNational: true,           // Optional, Regardless of other settings always show national info.
            areas: [],                      // Optional. An array of strings with area names. 
                                            // Only those messages aimed at the areas listed in the array are shown. 
                                            // The strings must match exactly with the AreaDesc of the message.
                                            // If empty or undefined show all messages. Not implemented yet.
            showDescription: true,          // Optional. Show message description.
            oldest: 7,                      // Optional. Dont show messages older then this number of days.
            debug: false                    // Optional. Enable some extra output when debugging
        }
    },
    ...
]
```


## Screenshot

![MMM-CrisisInformationSweden Module](https://github.com/boghammar/MMM-CrisisInformationSweden/blob/master/docs/ScreenShot2.PNG)
