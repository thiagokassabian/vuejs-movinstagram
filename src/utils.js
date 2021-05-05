const imgAvatarPath = user => {
	const url = require(`@/assets/${user}.png`);
	return url;
};

export { imgAvatarPath };
