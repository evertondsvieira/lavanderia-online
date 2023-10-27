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

import com.lavanderia.lavanderiaback.database.FuncionarioRepository;
import com.lavanderia.lavanderiaback.entities.Funcionario;

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
    public void post(@RequestBody Funcionario funcionario) {
        repository.save(funcionario);
    }

    @PutMapping("/{id}")
    public void put(@PathVariable Long id, @RequestBody Funcionario updatedFuncionario) {
        Funcionario existingFuncionario = repository.findById(id).orElse(null);
        if (existingFuncionario != null) {
            existingFuncionario.setNome(updatedFuncionario.getNome());
            existingFuncionario.setEmail(updatedFuncionario.getEmail());
            existingFuncionario.setDataNascimento(updatedFuncionario.getDataNascimento());
            existingFuncionario.setSenha(updatedFuncionario.getSenha());

            repository.save(existingFuncionario);
        }
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        repository.deleteById(id);
    }
}
