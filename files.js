import path from 'path';

// importing the file-system module
const fs = require('fs');

// class to manage internal json files
// This class would be used to *create, access and track* files, particularly 
// json files for the application's internal use.
export default class ManageInternalFiles {

   
    constructor () {


    }


    // function to append key data
    static appendData = (path, key, data) => {

        // finding path if name is provided
        if(path+''.charAt(0) == '$') {

            path = ManageInternalFiles.resolvePath(path);
        }

        // accessing file
        var fileData = ManageInternalFiles.access(path);
        // appending new data;
        fileData[key].push(data+'');

        // converting object to string
        const fileString = JSON.stringify(fileData);

        // clearing the file
        ManageInternalFiles.clear(path);
        // writing to file
        ManageInternalFiles.write(path, fileString);
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


    // function to clear contents of specific file
    static clear = (path) => {

        // finding path if name is provided
        if(path+''.charAt(0) == '$') {

            path = ManageInternalFiles.resolvePath(path);
        }

        // clearing the file content
        try {

            fs.writeFile(path, "");
        } catch (err) {

            console.error('Could not clear the file: ' +path);
            console.error(err);
        }
    }


    // function to create specified file
    static create = (path, fileName) => {

        // creating empty file
        fs.writeFile(path, "", (err) => {

            if (err) {

                console.error('Could not create file: ' +path);
                console.error(err);
            }
        })

        ManageInternalFiles.appendData('$generalConfig.json', "names", fileName+'');
    }


    // function to delete the specified file.
    static delete = (path) => {

        // finding path if name is provided
        if(path+''.charAt(0) == '$') {

            path = ManageInternalFiles.resolvePath(path);
        }
 
        // removing the file
        try {

            fs.rm(path);
        } catch (err) {

            console.error('Could not delete file: ' +path);
            console.error(err);
        }
    }


    // function to print the details of the specified file.
    static listContents = (path) => {

        // accessing the specified file
        const fileObject = ManageInternalFiles.access(path);
        // converting it to string
        const fileString = JSON.stringify(fileObject);

        console.log(fileString);
    }


    // This function would list the various files that are managed by the ManageInternalFiles Class.
    static listFiles = () => {

        // accessing the fileData file
        const files = ManageInternalFiles.access('./fileData.json');

        // loop variable
        var i = 0;
        // traversing through each element of the files array to display name and path
        files.names.forEach(element => {
            
            console.log(element +'\t' +files.paths[i]);
            i++;
        });
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


    // function to append to a certain file.
    static write = (path, data) => {

        // finding path if name is provided
        if(path+''.charAt(0) == '$') {

            path = ManageInternalFiles.resolvePath(path);
        }

        // accessing the file
        const initialFileObject = ManageInternalFiles.access(path);
        // converting it to string
        const initialFileString = JSON.stringify(initialFileObject);

        // appending the data
        const finalFileString = initialFileString+data;

        // writing data
        fs.writeFile(path, finalFileString, (err) => {

            if(err) {

                console.error('Could not write to file: ' +path);
                console.error(err);
            }
        });
    }
}