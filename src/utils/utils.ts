export const isHomePage = (path:string) => {
	return path == "/"
}

export const isBillPage = (path:string) => {
    return path.match(/^\/bills\/(\d+)/)
}

export const isEditPage = (path: string) => {
    return path.match(/^\/users\/\d+\/edit$/);
};

export const isUserOperatsPage = (path: string) => {
    return path === "/user_operats";
};

export const isProfilePage = (path: string) => {
    return path === "/profile";
};

export const isDraftOperatPage = (path: string) => {
    return path === "/draft_operat";
};