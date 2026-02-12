import * as Carousel from "./Carousel.js";
import api from "./axiosInstance.js";


// The breed selection input element.
const breedSelect = document.getElementById("breedSelect");
// The information section div element.
const infoDump = document.getElementById("infoDump");
// The progress bar div element.
const progressBar = document.getElementById("progressBar");
// The get favourites button element.
const getFavouritesBtn = document.getElementById("getFavouritesBtn");

window.addEventListener('load', () => initialLoad());

const initialLoad = async () => {
    const res = await api.get("/breeds");

    res.data.forEach((breed) => {
        const optionEl = document.createElement("option");
        optionEl.value = breed.id;
        optionEl.textContent = breed.name;
        breedSelect.appendChild(optionEl);
    });

    if (res.data.length > 0) {
        await loadSelected(res.data[0].id);
    }
};

breedSelect.addEventListener("change", (e) => {
    loadSelected(e.target.value);
});

const loadSelected = async (id) => {
    const [imageRes, breedRes] = await Promise.all([
        api.get("/images/search", {
            params: {
                breed_ids: id,
                limit: 10
            }
        }),
        api.get(`/breeds/${id}`)
    ]);

    const images = imageRes.data;
    const breed = breedRes.data;

    Carousel.clear();

    images.forEach((image) => {
        Carousel.appendCarousel(
            Carousel.createCarouselItem(image.url, breed.name, image.id)
        );
    });

    Carousel.start();
    infoDump.innerHTML = `
      <h3>${breed.name}</h3>
      <p><strong>Origin:</strong> ${breed.origin || "Unknown"}</p>
      <p><strong>Temperament:</strong> ${breed.temperament || "Unknown"}</p>
      <p>${breed.description || "No description available."}</p>
    `;
};
