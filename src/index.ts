import * as fs from 'fs-extra';
import * as minimist from 'minimist';
import { exec } from 'child_process';
process.on('unhandledRejection', (error) => {
	console.error('unhandledRejection', error);
	process.exit(1); // To exit with a 'failure' code
});
main();
function main() {
	let argv = minimist(process.argv.slice(2));
	usage(argv);
	const context = fs.readFileSync('./cover.json', 'utf8');
	console.log('test:', context);
	exec('npx nyc instrument ./ .nyc_cache', (err, stdout, stderr) => {
		console.log(err, stdout, stderr);
	});
	let config = JSON.parse(context);
	if (argv.b || argv.build) {
	}
	//install('https://passoa-generic.pkg.coding.net/libbt/libbt/master?version=latest', '');
}
function usage(argv: any) {
	let help = argv.h || argv.help;
	if (help) {
		// If they didn't ask for help, then this is not a "success"
		var log = help ? console.log : console.error;
		log('Usage: pm <modules> [<Options> ...]');
		log('');
		log('  install native modules@passoa');
		log('');
		log('Options:');
		log('');
		log('  -h, --help     Display this usage info');
		log('  -b, --build   build cpp for project');
		log('  -i, --install   install cpp module(it will build cpp module if could not download from remote)');
		process.exit(help ? 0 : 1);
	}
}
function eval_template(template: string, opts: any) {
	Object.keys(opts).forEach(function(key) {
		var pattern = '{' + key + '}';
		while (template.indexOf(pattern) > -1) {
			template = template.replace(pattern, opts[key]);
		}
	});
	return template;
}
