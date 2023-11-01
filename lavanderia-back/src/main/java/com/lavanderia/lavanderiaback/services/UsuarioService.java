package com.lavanderia.lavanderiaback.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lavanderia.lavanderiaback.database.UsuarioRepository;
import com.lavanderia.lavanderiaback.entities.Usuario;
import com.lavanderia.lavanderiaback.utils.PasswordService;

@Service
public class UsuarioService {

  @Autowired
  private UsuarioRepository usuarioRepository;

  public Usuario criarNovoUsuario(String nome, String email, String senha) {
    String salt = PasswordService.gerarSalt();

    String senhaCriptografada = PasswordService.criptografarSenha(senha, salt);

    Usuario usuario = new Usuario();
    usuario.setNome(nome);
    usuario.setEmail(email);
    usuario.setSenha(senhaCriptografada);
    usuario.setSalt(salt);

    return usuarioRepository.save(usuario);
  }

  public boolean autenticarUsuario(String email, String senha) {
    Usuario usuario = usuarioRepository.findByEmail(email);

    if (usuario == null) {
      return false;
    }

    String senhaCriptografada = PasswordService.criptografarSenha(senha, usuario.getSalt());
    return senhaCriptografada.equals(usuario.getSenha());
  }
}
