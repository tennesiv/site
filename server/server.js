const nodemailer = require('nodemailer');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors()); 

app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: 'godof830@gmail.com',  
    pass: 'ecwq rzuy bydv rbec'     
  }
});

app.post('/send-message', (req, res) => {
  const { name, email, message } = req.body;
  

  console.log('Получены данные от пользователя:');
  console.log(`Имя: ${name}`);
  console.log(`Email: ${email}`);
  console.log(`Сообщение: ${message}`);

  const mailOptions = {
    from: email,  
    to: 'godof830@gmail.com',  
    subject: 'Новое сообщение с сайта',  
    text: `Имя: ${name}\nEmail: ${email}\nСообщение:\n${message}`  
  };


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

