const overlay = document.createElement("div");
overlay.classList.add("overlay");
document.body.appendChild(overlay);

let data = JSON.parse(localStorage.getItem("citybiz")) || [];

function renderBusinesses(data) {
  const container = document.getElementById("topbuss");
  container.innerHTML = "";

  data.forEach((biz) => {
    const card = document.createElement("div");
    card.className = "cards";
    card.innerHTML = `
      <img class="rounded img_height" src="${biz.image}" alt="${biz.name}">
      <h3 class="margin-l">${biz.name}</h3>
      <div class="rating margin-l">⭐ ${biz.rating} / 5</div>
      <div class="title">View Details</div>
      <div class="details">
        <p>${biz.description}</p>
        <h3 style="color:rgb(24, 24, 77)">Contact Details</h3>
        <address>
          📧 Email: <a href="mailto:${biz.email}">${biz.email}</a><br>
          📞 Phone: ${biz.phone}
        </address>
      </div>
    `;

    card.querySelector(".title").addEventListener("click", (e) => {
      e.stopPropagation();
      const detail = card.querySelector(".details");
      const activeDetails = document.querySelectorAll(".details.active");

      activeDetails.forEach((openDetail) => {
        if (openDetail !== detail) {
          openDetail.classList.remove("active");
          setTimeout(() => (openDetail.style.display = "none"), 500);
        }
      });

      if (detail.classList.contains("active")) {
        detail.classList.remove("active");
        card.querySelector(".title").textContent = "View Details";
        setTimeout(() => (detail.style.display = "none"), 500);
        overlay.classList.remove("active");
        card.classList.remove("active");
      } else {
        detail.style.display = "block";
        card.querySelector(".title").textContent = "Hide Details";
        setTimeout(() => detail.classList.add("active"), 10);
        overlay.classList.add("active");
        card.classList.add("active");
      }
    });

    const rating = biz.rating;
    const ratingBox = card.querySelector(".rating");
    if (rating <= 2) ratingBox.style.backgroundColor = "red";
    else if (rating <= 3) ratingBox.style.backgroundColor = "yellow";
    else ratingBox.style.backgroundColor = "greenyellow";

    container.appendChild(card);
  });
}

document.getElementById("sortOrder").addEventListener("change", function () {
  const sortOrder = this.value;
  let sorted = [...data];
  if (sortOrder === "asc") {
    sorted.sort((a, b) => a.rating - b.rating);
  } else if (sortOrder === "desc") {
    sorted.sort((a, b) => b.rating - a.rating);
  }
  renderBusinesses(sorted);
});

document.getElementById("searchBtn").addEventListener("click", function () {
  const searchValue = document.getElementById("searchInput").value.toLowerCase();
  const filtered = data.filter((biz) => biz.name.toLowerCase().includes(searchValue));
  renderBusinesses(filtered);
});

function filterCardsByCategory(category) {
  if (category === "All") return renderBusinesses(data);
  const filtered = data.filter((biz) => biz.category === category);
  renderBusinesses(filtered);
}

function handleRatingFilter(value) {
  if (value === "all") return renderBusinesses(data);
  const [min, max] = value.split("-").map(Number);
  const filtered = data.filter((biz) => biz.rating >= min && biz.rating < max);
  renderBusinesses(filtered);
}

overlay.addEventListener("click", () => {
  document.querySelectorAll(".details.active").forEach((detail) => {
    detail.classList.remove("active");
    setTimeout(() => (detail.style.display = "none"), 500);
  });
  overlay.classList.remove("active");
  document.querySelectorAll(".cards.active").forEach((card) => card.classList.remove("active"));
});

document.addEventListener("DOMContentLoaded", () => {
  renderBusinesses(data);
});
