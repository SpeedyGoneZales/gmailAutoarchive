function gmailAutoarchive() {
  
  const mapping = { // Sender, Label (aka folder)
    "ACM Learning Center <learning@acm.org>": "[Google Mail]/ACM",  //'[Google Mail]' is specific to my configuration and not normally needed
    "ACM TechNews <technews-editor@acm.org> ": "[Google Mail]/ACM",
    "ACM Bulletins <acmbulletin@acm.org>": "[Google Mail]/ACM",
  };

  const delayDays = 31; 
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate()-delayDays); // what was the date at that time?

  function checkAge(messageDate) {
    return messageDate < maxDate;
  }
  
  function archiveMessages(threads) {
    for (var i = 0; i < threads.length; i++) {
      thread = threads[i];
      messages = thread.getMessages();
      senderEmail = messages[0].getFrom();
      messageDate = messages[0].getDate();
      if (checkAge(messageDate) && senderEmail in mapping) {
        var label = GmailApp.getUserLabelByName(mapping[senderEmail]);
        console.info("Moving message from ", senderEmail, " on ", messageDate, " to ", label.getName());
        thread.addLabel(label); 
        thread.moveToArchive(); // Move out of Inbox
      } //if
    } //for
  } //archiveMessages

  function searchInbox() {
    for (const [key, value] of Object.entries(mapping)) {
      var searchString = "from:" + key + " in:inbox";
      console.info("searchString " + searchString);
      const threads = GmailApp.search(searchString);
      archiveMessages(threads);
    } //for
  } //searchInbox

  searchInbox();
}
