const siteName = 'マイペンサッパロット';
const domain = 'maipensapparot.vercel.app';

const commonMetaData = {
	description: `${siteName}`,
	suffix: ` | ${siteName}`,
	ogImage: `https://${domain}/ogp.png`
};

export const siteData = {
	siteName,
	commonMetaData,
	domain
};
