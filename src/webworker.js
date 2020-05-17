importScripts("./pyodide/pyodide.js");

global.self.onmessage = function(e) {
  // eslint-disable-line no-unused-vars
  const data = e.data;
  global.self.languagePluginLoader.then(() => {
    global.self.pyodide.loadPackage(data.dependencies).then(() => {
      const keys = Object.keys(data);
      for (let key of keys) {
        if (key !== "python") {
          // Keys other than python must be arguments for the python script.
          // Set them on self, so that `from js import key` works.
          global.self[key] = data[key];
        }
      }
      global.self.pyodide
        .runPythonAsync(data.python, () => {})
        .then((results) => {
          global.self.postMessage({ results });
        })
        .catch((err) => {
          // if you prefer messages with the error
          global.self.postMessage({ error: err.message });
          // if you prefer onerror events
          setTimeout(() => {
            throw err;
          });
        });
    });
  });
};
