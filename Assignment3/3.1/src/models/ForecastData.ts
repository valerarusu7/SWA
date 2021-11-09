export default interface Forecast {
    place: string,
    time: Date,
    type: string,
    unit: string,
    from: number,
    to: number,
}
