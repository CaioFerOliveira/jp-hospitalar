const filas: Array<FilaEnum> = [];

export class FilaEnum {
  public static ACOLHIMENTO = new FilaEnum(1, 'ACOLHIMENTO');
  public static CLINICA_MEDICA = new FilaEnum(2, 'CLÍNICA_MEDICA');
  public static ENFERMAGEM = new FilaEnum(3, 'ENFERMAGEM');

  constructor(public id: number, public descricao: string) {
    filas.push(this);
  }

  public static buscarValores(): Array<FilaEnum> {
    return filas;
  }

  public static buscarPorId(id: number): FilaEnum | undefined {
    return FilaEnum.buscarValores().find((fila: FilaEnum) => {
      fila.id === id;
    });
  }
}
