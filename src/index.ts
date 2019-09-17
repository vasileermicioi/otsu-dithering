import floydSteinbergDithering from './dither/floydSteinbergDithering';

function loadImage(src: string): Promise<HTMLImageElement> {
	return new Promise<HTMLImageElement>((resolve, reject) => {
		const img = new Image();
		img.src = src;
		img.onerror = (err) => reject(new Error(`error loading image ${src}`));
		img.onload = () => resolve(img);
	});
}

function getImageData(img: HTMLImageElement): ImageData {
	const canvas = document.createElement('canvas') as HTMLCanvasElement;
	canvas.width = img.width;
	canvas.height = img.height;
	const context = canvas.getContext('2d') as CanvasRenderingContext2D;
	context.drawImage(img, 0, 0);
	return context.getImageData(0, 0, img.width, img.height);
}

function toDataUrl(imgData: ImageData): string {
	const canvas = document.createElement('canvas') as HTMLCanvasElement;
	canvas.width = imgData.width;
	canvas.height = imgData.height;
	const context = canvas.getContext('2d') as CanvasRenderingContext2D;
	context.putImageData(imgData, 0, 0);
	return canvas.toDataURL();
}

function outputImage(imgSrc: string) {
	const img = new Image();
	img.src = imgSrc;
	document.body.appendChild(img);
}

async function main() {
	const img = await loadImage((<HTMLImageElement>document.getElementById('img1')).src);
	for (let errorDiffusionPercent of [ 0, 0.25, 0.5, 0.75, 1 ]) {
		const imgData = getImageData(img);
		floydSteinbergDithering(imgData, errorDiffusionPercent);
		outputImage(toDataUrl(imgData));
	}
}

main();
