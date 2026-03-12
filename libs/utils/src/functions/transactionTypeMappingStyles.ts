import { getTransactionMappings, TransactionType } from '../../../types/src/types/Transaction.types';
import { isNullOrUndefined } from './isNullOrUndefined.fn';

type TransactionMappingStyles = {
  screenLabel: string;
  styles: {
    bg: string;
    text: string;
  };
};
export function transactionTypesMappingStyles(
  transactionType: TransactionType | undefined | null,
): TransactionMappingStyles {
  if (isNullOrUndefined(transactionType)) {
    return {
      screenLabel: '-',
      styles: {
        bg: '',
        text: '',
      },
    };
  }
  const screenLabel =
    getTransactionMappings().TRANSACTION_TYPES_MAPPING.find(
      (type: { apiLabel: TransactionType }) => type.apiLabel === transactionType,
    )?.screenLabel ?? '-';

  switch (transactionType) {
    case 'buySell':
    case 'rebate':
      return {
        screenLabel,
        styles: {
          bg: 'success-50',
          text: 'success-700',
        },
      };

    case 'withdrawalDeposit':
    case 'amortization':
    case 'futuresSettlement':
    case 'gainsExpenses':
      return {
        screenLabel,
        styles: {
          bg: 'light',
          text: 'subtle',
        },
      };
    case 'dividend':
    case 'coupon':
    case 'leverage':
      return {
        screenLabel,
        styles: {
          bg: 'info-50',
          text: 'info-600',
        },
      };

    case 'otherFee':
    case 'taxes':
    case 'brokerageFee':
    case 'maturity':
      return {
        screenLabel,
        styles: {
          bg: 'warning-50',
          text: 'warning-700',
        },
      };

    default:
      return {
        screenLabel,
        styles: {
          bg: 'brand-50',
          text: 'btn-link',
        },
      };
  }
}
