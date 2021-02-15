/*
start with node index.js
*/

const path = require("path");
const grpc = require("@grpc/grpc-js");
const protoLoader =  require("@grpc/proto-loader");

//load the proto definition with protoloader and into gRPC framework
const proto = protoLoader.loadSync(path.join(__dirname, "..", "posts_service.proto"));
const definiton = grpc.loadPackageDefinition(proto);

//list of posts
const postList = [
    {id: 1, title: 'Title 1', text: 'Text 1'},
    {id: 1, title: 'Title 2', text: 'Text 2'},
];

//getPosts receives the call and returns list of posts
const getPosts = (call, callback) =>  {
    callback(null, {posts: postList})
};

//create gRPC server and assign the service
const serverURL = 'localhost:8999';
const server = new grpc.Server();
server.addService(definiton.PostService.service, { getPosts});
//will not be using creds/certs for this
server.bindAsync(serverURL, grpc.ServerCredentials.createInsecure(), port => {
    console.log(`Server Running on ${serverURL}`)
    server.start()
})
