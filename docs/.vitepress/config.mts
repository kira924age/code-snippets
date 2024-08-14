import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Code snippets",
  description: "code snippets for competition",
  markdown: {
    math: true
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'About', link: '/about' }
    ],

    sidebar: [
      {
        text: '整数論',
        items: [
          { text: '素因数分解', link: 'number_theory/prime_factorization' }
        ]
      },
      {
        text: 'グラフ理論',
        items: [
          { text: '巡回セールスマン問題', link: 'graph/traveling_salesman_problem' },
          { text: 'ダイクストラ法', link: 'graph/dijkstra' }
        ]
      },
      {
        text: 'データ構造',
        items: [
          { text: 'Union Find Tree', link: 'data_structure/union_find' }
        ]
      },
      {
        text: '暗号',
        items: [
          { text: 'シーザー暗号', link: 'crypto/caesar_cipher' }
        ]
      },
      {
        text: 'その他',
        items: [
          { text: '座標圧縮', link: 'other/shrink_coordinate' }
        ]
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/kira924age/code-snippets' }
    ]
  }
})
