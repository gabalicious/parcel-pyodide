var pyodideWorker = new Worker("./webworker.js");

pyodideWorker.onerror = (e) => {
  console.log(
    `Error in pyodideWorker at ${e.filename}, Line: ${e.lineno}, ${e.message}`
  );
};

pyodideWorker.onmessage = (e) => {
  console.log("e", e);

  const { results, error } = e.data;
  if (results) {
    console.log("pyodideWorker return results: ", results);
  } else if (error) {
    console.log("pyodideWorker error: ", error);
  }
};

export default pyodideWorker;
