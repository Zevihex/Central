# Zevihex Central

Link: https://zevihexcentral.netlify.app/ 

## Technology: 

**Tech used:** HTML, CSS, JS, SQLite<br>
HTML and CSS were used to build how the site looks, with using css flexbox as well.
To create the database I wanted for this project I used SQLite. Specifically I used DB Browser for SQLite.
I used Javascript with SQL.js library to use the database I created and render it. I also created filters to make the database interactive.

## Optimizations:

There is no backend services for this project, which is an intentional choice for a few reasons. The main one is all the data is static, I have no need for writing to the database as I can make the changes myself in DB Browser and upload the database file. No backend means less latency, as the front end doesn't wait for queries to return since all the logic is clientside. The biggest issue with this strategy is when the database scales up. The database is loaded in memory, which means with a bigger database the browser could run slow and use up a lot of memory. However, I know my data may barely reach 1000 rows, so I won't have an issue with the browser loading the file.<br><br>
Some other notable changes I made was making the code more readable. I have two pages (speedruns.html and achievements.html) each with separate js files for their respective filter logic. However, they shared a lot of same functions which inspired the created of the db-utils.js file. At the time of writing this, the JavaScript logic (not including sql-wasm.js) is only about 200 lines of code. This way of building the project has made it very easy to maintain and change how some features work. 

## Lessons Learned:

The main thing I learned was how to use SQL.js library. I also learned npm and running a server with node. Another skill I learned was reading the documentation for the library I was using, which helped me to understand how to use it properly. Also used asynchronous programming to make sure the database is loaded properly. I already knew how SQL worked before this project, but when I built the filters and they worked properly I felt very accomplished. This project is a giant improvement over my old personal website, which was built mainly with HTML and CSS. There was some JavaScript, but it was only for a very primitive browser game. Now though I can load a database of whatever information I want! 