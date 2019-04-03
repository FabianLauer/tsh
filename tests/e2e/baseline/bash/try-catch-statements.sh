a1() {
	{
	} || {
	}
}
a2() {
	{
	} || {
	}
}
a3() {
	{
	} || {
	}
}
a4() {
	{
	} || {
	}
}
b1() {
	{
	} 2>$1 | {
		read -d "" -t 0.01 error
		if [-z "$error"]; then
		fi
	}
}
b2() {
	{
	} 2>$1 | {
		read -d "" -t 0.01 error
		if [-z "$error"]; then
		fi
	}
}
b3() {
	{
	} 2>$1 | {
		read -d "" -t 0.01 error
		if [-z "$error"]; then
		fi
	}
}
b4() {
{
} 2>$1 | {
read -d "" -t 0.01 error
if [-z "$error"]; then
fi
}
}
c1() {
	{
	} 2>$1 | {
		read -d "" -t 0.01 error
		if [-z "$error"]; then
			$(handleError error);
		fi
	}
}
c2() {
	{
	} 2>$1 | {
		read -d "" -t 0.01 error
		if [-z "$error"]; then
			$(handleError error);
		fi
	}
}
c3() {
	{
	} 2>$1 | {
		read -d "" -t 0.01 error
		if [-z "$error"]; then
			$(handleError error);
		fi
	}
}
d1() {
	{
		$(something );
	} 2>$1 | {
		read -d "" -t 0.01 error
		if [-z "$error"]; then
			$(handleError error);
		fi
	}
}
d2() {
	{
		$(something );
	} 2>$1 | {
		read -d "" -t 0.01 error
		if [-z "$error"]; then
			$(handleError error);
		fi
	}
}
