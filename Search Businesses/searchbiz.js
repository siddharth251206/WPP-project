const all_details = document.querySelectorAll(".cards");
const overlay = document.createElement("div");
overlay.classList.add("overlay");
document.body.appendChild(overlay);
const allCards = document.querySelectorAll('.cards');
let data=JSON.parse(localStorage.getItem('citybiz'))

function renderBusinesses(data) {
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
    });}
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
            title.textContent="View Details"
            setTimeout(() => detail.style.display = "none", 500);
            overlay.classList.remove("active");
            card.classList.remove("active");
        } else {
            detail.style.display = "block";
            title.textContent="Hide Details"
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

all_details.forEach(card =>{
    const rating = card.querySelector(".rating").textContent
    const ratingValue = parseFloat(rating.match(/(\d+(\.\d+)?)/)[0])
    if(ratingValue <= 2){
        card.querySelector(".rating").style.backgroundColor = "red"
    }
    else if(ratingValue <= 3){
        card.querySelector(".rating").style.backgroundColor = "yellow"
    }
    else{
        card.querySelector(".rating").style.backgroundColor = "greenyellow"
    }
})
document.addEventListener('DOMContentLoaded', () => {
    renderBusinesses(data)
  });
