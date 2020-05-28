const mysql = require('../../database/index')

module.exports = {


  getVerifyDependencia(categoriaID) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT
                      COUNT(A.ID) Verify FROM CATEGORIA A
                        WHERE A.DEPENDENCIA = '${categoriaID}'`

      mysql.getConnection((error, connection) => {
        connection.query(sql, function (error, result) {
          connection.release();
          (error) ? reject(error) : resolve(result)
        });
      })
    })
  },

  getCategoriaComboDepencia(userID, tipo, nivel) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT
                    A.* FROM CATEGORIA A
                            WHERE A.NIVEL = ${nivel}-1
                              AND A.ID_USER IN (${userID},0)
                              AND A.TIPO = ${tipo}
                              AND A.ENTRADA = 1`

      mysql.getConnection((error, connection) => {
        connection.query(sql, function (error, result) {
          connection.release();
          (error) ? reject(error) : resolve(result)
        });
      });
    })
  },

  getCategoriaAll(userID) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT
                      B.ID IDPAI,
                      B.DESCR_CATEGORIA PAI,
                      A.ID,
                      A.ID_USER,
                      A.DEPENDENCIA,
                      A.DESCR_CATEGORIA,
                      A.NIVEL,
                      CASE WHEN A.TIPO = 1 THEN
                         'DESPESA' 
                           WHEN A.TIPO = 2 THEN
                          'RECEITA' END TIPODESCR,
                      A.TIPO,
                      A.AGREGACAO,
                      CASE WHEN A.ENTRADA = '0' THEN
                       'Conta de Input' 
                           WHEN A.ENTRADA = '1' THEN
                       'Conta de Consolidação' END ENTRADADESCR,
                      A.ENTRADA,
                      A.STATUS FROM CATEGORIA A 
                           LEFT OUTER JOIN CATEGORIA B ON (A.DEPENDENCIA = B.ID)
                           WHERE  A.ID_USER IN (${userID},0) AND A.ID > 3
                            ORDER BY A.DEPENDENCIA`

      mysql.getConnection((error, connection) => {
        connection.query(sql, function (error, result, fields) {
          connection.release();
          (error) ? reject(error) : resolve(result)
        });
      })
    })
  },

  getCategoria(userID, categoriaID) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT
                      B.ID IDPAI,
                      B.DESCR_CATEGORIA PAI,
                      A.ID,
                      A.ID_USER,
                      A.DEPENDENCIA,
                      A.DESCR_CATEGORIA,
                      A.NIVEL,
                      CASE WHEN A.TIPO = 1 THEN
                         'DESPESA' 
                           WHEN A.TIPO = 2 THEN
                          'RECEITA' END TIPODESCR,
                      A.TIPO,
                      A.AGREGACAO,
                      CASE WHEN A.ENTRADA = '0' THEN
                       'Conta de Input' 
                           WHEN A.ENTRADA = '1' THEN
                       'Conta de Consolidação' END ENTRADADESCR,
                      A.ENTRADA,
                      A.STATUS FROM CATEGORIA A 
                           LEFT OUTER JOIN CATEGORIA B ON (A.DEPENDENCIA = B.ID)
                           WHERE  A.ID_USER IN (${userID},0)
                             AND A.DESCR_CATEGORIA LIKE '%${categoriaID}%' AND A.ID > 3
                            ORDER BY A.DEPENDENCIA`
      mysql.getConnection((error, connection) => {
        connection.query(sql, function (error, result, fields) {
          connection.release();
          (error) ? reject(error) : resolve(result)
        });
      });
    })
  },

  insertCategoria(body) {

    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO CATEGORIA
                        VALUES (null, 
                              '${body.idUser}',
                              '${body.dependencia}',
                              '${body.descrCategoria}',
                              '${body.nivel}',
                              '${body.tipo}',
                              '${body.agregacao}',
                              '${body.entrada}',
                              '${body.status}')`

      mysql.getConnection((error, connection) => {
        connection.query(sql, function (error, result, fields) {
          connection.release();
          (error) ? reject(error) : resolve(result)
        });
      });
    })
  },


  insertCategoriaDefault(body) {
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO CATEGORIA
                         VALUES (NULL,'${body.idUser}',2,'HABITAÇÃO',3,1,'+',1,'Ativo'),
                                (NULL,'${body.idUser}',2,'EDUCAÇÃO',3,1,'+',1,'Ativo'),
                                (NULL,'${body.idUser}',2,'SAÚDE',3,1,'+',1,'Ativo'),
                                (NULL,'${body.idUser}',2,'LAZER',3,1,'+',1,'Ativo'),
                                (NULL,'${body.idUser}',2,'TRANSPORTE',3,1,'+',1,'Ativo'),
                                (NULL,${body.idUser},(SELECT A.ID FROM CATEGORIA  A
                                  WHERE A.DESCR_CATEGORIA = 'HABITAÇÃO'
                                    AND A.ID_USER = ${body.idUser}),'IPTU',4,1,'+',0,'Ativo'),
                    (NULL,${body.idUser},(SELECT A.ID FROM CATEGORIA  A
                                  WHERE A.DESCR_CATEGORIA = 'HABITAÇÃO'
                                    AND A.ID_USER = ${body.idUser}),'ALUGUEL',4,1,'+',0,'Ativo'),
                    (NULL,${body.idUser},(SELECT A.ID FROM CATEGORIA  A
                                  WHERE A.DESCR_CATEGORIA = 'HABITAÇÃO'
                                    AND A.ID_USER = ${body.idUser}),'CONDOMINIO',4,1,'+',0,'Ativo'),
                    (NULL,${body.idUser},(SELECT A.ID FROM CATEGORIA  A
                                  WHERE A.DESCR_CATEGORIA = 'HABITAÇÃO'
                                    AND A.ID_USER = ${body.idUser}),'ENERGIA',4,1,'+',0,'Ativo'),
                    (NULL,${body.idUser},(SELECT A.ID FROM CATEGORIA  A
                                  WHERE A.DESCR_CATEGORIA = 'HABITAÇÃO'
                                    AND A.ID_USER = ${body.idUser}),'INTERNET',4,1,'+',0,'Ativo'),
                    (NULL,${body.idUser},(SELECT A.ID FROM CATEGORIA  A
                                  WHERE A.DESCR_CATEGORIA = 'HABITAÇÃO'
                                    AND A.ID_USER = ${body.idUser}),'GAS',4,1,'+',0,'Ativo'),
                    (NULL,${body.idUser},(SELECT A.ID FROM CATEGORIA  A
                                  WHERE A.DESCR_CATEGORIA = 'HABITAÇÃO'
                                    AND A.ID_USER = ${body.idUser}),'SERVIÇOS DE ASSINATURAS',4,1,'+',0,'Ativo'),
                    (NULL,${body.idUser},(SELECT A.ID FROM CATEGORIA  A
                                  WHERE A.DESCR_CATEGORIA = 'HABITAÇÃO'
                                    AND A.ID_USER = ${body.idUser}),'SUPERMERCADO',4,1,'+',0,'Ativo'),
                    (NULL,${body.idUser},(SELECT A.ID FROM CATEGORIA  A
                                  WHERE A.DESCR_CATEGORIA = 'HABITAÇÃO'
                                    AND A.ID_USER = ${body.idUser}),'FEIRA',4,1,'+',0,'Ativo'),                                
                    (NULL,${body.idUser},(SELECT A.ID FROM CATEGORIA  A
                                  WHERE A.DESCR_CATEGORIA = 'EDUCAÇÃO'
                                    AND A.ID_USER = ${body.idUser}),'FACULDADE',4,1,'+',0,'Ativo'),
                    (NULL,${body.idUser},(SELECT A.ID FROM CATEGORIA  A
                                  WHERE A.DESCR_CATEGORIA = 'EDUCAÇÃO'
                                    AND A.ID_USER = ${body.idUser}),'ESCOLA',4,1,'+',0,'Ativo'),
                    (NULL,${body.idUser},(SELECT A.ID FROM CATEGORIA  A
                                  WHERE A.DESCR_CATEGORIA = 'EDUCAÇÃO'
                                    AND A.ID_USER = ${body.idUser}),'CRECHE',4,1,'+',0,'Ativo'),
                    (NULL,${body.idUser},(SELECT A.ID FROM CATEGORIA  A
                                  WHERE A.DESCR_CATEGORIA = 'EDUCAÇÃO'
                                    AND A.ID_USER = ${body.idUser}),'CURSOS',4,1,'+',0,'Ativo'),
                    (NULL,${body.idUser},(SELECT A.ID FROM CATEGORIA  A
                                  WHERE A.DESCR_CATEGORIA = 'EDUCAÇÃO'
                                    AND A.ID_USER = ${body.idUser}),'LIVROS',4,1,'+',0,'Ativo'),
                    (NULL,${body.idUser},(SELECT A.ID FROM CATEGORIA  A
                                  WHERE A.DESCR_CATEGORIA = 'SAÚDE'
                                    AND A.ID_USER = ${body.idUser}),'PLANO DE SAÚDE',4,1,'+',0,'Ativo'),
                    (NULL,${body.idUser},(SELECT A.ID FROM CATEGORIA  A
                                  WHERE A.DESCR_CATEGORIA = 'SAÚDE'
                                    AND A.ID_USER = ${body.idUser}),'MEDICOS',4,1,'+',0,'Ativo'),
                    (NULL,${body.idUser},(SELECT A.ID FROM CATEGORIA  A
                                  WHERE A.DESCR_CATEGORIA = 'SAÚDE'
                                    AND A.ID_USER = ${body.idUser}),'DENTISTA',4,1,'+',0,'Ativo'),
                    (NULL,${body.idUser},(SELECT A.ID FROM CATEGORIA  A
                                  WHERE A.DESCR_CATEGORIA = 'SAÚDE'
                                    AND A.ID_USER = ${body.idUser}),'OUTROS SAÚDE',4,1,'+',0,'Ativo'),
                    (NULL,${body.idUser},(SELECT A.ID FROM CATEGORIA  A
                                      WHERE A.DESCR_CATEGORIA = 'LAZER'
                                        AND A.ID_USER = ${body.idUser}),'FESTAS',4,1,'+',0,'Ativo'),
                    (NULL,${body.idUser},(SELECT A.ID FROM CATEGORIA  A
                                      WHERE A.DESCR_CATEGORIA = 'LAZER'
                                        AND A.ID_USER = ${body.idUser}),'RESTAURANTES',4,1,'+',0,'Ativo'),
                    (NULL,${body.idUser},(SELECT A.ID FROM CATEGORIA  A
                                      WHERE A.DESCR_CATEGORIA = 'LAZER'
                                        AND A.ID_USER = ${body.idUser}),'CINEMA',4,1,'+',0,'Ativo'),
                    (NULL,${body.idUser},(SELECT A.ID FROM CATEGORIA  A
                                      WHERE A.DESCR_CATEGORIA = 'LAZER'
                                        AND A.ID_USER = ${body.idUser}),'BARZINHOS',4,1,'+',0,'Ativo'),                                    
                    (NULL,${body.idUser},(SELECT A.ID FROM CATEGORIA  A
                                          WHERE A.DESCR_CATEGORIA = 'LAZER'
                                            AND A.ID_USER = ${body.idUser}),'OUTROS LAZER',4,1,'+',0,'Ativo'),
                    (NULL,${body.idUser},(SELECT A.ID FROM CATEGORIA  A
                                      WHERE A.DESCR_CATEGORIA = 'TRANSPORTE'
                                        AND A.ID_USER = ${body.idUser}),'MANUTENÇÃO DE CARROS',4,1,'+',0,'Ativo'),
                    (NULL,${body.idUser},(SELECT A.ID FROM CATEGORIA  A
                                      WHERE A.DESCR_CATEGORIA = 'TRANSPORTE'
                                        AND A.ID_USER = ${body.idUser}),'REVISÕES DE CARRO',4,1,'+',0,'Ativo'),
                    (NULL,${body.idUser},(SELECT A.ID FROM CATEGORIA  A
                                      WHERE A.DESCR_CATEGORIA = 'TRANSPORTE'
                                        AND A.ID_USER = ${body.idUser}),'IPVA',4,1,'+',0,'Ativo'),
                    (NULL,${body.idUser},(SELECT A.ID FROM CATEGORIA  A
                                      WHERE A.DESCR_CATEGORIA = 'TRANSPORTE'
                                        AND A.ID_USER = ${body.idUser}),'PEDAGIOS',4,1,'+',0,'Ativo'),                                    
                    (NULL,${body.idUser},(SELECT A.ID FROM CATEGORIA  A
                                          WHERE A.DESCR_CATEGORIA = 'TRANSPORTE'
                                            AND A.ID_USER = ${body.idUser}),'MULTAS',4,1,'+',0,'Ativo'),
                    (NULL,${body.idUser},(SELECT A.ID FROM CATEGORIA  A
                                          WHERE A.DESCR_CATEGORIA = 'TRANSPORTE'
                                            AND A.ID_USER = ${body.idUser}),'TRANSPORTE PUBLICO',4,1,'+',0,'Ativo'),
                    (NULL,${body.idUser},(SELECT A.ID FROM CATEGORIA  A
                                          WHERE A.DESCR_CATEGORIA = 'TRANSPORTE'
                                            AND A.ID_USER = ${body.idUser}),'FRETADO',4,1,'+',0,'Ativo')`
      mysql.getConnection((error, connection) => {
        connection.query(sql, function (error, result) {
          connection.release();
          (error) ? reject(error) : resolve(result)
        });
      });
    })
  },



  updateCategoria(body) {

    return new Promise((resolve, reject) => {
      const sql = `UPDATE CATEGORIA SET
                              DEPENDENCIA = '${body.dependencia}', 
                              DESCR_CATEGORIA = '${body.descrCategoria}', 
                              NIVEL = '${body.nivel}',
                              TIPO = '${body.tipo}',
                              AGREGACAO = '${body.agregacao}',
                              ENTRADA = '${body.entrada}',
                              STATUS ='${body.status}' 
                        WHERE ID='${body.id}'`
      mysql.getConnection((error, connection) => {
        connection.query(sql, function (error, result) {
          connection.release();
          (error) ? reject(error) : resolve(result)
        });
      });
    })
  },

  deleteCategoria(body) {

    return new Promise((resolve, reject) => {
      const sql = `DELETE FROM CATEGORIA WHERE ID='${body.id}'`

      mysql.getConnection((error, connection) => {
        connection.query(sql, function (error, result, fields) {
          connection.release();
          (error) ? reject(error) : resolve(result)
        });
      });
    })
  }
}