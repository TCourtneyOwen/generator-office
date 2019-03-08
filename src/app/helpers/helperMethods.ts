import * as childProcess from "child_process";
const fs = require('fs');
import * as wget from "node-wget";
import { MemoVoidDictionaryIterator } from "lodash";

export namespace helperMethods {

    export function deleteFolderRecursively(projectFolder: string) 
    {
        if(fs.existsSync(projectFolder))
        {
            fs.readdirSync(projectFolder).forEach(function(file,index){ 
            var curPath = projectFolder + "/" + file; 
            
            if(fs.lstatSync(curPath).isDirectory())
            {
                deleteFolderRecursively(curPath);
            }
            else
            {
                fs.unlinkSync(curPath);
            }
        }); 
        fs.rmdirSync(projectFolder); 
        }
    };

    export function doesProjectFolderExists (projectFolder: string)
    {      
    if (fs.existsSync(projectFolder))
        {
        if (fs.readdirSync(projectFolder).length > 0)
        {          
            return true;
        }
        }
        return false;
    };

    export async function createReactApp(projectFolder: string): Promise<boolean> {
        return new Promise<boolean>(async (resolve, reject) => {
            const cmdLine: string = `create-react-app ${projectFolder}`;
            await childProcess.exec(cmdLine, (error) => {
                return error ? reject(false) : resolve(true);
            });
        });
    }

    export async function copyRepoFiles(projectFolder: string): Promise<boolean> {
        return new Promise<boolean>(async (resolve, reject) => {
            await wget({
                url: 'https://github.com/OfficeDev/Office-Addin-TaskPane-React-JS/blob/master/src',
                dest: `${projectFolder}/src/`
            },
            function (error) {
                return error ? reject(false) : resolve(true);
            })
        });
    }
};