import rgbToGray from './rgbToGray';

function histogram(imageData: ImageData): number[] {
	const histogramData = new Array<number>(256).fill(0);
	const data = imageData.data;
	for (let i = 0; i < data.length; i += 4) {
		const color = rgbToGray(data[i], data[i + 1], data[i + 2]);
		histogramData[color]++;
	}
	return histogramData;
}

export default histogram;
