import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments';
import { FilaAtendimentoListagemDto } from '../../core/dtos/fila-atendimento-dto';

@Injectable({
  providedIn: 'root',
})
export class FilaAtendimentoService {
  url = environment.API_URL + 'fila-atendimento-listagem';

  private http = inject(HttpClient);

  public buscarFilarAtendimento(): Observable<
    Array<FilaAtendimentoListagemDto>
  > {
    return this.http.get<Array<FilaAtendimentoListagemDto>>(this.url);
  }
  public incluirPaciente(
    dto: FilaAtendimentoListagemDto
  ): Observable<FilaAtendimentoListagemDto> {
    return this.http.post<FilaAtendimentoListagemDto>(this.url, dto);
  }
}
