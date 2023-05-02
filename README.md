Timo24 has a UI, which is trash. 
Decided to automate it, so i don't have to waste more than an hour every month filling the sheet manually.

What else could be done to evolve this repo:
- Turn this into 2 seperate projects: 
  - Rest-Api
  - Sheet filler, consuming the rest-api
- Automatic JSESSIONID extractor (requires automating login for each run)
- add regional holiday detection, so these won't be filled (could consume some external api for that or just GET those from some page)
