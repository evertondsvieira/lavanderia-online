package com.lavanderia.lavanderiaback.services;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;

public class JwtToken {
  private static final String SECRET_KEY = "supersenhasecreta";

  public static String generateToken(String id, String email, String role) {
    String header = "{\"alg\":\"HS256\",\"typ\":\"JWT\"}";
    String encodedHeader = Base64.getEncoder().encodeToString(header.getBytes());

    String payload = "{\"sub\":\"" + id + "\",\"email\":\"" + email + "\",\"exp\":1609459200,\"role\":\"" + role + "\"}";
    String encodedPayload = Base64.getEncoder().encodeToString(payload.getBytes());

    String signatureData = encodedHeader + "." + encodedPayload + SECRET_KEY;

    try {
      MessageDigest md = MessageDigest.getInstance("SHA-256");
      byte[] digest = md.digest(signatureData.getBytes());
      StringBuilder signature = new StringBuilder();
      for (byte b : digest) {
        signature.append(String.format("%02x", b));
      }

      return encodedHeader + "." + encodedPayload + "." + signature.toString();
    } catch (NoSuchAlgorithmException e) {
      e.printStackTrace();
      return null;
    }
  }
}