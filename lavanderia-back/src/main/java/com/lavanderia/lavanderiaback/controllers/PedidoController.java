package com.lavanderia.lavanderiaback.controllers;

import java.util.List;

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

import com.lavanderia.lavanderiaback.database.ItemPedidoRepository;
import com.lavanderia.lavanderiaback.database.PedidoRepository;
import com.lavanderia.lavanderiaback.database.UsuarioRepository;
import com.lavanderia.lavanderiaback.entities.ItemPedido;
import com.lavanderia.lavanderiaback.entities.Pedido;
import com.lavanderia.lavanderiaback.entities.Usuario;

@RestController
@RequestMapping("/order")
public class PedidoController {
    @Autowired
    private PedidoRepository repository;

    @Autowired
    private ItemPedidoRepository itemPedidoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    private static final Logger logger = LoggerFactory.getLogger(PedidoController.class);

    @GetMapping
    public List<Pedido> get() {
        List<Pedido> pedidos = repository.findAll();

        for (Pedido pedido : pedidos) {
            if (pedido.getUsuario() != null) {
                pedido.setUserId(pedido.getUsuario().getId());
            }
        }

        return pedidos;
    }

    @GetMapping("/{id}")
    public Pedido getItemById(@PathVariable Long id) {
        Pedido pedido = repository.findById(id).orElse(null);
    
        if (pedido != null && pedido.getUsuario() != null) {
            pedido.getUsuario().getId();
            pedido.setId(pedido.getUsuario().getId());
        }
    
        return pedido;
    }

    @PutMapping("{orderId}/user/{usuarioId}")
    public ResponseEntity<?> putOrderForUser(@PathVariable Long usuarioId, @PathVariable Long orderId,
        @RequestBody Pedido updatedOrder) {
        Usuario usuario = usuarioRepository.findById(usuarioId).orElse(null);

        if (usuario != null) {
            Pedido existingOrder = repository.findById(orderId).orElse(null);

            if (existingOrder != null) {
                existingOrder.setStatus(updatedOrder.getStatus());
                existingOrder.setData(updatedOrder.getData());

                repository.save(existingOrder);
                return ResponseEntity.ok(existingOrder);
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
        Usuario usuario = order.getUsuario();

        if (usuario == null || usuario.getId() == null) {
            return ResponseEntity.badRequest().body("O pedido não possui um usuário válido associado.");
        }

        order.setUsuario(usuario);

        Pedido novoPedido = repository.save(order);

        List<ItemPedido> itensPedido = order.getItemsPedido();
        if (itensPedido != null) {
            for (ItemPedido itemPedido : itensPedido) {
                itemPedido.setPedido(novoPedido);
                itemPedidoRepository.save(itemPedido);
            }
        }

        return ResponseEntity.ok(novoPedido);
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
