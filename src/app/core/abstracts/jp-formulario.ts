import { inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { JpMensageriaService } from '../../shared/jp-mensageria/jp-mensageria.service';

export abstract class JPFormulario {
  public formulario!: FormGroup;
  public formBuilder = inject(FormBuilder);
  public jpMensageria = inject(JpMensageriaService);
  public obrigatorio: ValidatorFn = Validators.required;

  public buscarValoresFormulario(): any {
    return this.formulario.value;
  }

  public limparFormulario(): void {
    this.formulario.reset();
  }

  public validarFormulario(): boolean {
    return this.formulario.valid;
  }

  public destacarCamposInvalidos(): void {
    this.formulario.markAllAsTouched();
  }

  public lancarMensagemErroFormulario(): void {
    let formularioEstaValido = this.validarFormulario();
    if (!formularioEstaValido) {
      this.jpMensageria.abrirSnackBar(
        'Preencha todos os campos obrigatórios.',
        ['failure-snackbar']
      );
      this.destacarCamposInvalidos();
    }
  }
}
