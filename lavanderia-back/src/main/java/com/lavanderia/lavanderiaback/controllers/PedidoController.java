package com.lavanderia.lavanderiaback.controllers;

import java.util.List;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lavanderia.lavanderiaback.database.ItemRepository;
import com.lavanderia.lavanderiaback.database.PedidoRepository;
import com.lavanderia.lavanderiaback.entities.Item;
import com.lavanderia.lavanderiaback.entities.Pedido;

@RestController
@RequestMapping("/order")
public class PedidoController {
    @Autowired
    private PedidoRepository repository;

    @Autowired
    private ItemRepository itemRepository;

    @GetMapping
    public List<Pedido> get() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public Pedido getItemById(@PathVariable Long id) {
        return repository.findById(id).orElse(null);
    }

    @PostMapping
    public ResponseEntity<?> criarPedido(@RequestBody Pedido order) {
        Pedido pedido = new Pedido();
        pedido.setNome(order.getNome());
        pedido.setPrazo(order.getPrazo());
        pedido.setStatus(order.getStatus());
        pedido.setValor(order.getValor());
        pedido.setData(order.getData());

        List<Item> items = new ArrayList<>();

        if (order.getItems() != null) {
            for (Item newItem : order.getItems()) {
                if (newItem.getId() != null) {
                    Item existingItem = itemRepository.findById(newItem.getId()).orElse(null);

                    if (existingItem != null) {
                        existingItem.setPedido(pedido);
                        items.add(existingItem);
                    } else {
                        return ResponseEntity.badRequest().body("ID de item inválido: " + newItem.getId());
                    }
                }
            }
        }

        pedido.setItems(items);

        if (!items.isEmpty()) {
            repository.save(pedido);
            return ResponseEntity.ok(pedido);
        } else {
            return ResponseEntity.badRequest().body("Nenhum item válido associado ao pedido.");
        }
    }

    @PutMapping("/{id}")
    public void put(@PathVariable Long id, @RequestBody Pedido updatedOrder) {
        Pedido existingOrder = repository.findById(id).orElse(null);
        if (existingOrder != null) {
            existingOrder.setNome(updatedOrder.getNome());
            existingOrder.setData(updatedOrder.getData());
            existingOrder.setStatus(updatedOrder.getStatus());
            repository.save(existingOrder);
        }
    }

    @DeleteMapping("/{id}")
    public void delete(@RequestBody Pedido order) {
        repository.delete(order);
    }
}
