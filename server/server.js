const nodemailer = require('nodemailer');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',  // Почтовый сервис (например, Gmail)
  auth: {
    user: 'godof830@gmail.com',  // Твоя почта
    pass: 'Michilek8'      // App Password для Gmail (используй, если включена двухфакторная аутентификация)
  }
});

app.post('/send-message', (req, res) => {
  const { name, email, message } = req.body;
  
  // Логируем полученные данные для отладки
  console.log('Получены данные от пользователя:');
  console.log(`Имя: ${name}`);
  console.log(`Email: ${email}`);
  console.log(`Сообщение: ${message}`);

  const mailOptions = {
    from: email,  // Отправитель
    to: 'godo830@gmail.com',  // Твоя почта
    subject: 'Новое сообщение с сайта',  // Тема письма
    text: `Имя: ${name}\nEmail: ${email}\nСообщение:\n${message}`  // Текст письма
  };

  // Логируем mailOptions перед отправкой
  console.log('Настройки письма:');
  console.log(mailOptions);

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
