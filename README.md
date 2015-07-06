# freightinsight
##process
1. do grunt serve, this will use Gruntfile.js task "serve" (grunt.registerTask('serve', function (target)) to lauches all the tasks defined in "serve". Please note that grunt serve:dist lauches the tasks defined in the target "dist"
2. the "serve" task clean the temperal build files and launch the Express() server 
3. the Express server bootstrap with app.js consisting of: 
4. Setting up http server 
5. Express server configuration (config/express.js)
6. Middleware (config/express.js), i.e. Express execute certain operations before the request reaches the route handlers
7. Route handlers (route.js), i.e. all requests with a URI will be routed by a route handler to the appropriate api
8. API operation (server/api...), i.e. dedicated server operation for an incomming http request, handling and return the response to client 


## tips
When require is given the path of a folder, it'll look for an index.js in that folder; if there is one, it uses that, and if there isn't, it fails

the function start with ._, e.g. ._merge is lodash utility.

explanation about NODE_ENV http://wmyers.github.io/technical/nodejs/Setting-environment-variables-in-node-with-the-angular-fullstack-generator/

exports is a reference to the module.exports that is shorter to type
