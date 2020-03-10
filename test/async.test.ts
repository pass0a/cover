function async_test() {
	return new Promise<void>(() => {
		setTimeout(() => {
			console.log('!!!');
		}, 2000);
	});
}
async function run() {
	await async_test();
}
run();
console.log('test');
