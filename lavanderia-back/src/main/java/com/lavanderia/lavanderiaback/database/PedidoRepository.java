package com.lavanderia.lavanderiaback.database;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lavanderia.lavanderiaback.entities.Pedido;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {
  List<Pedido> findByDataBetween(
    LocalDate startDate, 
    LocalDate endDate
  );
}
