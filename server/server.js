const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const port = 3000;

// Настройка middleware для обработки JSON
app.use(express.json());

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'godof830@gmail.com', // Укажи свой email
      pass: 'Michilek8',    // Укажи свой пароль (или создайте App Password в Google)
    }
  });

// Пост-обработчик для отправки сообщений с формы
app.post('/send-message', (req, res) => {
  const { name, email, message } = req.body;

  // Настройка письма
  const mailOptions = {
    from: email,
    to: 'godof830@gmail.com',
    subject: 'Новое сообщение с сайта',
    text: `Имя: ${name}\nEmail: ${email}\nСообщение:\n${message}`
  };

  // Отправка письма
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.json({ success: false, message: 'Ошибка при отправке сообщения.' });
    }
    res.json({ success: true, message: 'Сообщение успешно отправлено!' });
  });
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер работает на порту ${port}`);
});

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error('Ошибка при отправке письма:', error);  // Лог ошибки
    return res.json({ success: false, message: 'Ошибка при отправке сообщения.' });
  }
  console.log('Письмо отправлено:', info.response);  // Лог успешной отправки
  res.json({ success: true, message: 'Сообщение успешно отправлено!' });
});
