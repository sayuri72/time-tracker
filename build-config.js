// Netlifyビルド時にconfig.jsを生成するスクリプト
// Netlifyの環境変数からSupabase設定を読み込んでconfig.jsを作成

const fs = require('fs');
const path = require('path');

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ エラー: Netlifyの環境変数 SUPABASE_URL と SUPABASE_ANON_KEY を設定してください。');
  console.error('   Site settings → Environment variables で追加し、再デプロイしてください。');
  process.exit(1);
}

// シングルクォートをエスケープ（URL・キーに含まれる場合に備える）
const escapeForJs = (s) => String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'");
const configContent = `// Supabase設定ファイル（Netlifyビルド時に自動生成）
window.SUPABASE_CONFIG = {
  url: '${escapeForJs(supabaseUrl)}',
  anonKey: '${escapeForJs(supabaseAnonKey)}'
};
`;

const configPath = path.join(__dirname, 'public', 'config.js');
fs.writeFileSync(configPath, configContent, 'utf8');
console.log('✅ config.js generated successfully');
