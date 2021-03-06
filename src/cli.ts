import fs = require("fs");
import path = require("path");
import arg = require("arg");
import Licenses = require(".");
import _licenses = require("./licenses.json");

function cli(argv: string[]) {
	let args = arg({
		"--output": String,
		"--name": String,
		"--year": Number,
		"-o": "--output",
		"-n": "--name",
		"-y": "--year"
	}, { argv });

	if (!process.argv[2]) console.log([
		"Format: licenses (license) (option(s))",
		"",
		"Options:",
		"--output/-n?: The output of the license",
		"--name/-n: The name of the licensor",
		"--year/-y?: The year the license was created",
		"",
		"List of licenses:",
		"Academic Free License v3.0",
		"Apache License 2.0",
		"Artistic License 2.0",
		"Boost Software License 1.0",
		"BSD 2-clause \"Simplified\" License",
		"BSD 3-clause \"New\" or \"Revised\" License",
		"BSD 3-clause Clear License",
		"Creative Commons Zero v1.0 Universal",
		"Creative Commons Attribution 4.0",
		"Creative Commons Attribution Share Alike 4.0",
		"Do What The F You Want To Public License",
		"Educational Community License v2.0",
		"Eclipse Public License 1.0",
		"Eclipse Public License 2.0",
		"European Union Public License 1.1",
		"GNU Affero General Public License v3.0",
		"GNU General Public License v2.0",
		"GNU General Public License v3.0",
		"GNU Lesser General Public License v2.1",
		"GNU Lesser General Public License v3.0",
		"ISC License",
		"LaTeX Project Public License v1.3c",
		"Microsoft Public License",
		"MIT License",
		"Mozilla Public License 2.0",
		"Open Software License 3.0",
		"PostgreSQL License",
		"SIL Open Font License 1.1",
		"University of Illinois/NCSA Open Source License",
		"The Unlicense",
		"zLib License"
	].join("\n"));
	else if (Object.keys(_licenses).some(x => new RegExp(args._[0], "i").test(x))) {
		let licenses = new Licenses(args["--name"], args["--year"] || new Date().getFullYear())

		if (!args["--name"]) return console.log("Please specify a name.");
		try {
			fs.writeFileSync(args["--output"] || path.resolve(process.cwd(), "LICENSE"), licenses[args._[0]]);
			console.log(`License written to ${args["--output"] || path.resolve(process.cwd(), "LICENSE")}.`);
		} catch (error) {
			if (error.errno == -4068) console.log("This is the name of a directory! Please try again.");
			else console.log("An error occurred when writing the license! Please try again.");
		}
	} else if (!Object.keys(_licenses).some(x => new RegExp(args._[0], "i").test(x))) console.log("Please specify a valid license name.");
}

export = cli;