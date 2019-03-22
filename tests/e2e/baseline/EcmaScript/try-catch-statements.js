function a1() {
    try {
    } catch {
    }
}

function a2() {
    try {
    } catch {
    }
}

function a3() {
    try {
    } catch {
    }
}

function a4() {
    try {
    } catch {
    }
}

function b1() {
    try {
    } catch (error) {
    }
}

function b2() {
    try {
    } catch (error) {
    }
}

function b3() {
    try {
    } catch (error) {
    }
}

function b4() {
    try {
    } catch (error) {
    }
}

function c1() {
    try {
    } catch (error) {
        handleError(error);
    }
}

function c2() {
    try {
    } catch (error) {
        handleError(error);
    }
}

function c3() {
    try {
    } catch (error) {
        handleError(error);
    }
}

function d1() {
    try {
        something();
    } catch (error) {
        handleError(error);
    }
}

function d2() {
    try {
        something();
    } catch (error) {
        handleError(error);
    }
}
