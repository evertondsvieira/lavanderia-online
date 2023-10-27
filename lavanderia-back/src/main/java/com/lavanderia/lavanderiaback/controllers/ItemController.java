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

import com.lavanderia.lavanderiaback.database.ItemRepository;
import com.lavanderia.lavanderiaback.entities.Item;

@RestController
@RequestMapping("/item")
public class ItemController {
    @Autowired
    private ItemRepository repository;

    @PostMapping
    public void createItem(@RequestBody Item item) {
        repository.save(item);
    }

    @GetMapping
    public List<Item> getAllItems() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public Item getItemById(@PathVariable Long id) {
        return repository.findById(id).orElse(null);
    }

    @PutMapping("/{id}")
    public void updateItem(@PathVariable Long id, @RequestBody Item updatedItem) {
        Item existingItem = repository.findById(id).orElse(null);
        if (existingItem != null) {
            existingItem.setNome(updatedItem.getNome());
            existingItem.setValor(updatedItem.getValor());
            existingItem.setDescricao(updatedItem.getDescricao());
            existingItem.setImgUrl(updatedItem.getImgUrl());
            existingItem.setPrazo(updatedItem.getPrazo());
            repository.save(existingItem);
        }
    }

    @DeleteMapping("/{id}")
    public void deleteItem(@PathVariable Long id) {
        repository.deleteById(id);
    }
}
