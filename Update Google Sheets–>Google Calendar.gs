function createCalendarEvent() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var calendar = CalendarApp.getCalendarById('[YOUR CALENDAR ID');
  
  //Delete existing events to prevent duplicates
  var today = new Date();
  var later = new Date(today.getTime() + 1000*60*60*24*31);
  var events = calendar.getEvents(new Date("January 01, 2019"), new Date("December 31, 2019"));
  
  for (var k = 0; k<events.length; k++) {
    events[k].deleteEvent();
    }
  
  //Populate spreadsheet data into array of arrays
  var startRow = 1;  // First row of data to process
  var numRows = sheet.getLastRow();   // Number of rows to process
  var numColumns = 11;
  
  var dataRange = sheet.getRange(startRow, 1, numRows-1, numColumns); 
  var data = dataRange.getValues();
  var headings = data[0];
  
 //Pull out relevant info & populate Google Calendar 
  for (var i = 1; i < data.length; ++i) 
  {
    var row = data[i];
    
    var b4_tweets = row[2]; //Before Tweets
    var b4t_date = new Date(row[1]);//
    var b4t_name = headings[1] + ": " + b4_tweets;
    calendar.createAllDayEvent(b4t_name, b4t_date,{description: row[0]});
    
    var publish_date = new Date(row[3]);
    var publish_name =  "Article: " + row[0];
    calendar.createAllDayEvent(publish_name, publish_date,{description: row[0]});
    
    var medium_date = new Date(row[4]);
    var medium_name = headings[4] + ": " + row[0];
    calendar.createAllDayEvent(medium_name, medium_date,{description: row[0]});
    
    var pinterest = row[6];
    var pin_date = new Date(row[5]);
    var pin_name = headings[5] + ": " + pinterest;
    calendar.createAllDayEvent(pin_name, pin_date,{description: row[0]});
    
    var twitter = row[8];
    var t_date = new Date(row[7]);
    var t_name = headings[7] + ": " + twitter;
    calendar.createAllDayEvent(t_name, t_date,{description: row[0]});
    
    var instagram = row[10];//Instagram Post
    var insta_date = new Date(row[9]);//Instagram Post Date
    var insta_name = headings[9] + ": " + instagram;//Calendar Event Title
    calendar.createAllDayEvent(insta_name, insta_date,{description: row[0]});//Create Calendar Event
  }
}
