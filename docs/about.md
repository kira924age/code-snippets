# About

## これ何?

これは管理人が競技プログラミングやCTFでよく使うコード片(Snippet)を集めたものです.

`VitePress`という静的サイトジェネレータを使ってドキュメントを作成し`Cloudflare Pages`というCloudflareが提供するホスティングサービスを使ってページを公開しています.

## 使い方

管理人は[UltiSnips](https://github.com/SirVer/ultisnips)というVim Pluginを使ってVimからSnippetを呼び出して使用しています.

UltiSnipsのスニペットファイルは拡張子ごとに異なっていて,
適当なファイルをVimで開いて`:UltiSnipsEdit`を実行すると編集出来ます.
(もちろんVimコマンドラインを使わずに直接編集することもできます)

このサイトに掲載されているSnippetをUltiSnips で使える形式のスニペットファイルにしたものが以下のファイルです.

* [~/.vim/UltiSnips/cpp.snippets](https://github.com/kira924age/code-snippets/blob/main/.vim/UltiSnips/cpp.snippets)
* [~/.vim/UltiSnips/python.snippets](https://github.com/kira924age/code-snippets/blob/main/.vim/UltiSnips/python.snippets)

UltiSnips を Install して上記のスニペットファイルを適切なディレクトリに配置した上でVim で適当なファイルを開きSnippet 名を入力してTab keyを押すとSnippetが展開されます.
Snippet 名は関数名や構造体・クラス名と同じ文字列を設定しています.

## 間違えについて

コードや説明に誤りを見つけた場合些細なものであっても教えてくれると嬉しいです.

* 連絡先: `$(whoami)@gmail.com`
  * `$(whoami)` を管理人の handle name で置換してください

