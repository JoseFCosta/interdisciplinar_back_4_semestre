const tunnelSSH = require('tunnel-ssh');

const config = {
  username: 'aluno29',
  password: 'iPtw8GKM8ls=',
  host: 'verticaltecnologia.net.br',
  port: 47979,
  dstHost: '160.20.22.99',
  dstPort: 3360,
  localHost: '127.0.0.1',
  localPort: 3307,
  keepAlive: true,
};

function openTunnel() {
  return new Promise((resolve, reject) => {
    tunnelSSH(config, (error, server) => {
      if (error) {
        console.error('Erro ao abrir túnel SSH:', error);
        reject(error);
      } else {
        console.log('Túnel SSH aberto com sucesso.');
        resolve(server);
      }
    });
  });
}

module.exports = openTunnel;
