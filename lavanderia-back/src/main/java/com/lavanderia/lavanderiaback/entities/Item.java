package com.lavanderia.lavanderiaback.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String nome;
    @Column(nullable = false)
    private Number valor;
    @Column(nullable = false)
    private Number descricao;
    @Column(nullable = false)
    private Number imgUrl;
    @Column(nullable = false)
    private String prazo;
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getNome() {
        return nome;
    }
    public void setNome(String nome) {
        this.nome = nome;
    }
    public Number getValor() {
        return valor;
    }
    public void setValor(Number valor) {
        this.valor = valor;
    }
    public Number getDescricao() {
        return descricao;
    }
    public void setDescricao(Number descricao) {
        this.descricao = descricao;
    }
    public Number getImgUrl() {
        return imgUrl;
    }
    public void setImgUrl(Number imgUrl) {
        this.imgUrl = imgUrl;
    }
    public String getPrazo() {
        return prazo;
    }
    public void setPrazo(String prazo) {
        this.prazo = prazo;
    }
}
