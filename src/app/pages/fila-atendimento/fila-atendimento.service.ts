import { HttpClient, HttpParams } from '@angular/common/http';
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

  public buscarFilaAtendimento(
    params?: Array<{ param: string; id: string }>
  ): Observable<Array<FilaAtendimentoListagemDto>> {
    let httpParams = new HttpParams();
    if (params) {
      params.forEach((param) => {
        httpParams = httpParams.append(`${param.param}.id`, param.id);
      });
    }
    return this.http.get<Array<FilaAtendimentoListagemDto>>(`${this.url}`, {
      params: httpParams,
    });
  }
  public incluirPaciente(
    dto: FilaAtendimentoListagemDto
  ): Observable<FilaAtendimentoListagemDto> {
    return this.http.post<FilaAtendimentoListagemDto>(this.url, dto);
  }
}
