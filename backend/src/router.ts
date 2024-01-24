require('dotenv').config();

import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify";

const admin = require("./Features/Users/Admin/router");
const aluno = require("./Features/Users/Aluno/router");
const professor = require("./Features/Users/Professor/router");


export async function routes(fastify:FastifyInstance, options: FastifyPluginOptions){
    fastify.register(admin, {prefix: "/admin"});
    fastify.register(aluno, {prefix: "/aluno"});
    fastify.register(professor, {prefix: "/professor"});
}