'use strict';
const path = require('path');
const childProcess = require('child_process');
const pify = require('pify');

const bin = path.join(__dirname, '../main');

const parseMac = stdout => {
	try {
		const result = JSON.parse(stdout);
		if (result !== null) {
			return result;
		}
	} catch (err) {
		console.error(err);
		throw new Error('Error parsing window data');
	}
};

module.exports = () => pify(childProcess.execFile)(bin).then(parseMac);
module.exports.sync = () => parseMac(childProcess.execFileSync(bin, {encoding: 'utf8'}));
