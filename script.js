// PawHaven — simple JavaScript for the pet adoption website

document.addEventListener("DOMContentLoaded", function () {
  // Pet information used by the profile page.
  const pets = {
    bruno: {
      name: "Bruno", type: "Dog", age: "2 years", gender: "Male", size: "Medium",
      emoji: "🐕", photoClass: "dog", status: "Available for adoption",
      description: "Bruno is a friendly, energetic dog who loves games, outdoor time and being around people. He is happiest when he has room to explore and a person to call his own.",
      personality: "Playful · Loyal · Curious · Affectionate",
      care: ["Daily walks and playtime", "Fresh water and balanced dog food", "Routine veterinary care", "Positive, patient training"]
    },
    luna: {
      name: "Luna", type: "Cat", age: "1 year", gender: "Female", size: "Small",
      emoji: "🐈", photoClass: "cat", status: "Available for adoption",
      description: "Luna is a gentle, curious cat who enjoys sunny windows, soft blankets and quiet company. She may take a little time to warm up, but she loves affection once she feels safe.",
      personality: "Gentle · Curious · Calm · Cuddly",
      care: ["Provide a clean litter tray", "Feed balanced cat food and fresh water", "Give her a cosy, safe resting place", "Arrange regular veterinary check-ups"]
    },
    coco: {
      name: "Coco", type: "Rabbit", age: "8 months", gender: "Male", size: "Small",
      emoji: "🐇", photoClass: "rabbit", status: "On hold",
      description: "Coco is a curious little rabbit with a big appetite for leafy greens. He enjoys exploring safe spaces and needs gentle handling and a calm environment.",
      personality: "Curious · Quiet · Gentle · Snack enthusiast",
      care: ["Provide unlimited good-quality hay", "Offer fresh water and rabbit-safe greens", "Keep a roomy, rabbit-safe indoor area", "Handle gently and arrange rabbit-savvy vet care"]
    },
    rocky: {
      name: "Rocky", type: "Dog", age: "3 years", gender: "Male", size: "Large",
      emoji: "🐶", photoClass: "dog", status: "Adopted",
      description: "Rocky is a bright, loyal dog who enjoys learning new things. He does best with a steady routine, patient guidance and plenty of attention.",
      personality: "Bright · Loyal · Active · Quick learner",
      care: ["Daily exercise and enrichment", "Consistent, reward-based training", "Fresh water and balanced food", "Routine veterinary care"]
    },
    misty: {
      name: "Misty", type: "Cat", age: "2 years", gender: "Female", size: "Small",
      emoji: "🐱", photoClass: "cat", status: "Available for adoption",
      description: "Misty is a soft-hearted, relaxed cat who appreciates peaceful surroundings. She would make a lovely companion for someone who enjoys quiet company.",
      personality: "Soft-hearted · Relaxed · Affectionate · Sweet",
      care: ["Keep her litter tray clean", "Provide balanced food and fresh water", "Offer scratching posts and cosy hiding spots", "Schedule regular veterinary care"]
    },
    peanut: {
      name: "Peanut", type: "Rabbit", age: "1 year", gender: "Female", size: "Small",
      emoji: "🐰", photoClass: "rabbit", status: "Available for adoption",
      description: "Peanut is a playful, gentle rabbit who loves exploring and discovering new things. She needs a safe environment, patient care and room to hop around.",
      personality: "Playful · Gentle · Curious · Friendly",
      care: ["Provide unlimited good-quality hay", "Keep fresh water available", "Offer a safe space for daily exercise", "Use gentle handling and regular vet care"]
    }
  };

  // Read the selected pet from the URL, for example pet-details.html?pet=luna
  const profileName = document.getElementById("petName");
  if (profileName) {
    const params = new URLSearchParams(window.location.search);
    const petId = (params.get("pet") || "bruno").toLowerCase();
    const pet = pets[petId] || pets.bruno;

    document.title = pet.name + " | PawHaven";
    document.getElementById("petHeading").textContent = "Meet " + pet.name + " " + pet.emoji;
    document.getElementById("petSubheading").textContent = "Get to know " + pet.name + " and see if you could be the perfect match.";
    document.getElementById("petName").textContent = pet.name;
    document.getElementById("petDescription").textContent = pet.description;
    document.getElementById("petAge").textContent = pet.age;
    document.getElementById("petGender").textContent = pet.gender;
    document.getElementById("petType").textContent = pet.type;
    document.getElementById("petSize").textContent = pet.size;
    document.getElementById("petPersonality").textContent = pet.personality;
    document.getElementById("petStatus").textContent = pet.status;

    const picture = document.getElementById("petPicture");
    picture.textContent = pet.emoji;
    picture.className = "pet-photo " + pet.photoClass + " profile-photo";

    const careList = document.getElementById("petCare");
    pet.care.forEach(function (careItem) {
      const listItem = document.createElement("li");
      listItem.textContent = careItem;
      careList.appendChild(listItem);
    });

    const adoptButton = document.getElementById("adoptButton");
    if (pet.status === "Available for adoption") {
      adoptButton.href = "adoption-form.html?pet=" + petId;
      adoptButton.textContent = "Apply to adopt " + pet.name;
    } else {
      adoptButton.href = "pets.html";
      adoptButton.textContent = pet.status === "Adopted" ? "Meet other pets" : "Browse other pets";
      adoptButton.classList.add("light");
    }
  }

  // Preselect the pet in the adoption form when someone comes from a pet profile.
  const petSelect = document.getElementById("pet");
  if (petSelect) {
    const params = new URLSearchParams(window.location.search);
    const selectedPet = params.get("pet");
    if (selectedPet) {
      petSelect.value = selectedPet.toLowerCase();
    }
  }

  // Search and filter the six pet cards on the Meet the Pets page.
  const searchInput = document.querySelector("input[name='search']");
  const typeSelect = document.querySelector("select[name='type']");
  const petCards = document.querySelectorAll(".pet-card");

  function filterPets() {
    const searchText = searchInput ? searchInput.value.toLowerCase().trim() : "";
    const selectedType = typeSelect ? typeSelect.value.toLowerCase() : "all pets";

    petCards.forEach(function (card) {
      const nameMatches = card.dataset.petName.includes(searchText);
      const typeMatches = selectedType === "all pets" || card.dataset.petType === selectedType;
      card.style.display = nameMatches && typeMatches ? "" : "none";
    });
  }

  if (petCards.length > 0) {
    if (searchInput) searchInput.addEventListener("input", filterPets);
    if (typeSelect) typeSelect.addEventListener("change", filterPets);
    const searchForm = petCards[0].closest("main").querySelector("form");
    if (searchForm) searchForm.addEventListener("submit", function (event) {
      event.preventDefault();
      filterPets();
    });
  }

  // Highlight the navigation link for the page currently open.
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach(function (link) {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });

  // Show a clear demo message for forms that are not connected to a server.
  document.querySelectorAll("form").forEach(function (form) {
    if (form.querySelector("input[name='search']") && petCards.length > 0) return;

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      let message = form.querySelector(".js-message");
      if (!message) {
        message = document.createElement("p");
        message.className = "notice js-message";
        message.setAttribute("role", "status");
        form.appendChild(message);
      }

      const pageTitle = document.title.toLowerCase();
      if (pageTitle.includes("adoption form")) {
        message.textContent = "Thank you! This is a demo. Your adoption request was not saved.";
      } else if (pageTitle.includes("contact")) {
        message.textContent = "Thank you! This is a demo. Your message was not sent.";
      } else if (pageTitle.includes("login")) {
        message.textContent = "Demo login only. A backend is needed to check account details securely.";
      } else if (pageTitle.includes("register")) {
        message.textContent = "Demo registration only. No account was created or saved.";
      } else {
        message.textContent = "This is a demo form. Your information was not saved.";
      }
    });
  });
});
