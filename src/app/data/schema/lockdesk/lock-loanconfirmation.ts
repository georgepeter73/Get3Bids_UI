import {LockLoan} from '@data/schema/lockdesk/lock-loan';
import {Adjustment} from '@data/schema/lockdesk/adjustment';

export class LockLoanConfirmation{
   initialLockLoan : LockLoan;
   finalLockLoan : LockLoan;
   initialAndFinalAdjustments : Adjustment[];
   customInitialAndFinalAdjustments : Adjustment[];
   extensionsInitialAndFinalAdjustments : Adjustment[];
   initialAndFinalPrice : Adjustment;
   initialAndFinalBasePrice : Adjustment;
   initialAndFinalMargins : Adjustment[]
}
