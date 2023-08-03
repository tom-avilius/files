
// importing the file-system module
const fs = require('fs');

// class to manage internal json files
// This class would be used to *create, access and track* files, particularly 
// json files for the application's internal use.
export default class ManageInternalFiles {

    // an empty constructor
    constructor () {

    }

    
    // function to resolve name of file into path 
    static resolvePath = (name) => {

        // accessing the general config
        const config = ManageInternalFiles.access('./generalConfig.json');

        // returning the file path
        try {

            return config.name+'';
        } catch (err) {

            console.error('Name not recognized: ' +name);
            return;
        }
    }
}