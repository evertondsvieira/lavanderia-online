package com.lavanderia.lavanderiaback.controllers;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lavanderia.lavanderiaback.database.ReceitaRepository;
import com.lavanderia.lavanderiaback.database.UsuarioRepository;
import com.lavanderia.lavanderiaback.entities.Pedido;
import com.lavanderia.lavanderiaback.entities.Receita;
import com.lavanderia.lavanderiaback.entities.Usuario;
import com.lavanderia.lavanderiaback.utils.RelatorioReceitaDTO;

@RestController
@RequestMapping("/recipe")
public class ReceitaController {
  @Autowired
  private ReceitaRepository repository;

  @Autowired
  private UsuarioRepository usuarioRepository;

  @GetMapping
  public List<Receita> get() {
    return repository.findAll();
  }

  @GetMapping("/{id}")
  public Receita getItemById(@PathVariable Long id) {
    return repository.findById(id).orElse(null);
  }

  @GetMapping("/report")
  public ResponseEntity<RelatorioReceitaDTO> getRelatorioReceita() {
    LocalDate dataInicio = LocalDate.now().withDayOfMonth(1);
    LocalDate dataFim = YearMonth.now().atEndOfMonth();

    List<Usuario> usuarios = usuarioRepository.findAll();
    double receitaTotal = usuarios.stream()
        .flatMap(usuario -> usuario.getPedidos().stream())
        .filter(pedido -> pedido.getData().isAfter(dataInicio) && pedido.getData().isBefore(dataFim))
        .mapToDouble(pedido -> pedido.getValor().doubleValue()) 
        .sum();

    RelatorioReceitaDTO relatorio = new RelatorioReceitaDTO();
    relatorio.setInicio(dataInicio);
    relatorio.setFim(dataFim);
    relatorio.setReceitaTotal(receitaTotal);

    return ResponseEntity.ok(relatorio);
  }
}
