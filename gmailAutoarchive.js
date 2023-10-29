function gmailAutoarchive() {

  var delayDays = 14; 
  var labels = ['[Google Mail]/GMX Newsletters', '[Google Mail]/Amex']
  var maxDate = new Date();
  maxDate.setDate(maxDate.getDate()-delayDays); // what was the date at that time?


  function processArchiving(labels) {
    for (var i = 0; i < labels.length; i++) {
      var label = GmailApp.getUserLabelByName(labels[i]);
      var threads = label.getThreads(0, 400);
   
      for (var i = 0; i < threads.length; i++) {
        if (threads[i].getLastMessageDate()<maxDate) {
          threads[i].moveToArchive();
      }
    }
  }
}
