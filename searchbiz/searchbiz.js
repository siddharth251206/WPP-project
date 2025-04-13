const container = document.querySelector(".topbuss");
const all_details = document.querySelectorAll(".cards");
const overlay = document.createElement("div");
overlay.classList.add("overlay");
document.body.appendChild(overlay);

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
            title.textContent = "View Details"
            setTimeout(() => detail.style.display = "none", 500);
            overlay.classList.remove("active");
            card.classList.remove("active");
        } else {
            detail.style.display = "block";
            title.textContent = "Hide Details"
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

all_details.forEach(card => {
    const rating = card.querySelector(".rating").textContent
    const ratingValue = parseFloat(rating.match(/(\d+(\.\d+)?)/)[0])
    console.log(ratingValue)
    if (ratingValue <= 2) {
        card.querySelector(".rating").style.backgroundColor = "red"
    }
    else if (ratingValue <= 3) {
        card.querySelector(".rating").style.backgroundColor = "yellow"
    }
    else {
        card.querySelector(".rating").style.backgroundColor = "greenyellow"
    }
})

const originalCards = Array.from(all_details).filter(card => card.style.display !== "none");
document.getElementById("sortOrder").addEventListener("change", function () {
    const sortOrder = this.value;
    let sortedCards;
    if (sortOrder === "none") {
        sortedCards = originalCards;
    } else {
        sortedCards = [...originalCards].sort((a, b) => {
            const ratingA = parseFloat(a.querySelector(".rating").textContent.match(/[\d.]+/)[0]);
            const ratingB = parseFloat(b.querySelector(".rating").textContent.match(/[\d.]+/)[0]);

            return sortOrder === "asc" ? ratingA - ratingB : ratingB - ratingA;
        });
    }
    sortedCards.forEach(card => container.appendChild(card));
});

document.getElementById("searchBtn").addEventListener("click", function () {
    const searchValue = document.getElementById("searchInput").value.toLowerCase();
    const cards = document.querySelectorAll(".cards");

    cards.forEach(card => {
        if (searchValue.trim() === "") {
            cards.forEach(card => card.style.display = "");
            return;
        }
        const name = card.querySelector("h3").textContent.toLowerCase();
        if (name.includes(searchValue)) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }
    });
});

function filterCardsByCategory(selectedCategory) {

    originalCards.forEach(card => {
        const categoryElement = card.querySelector('.category');
        const category = categoryElement ? categoryElement.textContent.trim() : '';

        if (selectedCategory === 'All' || category === selectedCategory) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

function handleRatingFilter(value) {
    if (value === 'all') {
      filterCardsByRating(0, 5); // show all
    } else {
      const [min, max] = value.split('-').map(parseFloat);
      filterCardsByRating(min, max);
    }
}

function filterCardsByRating(minRating, maxRating) {
    originalCards.forEach(card => {
      const ratingElement = card.querySelector('.rating');
      const ratingText = ratingElement ? ratingElement.textContent.trim() : '';
      const ratingMatch = ratingText.match(/([0-9.]+)\s*\/\s*5/);
      const rating = ratingMatch ? parseFloat(ratingMatch[1]) : 0;

      if (rating >= minRating && rating < maxRating) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  }