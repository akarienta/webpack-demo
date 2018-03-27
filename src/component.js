export default (text = 'Hello world') => {
	const element = document.createElement('h1');

	element.innerHTML = text;
	element.classList.add('mainHeadline');

	return element;
};
