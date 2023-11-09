package com.lavanderia.lavanderiaback.controllers;

import java.util.List;

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
import com.lavanderia.lavanderiaback.utils.PasswordService;

@RestController
@RequestMapping("/employee")
public class FuncionarioController {
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
        String salt = PasswordService.gerarSalt(); 
        String senhaCriptografada = hashSenha(funcionario.getSenha(), salt); 
    
        funcionario.setSenha(senhaCriptografada);
        funcionario.setSalt(salt);
    
        Funcionario savedEmployee = repository.save(funcionario);
        return new ResponseEntity<>(savedEmployee, HttpStatus.CREATED);
    }
    
    private String hashSenha(String senha, String salt) {
        return PasswordService.criptografarSenha(senha, salt);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Funcionario> updateEmployee(@PathVariable Long id, @RequestBody Funcionario updatedFuncionario) {
        Funcionario existingFuncionario = repository.findById(id).orElse(null);
    
        if (existingFuncionario != null) {
            existingFuncionario.setNome(updatedFuncionario.getNome());
            existingFuncionario.setEmail(updatedFuncionario.getEmail());
            existingFuncionario.setDatanascimento(updatedFuncionario.getDatanascimento());
    
            if (updatedFuncionario.getSenha() != null) {
                String salt = PasswordService.gerarSalt();
                String senhaCriptografada = hashSenha(updatedFuncionario.getSenha(), salt);
                existingFuncionario.setSenha(senhaCriptografada);
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
