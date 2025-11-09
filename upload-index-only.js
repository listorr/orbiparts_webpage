import FtpDeploy from 'ftp-deploy';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ftpDeploy = new FtpDeploy();

const config = {
    user: "u774458741",
    password: "Orbiparts1.",
    host: "82.25.113.198",
    port: 21,
    localRoot: join(__dirname, 'dist'),
    remoteRoot: '/public_html/',
    include: ['index.html'],  // SOLO index.html
    exclude: [],
    deleteRemote: false,  // NO borrar nada
    forcePasv: true,
    sftp: false
};

console.log('🚀 Starting index.html upload...');
console.log('📁 Local file:', join(__dirname, 'dist/index.html'));
console.log('📤 Remote destination: /public_html/index.html');
console.log('');

ftpDeploy
    .deploy(config)
    .then(res => {
        console.log('✅ index.html uploaded successfully!');
        console.log('🎉 Done!');
    })
    .catch(err => {
        console.error('❌ Error:', err);
        process.exit(1);
    });

ftpDeploy.on('uploading', function (data) {
    console.log('📤 Uploading:', data.filename);
});

ftpDeploy.on('uploaded', function (data) {
    console.log('✅ Uploaded:', data.filename);
});
