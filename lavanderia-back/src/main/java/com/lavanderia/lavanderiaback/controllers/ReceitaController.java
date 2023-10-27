package com.lavanderia.lavanderiaback.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lavanderia.lavanderiaback.database.ReceitaRepository;
import com.lavanderia.lavanderiaback.entities.Receita;

@RestController
@RequestMapping("/recipe")
public class ReceitaController {
    @Autowired
    private ReceitaRepository repository;

    @GetMapping
    public List<Receita> get() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public Receita getItemById(@PathVariable Long id) {
        return repository.findById(id).orElse(null);
    }
}
