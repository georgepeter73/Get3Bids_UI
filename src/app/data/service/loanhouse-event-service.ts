import {EventEmitter, Injectable} from '@angular/core';

export class LoanHouseEventService {
  emitter = new EventEmitter<boolean>();
  constructor() {}
  emitRowDeleteCompletedEvent(deleted:boolean) {
    this.emitter.emit(deleted);
  }
  getRowDeletedEventEmitter() {
    return this.emitter;
  }
}
