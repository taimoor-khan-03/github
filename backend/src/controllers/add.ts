import { promises as fs } from "node:fs";
import path from "node:path";

export async function addRepo({filePath}: {filePath: string}    ) {
    const repoPath = path.resolve(process.cwd(), ".gitClone");
    const staggingPath = path.join(repoPath, "stagging");

    try{

        await fs.mkdir(staggingPath, { recursive: true });
        //Extract the file name from the provided file path
        const fileName = path.basename(filePath); 
        await fs.copyFile(filePath, path.join(staggingPath, fileName));
        console.log(`File ${fileName} added to staging area.`);

    }catch(err){

        console.error("Error adding repository:", err);

    }
}