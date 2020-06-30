// Register ServiceWorker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./serviceWorker.js")
      .then(() => {
        console.log("ServiceWorker Registered!");
      })
      .catch((error) => {
        console.log("ServiceWorker not registered", error);
      });
  });
} else {
  console.log("This browser doesn't support ServiceWorker");
}
