# ABC232-B: Caesar Cipher

## 問題

* [https://atcoder.jp/contests/abc232/tasks/abc232_b](https://atcoder.jp/contests/abc232/tasks/abc232_b)

## 解説

ずらす文字数を26通り全探索するだけ.

## 実装例

### C++

* submission: [https://atcoder.jp/contests/abc232/submissions/28043178](https://atcoder.jp/contests/abc232/submissions/28043178)

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
  std::string S, T;
  std::cin >> S >> T;

  for (int i = 0; i < 26; i++) {
    if (caesar_cipher(S, i) == T) {
      std::cout << "Yes\n";
      return 0;
    }
  }

  std::cout << "No\n";

  return 0;
}
```

### Python

* submission: [https://atcoder.jp/contests/abc232/submissions/28043196](https://atcoder.jp/contests/abc232/submissions/28043196)

```python
#!/usr/bin/env python3


def caesar_cipher(s, n):
    d = {}
    for c in (65, 97):
        for i in range(26):
            d[chr(i + c)] = chr((i + n) % 26 + c)

    return "".join([d.get(c, c) for c in s])


S = input()
T = input()
ans = "No"
for i in range(26):
    if caesar_cipher(S, i) == T:
        ans = "Yes"

print(ans)
```

