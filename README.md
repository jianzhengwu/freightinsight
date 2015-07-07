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

difference between res.render and res.sendfile: The render method works when you have a templating engine in use such as handlebars.js or jade. A templating engine is a node module assosiated with express (which some people refer to as an express plugin) which parses the template file and genereated the HTML output. The sendfile method simply sends the file to the client. Since you are using an HTML file, there is nothing particularly to be parsed by the templating engine. So, the output of render is same as that of sendfile (i.e., the HTML written in the file). Hence, both produce the same result.

app.get (name) returns the value of app.set (name, value)

when using require (a folder), if there is no package.json file present in the folder, then node will attempt to load an index.js or index.node file out of that folder.