import {EventEmitter} from '@angular/core';

export class LoanHouseEventService {
  emitter = new EventEmitter<boolean>();

  emitRowDeleteCompletedEvent(deleted:boolean) {
    this.emitter.emit(deleted);
  }
  getRowDeletedEventEmitter() {
    return this.emitter;
  }
}
