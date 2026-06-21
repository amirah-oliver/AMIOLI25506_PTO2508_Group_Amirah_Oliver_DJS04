import { podcasts, seasons } from "./data.js";
import { genres } from "./genres.js";

/**
 * Podcast Application Class
 * Handles rendering, filtering, sorting and modal interactions.
 */
class PodcastApp {
  constructor() {
    this.podcastGrid = document.getElementById("podcastGrid");
    this.genreFilter = document.getElementById("genreFilter");
    this.sortFilter = document.getElementById("sortFilter");

    this.modalOverlay = document.getElementById("modalOverlay");
    this.modalContent = document.getElementById("modalContent");
    this.closeModalBtn = document.getElementById("closeModal");

    this.filteredPodcasts = [...podcasts];

    this.initialize();
  }

  /**
   * Initialize app
   */
  initialize() {
    this.populateGenres();
    this.renderPodcasts(this.filteredPodcasts);
    this.addEventListeners();
  }

  /**
   * Populate genre dropdown
   */
  populateGenres() {
    genres.forEach((genre) => {
      const option = document.createElement("option");
      option.value = genre.id;
      option.textContent = genre.title;

      this.genreFilter.appendChild(option);
    });
  }

  /**
   * Add all listeners
   */
  addEventListeners() {
    this.genreFilter.addEventListener("change", () => {
      this.filterAndSort();
    });

    this.sortFilter.addEventListener("change", () => {
      this.filterAndSort();
    });

    this.closeModalBtn.addEventListener("click", () => {
      this.closeModal();
    });

    this.modalOverlay.addEventListener("click", (event) => {
      if (event.target === this.modalOverlay) {
        this.closeModal();
      }
    });
  }

  /**
   * Filter and sort podcasts
   */
  filterAndSort() {
    const selectedGenre = this.genreFilter.value;
    const selectedSort = this.sortFilter.value;

    let filtered = [...podcasts];

    // FILTER
    if (selectedGenre !== "all") {
      filtered = filtered.filter((podcast) =>
        podcast.genres.includes(Number(selectedGenre))
      );
    }

    // SORT
    if (selectedSort === "updated") {
      filtered.sort(
        (a, b) => new Date(b.updated) - new Date(a.updated)
      );
    }

    if (selectedSort === "popular") {
      filtered.sort((a, b) => b.seasons - a.seasons);
    }

    if (selectedSort === "newest") {
      filtered.sort(
        (a, b) => new Date(b.updated) - new Date(a.updated)
      );
    }

    this.renderPodcasts(filtered);
  }

  /**
   * Render podcast cards
   * @param {Array} podcastList
   */
  renderPodcasts(podcastList) {
    this.podcastGrid.innerHTML = "";

    podcastList.forEach((podcast) => {
      const card = this.createPodcastCard(podcast);
      this.podcastGrid.appendChild(card);
    });
  }

  /**
   * Create single podcast card
   * @param {Object} podcast
   * @returns {HTMLElement}
   */
  createPodcastCard(podcast) {
    const card = document.createElement("article");
    card.className = "card";

    const genreNames = this.getGenreNames(podcast.genres);

    card.innerHTML = `
      <img
        src="${podcast.image}"
        alt="${podcast.title}"
        class="card-image"
      />

      <div class="card-content">
        <h2 class="card-title">${podcast.title}</h2>

        <p class="card-info">
          <i class="fa-solid fa-calendar"></i>
          ${podcast.seasons} seasons
        </p>

        <div class="genre-tags">
          ${genreNames
            .map((genre) => `<span class="tag">${genre}</span>`)
            .join("")}
        </div>

        <p class="updated">
          Updated ${this.formatDate(podcast.updated)}
        </p>
      </div>
    `;

    card.addEventListener("click", () => {
      this.openModal(podcast);
    });

    return card;
  }

  /**
   * Open modal
   * @param {Object} podcast
   */
  openModal(podcast) {
    const genreNames = this.getGenreNames(podcast.genres);

    const seasonData = seasons.find(
      (season) => season.id === podcast.id
    );

    this.modalContent.innerHTML = `
      <div class="modal-header">
        <img
          src="${podcast.image}"
          alt="${podcast.title}"
          class="modal-image"
        />

        <div class="modal-details">
          <h2 id="modalTitle" class="modal-title">
            ${podcast.title}
          </h2>

          <p class="modal-description">
            ${podcast.description}
          </p>

          <div class="genre-tags">
            ${genreNames
              .map((genre) => `<span class="tag">${genre}</span>`)
              .join("")}
          </div>

          <p class="updated">
            <i class="fa-solid fa-calendar"></i>
            Last updated: ${this.fullDate(podcast.updated)}
          </p>
        </div>
      </div>

      <h3 class="modal-seasons-title">Seasons</h3>

      <div class="season-list">
        ${seasonData.seasonDetails
          .map(
            (season) => `
              <div class="season-card">
                <div>
                  <p class="season-name">${season.title}</p>
                </div>

                <p class="episodes">
                  ${season.episodes} episodes
                </p>
              </div>
            `
          )
          .join("")}
      </div>
    `;

    this.modalOverlay.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }

  /**
   * Close modal
   */
  closeModal() {
    this.modalOverlay.classList.add("hidden");
    document.body.style.overflow = "auto";
  }

  /**
   * Get genre names
   * @param {Array} genreIds
   * @returns {Array}
   */
  getGenreNames(genreIds) {
    return genreIds.map((id) => {
      const genre = genres.find((genre) => genre.id === id);
      return genre ? genre.title : "Unknown";
    });
  }

  /**
   * Format short date
   * @param {String} dateString
   * @returns {String}
   */
  formatDate(dateString) {
    return new Date(dateString).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  /**
   * Format long date
   * @param {String} dateString
   * @returns {String}
   */
  fullDate(dateString) {
    return new Date(dateString).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }
}

// Initialize App
new PodcastApp();
