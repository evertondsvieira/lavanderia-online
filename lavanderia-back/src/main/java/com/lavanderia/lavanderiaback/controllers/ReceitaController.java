package com.lavanderia.lavanderiaback.controllers;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.lavanderia.lavanderiaback.database.ReceitaRepository;
import com.lavanderia.lavanderiaback.database.UsuarioRepository;
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
  public ResponseEntity<RelatorioReceitaDTO> getRelatorioReceita(
      @RequestParam("startDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
      @RequestParam("endDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {

    LocalDate dataInicio = startDate.atStartOfDay().toLocalDate();
    LocalDate dataFim = endDate.atTime(23, 59, 59).toLocalDate();

    List<Usuario> usuarios = usuarioRepository.findAll();
    double receitaTotal = usuarios.stream()
        .flatMap(usuario -> usuario.getPedidos().stream())
        .filter(pedido -> pedido.getData().isEqual(dataInicio) ||
            (pedido.getData().isAfter(dataInicio) && pedido.getData().isBefore(dataFim)))
        .mapToDouble(pedido -> pedido.getValor().doubleValue())
        .sum();

    RelatorioReceitaDTO relatorio = new RelatorioReceitaDTO();
    relatorio.setInicio(dataInicio);
    relatorio.setFim(dataFim);
    relatorio.setReceitaTotal(receitaTotal);

    return ResponseEntity.ok(relatorio);
  }

  @GetMapping("/report/search")
  public ResponseEntity<List<Receita>> getRelatorioByDateRange(
      @RequestParam("inicio") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate inicio,
      @RequestParam("fim") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fim) {

    List<Receita> relatorio = repository.findByInicioLessThanEqualAndFimGreaterThanEqualOrderById(inicio, fim);

    return ResponseEntity.ok(relatorio);
  }
}
