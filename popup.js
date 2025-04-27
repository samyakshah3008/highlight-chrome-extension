function loadSavedItems() {
  chrome.storage.local.get(null, function (items) {
    const itemList = document.getElementById("itemList");
    itemList.innerHTML = "";

    if (Object.keys(items).length === 0) {
      itemList.innerHTML = "<li>No saved items</li>";
      return;
    }

    for (const [key, value] of Object.entries(items)) {
      const listItem = document.createElement("li");
      listItem.classList.add("item");

      const text = document.createElement("span");
      text.textContent = value;

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", function () {
        deleteItem(key);
      });

      listItem.appendChild(text);
      listItem.appendChild(deleteButton);
      itemList.appendChild(listItem);
    }
  });
}

function deleteItem(key) {
  chrome.storage.local.remove(key, function () {
    loadSavedItems();
  });
}

loadSavedItems();
