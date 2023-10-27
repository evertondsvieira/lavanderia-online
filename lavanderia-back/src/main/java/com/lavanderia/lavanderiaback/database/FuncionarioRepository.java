package com.lavanderia.lavanderiaback.database;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lavanderia.lavanderiaback.entities.Funcionario;

public interface FuncionarioRepository extends JpaRepository<Funcionario, Long> {
    
}
