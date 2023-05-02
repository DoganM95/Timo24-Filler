Timo24 has a UI, which is trash. 
Decided to automate it, so i don't have to waste more than an hour every month filling the sheet manually.

## How to use it:

### Getting the JSESSIONID
1. Login to timo24
1. Open chrome dev tools
1. Switch to application tab 
1. Expand Cookies and click on the first child
1. Copy `JSESSIONID`
1. Paste it into the 'config_example.js` in this project
1. Rename `config_example.js` to `config.js`

### Etracting the remaining userdata
1. Set up some http listener, be it chrome dev tools, charles debug proxy or fiddler (which i used)
1. Listen to the traffic of timo24
1. Set the "Kommt" time of one (any) day
1. Find the respective request in your listener (charles, fiddler, etc.)
1. Extract the query parameters (like `userId`, `projectId`, etc., Full list in `./config.js`)

## What else could be done to evolve this repo:
- Turn this into 2 seperate projects: 
  - Rest-Api
  - Sheet filler, consuming the rest-api
- Automatic `JSESSIONID` extractor (requires automating login for each run)
- add regional holiday detection, so these won't be filled (could consume some external api for that or just `GET` those from some page, e.g. [ferienwiki.de/feiertage/de/bayern](ferienwiki.de/feiertage/de/bayern) )
