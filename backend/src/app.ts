import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { initRepo } from './controllers/init';    
import { addRepo } from './controllers/add'; 


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
      addRepo
   )
   .command("commit","Commit changes   ", {} , initRepo)
   .demandCommand(1,"Enter aleast one CMD:")
   .help()
   .parse()