// Netlifyビルド時にconfig.jsを生成するスクリプト
// Netlifyの環境変数からSupabase設定を読み込んでconfig.jsを作成

const fs = require('fs');
const path = require('path');

const supabaseUrl = process.env.SUPABASE_URL || 'YOUR_SUPABASE_URL';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY';

const configContent = `// Supabase設定ファイル（自動生成）
// このファイルはNetlifyのビルド時に自動生成されます
// ローカル開発時は手動で編集してください

window.SUPABASE_CONFIG = {
  url: '${supabaseUrl}',
  anonKey: '${supabaseAnonKey}'
};
`;

const configPath = path.join(__dirname, 'public', 'config.js');
fs.writeFileSync(configPath, configContent, 'utf8');
console.log('✅ config.js generated successfully');
