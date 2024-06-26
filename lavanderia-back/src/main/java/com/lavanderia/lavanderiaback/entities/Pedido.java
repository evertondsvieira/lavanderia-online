package com.lavanderia.lavanderiaback.entities;

import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
public class Pedido {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String nome;
    @Column(nullable = false)
    private LocalDate data;
    @Column(nullable = false)
    private String status;
    @Column(nullable = false)
    private BigDecimal valor;
    @Column(nullable = false)
    private String prazo;
    @Column()
    private String dataPagamento;
    @Column(name = "user_id", insertable = false, updatable = false)
    private Long userId;
    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "user_id")
    private Usuario usuario;
    @JsonIgnoreProperties("items")
    @OneToMany(mappedBy = "pedido", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<ItemPedido> itemsPedido;
    public Long getId() {
        return id;
    }
    public Usuario getUsuario() {
        return usuario;
    }
    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }
    public List<ItemPedido> getItemsPedido() {
        return itemsPedido;
    }
    public void setItemsPedido(List<ItemPedido> itemsPedido) {
        this.itemsPedido = itemsPedido;
    }
    public void setItems(List<ItemPedido> itemsPedido) {
        this.itemsPedido = itemsPedido;
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
    public LocalDate getData() {
        return data;
    }
    public void setData(LocalDate data) {
        this.data = data;
    }
    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }
    public BigDecimal getValor() {
        return valor;
    }
    public void setValor(BigDecimal valor) {
        this.valor = valor;
    }
    public String getPrazo() {
        return prazo;
    }
    public void setPrazo(String prazo) {
        this.prazo = prazo;
    }
    public Long getUserId() {
        return userId;
    }
    public void setUserId(Long userId) {
        this.userId = userId;
    }
    public String getDataPagamento() {
        return dataPagamento;
    }
    public void setDataPagamento(String dataPagamento) {
        this.dataPagamento = dataPagamento;
    }
}
