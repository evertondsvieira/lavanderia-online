package com.lavanderia.lavanderiaback.controllers;

import java.util.List;
import java.util.ArrayList;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

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
import com.lavanderia.lavanderiaback.database.UsuarioRepository;
import com.lavanderia.lavanderiaback.entities.Item;
import com.lavanderia.lavanderiaback.entities.Pedido;
import com.lavanderia.lavanderiaback.entities.Usuario;

@RestController
@RequestMapping("/order")
public class PedidoController {
    @Autowired
    private PedidoRepository repository;

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    private static final Logger logger = LoggerFactory.getLogger(PedidoController.class);

    @GetMapping
    public List<Pedido> get() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public Pedido getItemById(@PathVariable Long id) {
        return repository.findById(id).orElse(null);
    }
   
    @PutMapping("{orderId}/user/{usuarioId}")
    public ResponseEntity<String> putOrderForUser(@PathVariable Long usuarioId, @PathVariable Long orderId,
        @RequestBody Pedido updatedOrder) {
        Usuario usuario = usuarioRepository.findById(usuarioId).orElse(null);

        if (usuario != null) {
            Pedido existingOrder = repository.findById(orderId).orElse(null);

            if (existingOrder != null) {
                existingOrder.setStatus(updatedOrder.getStatus());
                existingOrder.setData(updatedOrder.getData());

                repository.save(existingOrder);
                return ResponseEntity.ok("Pedido atualizado com sucesso.");
            } else {
                return ResponseEntity.notFound().build();
            }
        } else {
            return ResponseEntity.badRequest().body("ID de usuário inválido: " + usuarioId);
        }
    }

    @GetMapping("/user/{usuarioId}")
    public ResponseEntity<List<Pedido>> getPedidosByUsuario(@PathVariable Long usuarioId) {
        Usuario usuario = usuarioRepository.findById(usuarioId).orElse(null);

        if (usuario != null) {
            List<Pedido> pedidos = usuario.getPedidos();

            return ResponseEntity.ok(pedidos);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping()
    public ResponseEntity<?> criarPedido(@RequestBody Pedido order) {
        Usuario usuarioPedido = order.getUsuario();
        
        if (usuarioPedido == null) {
            return ResponseEntity.badRequest().body("O pedido não possui um usuário associado.");
        }
    
        Long userId = usuarioPedido.getId();
    
        if (userId == null) {
            return ResponseEntity.badRequest().body("O usuário associado ao pedido não possui ID.");
        }
        
        Pedido pedido = new Pedido();
        pedido.setNome(order.getNome());
        pedido.setPrazo(order.getPrazo());
        pedido.setStatus(order.getStatus());
        pedido.setValor(order.getValor());
        pedido.setData(order.getData());
        pedido.setUsuario(usuarioPedido);
    
        List<Item> items = new ArrayList<>();
    
        if (order.getItems() != null) {
            for (Item newItem : order.getItems()) {
                if (newItem.getId() != null) {
                    Item existingItem = itemRepository.findById(newItem.getId()).orElse(null);
    
                    if (existingItem != null) {
                        Item newItemCopy = new Item();
    
                        newItemCopy.setNome(existingItem.getNome());
                        newItemCopy.setValor(existingItem.getValor());
                        newItemCopy.setDescricao(existingItem.getDescricao());
                        newItemCopy.setImgUrl(existingItem.getImgUrl());
                        newItemCopy.setPrazo(existingItem.getPrazo());
                        newItemCopy.setQuantidade(existingItem.getQuantidade());
    
                        newItemCopy.setPedido(pedido);
                        items.add(newItemCopy);
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
