package com.lavanderia.lavanderiaback.services;

import org.springframework.stereotype.Component;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

@Component
public class JwtToken {
  public static String generateToken(String username) {
    String tokenData = username + System.currentTimeMillis();
    try {
      MessageDigest md = MessageDigest.getInstance("SHA-256");
      byte[] digest = md.digest(tokenData.getBytes());
      StringBuilder token = new StringBuilder();
      for (byte b : digest) {
        token.append(String.format("%02x", b));
      }
      return token.toString();
    } catch (NoSuchAlgorithmException e) {
      e.printStackTrace();
      return null;
    }
  }
}
