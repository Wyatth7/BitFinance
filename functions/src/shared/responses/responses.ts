export const unauthorizedResponse = (res: any) => {
    res.status(403).json({
        result: "You must be authenticated to make this request."
    });
}

export const badRequestResponse = (message: string, res: any) => {
    res.status(400).json({
        result: {message}
    });
}

export const okResponse = (data: any, status: number, res: any) => {
    res.status(status).json({
        result: {...data}
    })
}

export const internalServerError = (message: string, res: any) => {
    res.status(500).json({
        result: {message}
    });
};