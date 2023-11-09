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

import com.lavanderia.lavanderiaback.database.PedidoRepository;
import com.lavanderia.lavanderiaback.entities.Pedido;

@RestController
@RequestMapping("/order")
public class PedidoController {
    @Autowired
    private PedidoRepository repository;
    
    @GetMapping
    public List<Pedido> get() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public Pedido getItemById(@PathVariable Long id) {
        return repository.findById(id).orElse(null);
    }

    @PostMapping
    public ResponseEntity<Pedido> post(@RequestBody Pedido order) {
        Pedido savedOrder = repository.save(order);
        return new ResponseEntity<>(savedOrder, HttpStatus.CREATED);
    }
  
    @PutMapping("/{id}")
    public void put(@PathVariable Long id, @RequestBody Pedido updatedOrder) {
        Pedido existingOrder = repository.findById(id).orElse(null);
        if (existingOrder != null) {
            existingOrder.setNome(updatedOrder.getNome());
            existingOrder.setData(updatedOrder.getData());
            existingOrder.setDescricao(updatedOrder.getDescricao());
            existingOrder.setStatus(updatedOrder.getStatus());

            repository.save(existingOrder);
        }
    }

    @DeleteMapping("/{id}")
    public void delete(@RequestBody Pedido order) {
        repository.delete(order);
    }
}
