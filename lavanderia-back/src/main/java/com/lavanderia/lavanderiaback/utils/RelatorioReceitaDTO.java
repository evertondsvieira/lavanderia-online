package com.lavanderia.lavanderiaback.utils;

import java.time.LocalDate;

public class RelatorioReceitaDTO {

  private LocalDate inicio;
  private LocalDate fim;
  private Double receitaTotal;

  public LocalDate getInicio() {
    return inicio;
  }

  public void setInicio(LocalDate inicio) {
    this.inicio = inicio;
  }

  public LocalDate getFim() {
    return fim;
  }

  public void setFim(LocalDate fim) {
    this.fim = fim;
  }

  public Double getReceitaTotal() {
    return receitaTotal;
  }

  public void setReceitaTotal(Double receitaTotal) {
    this.receitaTotal = receitaTotal;
  }
}
