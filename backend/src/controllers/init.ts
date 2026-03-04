import {promises as fs }from "node:fs";
import path from "node:path";


export async function initRepo() {
    const repoPath = path.resolve(process.cwd(), ".gitClone");
    const commitPath = path.join(repoPath, "commits");  
    
    try{
        await fs.mkdir(repoPath, { recursive: true });  
        await fs.mkdir(commitPath, { recursive: true });
        await fs.writeFile(
            path.join(repoPath, "config.json"),
            JSON.stringify({ bucket: process.env.S3_BUCKET_NAME || "my-git-bucket" })
        );
        console.log("Repository initialized successfully.");
    }catch(err){
        console.error("Error initializing repository:", err);       
    }
}