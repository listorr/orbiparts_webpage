import FtpDeploy from 'ftp-deploy';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ftpDeploy = new FtpDeploy();

// Estas son las credenciales que están en tus GitHub Secrets
// Cámbialas aquí temporalmente para hacer el deployment manual
const config = {
  user: "u774458741", // Tu usuario FTP de Hostinger (CORRECTO)
  password: "Orbiparts1.", // AÑADE TU CONTRASEÑA AQUÍ (NO LA COMMITEES)
  host: "82.25.113.198", // Tu servidor FTP
  port: 21,
  localRoot: __dirname + '/dist',
  remoteRoot: '/public_html/', // Ajusta si es diferente
  include: ['*', '**/*'],
  exclude: ['**/.ftp-deploy-sync-state.json'],
  deleteRemote: true, // Eliminar archivos antiguos
  forcePasv: true,
  sftp: false,
  // FTPS configuration (same as GitHub Actions)
  secure: true,
  secureOptions: {
    rejectUnauthorized: false
  }
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
