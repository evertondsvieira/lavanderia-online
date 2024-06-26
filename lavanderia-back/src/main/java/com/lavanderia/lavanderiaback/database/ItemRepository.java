package com.lavanderia.lavanderiaback.database;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lavanderia.lavanderiaback.entities.Item;

public interface ItemRepository extends JpaRepository<Item, Long> {
    
}