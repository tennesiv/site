// api/sendMessage.js
const nodemailer = require('nodemailer');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Пожалуйста, заполните все поля!' });
    }

    // Настройки SMTP (например, для Gmail)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'godof830@gmail.com',
        pass: 'ecwq rzuy bydv rbec', // Или используй App Password, если включена двухфакторка
      },
    });

    const mailOptions = {
      from: email,
      to: 'godof830@gmail.com', // На какой адрес приходит письмо
      subject: 'Новое сообщение с сайта',
      text: `Имя: ${name}\nEmail: ${email}\nСообщение:\n${message}`,
    };

    try {
      await transporter.sendMail(mailOptions);
      return res.status(200).json({ message: 'Сообщение успешно отправлено!' });
    } catch (error) {
      return res.status(500).json({ error: 'Ошибка при отправке сообщения!' });
    }
  } else {
    res.status(405).json({ error: 'Метод не поддерживается' });
  }
}
