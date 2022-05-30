var database = require("../database/config");

function listar(id_shopping) {
    var instrucao = `
    SELECT alerta.id_alerta,
    tipoAlerta.nome as 'tipoAlertaNome',
    dispositivo.nome,
    DATEPART(DAY, GETDATE()) as 'dia', 
    DATEPART(MONTH, GETDATE()) as 'mes', 
    DATEPART(YEAR, GETDATE()) as 'ano', 
    DATEPART(HOUR, GETDATE()) as 'hora', 
    DATEPART(MINUTE, GETDATE()) as 'minuto',
    tipoAlerta.descricao
    FROM shopping 
    join setor on shopping.id_shopping = setor.fk_shopping
    join localidade on setor.id_setor = localidade.id_localidade
    join dispositivo on localidade.id_localidade = dispositivo.fk_localidade
    JOIN alerta on dispositivo.id_dispositivo = alerta.fk_dispositivo
    JOIN tipoAlerta ON tipoAlerta.id_tipoAlerta = alerta.fk_tipoAlerta
    where shopping.id_shopping = ${id_shopping} order by alerta.data_hora desc;
    
    `;
    return database.executar(instrucao);
}

function cadastrar(tipoAlerta, id_dispositivo) {
    var instrucao = `
        INSERT INTO alerta (fk_tipoAlerta, fk_dispositivo) VALUES (${tipoAlerta}, ${id_dispositivo});
    `;
    return database.executar(instrucao);
}

function acharMetricasDispositivo(id_shopping) {
    var instrucao = `
    SELECT setor.nome as 'setor',
    localidade.nome as 'localidade',
    dispositivo.id_dispositivo,
    sum(evento.chave) as 'totalPessoas' 
    FROM shopping 
    right join setor on shopping.id_shopping = setor.fk_shopping
    right join localidade on setor.id_setor = localidade.id_localidade
    join dispositivo on localidade.id_localidade = dispositivo.fk_localidade
    join evento on dispositivo.id_dispositivo = evento.fk_dispositivo
    WHERE shopping.id_shopping = ${id_shopping}
    group by dispositivo.id_dispositivo, setor.nome, localidade.nome;
    `;
    return database.executar(instrucao);
}

module.exports = {
    listar,
    cadastrar,
    acharMetricasDispositivo
}
