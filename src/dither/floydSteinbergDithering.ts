import histogram from './histogram';
import otsuThreshold from './otsuThreshold';

function floydSteinbergDithering(imageData: ImageData, errorPercent: number = 1) {
	const histogramData = histogram(imageData);
	const threshold = otsuThreshold(histogramData, imageData.data.length / 4);
	const data = imageData.data,
		width = imageData.width,
		height = imageData.height;
	for (var y = 0; y < height; y++)
		for (var x = 0; x < width; x++) {
			var index = (y * width + x) * 4;
			var currentColor = (data[index] + data[index + 1] + data[index + 2]) / 3;
			var binaryColor = currentColor < threshold ? 0 : 255;
			var colorError = currentColor - binaryColor;
			data[index] = data[index + 1] = data[index + 2] = binaryColor;
			if (x + 1 < width) {
				// if right neighbour exists
				const diff = errorPercent * colorError * 7 / 16;
				data[index + 4] += diff;
				data[index + 5] += diff;
				data[index + 6] += diff;
			}
			if (y + 1 == height) {
				// if we are in the last line
				continue;
			} else {
				// bottom neighbour
				const diff = errorPercent * colorError * 5 / 16;
				data[index + width * 4] += diff;
				data[index + width * 4 + 1] += diff;
				data[index + width * 4 + 2] += diff;
			}
			if (x > 0) {
				// bottom left neighbour
				const diff = errorPercent * colorError * 3 / 16;
				data[index + width * 4 - 4] += diff;
				data[index + width * 4 - 3] += diff;
				data[index + width * 4 - 2] += diff;
			}

			if (x + 1 < width) {
				// bottom right neighbour
				const diff = errorPercent * colorError * 1 / 16;
				data[index + (width + 1) * 4] += diff;
				data[index + (width + 1) * 4 + 1] += diff;
				data[index + (width + 1) * 4 + 2] += diff;
			}
		}
}

export default floydSteinbergDithering;
