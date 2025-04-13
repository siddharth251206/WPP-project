    let formElement=document.getElementById("business-form")
    function fileToBase64(file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result); 
          reader.onerror = (error) => reject(error);
          reader.readAsDataURL(file);
        });
      }
      function checkSize(input) {
        if (input.files[0].size > 100 * 1024) {
          alert("Please upload an image under 100KB.");
          input.value = ""; 
        }
      }      
    formElement.addEventListener("submit", async (e)=>{
        e.preventDefault();
        const formData = new FormData(e.target);
         const newBiz = Object.fromEntries(formData.entries());
         const file = formData.get('image');

        newBiz.image = await fileToBase64(file);
         newBiz.rating = parseFloat(newBiz.rating);
         const existing = JSON.parse(localStorage.getItem('citybiz')) || [];
  existing.push(newBiz);
  localStorage.setItem('citybiz', JSON.stringify(existing));
  alert('New business saved!'); 
  formElement.reset();
    })
    