module.exports = {
	publicPath: process.env.NODE_ENV === "production" ? "/learnlang-tox/" : "/",
	css: {
		loaderOptions: {
			sass: {
				prependData: `@import "@/styles/_variables.scss";`
			}
		}
	}
}