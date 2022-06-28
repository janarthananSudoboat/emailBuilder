const defaultScriptUrl = '//editor.unlayer.com/embed.js?2';
const callbacks = [];
let loaded = false;

const isScriptInjected = (scriptUrl) => {
  const scripts = document.querySelectorAll('script');
  console.log("Scripts",scripts);
  console.log("Script URL",scriptUrl);
  let injected = false;

  scripts.forEach((script) => {
    if (script.src.includes(scriptUrl)) {
      
      injected = true;
    }
  });

  return injected;
};

const addCallback = (callback) => {
  callbacks.push(callback);
};

const runCallbacks = () => {
  if (loaded) {
    let callback;
    console.log("CB",callback);

    while ((callback = callbacks.shift())) {
      callback();
    }
  }
};

export const loadScript = (callback, scriptUrl = defaultScriptUrl) => {
  addCallback(callback);

  if (!isScriptInjected(scriptUrl)) {
    const embedScript = document.createElement('script');
    embedScript.setAttribute('src', scriptUrl);
    embedScript.onload = () => {
      loaded = true;
      runCallbacks();
    };
    document.head.appendChild(embedScript);
  } else {
    runCallbacks();
  }
};
