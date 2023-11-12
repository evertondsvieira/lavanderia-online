package com.lavanderia.lavanderiaback.services;

import org.springframework.stereotype.Service;

import com.lavanderia.lavanderiaback.entities.Funcionario;
import com.lavanderia.lavanderiaback.utils.PasswordService;

@Service
public class FuncionarioService {
  public boolean autenticarFuncionario(Funcionario funcionario, String senha) {
    if (funcionario == null) {
      return false;
    }

    String senhaCriptografada = PasswordService.criptografarSenha(senha, funcionario.getSalt());

    return senhaCriptografada.equals(funcionario.getSenha());
  }
}
