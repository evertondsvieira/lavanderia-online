import { Component, OnInit } from '@angular/core';
import { environment } from 'src/app/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface ClothingItem {
  id: number;
  nome: string;
  valor: string;
  imgUrl: string;
  prazo: string;
  descricao: string;
}

@Component({
  selector: 'app-employee-crud',
  templateUrl: './employee-crud.component.html',
})
export class EmployeeCrudComponent implements OnInit {
  apiUrl = environment.apiUrl;
  listaVazia: boolean = false;
  clothingItems: ClothingItem[] = [];
  itemEmEdicao: ClothingItem | null = null;
  RemovingItem: ClothingItem | null = null;
  showErrorAlert: boolean = false;

  constructor(private http: HttpClient) {}

  novoItem: ClothingItem = {
    id: 0,
    nome: '',
    imgUrl: '',
    valor: '',
    prazo: '',
    descricao: '',
  };

  errorMessages = { nome: '', imgUrl: '', valor: '', prazo: '', descricao: '' };

  editItem(item: ClothingItem) {
    this.itemEmEdicao = { ...item };
    this.novoItem = { ...item };

    if (!this.itemEmEdicao) {
      this.itemEmEdicao = {
        id: 0,
        nome: '',
        imgUrl: '',
        valor: '',
        prazo: '',
        descricao: '',
      };
    }
  }

  ngOnInit(): void {
    this.http.get<ClothingItem[]>(this.apiUrl + 'item').subscribe({
      next: (data: ClothingItem[]) => {
        this.clothingItems = data;
      },
      error: (error: any) => {
        console.error('Erro ao buscar os dados:', error);
        this.showErrorAlert = true;

        setTimeout(() => {
          this.showErrorAlert = false;
        }, 5000);
      },
    });
  }

  addItem() {
    if (this.novoItem.nome && this.novoItem.valor && this.novoItem.prazo && this.validateForm()) {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

      this.http
        .post<ClothingItem>(this.apiUrl + 'item', this.novoItem, { headers })
        .subscribe({
          next: (data: ClothingItem) => {
            this.clothingItems.push(data);
            this.novoItem = {
              id: 0,
              nome: '',
              imgUrl: '',
              valor: '',
              prazo: '',
              descricao: '',
            };
            this.listaVazia = false;
          },
          error: (error: any) => {
            console.error('Erro ao adicionar o item:', error);
            this.showErrorAlert = true;

            setTimeout(() => {
              this.showErrorAlert = false;
            }, 5000);
          },
        });
    }
  }

  putItem() {
    if (this.itemEmEdicao && this.validateForm()) {
      this.itemEmEdicao = { ...this.itemEmEdicao, ...this.novoItem };

      const index = this.clothingItems.findIndex(
        (item) => item.id === this.itemEmEdicao?.id,
      );
      if (index !== -1) {
        this.http
          .put<ClothingItem>(
            `${this.apiUrl}item/${this.itemEmEdicao.id}`,
            this.itemEmEdicao,
          )
          .subscribe({
            next: (data: ClothingItem) => {
              this.clothingItems[index] = data;
              this.itemEmEdicao = null;
            },
            error: (error: any) => {
              console.error('Erro ao atualizar o item:', error);
              this.showErrorAlert = true;

              setTimeout(() => {
                this.showErrorAlert = false;
              }, 5000);
            },
          });
      }
    }
  }

  updateItem() {
    if (!this.novoItem.nome && !this.novoItem.valor && !this.novoItem.prazo && !this.novoItem.imgUrl) return;
  
    if (this.itemEmEdicao) {
      this.putItem();
    } else {
      this.addItem();
    }
  }

  removeItem(item: ClothingItem) {
    const index = this.clothingItems.indexOf(item);
    if (index !== -1) {
      const itemId = item.id;

      this.http.delete(`${this.apiUrl}item/${itemId}`).subscribe({
        next: () => {
          this.clothingItems.splice(index, 1);
          this.listaVazia = this.clothingItems.length === 0;
        },
        error: (error: any) => {
          console.error('Erro ao excluir o item:', error);
          this.showErrorAlert = true;

          setTimeout(() => {
            this.showErrorAlert = false;
          }, 5000);
        },
      });
    }
  }

  cleanForm() {
    this.itemEmEdicao = null;
    this.novoItem = {
      id: 0,
      nome: '',
      imgUrl: '',
      valor: '',
      prazo: '',
      descricao: '',
    };
  }

  validateForm(): boolean {
    this.errorMessages = {
      nome: '',
      imgUrl: '',
      valor: '',
      prazo: '',
      descricao: '',
    };
  
    this.validateName();
    this.validateImgUrl();
    this.validatePrazo();
    this.validateValor();
    this.validateDescricao();
  
    return !Object.values(this.errorMessages).some(message => message !== '');
  }
  

  validateField(fieldName: string): void {
    switch (fieldName) {
      case 'nome':
        this.validateName();
        break;
      case 'imgUrl':
        this.validateImgUrl();
        break;
      case 'prazo':
        this.validatePrazo();
        break;
      case 'valor':
        this.validateValor();
        break;
      case 'descricao':
        this.validateDescricao();
        break;
    }
  }

  validateName(): void {
    this.errorMessages.nome = '';

    if (!this.novoItem.nome) {
      this.errorMessages.nome = 'Nome é obrigatório';
    }
  }

  validateImgUrl(): void {
    this.errorMessages.imgUrl = '';

    if (!this.novoItem.imgUrl) {
      this.errorMessages.imgUrl = 'Imagem é obrigatória';
    }
  }

  validatePrazo(): void {
    this.errorMessages.prazo = '';

    if (!this.novoItem.prazo) {
      this.errorMessages.prazo = 'Prazo é obrigatório';
    }
  }

  validateValor(): void {
    this.errorMessages.valor = '';

    if (!this.novoItem.valor) {
      this.errorMessages.valor = 'Valor é obrigatório';
    }
  }

  validateDescricao(): void {}

  openConfirmationModal(clothingItems: ClothingItem) {
    this.RemovingItem = clothingItems;
  }

  confirmRemoveItem(clothingItems: ClothingItem) {
    if (clothingItems) {
      this.removeItem(clothingItems);
      this.RemovingItem = null;
    }
  }

  cancelRemoveItem() {
    this.RemovingItem = null;
  }
}
