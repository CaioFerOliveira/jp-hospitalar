import { Cidadao } from '../entities/cidadao';
import { ClassificacaoEnum } from '../enums/classificacao.enum';
import { FilaEnum } from '../enums/fila.enum';

export class FilaAtendimentoListagemDto {
  classificacao!: ClassificacaoEnum;
  prioridade!: boolean;
  fila!: FilaEnum;
  pessoa!: Cidadao;
  entrada!: Date;

  constructor() {}
}
