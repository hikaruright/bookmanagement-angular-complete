export class HttpConst {

    public static endpoint = 'http://localhost:3000';

    public static url(path: string) {
        return HttpConst.endpoint + path;
    }

}