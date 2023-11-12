package com.lavanderia.lavanderiaback.services;

import org.springframework.stereotype.Service;

import com.lavanderia.lavanderiaback.entities.Usuario;
import com.lavanderia.lavanderiaback.utils.PasswordService;

@Service
public class UsuarioService {
  public boolean autenticarUsuario(Usuario usuario, String senha) {
    if (usuario == null) {
      return false;
    }

    String senhaCriptografada = PasswordService.criptografarSenha(senha, usuario.getSalt());
    return senhaCriptografada.equals(usuario.getSenha());
  }
}
