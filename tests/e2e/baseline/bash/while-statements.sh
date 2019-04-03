a() {
	while true; do
	done
}
b() {
	while (true); do
	done
}
c() {
	while 1; do
	done
}
d() {
	while (1); do
	done
}
e() {
	while identifier; do
	done
}
f() {
	while (identifier); do
	done
}
g() {
	while $(funcCall ); do
	done
}
h() {
	while 1 + 1; do
	done
}
i() {
	while ""; do
	done
}
