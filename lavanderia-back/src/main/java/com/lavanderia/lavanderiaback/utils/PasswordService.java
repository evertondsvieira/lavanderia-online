package com.lavanderia.lavanderiaback.utils;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Random;

import org.springframework.stereotype.Service;

@Service
public class PasswordService {

    public static String generateRandomPassword() {
        Random random = new Random();
        int password = random.nextInt(9000) + 1000;
        return String.valueOf(password);
    }

    public static String criptografarSenha(String senha, String salt) {
        try {
            String senhaComSalt = senha + salt;

            MessageDigest md = MessageDigest.getInstance("SHA-256");

            md.update(senhaComSalt.getBytes());

            byte[] senhaCriptografadaBytes = md.digest();

            StringBuilder senhaCriptografadaHex = new StringBuilder();
            for (byte b : senhaCriptografadaBytes) {
                senhaCriptografadaHex.append(String.format("%02x", b));
            }

            return senhaCriptografadaHex.toString();
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
            return null;
        }
    }

    public static String gerarSalt() {
        SecureRandom random = new SecureRandom();
        byte[] saltBytes = new byte[16];
        random.nextBytes(saltBytes);
        return bytesToHex(saltBytes);
    }

    private static String bytesToHex(byte[] bytes) {
        StringBuilder hexString = new StringBuilder();
        for (byte b : bytes) {
            hexString.append(String.format("%02x", b));
        }
        return hexString.toString();
    }
}
