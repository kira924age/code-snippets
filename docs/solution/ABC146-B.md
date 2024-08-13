# ABC146-B: ROT N

## 問題

* [https://atcoder.jp/contests/abc146/tasks/abc146_b](https://atcoder.jp/contests/abc146/tasks/abc146_b)

## 解説

N文字シフトのシーザー暗号の暗号文を出力する.

## 実装例

### C++

* submission: [https://atcoder.jp/contests/abc146/submissions/26183203](https://atcoder.jp/contests/abc146/submissions/26183203)

```cpp
#include <iostream>

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

int main() {
  std::cin.tie(0);
  std::ios_base::sync_with_stdio(false);

  int N;
  std::string S;

  std::cin >> N >> S;
  std::cout << caesar_cipher(S, N) << "\n";

  return 0;
}
```

### Python

* submission: [https://atcoder.jp/contests/abc146/submissions/26183224](https://atcoder.jp/contests/abc146/submissions/26183224)

```python
#!/usr/bin/env python3


def caesar_cipher(s, n):
    d = {}
    for c in (65, 97):
        for i in range(26):
            d[chr(i + c)] = chr((i + n) % 26 + c)

    return "".join([d.get(c, c) for c in s])


N = int(input())
S = input()

print(caesar_cipher(S, N))
```

