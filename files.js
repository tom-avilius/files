
// importing the file-system module
import fs from 'node:fs'

// class to manage internal json files
// This class would be used to *create, access and track* files, particularly 
// json files for the application's internal use.
export default class ManageInternalFiles {

   
    constructor () {


    }


    // function to append key data
    static append = (path, key, data) => {

        // finding path if name is provided
        if(path.charAt(0) == '$') {

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
        if(path.charAt(0) == '$') {

            path = ManageInternalFiles.resolvePath(path);
        }

        // reading the file;
        try {

            return JSON.parse(fs.readFileSync(path, { encoding: 'utf-8' }));
        } catch (err) {

            console.error('Could not read file: ' +path);
            console.error(err);
        }
    
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

        try {

            ManageInternalFiles.append('$fileData.json', "names", fileName+'');
        } catch (err) {

            console.log(err);
        }
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


    // function to remove specified data from requested file
    static remove = (path, key) => {

        // finding path if name is provided
        if(path+''.charAt(0) == '$') {

            path = ManageInternalFiles.resolvePath(path);
        }

        // accessing the file
        const fileData = ManageInternalFiles.access(path);
        
        fs.readFile('./fileData.json', (err, data) => {

            const keys = data.keys();
            console.log((typeof keys) + keys);
        });

    }


    // function to resolve name of file into path 
    static resolvePath = (name='') => {

        // accessing the general config
        const config = ManageInternalFiles.access('./fileData.json');
        name = name.substring(1);

        // returning the file path
        try {

            const list = config.names;
            var path = "";
            var j = -1;
            list.forEach((val, index) => {

                if(val == name) {

                    j++;
                    path = config.paths[index];
                }
            })

            if (j == -1) {

                console.log('Name not recognized: ' +name);
            }

            return path;
        } catch (err) {

            console.error('Name not recognized: ' +name);
            console.error(err);
            return;
        }
    }


    // function to store data inside generalConfig
    static storeGeneralData = (data) => {

       ManageInternalFiles.write('$generalConfig', data+'');
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