const all_details = document.querySelectorAll(".cards");
const overlay = document.createElement("div");
overlay.classList.add("overlay");
document.body.appendChild(overlay);
const allCards = document.querySelectorAll('.cards');
// const businesses = [];

// allCards.forEach(card => {
//   const name = card.querySelector('h3')?.textContent.trim();
//   const email = card.querySelector('a[href^="mailto:"]')?.textContent.trim();
//   const phone = card.querySelector('a[href^="tel:"]')?.textContent.trim();
//   const image = card.querySelector('img')?.getAttribute('src');
//   const description = card.querySelector('.details p')?.textContent.trim();
//   const ratingText = card.querySelector('.rating')?.textContent.trim();
//   const rating = ratingText ? parseFloat(ratingText.match(/[\d.]+/)?.[0]) : null;

//   businesses.push({ name, email, phone, image, description, rating });
// });

// localStorage.setItem('citybiz', JSON.stringify(businesses));

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