import {
  AfterViewInit,
  Component,
  inject,
  OnInit,
  signal,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FilaAtendimentoListagemDto } from '../../core/dtos/fila-atendimento-dto';
import { ClassificacaoEnum } from '../../core/enums/classificacao.enum';
import { FilaEnum } from '../../core/enums/fila.enum';
import { FilaAtendimentoService } from './fila-atendimento.service';
import { FiltrosComponent } from './modais/filtros/filtros.component';
import { IncluirFilaComponent } from './modais/incluir-fila/incluir-fila.component';

@Component({
  selector: 'app-fila-atendimento',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatMenuModule,
    MatDialogModule,
    MatCheckboxModule,
    MatRadioModule,
  ],
  templateUrl: './fila-atendimento.component.html',
  styleUrl: './fila-atendimento.component.css',
})
export class FilaAtendimentoComponent implements OnInit, AfterViewInit {
  private formBuilder = inject(FormBuilder);
  private service = inject(FilaAtendimentoService);
  public classificacoes: Array<ClassificacaoEnum> =
    ClassificacaoEnum.buscarValores();
  private dialog = inject(MatDialog);
  public formulario!: FormGroup;
  public fonteDados = new MatTableDataSource<FilaAtendimentoListagemDto>();
  public totalPacientesFila: WritableSignal<number> = signal(0);
  public filaEnum: Array<FilaEnum> = FilaEnum.buscarValores();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      filtro: [null],
      classificacao: ['', [Validators.required]],
    });

    this.buscarFila();

    this.formulario.get('classificacao')?.valueChanges.subscribe((newValue) => {
      if (newValue) {
        this.service
          .buscarFilaAtendimento([{ param: 'classificacao', id: newValue }])
          .subscribe((res) => {
            console.log(res);
            this.fonteDados.data = res;
            this.totalPacientesFila.set(res.length);
          });
      } else {
        this.buscarFila();
      }
    });
  }

  RadioButtonClick(ev: Event): void {
    this.formulario.get('classificacao')?.reset();
  }
  ngAfterViewInit(): void {
    this.fonteDados.paginator = this.paginator;
  }

  public buscarFila(): void {
    this.service
      .buscarFilaAtendimento()
      .subscribe((lista: Array<FilaAtendimentoListagemDto>) => {
        this.fonteDados.data = lista;
        this.totalPacientesFila.set(lista.length);
      });
  }

  public incluirNaFila(): void {
    const dialogRef = this.dialog.open(IncluirFilaComponent, {
      height: '95%',
      width: '75%',
    });
  }

  public abrirModalFiltros(): void {
    const dialogRef = this.dialog.open(FiltrosComponent, {
      height: '80%',
      width: '75%',
    });
  }

  colunas: Array<IColunas> = [
    {
      def: 'classificacao',
      cabecalho: 'Classificação',
      conteudo: (element: FilaAtendimentoListagemDto) =>
        `${element.classificacao.descricao}`,
    },
    {
      def: 'prioridade',
      cabecalho: 'Prioridade',
      conteudo: (element: FilaAtendimentoListagemDto) =>
        `${element.prioridade ? 'Sim' : 'Não'}`,
    },
    {
      def: 'fila',
      cabecalho: 'Fila',
      conteudo: (element: FilaAtendimentoListagemDto) =>
        `${element.fila.descricao}`,
    },
    {
      def: 'cidadao',
      cabecalho: 'Cidadão',
      conteudo: (element: FilaAtendimentoListagemDto) =>
        `${element.pessoa.nome}`,
    },
    {
      def: 'entrada',
      cabecalho: 'Entrada',
      conteudo: (element: FilaAtendimentoListagemDto) => `${element.entrada}`,
    },
    {
      def: 'dataNascimanto',
      cabecalho: 'Data Nascimento',
      conteudo: (element: FilaAtendimentoListagemDto) =>
        `${element.pessoa.dataNascimento}`,
    },
  ];
  mostrarColunasDinamicas = [
    'classificacao',
    'prioridade',
    'fila',
    'cidadao',
    'entrada',
    'dataNascimanto',
    'acoes',
  ];
}

export interface IColunas {
  def: string;

  cabecalho: string;

  conteudo: any;
}
