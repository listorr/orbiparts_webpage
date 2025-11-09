const FtpDeploy = require('ftp-deploy');
const ftpDeploy = new FtpDeploy();

// Estas son las credenciales que están en tus GitHub Secrets
// Cámbialas aquí temporalmente para hacer el deployment manual
const config = {
  user: "u716620906.luist4", // Tu usuario FTP de Hostinger
  password: "", // AÑADE TU CONTRASEÑA AQUÍ
  host: "82.25.113.198", // Tu servidor FTP
  port: 21,
  localRoot: __dirname + '/dist',
  remoteRoot: '/public_html/', // Ajusta si es diferente
  include: ['*', '**/*'],
  exclude: [],
  deleteRemote: false,
  forcePasv: true,
  sftp: false
};

console.log('🚀 Iniciando deployment manual a Hostinger...');
console.log('📁 Subiendo archivos desde:', config.localRoot);
console.log('📤 Destino:', config.host + config.remoteRoot);

ftpDeploy
  .deploy(config)
  .then(res => {
    console.log('✅ Deployment completado exitosamente!');
    console.log('🌐 Visita https://orbiparts.com para ver los cambios');
  })
  .catch(err => {
    console.error('❌ Error en el deployment:', err);
  });

ftpDeploy.on('uploading', function(data) {
  console.log('📤 Subiendo:', data.filename);
});

ftpDeploy.on('uploaded', function(data) {
  console.log('✓ Subido:', data.filename);
});
