import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

// Importing the controller functions for handling the commands   
import { initRepo } from './controllers/init';    
import { addRepo } from './controllers/add'; 
import { commitRepo } from './controllers/commit';
import { pullRepo } from './controllers/pull';
import { pushRepo } from './controllers/push';     
import { revertRepo } from './controllers/revert';



yargs(hideBin(process.argv))
   .command("init","Initialize new repo", {} , initRepo)
   .command(
      "add <file>",
      "Add file to staging area  ",
      (yargs) => {
         yargs.positional("file",{
            description: "File added to staging area",
            type: "string",   
         })
      },
      (argv) => addRepo({filePath: argv.file as string})
   )
   .command(
      "commit <message>",
      "Commit changes   ",
      (yargs) => {
         yargs.positional("message",{
            description: "Commit message",
            type: "string",
         })
      }, 
      (argv) => commitRepo({message: argv.message as string})
   )
   .command("pull","Pull changes from remote repository", {} , pullRepo)   
   .command("push","Push changes to remote repository", {} , pushRepo)   
   .command("revert <commitID>","Revert changes in repository", {} , revertRepo)   
   .demandCommand(1,"Enter aleast one CMD:")
   .help()
   .parse()