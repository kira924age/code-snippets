# Caesar 暗号

## 概要

文字列 $S$, 整数値 $N$ を引数として受け取り, 文字列 $S$ のアルファベットを辞書順で $N$ 文字シフトした文字列を返す.

## 計算量

与えられた文字列の長さを $n$ として

* $O(n)$

## Snippet

### C++

```cpp
std::string caesar_cipher(std::string &s, int n) {
  char table[0xff] = {0};

  for (int t = 0; t < 0xff; t++) {
    table[t] = t;
  }

  for (int i = 0; i < 26; i++) {
    char upper_ch_src = 'A' + i;
    char upper_ch_dst = 'A' + (i + n) % 26;
    char lower_ch_src = 'a' + i;
    char lower_ch_dst = 'a' + (i + n) % 26;

    table[(int)upper_ch_src] = upper_ch_dst;
    table[(int)lower_ch_src] = lower_ch_dst;
  }

  std::string res = "";
  for (int i = 0; i < (int)s.size(); i++) {
    char ch = s[i];
    res += table[(int)ch];
  }

  return res;
}
```

### Python

```python
def caesar_cipher(s, n):
    d = {}
    for c in (65, 97):
        for i in range(26):
            d[chr(i + c)] = chr((i + n) % 26 + c)

    return "".join([d.get(c, c) for c in s])
```

## 解説

シーザー暗号 (Caesar cipher) は平文のアルファベットを辞書順で3文字だけ後ろにずらすという古典的な暗号である.

以下のように `a` は `d` となり, `b` は `e` となる.

* a -> d
* b -> e
* c -> f
* d -> g

また `x` は `a`, `y` は `b` といったように, `z` を超える場合はアルファベットを一周して `a` に戻る.

* w -> z
* x -> a
* y -> b
* z -> c

13文字シフトのシーザー暗号は特に `ROT13` と呼ばれており, 復号と暗号化が同じ操作であることが知られている.

`ROT13` は `nkf` や `tr` を使って以下のように復号することもできる.

* nkf

```
$ echo URYYB_JBEYQ | nkf -r
HELLO_WORLD
```

* tr

```
$ echo URYYB_JBEYQ | tr A-Z N-ZA-M | tr a-z n-za-m
HELLO_WORLD
```

## 検証

* [ABC146-B: ROT N](../solution/ABC146-B.html)
* [ABC232-B: Caesar Cipher](../solution/ABC232-B.html)
* [JOI 2006-2007 予選 問題3: シーザー暗号](../solution/JOI2007yo-C.html)

## 参考文献

* [https://ja.wikipedia.org/wiki/%E3%82%B7%E3%83%BC%E3%82%B6%E3%83%BC%E6%9A%97%E5%8F%B7](https://ja.wikipedia.org/wiki/%E3%82%B7%E3%83%BC%E3%82%B6%E3%83%BC%E6%9A%97%E5%8F%B7)

