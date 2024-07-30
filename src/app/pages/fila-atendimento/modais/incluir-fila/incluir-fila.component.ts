import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { JPFormulario } from '../../../../core/abstracts/jp-formulario';
import { FilaAtendimentoListagemDto } from '../../../../core/dtos/fila-atendimento-dto';
import { Cidadao } from '../../../../core/entities/cidadao';
import { ClassificacaoEnum } from '../../../../core/enums/classificacao.enum';
import { FilaEnum } from '../../../../core/enums/fila.enum';
import { FilaAtendimentoService } from '../../fila-atendimento.service';

@Component({
  selector: 'app-incluir-fila',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    NgxMaskDirective,
    NgxMaskPipe,
    MatSelectModule,
    MatRadioModule,
  ],
  providers: [provideNgxMask()],
  templateUrl: './incluir-fila.component.html',
  styleUrl: './incluir-fila.component.css',
})
export class IncluirFilaComponent extends JPFormulario implements OnInit {
  public filas: Array<FilaEnum> = FilaEnum.buscarValores();
  public prioridades: Array<string> = ['Sim', 'Não'];
  readonly dialogRef = inject(MatDialogRef);
  private service = inject(FilaAtendimentoService);

  ngOnInit(): void {
    this.criarFormulario();
  }

  private criarFormulario(): void {
    this.formulario = this.formBuilder.group({
      nome: [null, [Validators.maxLength(150), Validators.required]],
      cpf: [null, [Validators.required]],
      cns: [null, [Validators.required, Validators.maxLength(30)]],
      telefone: [null, [Validators.required]],
      nomeDaMae: [null, [Validators.required, Validators.maxLength(150)]],
      endereco: [null, [Validators.required, Validators.maxLength(300)]],
      fila: [null, [Validators.required]],
      prioridade: [null, [Validators.required]],
    });
  }

  public voltar(): void {
    this.dialogRef.close();
  }

  public incluir(): void {
    if (!this.validarFormulario()) {
      this.lancarMensagemErroFormulario();
      return;
    }
    this.service
      .incluirPaciente(this.retornarFormularioComoListaAtendimentoDto())
      .subscribe({
        error: (erro) => {
          this.jpMensageria.abrirSnackBar('Erro ao incluir paciente' + erro, [
            'failure-snackbar',
          ]);
        },
        complete: () => {
          this.dialogRef.close();
          this.jpMensageria.abrirSnackBar('Paciente incluido com sucesso.', [
            'success-snackbar',
          ]);
        },
      });
  }

  public retornarFormularioComoListaAtendimentoDto(): FilaAtendimentoListagemDto {
    debugger;
    const valorFormulario = this.buscarValoresFormulario();
    let filaAtendimentoListagemDto: FilaAtendimentoListagemDto =
      new FilaAtendimentoListagemDto();
    filaAtendimentoListagemDto.classificacao =
      ClassificacaoEnum.SEM_CLASSIFICACAO;
    filaAtendimentoListagemDto.entrada = new Date();
    filaAtendimentoListagemDto.pessoa = new Cidadao();
    filaAtendimentoListagemDto.pessoa.nome = valorFormulario.nome;
    filaAtendimentoListagemDto.pessoa.dataNascimento = new Date();
    filaAtendimentoListagemDto.fila = valorFormulario.fila;
    filaAtendimentoListagemDto.prioridade =
      valorFormulario.prioridade == 'Sim' ? true : false;
    return filaAtendimentoListagemDto;
  }
}
