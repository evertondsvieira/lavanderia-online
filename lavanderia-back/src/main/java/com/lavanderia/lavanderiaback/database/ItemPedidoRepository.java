package com.lavanderia.lavanderiaback.database;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lavanderia.lavanderiaback.entities.ItemPedido;

public interface ItemPedidoRepository extends JpaRepository<ItemPedido, Long> {
  
}
