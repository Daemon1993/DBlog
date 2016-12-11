/**
 * Created by Daemon1993 on 16/12/11.
 */

/**
 * file  save localdir
 * @param file
 * @param dir
 */
export function saveFile2Dir(fileData, fileName) {

    var path = require('path');

    console.log(__dirname);
    console.log(__filename);

    window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;



    window.webkitRequestFileSystem(window.TEMPORARY,
        2 * 1024 * 1024,
        function (fs) {
            fs.root.getFile( fileName,
                {create: true},
                function (fileEntry) {
                    // Create a FileWriter object for our FileEntry (log.txt).
                    fileEntry.createWriter(function (fileWriter) {

                        fileWriter.onwriteend = function (e) {
                            console.log('Write completed.'+e.toString());
                        };

                        fileWriter.onerror = function (e) {
                            console.log('Write failed: ' + e.toString());
                        };

                        // Create a new Blob and write it to log.txt.
                        var blob = new Blob([fileData],
                            {type : 'image/jpng'});

                        fileWriter.write(blob);

                    }, errorHandler);

                }, errorHandler);
        });
}

function errorHandler(e) {
        console.log('Error: ' + e);
}