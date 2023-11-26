package com.lavanderia.lavanderiaback.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.lavanderia.lavanderiaback.entities.Usuario;
import com.lavanderia.lavanderiaback.database.FuncionarioRepository;
import com.lavanderia.lavanderiaback.database.UsuarioRepository;
import com.lavanderia.lavanderiaback.entities.Funcionario;
import com.lavanderia.lavanderiaback.services.FuncionarioService;
import com.lavanderia.lavanderiaback.services.JwtToken;
import com.lavanderia.lavanderiaback.services.UsuarioService;

@RestController
@RequestMapping("/login")
public class AuthenticationController {
    @Autowired
    private UsuarioRepository userRepository;

    @Autowired
    private FuncionarioRepository employeeRepository;

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private FuncionarioService funcionarioService;

    @PostMapping
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {
        try {
            String email = loginRequest.getEmail();
            String senha = loginRequest.getSenha();
    
            Usuario usuario = userRepository.findByEmail(email);
            Funcionario funcionario = employeeRepository.findByEmail(email);
    
            if (usuario != null && usuarioService.autenticarUsuario(usuario, senha)) {
                String role = "usuario";
                Long userId = usuario.getId();
                String nomeUsuario = usuario.getNome();
                String token = JwtToken.generateToken(userId.toString(), nomeUsuario, email, role);
                LoginResponse response = new LoginResponse(token);
                return ResponseEntity.ok(response);
            } else if (funcionario != null && funcionarioService.autenticarFuncionario(funcionario, senha)) {
                String role = "funcionario";
                Long employeeId = funcionario.getId();
                String nomeFuncionario = funcionario.getNome();
                String token = JwtToken.generateToken(employeeId.toString(), nomeFuncionario, email, role);
                LoginResponse response = new LoginResponse(token);
                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }    
}
