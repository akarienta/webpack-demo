export default () => {
	const header = document.createElement('div');
	header.classList.add('header');

	const headline = document.createElement('h1');
	headline.innerHTML = 'Hello world';

	const subHeadline = document.createElement('h2');
	subHeadline.innerHTML = 'This is my Webpack demo page';

	header.appendChild(headline);
	header.appendChild(subHeadline);

	return header;
};
