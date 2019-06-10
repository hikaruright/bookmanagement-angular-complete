import { Router } from '@angular/router/src/router';
import { Injectable, ErrorHandler } from '@angular/core';
import { SessionError } from './error/session-error';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

    /**
     * コンストラクタ
     */
    constructor() {}

    handleError(error: SessionError) {
        console.log('global error has occoured.');

        location.href = '/';

        return null;
    }
}