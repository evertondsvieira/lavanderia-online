package com.lavanderia.lavanderiaback.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.lavanderia.lavanderiaback.entities.Usuario;
import com.lavanderia.lavanderiaback.database.UsuarioRepository;
import com.lavanderia.lavanderiaback.utils.PasswordService;

@Service
public class AuthenticationService {

    @Autowired
    private UsuarioRepository userRepository;

    public Usuario authenticate(String email, String password) {
        Usuario user = userRepository.findByEmail(email);
        if (user != null) {
            String salt = user.getSalt();
            String hashedPassword = PasswordService.criptografarSenha(password, salt);
            if (hashedPassword.equals(user.getSenha())) {
                return user; 
            }
        }
        return null;
    }
}
