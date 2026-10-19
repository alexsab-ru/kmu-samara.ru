import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';

const legacyEndpoint = 'https://l.alexsab.ru/lead/kmu/';
const endpoint = 'https://alexsab.ru/lead/kmu/';
const sourcePath = new URL('../vite/src/js/modules/form.js', import.meta.url);
const source = await readFile(sourcePath, 'utf8');

assert.equal(
	source.split(endpoint).length - 1,
	1,
	'form source must contain exactly one alexsab.ru endpoint',
);
assert.equal(
	source.includes(legacyEndpoint),
	false,
	'form source must not retain the legacy l.alexsab.ru endpoint',
);
assert.match(source, /type:\s*["']POST["']/);
assert.match(source, /th\.serialize\(\)\s*\+\s*addParam/);

if (process.env.CHECK_BUILT === '1') {
	const assetsUrl = new URL('../public/assets/', import.meta.url);
	const assetNames = (await readdir(assetsUrl)).filter((name) =>
		/^script-.*\.js$/.test(name),
	);
	assert.equal(assetNames.length, 1, 'build must emit one script asset');
	const bundle = await readFile(new URL(assetNames[0], assetsUrl), 'utf8');
	assert.equal(
		bundle.split(endpoint).length - 1,
		1,
		'built bundle must contain exactly one alexsab.ru endpoint',
	);
	assert.equal(
		bundle.includes(legacyEndpoint),
		false,
		'built bundle must not retain the legacy l.alexsab.ru endpoint',
	);
}

console.log('kmu_lead_endpoint_test passed');
