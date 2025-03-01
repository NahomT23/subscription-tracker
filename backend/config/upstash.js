// import { Client as WorkflowClient } from "@upstash/workflow"
// import { configDotenv } from 'dotenv';
// configDotenv()

// const QSTASH_URL = process.env.QSTASH_URL
// const QSTASH_TOKEN = process.env.QSTASH_TOKEN

// export const workflowClient = new WorkflowClient({
//     baseUrl: QSTASH_URL,
//     token: QSTASH_TOKEN
// })




// workflow.config.js (modified)
import { Client as WorkflowClient } from "@upstash/workflow";
import { configDotenv } from 'dotenv';

configDotenv();

export const workflowClient = new WorkflowClient({
  baseUrl: process.env.QSTASH_URL,
  token: process.env.QSTASH_TOKEN,
  // Add explicit callback URL for production
  callbackBaseUrl: process.env.NODE_ENV === 'production' 
    ? 'https://subscription-tracker-wwul.vercel.app/api/v1/workflows'
    : 'http://localhost:4000/api/workflows'
});