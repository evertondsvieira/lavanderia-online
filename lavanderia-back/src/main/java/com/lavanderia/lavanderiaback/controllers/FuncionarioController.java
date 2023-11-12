package com.lavanderia.lavanderiaback.controllers;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lavanderia.lavanderiaback.database.FuncionarioRepository;
import com.lavanderia.lavanderiaback.entities.Funcionario;
import com.lavanderia.lavanderiaback.services.FuncionarioService;
import com.lavanderia.lavanderiaback.utils.PasswordService;

@RestController
@RequestMapping("/employee")
public class FuncionarioController {
    private static final Logger log = LoggerFactory.getLogger(FuncionarioService.class);

    @Autowired
    private FuncionarioRepository repository;

    @GetMapping
    public List<Funcionario> get() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public Funcionario getItemById(@PathVariable Long id) {
        return repository.findById(id).orElse(null);
    }

    @PostMapping
    public ResponseEntity<Funcionario> post(@RequestBody Funcionario funcionario) {
        String senha = funcionario.getSenha();

        String salt = PasswordService.gerarSalt(); 
        String encryptedPassword = PasswordService.criptografarSenha(senha, salt);
    
        funcionario.setSenha(encryptedPassword);
        funcionario.setSalt(salt);
    
        repository.save(funcionario);
        return ResponseEntity.status(HttpStatus.CREATED).body(funcionario);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Funcionario> updateEmployee(@PathVariable Long id, @RequestBody Funcionario updatedFuncionario) {
        Funcionario existingFuncionario = repository.findById(id).orElse(null);
        String senha = updatedFuncionario.getSenha();

        if (existingFuncionario != null) {
            existingFuncionario.setNome(updatedFuncionario.getNome());
            existingFuncionario.setEmail(updatedFuncionario.getEmail());
            existingFuncionario.setDatanascimento(updatedFuncionario.getDatanascimento());
    
            if (updatedFuncionario.getSenha() != null) {
                String salt = PasswordService.gerarSalt();
                String encryptedPassword = PasswordService.criptografarSenha(senha, salt);
                existingFuncionario.setSenha(encryptedPassword);
                existingFuncionario.setSalt(salt);
            }
    
            Funcionario updatedEmployee = repository.save(existingFuncionario);
    
            return new ResponseEntity<>(updatedEmployee, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        repository.deleteById(id);
    }
}
