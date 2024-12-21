const { writeFile } = require('fs/promises');
const path = require('path');

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const randomSleep = (maxSleep) => sleep(Math.floor(Math.random() * maxSleep));

const MAX_SLEEP = 4000;

// create temporary file using node.js built in modules
const createTemporaryFilteWithText = async (fileName, text) => {
	const tempFilePath = path.join('/tmp', fileName);

	await randomSleep(MAX_SLEEP);

	return writeFile(tempFilePath, text);
}

const fileNamesToCreate = ['file1.txt', 'file2.txt', 'file3.txt', 'file4.txt'];

(async () => {
	let fileNamesCreating = [];
	const promises = fileNamesToCreate.map(async (fileName, index) => {
		await randomSleep(MAX_SLEEP)
		// insert the file name we are creating into the array
		fileNamesCreating.push(fileName);

		console.log('Files creating:', fileNamesCreating);

		await createTemporaryFilteWithText(fileName, `File ${index + 1}`);

		// remove the file name we just created from the array
		/* 
			we can replace the variable even running this asynchronously because
			IT IS IMPOSSIBLE RUNNING MULTIPLE LINES AT A TIME WITH JAVASCRIPT
			(asynchronous ~ concurrence) !== parallelism
		*/
		fileNamesCreating = fileNamesCreating.filter((name) => name !== fileName);
	});



	await Promise.all(promises);

	console.log('All files created');
})()