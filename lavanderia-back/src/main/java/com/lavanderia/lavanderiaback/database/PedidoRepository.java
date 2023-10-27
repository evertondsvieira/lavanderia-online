package com.lavanderia.lavanderiaback.database;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lavanderia.lavanderiaback.entities.Pedido;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {
    
}
