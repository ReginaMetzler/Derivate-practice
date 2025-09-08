# Derivált számítása: f(x) = 3x^4 - 5x^2 + 7
# A derivált: f'(x) = 12x^3 - 10x

def f(x):
    return 3 * x**4 - 5 * x**2 + 7

def df(x):
    return 12 * x**3 - 10 * x

x = float(input('Add meg az x értékét: '))
print(f"f({x}) = {f(x)}")
print(f"f'({x}) = {df(x)}")
