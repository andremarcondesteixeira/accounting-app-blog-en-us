import { Ativo, CoisaComValorMonetario, Liquidez, Passivo } from "./ativo_e_passivo";
import dinheiro, { Dinheiro } from "./nos_artigos/dinheiro";

export function gerarRelatorioDeBalancoPatrimonial(ativos: Ativo[], passivos: Passivo[], capitalSocial: Dinheiro) {
    const ativosCirculantes = ativos.filter((ativo) => ativo.liquidez === Liquidez.Circulante);
    const ativosNaoCirculantes = ativos.filter((ativo) => ativo.liquidez === Liquidez.NaoCirculante);
    const totalAtivos = somarFatosContabeis(ativos);

    const passivosCirculantes = passivos.filter((passivo) => passivo.liquidez !== Liquidez.NaoCirculante);
    const passivosNaoCirculantes = passivos.filter((passivo) => passivo.liquidez === Liquidez.NaoCirculante);
    const totalPassivos = somarFatosContabeis(passivos);

    const lucroOuPrejuizo = totalAtivos.subtrair(totalPassivos).subtrair(capitalSocial);
    const itensPatrimonioLiquido = [
        new Passivo({
            nome: "Capital social",
            liquidez: Liquidez.NaoCirculante,
            valor: capitalSocial,
        }),
        new Passivo({
            nome: `${lucroOuPrejuizo.maiorOuIgualA(dinheiro(capitalSocial.moeda, 0)) ? "Lucro" : "Prejuízo"} acumulado`,
            liquidez: Liquidez.NaoCirculante,
            valor: lucroOuPrejuizo,
        }),
    ];
    const valorPatrimonioLiquido = somarFatosContabeis(itensPatrimonioLiquido);

    return {
        ativos: {
            circulantes: {
                itens: ativosCirculantes,
                total: somarFatosContabeis(ativosCirculantes),
            },
            naoCirculantes: {
                itens: ativosNaoCirculantes,
                total: somarFatosContabeis(ativosNaoCirculantes),
            },
            total: totalAtivos,
        },
        passivos: {
            circulantes: {
                itens: passivosCirculantes,
                total: somarFatosContabeis(passivosCirculantes),
            },
            naoCirculantes: {
                itens: passivosNaoCirculantes,
                total: somarFatosContabeis(passivosNaoCirculantes),
            },
            patrimonioLiquido: {
                itens: itensPatrimonioLiquido,
                total: valorPatrimonioLiquido,
            },
            total: totalPassivos.adicionar(valorPatrimonioLiquido),
        },
        situacaoPatrimonial: situacaoPatrimonial(valorPatrimonioLiquido),
    };

    function somarFatosContabeis(fatos: CoisaComValorMonetario[]) {
        return fatos.reduce((total, ativo) => {
            return total.adicionar(ativo.valor);
        }, dinheiro(capitalSocial.moeda, 0));
    }
}

function situacaoPatrimonial(patrimonioLiquido: Dinheiro) {
    const zero = dinheiro(patrimonioLiquido.moeda, 0);

    if (patrimonioLiquido.maiorQue(zero)) {
        return SituacaoPatrimonial.Positiva;
    }

    if (patrimonioLiquido.menorQue(zero)) {
        return SituacaoPatrimonial.Negativa;
    }

    return SituacaoPatrimonial.Nula;
}

export enum SituacaoPatrimonial {
    Positiva = "Positiva",
    Nula = "Nula",
    Negativa = "Negativa",
}
