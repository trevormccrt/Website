#WARG Website

######The official WARG website found at [www.uwarg.com](http://www.uwarg.com)

Unlike the previous version of the website, the new website runs on a Node.js based server. The actual website is hosted on [heroku](http://heroku.com).

#Setting Up Your Development Environment
##Installation
If you want to modify/update the website, follow the following steps to set up your development environment:
 1. Install [Node.js](https://nodejs.org/en/)
 2. Install [Ruby](https://www.ruby-lang.org/en/)
 3. Open up the terminal
 4. Run `gem install sass` to install [SASS](http://sass-lang.com/)
 5. Globally install gulp with `npm install -g gulp` or `sudo npm install -g gulp`
 6. Clone the repository and navigate to the directory through the terminal
 7. Run `npm install` or `sudo npm install` to install all of the app's dependencies

Note: If you are using nvm (Node Version Manager) on linux, you can run this command to make the version of node accessible via sudo: 
```
n=$(which node);n=${n%/bin/node}; chmod -R 755 $n/bin/*; sudo cp -r $n/{bin,lib,share} /usr/local
```

##Starting up the server
Here's the fun part, starting the actual server! There's just one tricky part, and it's that the server requires an environment variable `EMAIL_PASSWORD` to be set. You can set it appropriately on your own machine, or as a temporary fix, you can type in 
```
EMAIL_PASSWORD=whatever node server.js
```
to start the server. The go to [localhost:3000](http://localhost:3000) in your web browser and you should see the webpage. If you set your enviroment variable appropriately, then all you need to do to start the server is 
```
node server.js
```

##Running Gulp
Next what you'll need to do is run gulp. Gulp is the task runner the website uses. Think of it as a continually running script that basically does the following:
- Compile all of the SASS files into CSS files, concatanate them into a single file, then minify them
- Do the same thing for all client side javascript files
- Watch for any file changes and re-do the above things

Run `gulp build` if this is your first time running gulp. This will do an initial compilation, concatanation, and minification of all the client side javascript and css files. Afterwards, run a `gulp watch` to watch the client side files and redo those tasks on a file change. There's also a command called `gulp server:watch` that will watch for changes on any server files and reload the server if it detects one. You can run this instead of `node server.js`.

NOTE: If you get an `ENOSPC` error when running `gulp watch` on linux, you may have to run this command to increase your file watch limit:
```
echo fs.inotify.max_user_watches=582222 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
```

OPTIONAL: `gulp watch` also starts up a LiveReload server. I recommend installing the [LiveReload Chrome Extension](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en).
LiveReload automatically reload the webpage in your browser if it detects a file change. Just run `gulp watch` and click on the LiveReload icon after starting up the web server. 

#Deployment
The site is run on Heroku, and so deployment is extremely easy. The `production` branch is kept in sync with the live version of the website, so just push your changes to the branch and they should be automatically deployed to the live version of the site. 

#Directory Structure
```
/
 config/ - This is where all the server configurations are
 public/ - This is where all the publicly accesible files are, including css, javascript, and images
 routes/ - Contains routing configuration. Tells the server what page to render when a user hits a specific url
 util/ - Utility modules like the mailer
 views/ - This is where all the pages are located
 Procfile - Used by heroku to know how to run the app
 gulpfile.js - Gulp configuration file
 package.json - App configuration file that lists app dependencies
 server.js - Like the "main" file of server
```
#Wiki
If you'd like to add a page, modify an existing page, or change some styling, please refer to the [Wiki](https://github.com/UWARG/WARG-Website/wiki)

#Licence
[MIT](https://raw.githubusercontent.com/UWARG/WARG-Website/master/LICENCE)
