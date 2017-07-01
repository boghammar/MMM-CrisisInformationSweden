# MMM-CrisisInformationSweden
[Magic Mirror](https://magicmirror.builders/) Module - News feed from the Swedish Government Crisis Information 
[Krisinformation.se](https://www.krisinformation.se/engelska)


## Install
1. Clone repository into ``../modules/`` inside your MagicMirror folder.
2. Run ``npm install`` inside ``../modules/MMM-CrisisInformationSweden/`` folder
4. Add the module to the MagicMirror config

## Configuration
```
modules: [
    ...
    {
        module: 'MMM-CrisisInformationSweden',
        position: 'top-right'
        config: {
            updateInterval: 10*60*1000,     // Optional. Number of ms between API updates. Not implemented yet.
            uiUpdateInterval: 10*1000,      // Optional. Number of ms between changing to next announcement. Not implemented yet.
            alwaysNational: true,           // Optional, Regardless of other settings always show national info. Not implemented yet
            areas: [],                      // Optional. An array of strings with area names. 
                                            // Only those messages aimed at the areas listed in the array are shown. 
                                            // If empty or undefined show all messages. Not implemented yet.
            showDescription: true,          // Optional. Show message description. Not yet implemented.
            oldest: 7,                      // Optional. Dont show messages older then this number of days. Not yet implemented.
        }
    },
    ...
]
```


## Screenshoot

__TBD__
