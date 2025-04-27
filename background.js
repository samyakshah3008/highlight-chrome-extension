chrome.runtime.onMessage.addListener(function (request) {
  if (request.action === "saveText") {
    const timestamp = new Date().getTime();
    chrome.storage.local.set({ [timestamp]: request.text }, function () {
      loadSavedItems();
    });
  }
});

function loadSavedItems() {
  chrome.storage.local.get(null, function () {});
}
