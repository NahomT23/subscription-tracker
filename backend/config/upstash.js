import { Client as WorkflowClient } from "@upstash/workflow"
import { configDotenv } from 'dotenv';
configDotenv()

const QSTASH_URL = process.env.QSTASH_URL
const QSTASH_TOKEN = process.env.QSTASH_TOKEN

export const workflowClient = new WorkflowClient({
    baseUrl: QSTASH_URL,
    token: QSTASH_TOKEN
})



