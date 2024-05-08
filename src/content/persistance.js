export function saveParam(key, value, onSave) {
  const chrome = window.chrome || chrome;
  chrome.storage.local.set({ [key]: value }, onSave);
}

export function getParam(key, onGet) {
  const chrome = window.chrome || chrome;
  chrome.storage.local.get([key], onGet);
}
