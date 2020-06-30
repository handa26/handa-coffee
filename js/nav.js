document.addEventListener("DOMContentLoaded", () => {
  // Initialize sidebar
  let elems = document.querySelectorAll(".sidenav");
  M.Sidenav.init(elems);
  loadNav();

  function loadNav() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4) {
        if (this.status !== 200) return;

        // Muat daftar tautan menu
        document.querySelectorAll(".topnav, .sidenav").forEach((elm) => {
          elm.innerHTML = xhttp.responseText;
        });

        // Click listener untuk setiap daftar tautan menu dan memuat kontennya ketika diklik
        document.querySelectorAll(".sidenav a, .topnav a").forEach((elm) => {
          elm.addEventListener("click", (event) => {
            // Tutup sidenav
            var sidenav = document.querySelector(".sidenav");
            M.Sidenav.getInstance(sidenav).close();

            // Muat konten halaman ketika diklik
            page = event.target.getAttribute("href").substr(1);
            loadPage(page);
          });
        });
      }
    };
    xhttp.open("GET", "nav.html", true);
    xhttp.send();
  }

  // Memuat konten halaman
  let page = window.location.hash.substr(1);

  if (page === "") {
    page = "home";
  }
  loadPage(page);

  function loadPage() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4) {
        let content = document.querySelector("#body-content");
        if (this.status === 200) {
          // Jika konten tersedia maka akan ter-load
          content.innerHTML = xhttp.responseText;
        } else if (this.status === 404) {
          content.innerHTML = `<h1 class="center-align;">Halaman tidak ditemukan.</h1>`;
        } else {
          content.innerHTML = `<h1 class="center-align">Ups.. halaman tidak dapat diakses.</h1>`;
        }
      }
    };
    xhttp.open("GET", "pages/" + page + ".html", true);
    xhttp.send();
  }
});
