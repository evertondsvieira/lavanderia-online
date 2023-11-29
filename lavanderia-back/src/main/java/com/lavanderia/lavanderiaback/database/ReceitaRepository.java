package com.lavanderia.lavanderiaback.database;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lavanderia.lavanderiaback.entities.Receita;

public interface ReceitaRepository extends JpaRepository<Receita, Long> {
    List<Receita> findByInicioLessThanEqualAndFimGreaterThanEqualOrderById(
        LocalDate fim, 
        LocalDate inicio
    );
}
