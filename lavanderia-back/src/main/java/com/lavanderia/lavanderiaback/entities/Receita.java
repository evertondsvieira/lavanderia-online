package com.lavanderia.lavanderiaback.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Receita {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private Number valor;
    @Column(nullable = false)
    private String inicio;
    @Column(nullable = false)
    private String fim;
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public Number getValor() {
        return valor;
    }
    public void setValor(Number valor) {
        this.valor = valor;
    }
    public String getInicio() {
        return inicio;
    }
    public void setInicio(String inicio) {
        this.inicio = inicio;
    }
    public String getFim() {
        return fim;
    }
    public void setFim(String fim) {
        this.fim = fim;
    }    
}
