var container = document.getElementsByClassName('letter')[0];
document.addEventListener('click', function(event) {
	if (container !== event.target && !container.contains(event.target)) {
		console.log('clicking outside the div');
	}
});
	