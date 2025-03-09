// анимация при скролле
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
});

document.querySelectorAll('.hidden').forEach(el => observer.observe(el));

// кнопка наверх
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

// окно для галереи
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

// форма обратной связи
const form = document.getElementById("contact-form");
const status = document.getElementById("status");

form.addEventListener("submit", (e) => {
  e.preventDefault(); // Не даем форме отправиться традиционным способом

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    status.style.color = "red";
    status.textContent = "Пожалуйста, заполните все поля!";
    return;
  }

  // Отправка данных через fetch
  fetch('/api/sendMessage', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, message })
  })
  .then(response => response.json())
  .then(data => {
    status.style.color = "green";
    status.textContent = "Сообщение успешно отправлено!";
    form.reset();
  })
  .catch(error => {
    status.style.color = "red";
    status.textContent = "Произошла ошибка при отправке сообщения.";
  });
});
