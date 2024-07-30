const classificoes: Array<ClassificacaoEnum> = [];

export class ClassificacaoEnum {
  public static SEM_CLASSIFICACAO = new ClassificacaoEnum(
    1,
    'Sem classificação'
  );
  public static NÃO_URGENTE = new ClassificacaoEnum(2, 'Não urgente');
  public static POUCO_URGENTE = new ClassificacaoEnum(3, 'Pouco urgente');
  public static URGENTE = new ClassificacaoEnum(4, 'Urgente');
  public static MUITO_URGENTE = new ClassificacaoEnum(5, 'Muito urgente');
  public static EMERGÊNCIA = new ClassificacaoEnum(6, 'Emergência');

  constructor(public id: number, public descricao: string) {
    classificoes.push(this);
  }

  public static buscarValores(): Array<ClassificacaoEnum> {
    return classificoes;
  }

  public static buscarPorId(id: number): ClassificacaoEnum | undefined {
    return ClassificacaoEnum.buscarValores().find(
      (classificacao: ClassificacaoEnum) => {
        classificacao.id === id;
      }
    );
  }
}
