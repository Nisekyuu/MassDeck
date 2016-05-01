import { Template } from 'meteor/templating';
 
import { Tasks } from '../api/tasks.js';
 
import './task.js';
import './body.html';

///////////////////////////////////////////////////////////
const API_KEY = 'AIzaSyAcYPyP436stn9-8kReUvhpfKX0PSSFdV0';
///////////////////////////////////////////////////////////

Template.body.helpers({
  tasks() {
    // Show songs with most upvotes at top
    return Tasks.find({}, { sort: { upvotes: -1 } });
  },
});

Template.body.events({
  'submit .new-task'(event) {
    // Prevent default browser form submit
    event.preventDefault();
 
    // Get value from form element
    const target = event.target;
    const text = target.text.value;
 
      if (!text) {
          alert("Please enter a search query.");
      } else {
         var ytresponse = HTTP.call( 'GET', 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&order=viewCount&q='+ text +'&key=' + API_KEY, {params: {}}, function( error, response ) {
            if ( error ) {
                console.log( error );
                alert("Error while searching.");
            } else {
                console.log( response );
                var parsed = JSON.parse(response.content);
                console.log(parsed);
                const videoID = parsed.items[0].id.videoId;
                const videoThumb = parsed.items[0].snippet.thumbnails.medium.url;
                var videoTitle = parsed.items[0].snippet.title;
                
                //Shorted VideoTITLE if too long
                if(videoTitle.length > 50) videoTitle = videoTitle.substring(0,50) + '...';
                
                //INSERT VIDEO DATA INTO MONGODB                
                Tasks.insert({
                    videoTitle,
                    createdAt: new Date(),
                    videoThumb,
                    videoID,
                    upvotes : 0,
                })
            }
         });
      }
    // Clear form
    target.text.value = '';
  },
});