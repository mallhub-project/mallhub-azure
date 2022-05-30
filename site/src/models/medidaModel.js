var database = require("../database/config");

function buscarUltimasMedidas(id_shopping) {
    instrucaoSql = `
    SELECT count(evento.chave) as 'TotalPessoas' from shopping 
    join setor on id_shopping = fk_shopping
    join localidade on id_setor = fk_setor
    join dispositivo on id_localidade = fk_localidade
    join evento on id_dispositivo = fk_dispositivo
    where id_shopping = ${id_shopping} and chave > 0 
    group by dispositivo.id_dispositivo;`;
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal(id_shopping) {
    instrucaoSql = `
        SELECT count(evento.chave) as 'TotalPessoas' from shopping 
        join setor on id_shopping = fk_shopping
        join localidade on id_setor = fk_setor
        join dispositivo on id_localidade = fk_localidade
        join evento on id_dispositivo = fk_dispositivo
        where id_shopping = ${id_shopping} and chave > 0 
        group by dispositivo.id_dispositivo;
    `;
    return database.executar(instrucaoSql);
}

function buscarMedidasPorMes(id_shopping, data_inicial, data_final) {
    var instrucaoSql = `
        SELECT count(evento.chave) as 'TotalPessoas'
        from shopping 
        join setor on id_shopping = fk_shopping
        join localidade on id_setor = fk_setor
        join dispositivo on id_localidade = fk_localidade
        join evento on id_dispositivo = fk_dispositivo
        where id_shopping = ${id_shopping} and chave > 0 and
        evento.data_hora between '${data_inicial}' and '${data_final}';
    `
    return database.executar(instrucaoSql);
}


module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal,
    buscarMedidasPorMes
}