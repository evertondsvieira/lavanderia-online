package com.lavanderia.lavanderiaback.utils;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Properties;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    private static final String SMTP_HOST = "smtp.gmail.com";
    private static final String SMTP_PORT = "587";
    private static final String SMTP_AUTH = "true";
    private static final String SMTP_USERNAME = "lavanderia@gmail.com";
    private static final String SMTP_PASSWORD = "supersenhasecreta";

    public void sendRandomPasswordEmail(String to, String randomPassword) {
        Properties properties = new Properties();
        properties.put("mail.smtp.host", SMTP_HOST);
        properties.put("mail.smtp.auth", SMTP_AUTH);
        properties.put("mail.smtp.port", SMTP_PORT);

        Session session = Session.getInstance(properties, new Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(SMTP_USERNAME, SMTP_PASSWORD);
            }
        });

        try {
            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress(SMTP_USERNAME));
            message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(to));
            message.setSubject("Sua nova senha aleatória");
            message.setText("Sua nova senha aleatória é: " + randomPassword);
            Transport.send(message);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }
}

