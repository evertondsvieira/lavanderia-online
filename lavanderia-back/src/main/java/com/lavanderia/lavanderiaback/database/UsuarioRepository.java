package com.lavanderia.lavanderiaback.database;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lavanderia.lavanderiaback.entities.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Usuario findByEmail(String email);
}
