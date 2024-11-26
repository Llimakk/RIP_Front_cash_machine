export const isHomePage = (path:string) => {
	return path == "/"
}

export const isBillPage = (path:string) => {
    return path.match(/^\/bills\/(\d+)/)
}