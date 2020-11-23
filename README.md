I deployed the project in aws, link is below
https://dev.d2dec5dtycnpgx.amplifyapp.com/
### question 1
First, I will rewrite UI to make it better.
Second, I will add cache to store the data so that the cache can be stored in localStorage and if there is no change on backend, we just use the data of the cache.
Third, I just suggest that we can combine the two request into one. We don't have to request twice in the same page.

### question 2
This project is small, so I decide just to use state to manage data. If we have large data, I will implement it by using redux and maybe router to manage the project. If I have more time, I will take more time to focus on detail of re-render of components. 


When we open the website, the web will load the data. The data structure is map with key value pair whose key is group, and I made the default key is South West. Every we click other Area, the data will directly load the data without search the whole list. Because you didn't mention which source we can use to load the map, I just wrapped the svg map into Calgary map component. It's a static data stored in json, so it can be fast to interact with users. I made the network handler just in getData function in App.tsx. I didn't extract it because we just have two simple request, I can make it into hook and get the data and loading param from it. In components, I give the default data if data is invalid.   