const all_details= document.querySelectorAll(".cards")
all_details.forEach(card => {
    const title=card.querySelector(".title");
    const detail=card.querySelector(".details");
    title.addEventListener('click',()=>{
        if (detail.style.display === "block") {
            detail.style.opacity = "0";
            detail.style.clipPath = "inset(0 0 100% 0)";
            setTimeout(() => {
                detail.style.display = "none";
            }, 500);
        } else {
            detail.style.display = "block";
            setTimeout(() => {
                detail.style.opacity = "1";
                detail.style.clipPath = "inset(0 0 0 0)";
            }, 10); 
        }
    })
})
