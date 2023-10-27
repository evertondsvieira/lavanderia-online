package com.lavanderia.lavanderiaback.database;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lavanderia.lavanderiaback.entities.Receita;

public interface ReceitaRepository extends JpaRepository<Receita, Long> {
    
}
