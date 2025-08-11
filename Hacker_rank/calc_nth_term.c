#include <stdio.h>

long long find_nth(int n, long long a, long long b, long long c) {
    if (n == 1) return a;
    if (n == 2) return b;
    if (n == 3) return c;
    return find_nth(n - 1, a, b, c) + find_nth(n - 2, a, b, c) + find_nth(n - 3, a, b, c);
}

int main() {
    int n;
    long long a, b, c;
    scanf("%d", &n);
    scanf("%lld %lld %lld", &a, &b, &c);
    printf("%lld\n", find_nth(n, a, b, c));
    return 0;
}
