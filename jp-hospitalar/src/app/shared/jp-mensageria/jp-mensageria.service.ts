import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class JpMensageriaService {
  _snackBar = inject(MatSnackBar);

  public abrirSnackBar(mensagem: string, classe: Array<string>): void {
    this._snackBar.open(mensagem, '', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: classe,
      direction: 'ltr',
      duration: 4000,
    });
  }
}
