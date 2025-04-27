let tooltip;
let selectedHighlightValue;

function useDebounce(callbackFn, delay) {
  let timeoutId;
  return function (...args) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      callbackFn(...args);
    }, delay);
  };
}

function handleSelection() {
  const selection = window.getSelection();
  if (selection && selection.toString().trim() !== "") {
    const selectedText = selection.toString().trim();
    createTooltip(selectedText);
    positionTooltip(selection);
  } else {
    if (tooltip && tooltip.style.display !== "none") {
      tooltip.style.display = "none";
    }
  }
}

function createTooltip(text) {
  if (tooltip) {
    tooltip.textContent = "Save Highlight?";
    selectedHighlightValue = text;
    tooltip.style.display = "block";
  } else {
    tooltip = document.createElement("div");
    tooltip.style.position = "absolute";
    tooltip.style.padding = "5px 10px";
    tooltip.style.display = "block";
    tooltip.style.background = "rgba(0, 0, 0, 0.7)";
    tooltip.style.color = "#fff";
    tooltip.style.borderRadius = "5px";
    tooltip.style.cursor = "pointer";
    tooltip.style.zIndex = "1000";
    tooltip.textContent = "Save Highlight?";

    document.body.appendChild(tooltip);
    tooltip.addEventListener("click", () => {
      chrome.runtime.sendMessage({
        action: "saveText",
        text: selectedHighlightValue,
      });
    });
  }
}

function positionTooltip(selection) {
  const range = selection.getRangeAt(0);
  const rect = range.getBoundingClientRect();

  tooltip.style.top = `${rect.top + window.scrollY + rect.height + 5}px`;
  tooltip.style.left = `${rect.left + window.scrollX}px`;
}

const debouncedSelectionHandler = useDebounce(handleSelection, 300);

document.addEventListener("selectionchange", debouncedSelectionHandler);
