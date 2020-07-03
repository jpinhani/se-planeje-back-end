const connection = require('../../database/index')
const nodemailer = require('nodemailer');



const user = 'contato@seplaneje.com';
const pass = 'Brasil123';

module.exports = {

  envpswmail(detailsMail) {
    const ID = '_' + Math.random().toString(36).substr(2, 9)
    var template =
      `<div>
                <h1>Olá tudo bem?</h1>
                <p>Você solicitou uma nova senha no SEPLANEJE! :)</p>

                <p>Caso você não seja o destinátario ou não reconheça essa solicitação entre em contato com o SEPLANJE o mais rapído possivel.</p>
                <p>Queremos que sua experiência conosco seja à melhor possivel, dessa forma sempre que 
                não conseguir resolver seus problemas no site ou aplicativo pode nos procurar no email
                contato@seplaneje.com, iremos te atender o quanto antes.</p>

                <strong>Para seu acesso, utilize as seguintes credenciais</strong>
                <p><strong>Usuário:</strong>${detailsMail[0].EMAIL}</p>
                <p><strong>Senha:</strong>${ID}</p>
                </div>`

    const transporter = nodemailer.createTransport({
      host: "smtp.umbler.com",
      port: 587,
      auth: { user, pass }
    })

    transporter.sendMail({
      from: user,
      to: detailsMail[0].EMAIL,
      replyTo: "contato@seplaneje.com",
      subject: "Seplaneje - Nova Senha",
      html: template
    }, function (err) {

      if (err)
        throw err;

      console.log('E-mail enviado para!', `${detailsMail[0].EMAIL}`);

    })

    const sql = `UPDATE USER SET PASSWORD = md5('${ID}') WHERE EMAIL = '${detailsMail[0].EMAIL}'`
    connection.getConnection((error, conn) => {
      conn.query(sql, (error, result) => {
        conn.release();
        if (error)
          return error
        return result
      });
    });

  },
  envpsw(mail) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM GETUSERGENERAL  WHERE (EMAIL = '${mail.mail}' AND last_digits='${mail.lastdigits}')`
      connection.getConnection((error, conn) => {
        conn.query(sql, (error, result) => {
          conn.release();
          (error) ? reject(error) : resolve(result)
        });
      });
    });
  },
  getUser(userId) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM USER WHERE (ID = '${userId}' OR EMAIL = '${userId}')`
      connection.getConnection((error, conn) => {
        conn.query(sql, (error, result) => {
          conn.release();
          (error) ? reject(error) : resolve(result)

        });
      });
    });
  },
  getUserMail(userId) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM USER WHERE (EMAIL = '${userId}')`
      connection.getConnection((error, conn) => {
        conn.query(sql, (error, result) => {
          conn.release();
          (error) ? reject(error) : resolve(result)

        });
      });
    });
  },

  vrfyPagamento(idUser) {
    return new Promise((resolve, reject) => {

      const sql = `SELECT
                       * FROM GETUSERGENERAL
                             WHERE ID = ${idUser}`

      connection.getConnection((error, conn) => {
        conn.query(sql, function (error, result) {
          conn.release();
          error ? reject(error) : resolve(result)
        });
      });
    })
  },

  getUserByEmail(email, password) {
    return new Promise((resolve, reject) => {

      const sql = `SELECT
                           * FROM GETUSERGENERAL
                                 WHERE EMAIL = '${email}' 
                                  AND  PASSWORD = md5('${password}')`

      connection.getConnection((error, conn) => {
        conn.query(sql, function (error, result) {
          conn.release();
          error ? reject(error) : resolve(result)
        });
      });
    })
  },

  getUserDetails(idUser) {
    return new Promise((resolve, reject) => {

      const sql = `SELECT
                           * FROM GETUSERGENERAL
                                 WHERE ID = ${idUser}`

      connection.getConnection((error, conn) => {
        conn.query(sql, function (error, result) {
          conn.release();
          error ? reject(error) : resolve(result)
        });
      });
    })
  },


  NewUser(email, password) {

    return new Promise((resolve, reject) => {
      const sql = `INSERT 
                           INTO USER VALUES (
                                            null,
                                            '${email}',
                                            md5('${password}'),
                                           'Ativo')`

      connection.getConnection((error, conn) => {
        conn.query(sql, function (error, result) {
          conn.release();
          error ? reject(error) : resolve(result)
        });
      });
    })
  },
  alterpsw(body) {
    return new Promise((resolve, reject) => {
      const sql = `UPDATE USER 
                            SET PASSWORD = md5('${body.password}'),
                                STATUS = 'Ativo'
                                   WHERE  ID = '${body.id}'`
      connection.getConnection((error, conn) => {
        conn.query(sql, (error, result) => {
          conn.release();
          error ? reject(error) : resolve(result)
        });
      });
    });
  },
  CanceledUser(email) {

    return new Promise((resolve, reject) => {
      const sql = `UPDATE 
                         USER SET STATUS = 'Inativo'
                              WHERE EMAIL = '${email}'`

      connection.getConnection((error, conn) => {
        conn.query(sql, function (error, result) {
          conn.release();
          error ? reject(error) : resolve(result)
        });
      });
    })
  }

}