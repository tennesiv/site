const nodemailer = require('nodemailer');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',  // Почтовый сервис (например, Gmail)
  auth: {
    user: 'your-email@gmail.com',  // Твоя почта
    pass: 'your-app-password'      // App Password для Gmail (используй, если включена двухфакторная аутентификация)
  }
});

app.post('/send-message', (req, res) => {
  const { name, email, message } = req.body;

  // Создаём объект mailOptions перед использованием
  const mailOptions = {
    from: email,  // Отправитель - это почта, введенная в форме
    to: 'your-email@example.com',  // Твоя почта, куда нужно отправить сообщение
    subject: 'Новое сообщение с сайта',  // Тема письма
    text: `Имя: ${name}\nEmail: ${email}\nСообщение:\n${message}`  // Содержимое письма
  };

  // Отправка письма
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Ошибка при отправке письма:', error);
      return res.status(500).send({ success: false, message: 'Ошибка при отправке письма.' });
    }
    console.log('Письмо отправлено:', info);
    res.send({ success: true, message: 'Сообщение успешно отправлено!' });
  });
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
