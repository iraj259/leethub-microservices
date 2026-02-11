const { Queue } = require ("bullmq")
const redisConnection = ("../config/redisConfig.js");

module.exports= new Queue('SubmissionQueue', {connection:redisConnection})