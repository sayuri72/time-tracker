# タイムトラッカー（Supabase版）

作業時間や内容を記録し、月次の稼働時間や金額を確認できるWebアプリケーションです。

## 機能

- 🔐 メールアドレス認証（Magic Link）
- ⏱️ 作業時間の記録（開始/終了時刻、休憩時間）
- 👥 クライアント管理（複数のクライアント、時給設定）
- 📊 月次サマリ（合計時間、金額、クライアント別集計）
- 📱 モバイル対応

## セットアップ手順

### 1. Supabaseプロジェクトの作成

1. [Supabase](https://supabase.com/)にアクセスしてアカウントを作成
2. 新しいプロジェクトを作成
3. プロジェクトのURLとAPIキーをメモしておく
   - ダッシュボードの「Settings」→「API」から取得
   - `Project URL` と `anon public` キー

### 2. データベーステーブルの作成

Supabaseダッシュボードで以下の手順を実行：

1. 左メニューから「SQL Editor」を開く
2. `supabase/migrations/001_initial_schema.sql` の内容をコピー＆ペースト
3. 「Run」ボタンをクリックして実行

これで以下のテーブルが作成されます：
- `clients` - クライアント情報
- `time_entries` - 作業時間の記録

### 3. 認証設定

1. Supabaseダッシュボードの「Authentication」→「URL Configuration」を開く
2. 「Site URL」にデプロイ後のURLを設定（後で更新可能）
3. 「Redirect URLs」にデプロイ後のURLを追加

### 4. Netlifyへのデプロイ

このプロジェクトはNetlifyでホスティングすることを想定しています。

#### 方法1: Netlify環境変数を使用（推奨）

1. Netlifyダッシュボードでプロジェクトを開く
2. 「Site settings」→「Environment variables」を開く
3. 以下の環境変数を追加：
   - `SUPABASE_URL` = あなたのSupabaseプロジェクトURL
   - `SUPABASE_ANON_KEY` = あなたのSupabase anonキー
4. デプロイ時に自動的に`config.js`が生成されます

#### 方法2: 手動で設定ファイルを編集

`public/config.js` を開いて、あなたのSupabaseプロジェクト情報に置き換えてください：

```javascript
window.SUPABASE_CONFIG = {
  url: 'https://your-project.supabase.co', // あなたのSupabase URL
  anonKey: 'your-anon-key-here' // あなたのanonキー
};
```

#### Netlifyへのデプロイ手順

**GitHub連携の場合（推奨）：**
1. このリポジトリをGitHubにプッシュ
2. Netlifyダッシュボードで「Add new site」→「Import an existing project」
3. GitHubリポジトリを選択
4. ビルド設定：
   - Build command: `node build-config.js`
   - Publish directory: `public`
5. 環境変数を設定（方法1を使用する場合）
6. 「Deploy site」をクリック

**Netlify CLIを使用する場合：**
```bash
# Netlify CLIをインストール（未インストールの場合）
npm install -g netlify-cli

# Netlifyにログイン
netlify login

# デプロイ
netlify deploy --prod --dir=public
```

**ドラッグ&ドロップでデプロイ：**
1. `public`フォルダをZIPに圧縮
2. Netlifyダッシュボードで「Add new site」→「Deploy manually」
3. ZIPファイルをドラッグ&ドロップ

### 5. Supabase認証設定の更新

Netlifyにデプロイ後、Supabaseの認証設定を更新：

1. Supabaseダッシュボードの「Authentication」→「URL Configuration」を開く
2. 「Site URL」にNetlifyのURLを設定（例: `https://your-site.netlify.app`）
3. 「Redirect URLs」にNetlifyのURLを追加

### 6. その他のホスティングサービス

#### 方法1: Supabase CLIを使用（推奨）

```bash
# Supabase CLIをインストール（未インストールの場合）
npm install -g supabase

# Supabaseにログイン
supabase login

# プロジェクトをリンク
supabase link --project-ref your-project-ref

# 静的サイトをデプロイ
supabase functions deploy --no-verify-jwt
# または、Supabaseダッシュボードの「Hosting」から直接アップロード
```

#### 方法2: Supabaseダッシュボードから直接デプロイ

1. Supabaseダッシュボードの「Hosting」セクションを開く
2. 「New Site」をクリック
3. サイト名を入力
4. `public` フォルダをアップロード（またはGitHubリポジトリを接続）
5. デプロイ完了後、URLを確認

このプロジェクトは静的サイトなので、Vercelなどにもデプロイ可能です：

**Vercelの場合：**
```bash
# Vercel CLIを使用
vercel --prod
```

### 7. 動作確認

1. デプロイ後のURLにアクセス
2. メールアドレスを入力してMagic Linkを送信
3. メールのリンクをクリックしてログイン
4. クライアントを追加して、作業時間を記録してみる

## ローカル開発

ローカルで開発する場合：

```bash
# 簡単なHTTPサーバーを起動（Python 3の場合）
cd public
python3 -m http.server 8000

# または Node.js の場合
npx serve public
```

ブラウザで `http://localhost:8000` にアクセスしてください。

## ファイル構成

```
.
├── public/
│   ├── index.html      # メインのHTMLファイル
│   └── config.js       # Supabase設定ファイル（Netlifyビルド時に自動生成）
├── supabase/
│   └── migrations/
│       └── 001_initial_schema.sql  # データベーススキーマ
├── build-config.js    # Netlifyビルド時にconfig.jsを生成するスクリプト
├── netlify.toml        # Netlify設定
└── README.md           # このファイル
```

## トラブルシューティング

### 認証エラーが発生する場合

- `config.js` のURLとAPIキーが正しいか確認
- Supabaseダッシュボードの「Authentication」→「URL Configuration」でリダイレクトURLが正しく設定されているか確認

### データベースエラーが発生する場合

- SQLマイグレーションが正しく実行されているか確認
- Supabaseダッシュボードの「Table Editor」でテーブルが作成されているか確認
- RLS（Row Level Security）ポリシーが有効になっているか確認

## ライセンス

MIT License
