import { time } from "node:console";
import { promises as fs } from "node:fs";
import path from "node:path";
import { v4 as uuidv4 } from "uuid";  

export async function commitRepo({message}: {message: string}) {
    const repoPath = path.resolve( process.cwd(), ".gitClone");
    const staggingPath = path.join(repoPath, "stagging");
    const commitPath = path.join(repoPath, "commits");

    try{
        const commitID = uuidv4();  
        const commitDir = path.join(commitPath, commitID);

        await fs.mkdir(commitDir, { recursive: true });

        const files = await fs.readdir(staggingPath);
        for(const file of files){
            await fs.copyFile(
                path.join(staggingPath, file), 
                path.join(commitDir, file)
            );
        }

        await fs.writeFile( 
            path.join(commitDir, "commit.json"),
            JSON.stringify({ message, timeStamp: new Date().toISOString()})
        );

        console.log(`Committed with ID: ${commitID}`);
    }catch(err){
        console.error("Error committing repository:", err);
    }
}