exports.generateOtp = (n) => {
    // const val = Math.floor(1000 + Math.random() * 9000);
    const val = Math.floor(Math.random() * (9 * Math.pow(10, n - 1))) + Math.pow(10, n - 1);
    return val;
}