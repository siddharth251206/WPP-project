let businesses = [];
let data=JSON.parse(localStorage.getItem('citybiz'))

// async function loadBusinessData() {
//   if (data) {
//     const res = await fetch('bus_details.json');
//      businesses = await res.json();
//     businesses.forEach((e)=>{
//       data.push(e);
//     })
//     localStorage.setItem('citybiz', JSON.stringify(data));
//     const sorted = [...businesses].sort((a, b) => b.rating - a.rating).slice(0,4);
//     renderBusinesses(sorted);

//   } else {
//     const res = await fetch('bus_details.json');
//     businesses = await res.json();
//     localStorage.setItem('citybiz', JSON.stringify(businesses));

//     const sorted = [...businesses].sort((a, b) => b.rating - a.rating).slice(0,4);
//     renderBusinesses(sorted);
//   }
// }

function renderBusinesses(data = businesses) {
  const container = document.getElementById('topbuss');
  container.innerHTML = '';

  data.forEach(biz => {
    const card = document.createElement('div');
    card.className = 'cards';
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
    container.appendChild(card);
  });

  attachDetailsClickEvents();
}

// 3️⃣ Show/hide card details on click
function attachDetailsClickEvents() {
  const all_details = document.querySelectorAll(".cards");
  let overlay = document.querySelector(".overlay");

  if (!overlay) {
    overlay = document.createElement("div");
    overlay.classList.add("overlay");
    document.body.appendChild(overlay);
  }

  all_details.forEach(card => {
    const title = card.querySelector(".title");
    const detail = card.querySelector(".details");

    title.addEventListener("click", (e) => {
      e.stopPropagation();

      document.querySelectorAll(".details.active").forEach(openDetail => {
        if (openDetail !== detail) {
          openDetail.classList.remove("active");
          setTimeout(() => openDetail.style.display = "none", 500);
        }
      });

      if (detail.classList.contains("active")) {
        detail.classList.remove("active");
        title.textContent = "View Details";
        setTimeout(() => detail.style.display = "none", 500);
        overlay.classList.remove("active");
        card.classList.remove("active");
      } else {
        detail.style.display = "block";
        title.textContent = "Hide Details";
        setTimeout(() => detail.classList.add("active"), 10);
        overlay.classList.add("active");
        card.classList.add("active");
      }
    });

    overlay.addEventListener("click", () => {
      document.querySelectorAll(".details.active").forEach(openDetail => {
        openDetail.classList.remove("active");
        setTimeout(() => openDetail.style.display = "none", 500);
      });
      overlay.classList.remove("active");
      document.querySelectorAll(".cards.active").forEach(activeCard => {
        activeCard.classList.remove("active");
      });
    });
  });
}

// 4️⃣ Auto-run on page load
document.addEventListener('DOMContentLoaded', () => {
  loadBusinessData();
});
