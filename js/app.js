// Анимация при скролле
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
});

document.querySelectorAll('.hidden').forEach(el => observer.observe(el));

// Кнопка "наверх"
const scrollTopBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    scrollTopBtn.style.display = "block";
  } else {
    scrollTopBtn.style.display = "none";
  }
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// Модальное окно для галереи
const modal = document.querySelector(".modal");
const modalImg = document.getElementById("modal-img");
const closeBtn = document.querySelector(".close");
const galleryItems = document.querySelectorAll(".gallery-item");

galleryItems.forEach(item => {
  item.addEventListener("click", () => {
    modal.style.display = "block";
    modalImg.src = item.src;
  });
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

// Форма обратной связи
const form = document.getElementById("contact-form");
const status = document.getElementById("response");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    status.style.color = "red";
    status.textContent = "Пожалуйста, заполните все поля!";
    return;
  }

  fetch('http://localhost:3000/send-message', {  // Обрати внимание на этот URL
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, email, message }) // Отправляем данные в формате JSON
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      status.style.color = "green";
      status.textContent = data.message;
    } else {
      status.style.color = "red";
      status.textContent = data.message;
    }
  })
  .catch(error => {
    status.style.color = "red";
    status.textContent = "Произошла ошибка при отправке.";
  });

  form.reset();
});
