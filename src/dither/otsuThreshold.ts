function otsuThreshold(histogramData: number[], totalPixels: number): number {
	let sum = histogramData.reduce((s, v, i) => s + v * i, 0);

	let sumBackground = 0;
	let weightBackground = 0;
	let weightForeground = 0;

	let varianceMax = 0;
	let threshold = 0;

	for (let t = 0; t < 256; t++) {
		weightBackground += histogramData[t];
		if (weightBackground == 0) continue;

		weightForeground = totalPixels - weightBackground;
		if (weightForeground == 0) break;
		sumBackground += t * histogramData[t];

		let medianBackground = sumBackground / weightBackground;
		let medianForeground = (sum - sumBackground) / weightForeground;

		// Calculate Between Class Variance
		let varianceBetween =
			weightBackground *
			weightForeground *
			(medianBackground - medianForeground) *
			(medianBackground - medianForeground);

		// Check if new maximum found
		if (varianceBetween > varianceMax) {
			varianceMax = varianceBetween;
			threshold = t;
		}
	}

	return threshold;
}

export default otsuThreshold;
