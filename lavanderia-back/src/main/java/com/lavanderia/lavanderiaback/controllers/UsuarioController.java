package com.lavanderia.lavanderiaback.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lavanderia.lavanderiaback.database.UsuarioRepository;
import com.lavanderia.lavanderiaback.entities.Usuario;
import com.lavanderia.lavanderiaback.utils.EmailService;
import com.lavanderia.lavanderiaback.utils.PasswordService;

@RestController
@RequestMapping("/user")
public class UsuarioController {
    @Autowired
    private UsuarioRepository repository;

    @Autowired
    private EmailService emailService;

    @GetMapping
    public List<Usuario> get(){
        return repository.findAll();   
    }

    @GetMapping("/{id}")
    public Usuario getItemById(@PathVariable Long id) {
        return repository.findById(id).orElse(null);
    }

    @PostMapping
    public void post(@RequestBody Usuario user){
        String randomPassword = PasswordService.generateRandomPassword();

        String salt = PasswordService.gerarSalt();
        
        String encryptedPassword = PasswordService.criptografarSenha(randomPassword, salt);
    
        user.setSenha(encryptedPassword);
        user.setSalt(salt);    

        repository.save(user);

        emailService.sendRandomPasswordEmail(user.getEmail(), randomPassword);
    }

    @PutMapping("/{id}")
    public void put(@PathVariable Long id, Usuario user){
        Usuario existingUser = repository.findById(id).orElse(null);
        if (existingUser != null) {
            existingUser.setNome(user.getNome());
            existingUser.setEmail(user.getEmail());
            existingUser.setCpf(user.getCpf());
            existingUser.setTelefone(user.getTelefone());
            existingUser.setCep(user.getCep());
            existingUser.setUF(user.getUF());
            existingUser.setCidade(user.getCidade());
            existingUser.setBairro(user.getBairro());
            existingUser.setRua(user.getRua());

            repository.save(existingUser);
        }
    }

    @DeleteMapping("/{id}")
    public void deleteItem(@PathVariable Long id) {
        repository.deleteById(id);
    }
}
