let apiRoot = "";

console.log("import.meta.env : ", import.meta.env);
console.log("process.env : ", process.env);

if (process.env.BUILD_MODE === "production") {
    apiRoot = "https://endlessly-enabling-husky.ngrok-free.app";
}

if (process.env.BUILD_MODE === "dev") {
    apiRoot = "https://endlessly-enabling-husky.ngrok-free.app";
}

console.log("apiRoot", apiRoot);

export const API_ROOT = apiRoot;
