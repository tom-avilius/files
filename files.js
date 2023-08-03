
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
    

    // This function would allow the programmer to access the requested file as json object.
    static access = (path) => {

        // find path when name is given
        if(path+''.charAt(0) == '$') {

            path = ManageInternalFiles.resolvePath(path);
        }

        // reading the file;
        fs.readFile(path+'', (err, jsonString) => {

            if(err) {

                console.error('Failed to read file from disk: ' +path);
                return;
            } 

            // parsing as a js object
            try {

                const data = JSON.parse(jsonString);
                return data;
            } catch (err) {

                console.err('Failed to parse json string: ' +path);
                return;
            }
        })
    }
}