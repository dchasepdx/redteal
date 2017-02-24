# redteal

This project was a lot of fun, and I learned a lot while doing it. 
I decided to make an Angular app to show my skills with JavaScript frameworks. It was tough to figure out how to get a Google map to show up in a component based anuglar app, but I got it to work. The only problem is there's direct manipulation of the DOM which you usually try to avoid in Angular. 

# components
I implemented component based architecture here, but I ended up with just one component. I feel I could have abstracted some functionality out of the map component.

# functions
I think I did a good job reducing repeated code by abstracting repeatable code to functions like addMarker, removeMarker, and my service. These blocks of code would have been repeated for each api call with only a few variable changes. I bet the individual functions that get earthquakes, weather, and city info could be abstracted to one function, but the schema of the data from geonames is different for each call, so I wasn't sure how to handle it.

# clousres and spread syntax
This is the part I'm most proud of. I've never used the spread syntax before, but I was able to implement it in the addMarkers function to programmatically fill the info windows with data from geonames, even though it was a different number of arguments for each call. The clousure was something else I was proud of. I found the basic code online, but I was able to understand clousures well enough to tweak the code for my needs. The next step would be to understand that I needed to use a clousre on my own.
