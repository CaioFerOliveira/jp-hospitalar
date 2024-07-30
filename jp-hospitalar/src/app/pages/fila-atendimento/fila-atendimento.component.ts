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
} from '@angular/forms';

import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FilaAtendimentoListagemDto } from '../../core/dtos/fila-atendimento-dto';
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
  ],
  templateUrl: './fila-atendimento.component.html',
  styleUrl: './fila-atendimento.component.css',
})
export class FilaAtendimentoComponent implements OnInit, AfterViewInit {
  private formBuilder = inject(FormBuilder);
  private service = inject(FilaAtendimentoService);
  private dialog = inject(MatDialog);
  public formulario!: FormGroup;
  public fonteDados = new MatTableDataSource<FilaAtendimentoListagemDto>();
  public totalPacientesFila: WritableSignal<number> = signal(0);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      filtro: [null],
    });
  }
  ngAfterViewInit() {
    this.fonteDados.paginator = this.paginator;
  }

  public buscarFila(): void {
    this.service
      .buscarFilarAtendimento()
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
